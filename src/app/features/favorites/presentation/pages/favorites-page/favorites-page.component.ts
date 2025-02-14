import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../../../../core/storage/services/localstorage.service';
import { PokemonService } from '../../../../home/data/services/pokemon.service';

@Component({
  selector: 'app-favorites-page',
  imports: [],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit{

  private readonly NAME_FAVORITE = 'name_favorite'

  constructor(public localStorageService: LocalstorageService, public pokemonService: PokemonService) {}

  ngOnInit(): void {
    localStorage.getItem(this.NAME_FAVORITE);
  }
}
