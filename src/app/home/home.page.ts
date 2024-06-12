import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { FirestoreService } from '../firebase/firestore.service';
import { InteractionService } from '../services/interaction.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private interactionService: InteractionService = inject(InteractionService);

  constructor() {
    // this.test()
    // this.testLectura();
  }


  async test() {
    console.log('test()');
   await this.firestoreService.createDocument('test', {hola: 'nada'})
  }

  testLectura() {
    this.firestoreService.getDocumentsChanges('test').subscribe( res => {
        console.log('testLectura -> ', res);
    });
  }

  async save() {
    const response = await this.interactionService.presentAlert('Importante', `Seguro que deseas <strong>guardar</strong>`, 'Cancelar', 'Si');
    console.log('response -> ', response);
    if (response) {
      await this.interactionService.showLoading('Cargando..');
      setTimeout(() => {
        this.interactionService.dismissLoading();
        this.interactionService.showToast('Guardado con éxito');
      }, 2000);

    }

  }
}


interface ProductoI {
  name: string;
  precio: number;
}
