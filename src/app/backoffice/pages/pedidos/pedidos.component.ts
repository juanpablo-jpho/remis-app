import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Models } from 'src/app/models/models';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent  implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);


  pedidos: Models.Tienda.Pedido[];
  rangeDates: Date[];
  numItems: number = 2;
  enableMore: boolean = true;

  subscribersPedidos: Subscription[] = [];

  constructor() { }

  ngOnInit() {
      this.initRange();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy pedidos admin');
    this.clearSubscribers();
  }

  initRange() {
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    const end = new Date();
    this.rangeDates = [start, end];
    this.changeDate();
  }

  changeDate() {
    console.log('changeDate() -> ', this.rangeDates);
    if (this.rangeDates.length == 2) {
      if (this.rangeDates[0] && this.rangeDates[1]) {
        this.rangeDates[1].setHours(23);
        this.rangeDates[1].setMinutes(59);
        this.rangeDates[1].setSeconds(59);
        this.pedidos = null;
        this.clearSubscribers();
        this.loadMorePedidos();
      }
    }
  }

  loadMorePedidos(event: any = null) {
    const start = this.rangeDates[0];
    const end = this.rangeDates[1];
    console.log('loadMorePedidos -> ', start, end);
    

    const path = Models.Tienda.pathPedidos;
    const query: Models.Firestore.whereQuery[] = [['date', '>=', start, 'date', '<=', end]];
    const extras: Models.Firestore.extrasQuery = {
      limit: this.numItems,
      orderParam: 'date',
      directionSort: 'desc',
      group: true
    }

    if (this.pedidos?.length) {
      const last = this.pedidos[ this.pedidos.length - 1 ];
      extras.startAfter = new Date(last.date.seconds * 1000 )
    }

    // crear regla e indices
    const subscriberPedidos = this.firestoreService.getDocumentsQueryChanges<Models.Tienda.Pedido>(path, query, extras).subscribe( res => {
      console.log('loadPedidos changes -> ', res);
      if (res.length) {
        if (this.pedidos) {
          res.forEach ( pedidoLoad => {
            const index = this.pedidos.findIndex( pedido => pedido.id == pedidoLoad.id);
            if (index >= 0) {
              this.pedidos[index]
            } else [
              this.pedidos.push(pedidoLoad)
            ]
          });
          // this.pedidos.push(...res);
        } 
      } 

      if (!this.pedidos) {
        this.pedidos = res;
      }
  
      if (res.length == this.numItems) {
        this.enableMore = true;
      } else {
        this.enableMore = false;
      }

      if (event) {
        event.target.complete();
      }
      
    });
    this.subscribersPedidos.push(subscriberPedidos);

  }

  async loadMore(event: any) {
    console.log('loadMore');
    this.loadMorePedidos();
    event.target.complete();
  }

  clearSubscribers() {
    this.subscribersPedidos.forEach( subscriber => {
        subscriber?.unsubscribe();
    });
    this.subscribersPedidos = [];
  }

}
