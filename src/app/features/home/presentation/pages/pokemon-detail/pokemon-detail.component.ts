import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../data/services/pokemon.service';
import { Pokemon } from '../../../data/models/Pokemon';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  pokemonId: number = 0;
  pokemonDetails: Pokemon | null = null;
  imageUrl: String = '';

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonId = +this.route.snapshot.paramMap.get('id')!;
    this.imageUrl = `${environment.imageUrl}${this.pokemonId}.png`
    this.getPokemonDetails();
    console.log(this.pokemonDetails)
  }

  getPokemonDetails() {
    this.pokemonService.getPokemon(this.pokemonId).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
        console.log(data)
      },
      error: (error) => {
        console.log(`Error al obtener el detalle del pokemon: ${error}`)
      }
    });
  }

  get pokemonTypes(): string {
    return this.pokemonDetails?.types.map(type => type.type.name).join(', ') || '';
  }

}
