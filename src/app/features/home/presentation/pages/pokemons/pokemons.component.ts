import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../data/services/pokemon.service';
import Results from '../../../data/models/Results';
import { forkJoin } from 'rxjs';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { LoadingComponent } from "../../components/loading/loading.component";
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonCardComponent, LoadingComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
})
export class PokemonsComponent implements OnInit {

  limit: number = 50;
  offset: number = 0;
  isLoading: boolean = false;

  imageUrl: String = environment.imageUrl;

  constructor(public pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (data) => {
        const requests = data.results.map((pokemon: Results) =>
          this.pokemonService.getPokemon(pokemon.url)
        );

        forkJoin(requests).subscribe({
          next: (pokemonDetails) => {
            this.pokemonService.pokemons = [...this.pokemonService.pokemons, ...pokemonDetails];
            this.offset += this.limit;
            this.isLoading = false;
          },
          error: (error) => {
            console.error(`Error al obtener detalles: ${error}`);
          },
        });
      },
      error: (error) => {
        console.log(`Error al obtener pokemons: ${error}`);
        this.isLoading = false;
      },
    });
  }

  onScroll() {
    const scrollTop = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop >= documentHeight - 10) {
      this.getPokemons();
    }
  }

  onCardClick(pokemonId: number) {
    this.router.navigate(['/pokemon/', pokemonId]);
  }
}
