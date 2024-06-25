import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeStoreComponent } from './pages/home-store/home-store.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { IonHeader, IonFooter, IonTitle, IonButtons, 
  IonButton, IonIcon, IonToolbar, IonContent, IonMenuButton, IonBackButton,
  IonGrid, IonRow, IonCol,
  IonRouterLink, IonSegment,
  IonSegmentButton,IonLabel,
  IonSpinner,IonItem,
  IonBadge,
  IonInfiniteScroll, IonInfiniteScrollContent,
  IonCard, IonCardContent,
  IonImg,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonFab,
  IonFabButton} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ItemProductComponent } from './components/item-product/item-product.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    HomeStoreComponent,
    CarritoPageComponent,
    ProductoComponent,
    ItemProductComponent
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
    IonImg,
    IonFab, IonFabButton,
    GalleriaModule, ImageModule
  ]
})
export class StoreModule { }