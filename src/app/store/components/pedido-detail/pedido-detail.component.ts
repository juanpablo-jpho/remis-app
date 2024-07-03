import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonButtons, IonCard, IonIcon, IonItem, IonLabel, IonRouterLink, IonThumbnail, IonList, IonListHeader, IonBadge, IonText, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';
import { Models } from 'src/app/models/models';
import { DatefirePipe } from 'src/app/shared/pipes/datefire.pipe';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.scss'],
  standalone: true,
  imports: [IonText, 
    IonList, IonListHeader,
    IonCard, IonItem, IonLabel, IonIcon,
    RouterModule, IonRouterLink,
    IonThumbnail,
    IonButtons, IonButton,
    IonBadge,
    CommonModule,
    DatefirePipe,
    IonAccordion, IonAccordionGroup
  ]
})
export class PedidoDetailComponent  implements OnInit {

  @Input() pedido: Models.Tienda.Pedido;

  constructor() { }

  ngOnInit() {
    console.log('pedidoDetail -> ', this.pedido);
    // this.pedido.info.fechaEntrega = new Date(this.pedido.info.fechaEntrega.seconds * 1000)
  }

}
