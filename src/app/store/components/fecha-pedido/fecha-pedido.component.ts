import { Component, OnInit, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-fecha-pedido',
  templateUrl: './fecha-pedido.component.html',
  styleUrls: ['./fecha-pedido.component.scss'],
})
export class FechaPedidoComponent  implements OnInit {

  private carritoService: CarritoService = inject(CarritoService);

  fechaEntega = (new Date()).toISOString();
  min = (new Date()).toISOString();
  max: any;

  constructor() { 
    this.setMaxDate();
  }

  ngOnInit() {
    this.carritoService.setFechaEntregaPedido(new Date(this.fechaEntega));
  }

  setMaxDate() {
    const now = new Date();
    now.setDate( now.getDate() + 10 );
    this.max = now.toISOString();
  }


  changeDate() {
    console.log('changeDate() -> ', this.fechaEntega);
    this.carritoService.setFechaEntregaPedido(new Date(this.fechaEntega));
  }

}
