import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { IonButton, IonIcon, IonRouterLink } from "@ionic/angular/standalone";
import { BadgeModule } from 'primeng/badge';
import { Models } from 'src/app/models/models';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-carrito',
  templateUrl: './button-carrito.component.html',
  styleUrls: ['./button-carrito.component.scss'],
  standalone: true,
  imports: [
    IonIcon, 
    IonButton,
    BadgeModule,
    RouterModule,
    IonRouterLink
  ]
})
export class ButtonCarritoComponent  implements OnInit, OnDestroy {

  count = signal(0);

  private carritoService: CarritoService = inject(CarritoService);
  suscriberCarrito: Subscription;

  constructor() { 
    this.init();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.suscriberCarrito?.unsubscribe();
  }

  init() {
    const carrito = this.carritoService.getCarrito();
    this.setCount(carrito);
    this.carritoService.getCarritoChanges().subscribe( carrito => {
      this.setCount(carrito);
    });
  }

  setCount(carrito: Models.Tienda.Carrito) {
    if (carrito) {
      this.count.set(carrito.cant);
    } 
  }

}
