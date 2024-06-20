import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriaDetailComponent } from './pages/categoria-detail/categoria-detail.component';

const routes: Routes = [
  {path: 'ajustes', component: AjustesComponent},
  {path: 'ajustes/categorias', component: CategoriasComponent},
  {path: 'ajustes/productos', component: ProductosComponent},
  {path: 'ajustes/categoria-detalle', component: CategoriaDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
