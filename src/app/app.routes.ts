import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module').then((m) => m.BackofficeModule),
    // proteger rutas
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
