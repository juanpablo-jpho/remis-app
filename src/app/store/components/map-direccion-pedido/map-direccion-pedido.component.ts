import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { GoogleMap, MapType, Marker, LatLngBounds } from '@capacitor/google-maps';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, 
  IonToolbar, MenuController, IonModal, IonItem, 
  IonLabel, IonIcon, IonButton, 
  ModalController,
  IonFab,
  IonFabButton} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { PlaceDetailComponent } from '../place-detail/place-detail.component';
import { CommonModule } from '@angular/common';

import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { InteractionService } from '../../../services/interaction.service';
import { CarritoService } from '../../services/carrito.service';
import { ActivatedRoute, Router } from '@angular/router';


const apiKey = environment.firebaseConfig.apiKey;

@Component({
  selector: 'app-map-direccion-pedido',
  templateUrl: './map-direccion-pedido.component.html',
  styleUrls: ['./map-direccion-pedido.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonBackButton, IonTitle,
    IonContent, IonButtons,
    IonItem, IonLabel,
    IonIcon, IonButton,
    CommonModule,
    IonFab, IonFabButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapDireccionPedidoComponent  implements OnInit {

  map: GoogleMap;
  transparency: boolean = false;
  myLocation: Place;

  private interactionService: InteractionService = inject(InteractionService)
  private carritoService: CarritoService = inject(CarritoService);

  constructor(private menuController: MenuController,
              private modalController: ModalController,
              private router: Router,
              private route: ActivatedRoute) { }

  ionViewDidEnter() {
    this.menuController.enable(false, 'main');
    this.transparency = true;
    this.initMap();
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'main');
    this.transparency = false;
    this.map?.destroy();
  }

  ngOnInit() {
  }

  async initMap() {

    this.map = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: document.getElementById('map'), // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      language: 'es',
      config: {
        // disableDefaultUI: true,
        // draggable: false,
        center: {
          // The initial position to be rendered by the map
          lat: -2.861306136001268,
          lng: -78.99730914182649
        },
        // tilt: 45,
      
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    });
    // this.map.setMapType(MapType.Satellite);

    // this.map.enableCurrentLocation(true);
    
    if (Capacitor.isNativePlatform()) {
       this.map.enableCurrentLocation(true);
    }
    // this.setMarkerDemo();
    // this.setPlacesDemo();
    // this.addListeners();
    this.setMyLocation();
    this.getQueryParams();
    // this.getCurrentPosition();

  }

  getQueryParams() {
    const queryParams = this.route.snapshot.queryParams as any;
    console.log('queryParams -> ', queryParams);
    if (queryParams.lat && queryParams.lng) {
      this.setMarkerMyPosition( + queryParams.lat, + queryParams.lng)
    }
    
  }

  setMarkerDemo() {
    const marker: Marker = {
      coordinate: {
        lat: -2.9045937,
        lng: -78.9836343,
      }
    }
    this.map.addMarker(marker)
  }

  setPlacesDemo() {
    places.forEach( async (place) => {
      const id = await this.map.addMarker(place.marker);
      place.id = id;
    });
  }

  addListeners() {
    this.map.setOnMapClickListener( res => {
        console.log('MapClickListener -> ', res);
        const marker: Marker = {
          title: 'hola mundo',
          snippet: 'un texto más largo',
          draggable: true,
          coordinate: {
            lat: res.latitude,
            lng: res.longitude,
          }
        }
        this.map.addMarker(marker);
    })

    this.map.setOnInfoWindowClickListener( info =>  {
      console.log('InfoWindowClickListener -> ', info);  
    });

    this.map.setOnMarkerClickListener( marker => {
      console.log('MarkerClickListener -> ', marker);
      const exist = places.find( place => place.id == marker.markerId);
      if (exist) {
        this.showDetailMarker(exist)
      }
    });    
  }

  setMyLocation() {
  
    this.map.setOnMapClickListener( async (res) => {
      console.log('MapClickListener -> ', res);
      this.setMarkerMyPosition(res.latitude, res.longitude)
    })

    this.map.setOnMarkerDragEndListener( marker => {
      console.log('MarkerDragEndListener -> ', marker);
      this.myLocation.marker.coordinate = {
        lat: marker.latitude,
        lng: marker.longitude,
      }
      this.showDetailMarker(this.myLocation);
      this.centerMarkerWithBounds(this.myLocation.marker);
    });

    this.map.setOnMarkerClickListener( marker => {
      console.log('setMyLocation MarkerClickListener -> ', marker);
      if (marker.markerId == this.myLocation.id) {
        this.showDetailMarker(this.myLocation)
      }
    });    

    this.map.setOnMyLocationClickListener( res => {
      console.log('MyLocationClickListener -> ', res);
      this.setMarkerMyPosition(res.latitude, res.longitude)
    });    

    this.map.setOnMyLocationButtonClickListener( res => {
      console.log('MyLocationButtonClickListener -> ', res);
      this.getCurrentPosition();
    });    


  }

  async showDetailMarker(place: Place) {
    const modal = await this.modalController.create({
      component: PlaceDetailComponent,
      componentProps: { place },
      initialBreakpoint: 0.25,
      breakpoints: [0, 0.25]
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data) {
      const place = data.place as Place
      console.log('dismiss modal -> ', data);
      this.carritoService.setCoordenadasPedido(place.marker.coordinate);
      this.router.navigate(['/store/carrito'])
    }
    
  
  }

  async setMarkerMyPosition(latitude: number, longitude: number) {
    if (this.myLocation?.id) {
      this.map.removeMarker(this.myLocation.id)
    }
    this.myLocation = {
      name: 'Mi Ubicación',
      description: 'Enviar pedido a está ubicación',
      marker: {
        title: 'Mi Ubicación',
        snippet: 'Enviar pedido a está ubicación',
        draggable: true,
        coordinate: {
          lat: latitude,
          lng: longitude,
        }
      }
    }
    const id = await this.map.addMarker(this.myLocation.marker);
    this.myLocation.id = id;
    // this.centerMarker(this.myLocation.marker);
    this.centerMarkerWithBounds(this.myLocation.marker);
    this.showDetailMarker(this.myLocation)

  }

  centerMarkerWithBounds(marker: Marker) {
    console.log('centerMarkerWithBounds');
    // desplazamiento
    const des: number = 0.0005;
    const northeast = {
      lat: marker.coordinate.lat + des,
      lng: marker.coordinate.lng + des
    }
    const southwest = {
      lat: marker.coordinate.lat - des,
      lng: marker.coordinate.lng - des
    }
    let bounds = new LatLngBounds({
      southwest: southwest,
      center: marker.coordinate,
      northeast: northeast,
    })
    this.map.fitBounds(bounds, 100)
    
    
  }

  centerMarker(marker: Marker) {
    console.log('centerMarker');
    this.map.setCamera({
        coordinate: marker.coordinate,
        zoom: 16,
        // bearing: 45,
        // angle: 45,
        // animate: true,
        // animationDuration: 1000
    })
    
  }

  async getCurrentPosition() {
    await this.interactionService.showLoading('obteniendo tu ubicación...')
    const check = await Geolocation.checkPermissions();
    console.log('checkPermissions -> ', check);

    if (check.location != 'granted') {
      // solicitar permisos
      if (check.location == 'denied') {
        // no tenemos permisos
        this.interactionService.dismissLoading();
        return;
      }
      if (Capacitor.isNativePlatform()) {
        const response = await Geolocation.requestPermissions({permissions: ['coarseLocation']});
        console.log('requestPermissions response -> ', response);
        if (response.location != 'granted') {
          this.interactionService.dismissLoading();
          return;
        }
      }      
    }
    console.log('obteniendo posición');
    const location = await Geolocation.getCurrentPosition({enableHighAccuracy: true})
    console.log('Current position:', location.coords);
    this.interactionService.dismissLoading();
    this.setMarkerMyPosition(location.coords.latitude, location.coords.longitude)
    
    
  }







}


const places: Place[] = [
  {
    name: 'Lugar A',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?',
    marker: {
      title: 'Lugar A',
      snippet: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?',
      iconUrl: 'assets/icons/moto.png',
      iconSize: {
        width: 35,
        height: 35
      },
      coordinate: {
        lat: -2.90486435760786,
        lng: -78.98343901973725
      }
    },
  },
  {
    name: 'Lugar B',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?',
    marker: {
      title: 'Lugar B',
      snippet: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?',
      iconUrl: 'assets/icons/restaurante.png',
      iconSize: {
        width: 35,
        height: 35
      },
      coordinate: {
        lat: -2.904086729776945,
        lng: -78.98409206727841
      }
    }
  }
];


interface Place {
  id?: string;
  name: string;
  description: string;
  marker: Marker;
}