import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fecha-pedido',
  templateUrl: './fecha-pedido.component.html',
  styleUrls: ['./fecha-pedido.component.scss'],
})
export class FechaPedidoComponent  implements OnInit {

  fechaEntega = (new Date()).toISOString();
  min = (new Date()).toISOString();
  max: any;

  constructor() { 
    this.setMaxDate();
  }

  ngOnInit() {}

  setMaxDate() {
      const now = new Date();
      now.setDate( now.getDate() + 10 );
      this.max = now.toISOString();
  }


  changeDate() {
    console.log('changeDate() -> ', this.fechaEntega);
  }

}
