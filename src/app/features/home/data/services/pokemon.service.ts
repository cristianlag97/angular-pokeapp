import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokemons from '../models/Pokemons';
import { Pokemon } from '../models/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemons: Pokemon[];
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {
    this.pokemons = [];
  }

  getPokemons(limit: number, offset: number) {
    return this.http.get<Pokemons>(this.apiUrl, {
      params: { "limit": limit, "offset": offset },
    });
  }

  getPokemon(url: String | number) {
    if(typeof url === 'string'){
      return this.http.get<Pokemon>(url.toString());
    } else {
      console.log(`${this.apiUrl}${url}`)
      return this.http.get<Pokemon>(`${this.apiUrl}${url}`);
    }
  }
}
