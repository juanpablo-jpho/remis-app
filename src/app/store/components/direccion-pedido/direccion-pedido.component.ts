import { Component, OnInit } from '@angular/core';
import { IonIcon, IonItem, IonLabel, ModalController, IonButtons, IonButton } from "@ionic/angular/standalone";
import { MapDireccionPedidoComponent } from '../map-direccion-pedido/map-direccion-pedido.component';

@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.component.html',
  styleUrls: ['./direccion-pedido.component.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, 
    IonLabel, IonIcon, 
    IonItem,
    MapDireccionPedidoComponent
  ]
})
export class DireccionPedidoComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async presentMap() {
    const modal = await this.modalController.create({
    component: MapDireccionPedidoComponent,
    // componentProps: { value: 123 }
    });
    await modal.present();
  
  }

}
