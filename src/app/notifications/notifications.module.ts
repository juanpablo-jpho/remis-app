import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonNotificationsComponent } from './components/button-notifications/button-notifications.component';
import { DetailNotificationComponent } from './components/detail-notification/detail-notification.component';
import { AllNotificationsComponent } from './components/all-notifications/all-notifications.component';
import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { DatefirePipe } from '../shared/pipes/datefire.pipe';

@NgModule({
  declarations: [
    ButtonNotificationsComponent,
    DetailNotificationComponent,
    AllNotificationsComponent
  ],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonIcon,
    IonButton, IonButtons, IonText,
    RouterModule, IonRouterLink,
    DatefirePipe,
    IonItemSliding, IonItemOption, IonItemOptions,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonCard
  ],
  exports: [
    ButtonNotificationsComponent
  ]
})
export class NotificationsModule { }
