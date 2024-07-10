import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { AllNotificationsComponent } from '../all-notifications/all-notifications.component';
import { NotificationsService } from '../../notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button-notifications',
  templateUrl: './button-notifications.component.html',
  styleUrls: ['./button-notifications.component.scss'],
})
export class ButtonNotificationsComponent  implements OnInit, OnDestroy {

  notificationsService: NotificationsService = inject(NotificationsService)
  count = signal(0);
  suscriberCount: Subscription;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.getNewNotifications();
  }

  ngOnDestroy(): void {
    this.suscriberCount?.unsubscribe();
  }

  async openAllNotifications() {
    const modal = await this.modalController.create({
      component: AllNotificationsComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    await modal.present();
  }

  getNewNotifications() {
    this.count.set(this.notificationsService.getCount());
    this.suscriberCount = this.notificationsService.getCountChanges().subscribe( res => {
      this.count.set(res);
    });
  }

}
