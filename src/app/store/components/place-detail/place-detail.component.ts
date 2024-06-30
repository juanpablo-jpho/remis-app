import { Component, OnInit } from '@angular/core';
import { Marker } from '@capacitor/google-maps';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton,
    IonIcon, IonContent, IonItem, IonLabel, IonTitle
  ]
})
export class PlaceDetailComponent  implements OnInit {

  place: Place;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
      this.modalController.dismiss();
  }

}

interface Place {
  id?: string;
  name: string;
  description: string;
  marker: Marker;
}