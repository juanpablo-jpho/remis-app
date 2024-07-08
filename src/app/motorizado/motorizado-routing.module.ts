import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './page/pedidos/pedidos.component';

const routes: Routes = [
  {path: 'pedidos', component: PedidosComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MotorizadoRoutingModule { }
