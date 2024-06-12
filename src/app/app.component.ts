import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IoniconsService } from './services/ionicons.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  private ioniconsService: IoniconsService = inject(IoniconsService)

  constructor() {

      this.ioniconsService.loadAllIcons();

  }


}
