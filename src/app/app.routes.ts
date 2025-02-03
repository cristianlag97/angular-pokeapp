import { Routes } from '@angular/router';
import { SigninPageComponent } from './features/auth/presentation/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './features/auth/presentation/pages/signup-page/signup-page.component';
import { MainComponent } from './layout/main/main.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard } from './features/auth/data/guards/auth.guard';
import { PokemonsComponent } from './features/home/presentation/pages/pokemons/pokemons.component';
import { PokemonDetailComponent } from './features/home/presentation/pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: PokemonsComponent},
      {path: ':id', component: PokemonDetailComponent}
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SigninPageComponent },
      { path: 'sign-up', component: SignupPageComponent },
    ]
  }
];
