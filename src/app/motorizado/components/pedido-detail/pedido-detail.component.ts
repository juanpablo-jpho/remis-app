import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/firebase/authentication.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Models } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.scss'],
})
export class PedidoDetailComponent  implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private interactionService: InteractionService = inject(InteractionService);
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  user: User;

  @Input() pedido: Models.Tienda.Pedido;
  estados = Models.Tienda.StepsPedido;

  constructor() {
    this.user = this.authenticationService.getCurrentUser();
   }

  ngOnInit() {}

  async tomarPedido() {
    await this.interactionService.showLoading('Tomando pedido...');
    try {
      const path = `${Models.Auth.PathUsers}/${this.pedido.uid}/${Models.Tienda.pathPedidos}/${this.pedido.id}`;
      const updateData: any = {
        state: 'asignado',
        motorizado: {
          uid: this.user.uid,
          name: this.user.displayName,
          coordinate: null
        }
      }
      // crear regla de actualización
      await this.firestoreService.updateDocument(path, updateData);
      this.interactionService.dismissLoading();
      // llevar a sección indicada para comenzar a llevar el pedido
    } catch (error) {
      console.error(error);
      this.interactionService.presentAlert('Error', 'No se pudo tomar el estado');
      this.interactionService.dismissLoading();
    }
  }

}
