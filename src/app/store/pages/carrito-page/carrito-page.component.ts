import { Component, OnInit, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Models } from 'src/app/models/models';
import { AuthenticationService } from 'src/app/firebase/authentication.service';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.scss'],
})
export class CarritoPageComponent  implements OnInit {

  private carritoService: CarritoService = inject(CarritoService);
  carrito: Models.Tienda.Carrito;
  infoPedido: Models.Tienda.InfoPedido;


  constructor() { 
    this.loadCarrito();
    this.loadInfoPedido();
  }

  ngOnInit() {}

  loadCarrito() {
    this.carrito = this.carritoService.getCarrito();
    this.carritoService.getCarritoChanges().subscribe( res => {
      this.carrito = res;
    });
  }

  loadInfoPedido() {
    this.infoPedido = this.carritoService.getInfoPedido();
    this.carritoService.getInfoPedidoChanges().subscribe( res => {
      this.infoPedido = res;
      console.log('infoPedido in carrito-page -> ', this.infoPedido);
    });
  }

  pedir() {
    console.log('pedir infoPedido -> ', this.infoPedido);
  }

}
