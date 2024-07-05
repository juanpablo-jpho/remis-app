import { Component, Input, OnInit, inject } from '@angular/core';
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

  @Input() pedido: Models.Tienda.Pedido;
  estados = Models.Tienda.StepsPedido;

  constructor() { }

  ngOnInit() {}

  async changeState() {
    console.log('changeState -> ', this.pedido.state);
    await this.interactionService.showLoading('Actualizando estado...');
    try {
      const path = `${Models.Auth.PathUsers}/${this.pedido.info.datos.id}/${Models.Tienda.pathPedidos}/${this.pedido.id}`;
      const updateData = {
        state: this.pedido.state
      }
      // crear regla de actualización
      await this.firestoreService.updateDocument(path, updateData);
      this.interactionService.dismissLoading();
    } catch (error) {
      console.error(error);
      this.interactionService.presentAlert('Error', 'No se pudo actualizar el estado');
      this.interactionService.dismissLoading();
    }

  }

}
