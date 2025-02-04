import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../data/services/pokemon.service';
import { Pokemon } from '../../../data/models/Pokemon';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  pokemonId: number;
  pokemonDetails: Pokemon | null;
  imageUrl: String;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
    this.pokemonId = 0;
    this.imageUrl = '';
    this.pokemonDetails = null
  }

  ngOnInit(): void {
    this.pokemonId = +this.route.snapshot.paramMap.get('id')!;
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId}.png`
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
