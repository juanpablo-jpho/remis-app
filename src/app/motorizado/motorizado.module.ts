import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotorizadoRoutingModule } from './motorizado-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonBackButton, IonBadge, IonButton, 
  IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, 
  IonFooter, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, 
  IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, 
  IonListHeader, IonMenuButton, IonRouterLink, IonRow, IonSelect, 
  IonSelectOption, IonSpinner, IonText, IonTextarea, IonThumbnail, IonTitle, 
  IonToolbar } from '@ionic/angular/standalone';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidoDetailComponent } from './components/pedido-detail/pedido-detail.component';
import { DatefirePipe } from '../shared/pipes/datefire.pipe';


@NgModule({
  declarations: [
    PedidosComponent,
    PedidoDetailComponent
  ],
  imports: [
    CommonModule,
    MotorizadoRoutingModule,
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
    IonSpinner,
    IonSelect, IonSelectOption,
    IonText,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonBadge,
    DatefirePipe,
    IonAccordion, IonAccordionGroup, IonThumbnail
  ]
})
export class MotorizadoModule { }
