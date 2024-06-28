import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, MenuController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
const apiKey = environment.firebaseConfig.apiKey;

@Component({
  selector: 'app-map-direccion-pedido',
  templateUrl: './map-direccion-pedido.component.html',
  styleUrls: ['./map-direccion-pedido.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonBackButton, IonTitle,
    IonContent, IonButtons
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapDireccionPedidoComponent  implements OnInit {

  map: GoogleMap;
  transparency: boolean = false;

  constructor(private menuController: MenuController) { }

  ionViewDidEnter() {
    this.menuController.enable(false, 'main');
    this.transparency = true;
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'main');
    this.transparency = false;
  }

  ngOnInit() {
    this.initMap();
  }

  async initMap() {
    this.map = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: document.getElementById('map'), // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
    this.map.enableCurrentLocation(true);
  }

}
