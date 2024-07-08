import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';

const routes: Routes = [
  {path: 'pedidos', component: PedidosComponent},
  {
    path: 'map-recorrido',
    loadComponent: () => import('./pages/map-recorrido/map-recorrido.component').then((m) => m.MapRecorridoComponent)
  },
  {path: 'mis-pedidos', component: MisPedidosComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MotorizadoRoutingModule { }
