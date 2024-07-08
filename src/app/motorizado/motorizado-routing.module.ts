import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

const routes: Routes = [
  {path: 'pedidos', component: PedidosComponent},
  {
    path: 'map-recorrido',
    loadComponent: () => import('./pages/map-recorrido/map-recorrido.component').then((m) => m.MapRecorridoComponent)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MotorizadoRoutingModule { }
