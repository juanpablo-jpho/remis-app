import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from '../../notifications.service';
import { Models } from 'src/app/models/models';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss'],
})
export class AllNotificationsComponent  implements OnInit, OnDestroy {

  notificationsService: NotificationsService = inject(NotificationsService)
  notifications: Models.Notifications.Notification[];
  private subscribersNotifications: Subscription;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribersNotifications?.unsubscribe();
  }

  loadNotifications() {
      this.notifications = this.notificationsService.getNotications();
      this.subscribersNotifications = this.notificationsService.getNoticationsChanges().subscribe( res => {
          this.notifications = res;
          // console.log('this.notifications -> ', this.notifications);
          
      })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  loadMore(ev: any) {
    console.log('loadmore');
    this.notificationsService.getMoreNotifications(ev)
  }



  

}
