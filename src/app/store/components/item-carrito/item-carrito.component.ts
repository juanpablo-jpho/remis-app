import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { IonButton, IonButtons, IonItem, IonLabel,
   IonIcon, IonAvatar, IonRouterLink, IonCard, 
   IonThumbnail} from '@ionic/angular/standalone';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Models } from 'src/app/models/models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonIcon, 
    IonItem, IonLabel, IonButtons, IonButton, IonCard,
    CommonModule, RouterModule, IonRouterLink, IonThumbnail
  ]
})
export class ItemCarritoComponent  implements OnInit, OnDestroy {

  @Input() item: Models.Tienda.ItemCarrito;
  private carritoService: CarritoService = inject(CarritoService);
  suscriberCarrito: Subscription;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.suscriberCarrito?.unsubscribe();
  }

  add() {
    this.carritoService.addItem(this.item.product)
  }

  remove() {
    this.carritoService.removeItem(this.item.product)
  }



  

}
