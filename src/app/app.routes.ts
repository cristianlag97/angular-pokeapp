import { Routes } from '@angular/router';
import { SigninPageComponent } from './features/auth/presentation/pages/signin-page/signin-page.component';
import { SignupPageComponent } from './features/auth/presentation/pages/signup-page/signup-page.component';
import { MainComponent } from './layout/main/main.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard } from './features/auth/data/guards/auth.guard';
import { PokemonsComponent } from './features/home/presentation/pages/pokemons/pokemons.component';
import { PokemonDetailComponent } from './features/home/presentation/pages/pokemon-detail/pokemon-detail.component';
import { FavoritesPageComponent } from './features/favorites/presentation/pages/favorites-page/favorites-page.component';
import { NotFoundComponent } from './features/home/presentation/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'favorites', component: FavoritesPageComponent, title: 'Favorites' },
      { path: 'pokemon', component: PokemonsComponent, title: 'Pokemon list' },
      { path: 'pokemon/:id', component: PokemonDetailComponent },
      { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SigninPageComponent, title: 'Login' },
      { path: 'sign-up', component: SignupPageComponent, title: 'Register' },
    ]
  },

  // {
  //   path: "old-user-page",
  //   redirectTo: ({ queryParams }) => {
  //     const errorHandler = inject(ErrorHandler);
  //     const userIdParam = queryParams['userId'];
  //     if (userIdParam !== undefined) {
  //       return `/user/${userIdParam}`;
  //     } else {
  //       errorHandler.handleError(new Error('Attempted navigation to user page without user ID.'));
  //       return `/not-found`;
  //     }
  //   },
  // },

  { path: '**', component: NotFoundComponent}
];
