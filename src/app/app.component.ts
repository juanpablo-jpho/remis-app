import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, 
  IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, 
  IonButtons, IonMenuButton, IonIcon } from '@ionic/angular/standalone';
import { IoniconsService } from './services/ionicons.service';
import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
import { NotificationsPushService } from './services/notifications-push.service';
import { Capacitor } from '@capacitor/core';

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

  constructor(private notificationsPushService: NotificationsPushService) {

      this.ioniconsService.loadAllIcons();
      this.init()

  }

  init() {
    if (Capacitor.isNativePlatform()) {
        this.notificationsPushService.init();
    }
  }


}
