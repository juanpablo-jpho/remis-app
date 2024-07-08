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
    path: 'motorizado',
    loadChildren: () => import('./motorizado/motorizado.module').then((m) => m.MotorizadoModule),
    // proteger rutas
    canActivate: [guards.isRolClaim(['motorizado'])]
  },
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full',
  },
];
