import { Component, OnInit, inject } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonButtons, IonButton, IonRouterLink, IonTextarea, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { MapDireccionPedidoComponent } from '../map-direccion-pedido/map-direccion-pedido.component';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Models } from 'src/app/models/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.component.html',
  styleUrls: ['./direccion-pedido.component.scss'],
  standalone: true,
  imports: [
    IonRow, IonGrid, IonCol,
    IonButton, IonButtons, 
    IonLabel, IonIcon, 
    IonItem,
    MapDireccionPedidoComponent,
    RouterModule,
    IonRouterLink,
    IonTextarea,
    FormsModule
  ]
})
export class DireccionPedidoComponent  implements OnInit {

  private carritoService: CarritoService = inject(CarritoService);
  suscriberInfoPedido: Subscription;

  direccionPedido: Models.Tienda.DireccionPedido = {
    coordinate: null,
    referencia: ''
  }

  

  constructor() { }

  ngOnInit() {
    this.getInfoPedido();
  }

  getInfoPedido() {
    this.carritoService.getInfoPedidoChanges().subscribe( info  => {
        if (info?.direccionEntrega?.coordinate) {
          console.log('coordinate -> ', info?.direccionEntrega?.coordinate);
          this.direccionPedido.coordinate = info.direccionEntrega.coordinate;
          this.carritoService.setDireccionPedido(this.direccionPedido);
        }
    });
  }


}
