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


  constructor() { 
    this.loadCarrito();
  }

  ngOnInit() {}

  loadCarrito() {
    this.carrito = this.carritoService.getCarrito();
    this.carritoService.getCarritoChanges().subscribe( res => {
      this.carrito = res;
    });
  }

}
