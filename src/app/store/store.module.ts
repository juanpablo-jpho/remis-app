import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeStoreComponent } from './pages/home-store/home-store.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { IonHeader, IonFooter, IonTitle, IonButtons, 
  IonButton, IonIcon, IonToolbar, IonContent, IonMenuButton, IonBackButton,
  IonGrid, IonRow, IonCol,
  IonRouterLink, 
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonItem,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonCardContent,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeStoreComponent,
    CarritoPageComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    IonHeader, IonFooter, IonTitle, IonButtons, 
    IonButton, IonIcon, IonToolbar, IonContent, IonMenuButton, IonBackButton,
    IonGrid, IonRow, IonCol,
    IonRouterLink,
    IonSegment, IonSegmentButton, IonLabel,
    IonSpinner, 
    FormsModule,
    IonItem, IonBadge,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonImg
  ]
})
export class StoreModule { }
