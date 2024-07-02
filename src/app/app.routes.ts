import { Routes } from '@angular/router';
import { guards } from './shared/guards/guards';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module').then((m) => m.BackofficeModule),
    // proteger rutas
    canActivate: [guards.isRolClaim(['admin'])]
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then((m) => m.StoreModule),
  },
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full',
  },
];
