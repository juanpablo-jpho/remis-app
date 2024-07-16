import { Component, OnInit, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner, IonRouterLink, IonIcon, IonLabel, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ButtonCarritoComponent } from '../../components/button-carrito/button-carrito.component';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/firebase/authentication.service';
import { Models } from 'src/app/models/models';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { PedidoDetailComponent } from '../../components/pedido-detail/pedido-detail.component';
import { NotificationsModule } from 'src/app/notifications/notifications.module';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss'],
  standalone: true,
  imports: [IonLabel, 
    IonHeader, IonToolbar, IonTitle, IonButtons,
    IonButton, IonContent, IonMenuButton,
    ButtonCarritoComponent,
    IonGrid, IonRow, IonCol,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonSpinner,
    RouterModule, IonRouterLink,
    IonIcon, 
    PedidoDetailComponent,
    IonRefresher, IonRefresherContent, NotificationsModule
  ]
})
export class MisPedidosComponent  implements OnInit {

  authenticationService: AuthenticationService = inject(AuthenticationService);
  firestoreService:   FirestoreService = inject(  FirestoreService);
  user: User;

  pedidos: QueryDocumentSnapshot<Models.Tienda.Pedido>[];
  numItems: number = 3;
  enableMore: boolean = true;

  constructor() { 
    this.user = this.authenticationService.getCurrentUser();

  }

  ngOnInit() {
    this.loadMorePedidos()
  }

  async loadMorePedidos() {
    const uid = this.user.uid;
    const path = `${Models.Auth.PathUsers}/${uid}/${Models.Tienda.pathPedidos}`; 
    const extras: Models.Firestore.extrasQuery = {
      limit: this.numItems,
      orderParam: 'date',
      directionSort: 'desc'
    }

    if (this.pedidos) {
      const last = this.pedidos[ this.pedidos.length - 1 ];
      extras.startAfter = last
    }

    // crear regla en firestore de lectura - crear indice si es necesario
    const res = await this.firestoreService.getDocumentsQuery<Models.Tienda.Pedido>(path, 
      [[]], extras);

      console.log('load pedidos res -> ', res.size);

      if (res.size) {
        if (this.pedidos) {
          this.pedidos.push(...res.docs);
        } 
        // else {
        //   this.pedidos = res.docs;
        // }
      } 

      if (!this.pedidos) {
        this.pedidos = res.docs;
      }
  
      if (res.size == this.numItems) {
        this.enableMore = true;
      } else {
        this.enableMore = false;
      }
  }

  async loadMore(event: any) {
    console.log('loadMore');
    await this.loadMorePedidos();
    event.target.complete();
  }

  async refresh(event: any) {
    this.pedidos = null;
    await this.loadMorePedidos();
    event.target.complete();
  }






}
