import { Component, OnInit } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonButtons, IonButton, IonRouterLink } from "@ionic/angular/standalone";
import { MapDireccionPedidoComponent } from '../map-direccion-pedido/map-direccion-pedido.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.component.html',
  styleUrls: ['./direccion-pedido.component.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, 
    IonLabel, IonIcon, 
    IonItem,
    MapDireccionPedidoComponent,
    RouterModule,
    IonRouterLink
  ]
})
export class DireccionPedidoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}


}
