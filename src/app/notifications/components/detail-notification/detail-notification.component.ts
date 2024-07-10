import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Models } from 'src/app/models/models';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.scss'],
})
export class DetailNotificationComponent  implements OnInit {

  private notificationsService: NotificationsService = inject(NotificationsService)
  @Input() notification: Models.Notifications.Notification;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async view() {
    this.modalController.dismiss();
    this.notificationsService.view(this.notification);
  }

  async delete() {
    this.notificationsService.delete(this.notification);
  }

}
