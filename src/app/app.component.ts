import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, 
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, 
  IonButtons, IonMenuButton, IonIcon,
  Platform} from '@ionic/angular/standalone';
import { IoniconsService } from './services/ionicons.service';
import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonButtons, IonContent, IonTitle, IonToolbar, IonHeader, 
    IonSplitPane, IonApp, IonRouterOutlet,
    IonMenu, IonMenuButton, IonIcon,
    SidemenuComponent
  ],
})
export class AppComponent {

  private ioniconsService: IoniconsService = inject(IoniconsService)

  constructor(private platform: Platform) {
      this.ioniconsService.loadAllIcons();
      this.initializeApp()
  }

  async initializeApp() {
    await this.platform.ready();
    if (this.platform.is('capacitor')) {
      SplashScreen.hide()
    }
  }



}
