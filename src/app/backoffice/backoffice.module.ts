import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonRouterLink, IonRow, IonSpinner, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CategoriaDetailComponent } from './pages/categoria-detail/categoria-detail.component';


@NgModule({
  declarations: [
    AjustesComponent,
    CategoriasComponent,
    ProductosComponent,
    CategoriaDetailComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader, IonFooter, IonTitle, IonButtons, 
    IonButton, IonIcon, IonToolbar, IonContent, IonMenuButton, IonBackButton,
    IonGrid, IonRow, IonCol,
    IonRouterLink,
    IonCard, IonCardContent,
    IonItem, IonLabel, IonList, IonListHeader,
    IonFab, IonFabButton,
    IonInput, IonTextarea, 
    IonSpinner
  ]
})
export class BackofficeModule { }
