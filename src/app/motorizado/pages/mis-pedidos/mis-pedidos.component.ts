import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/firebase/authentication.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Models } from 'src/app/models/models';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss'],
})
export class MisPedidosComponent  implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private authenticationService: AuthenticationService = inject(AuthenticationService);


  pedidos: Models.Tienda.Pedido[];
  numItems: number = 2;
  enableMore: boolean = true;

  subscribersPedidos: Subscription[] = [];


  user: User;

  constructor() { 
    this.user = this.authenticationService.getCurrentUser();
  }

  ngOnInit() {
    this.loadMorePedidos();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy pedidos motorizado');
    this.clearSubscribers();
  }




  loadMorePedidos(event: any = null) {
    console.log('loadMorePedidos ');
    

    const path = Models.Tienda.pathPedidos;
    // const query: Models.Firestore.whereQuery[] = [['date', '>=', start, 'date', '<=', end]];
    // const query: Models.Firestore.whereQuery[] = [['state', '==', 'tomado'], ['state', '==', 'asignado']];
    const query: Models.Firestore.whereQuery[] = [['motorizado.uid', '==', this.user.uid]];
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
              this.pedidos[index] = pedidoLoad
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

