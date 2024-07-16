import { inject, Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';
import { AuthenticationService } from '../firebase/authentication.service';
import { User } from '@angular/fire/auth';
import { Models } from '../models/models';
import { Subject, Subscription } from 'rxjs';
import { InteractionService } from '../services/interaction.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private interactionService: InteractionService = inject(InteractionService);
  private user: User;

  notifications: Models.Notifications.Notification[];
  notifications$ = new Subject<Models.Notifications.Notification[]>;
  private numItems: number = 6;
  enableMore: boolean = true;
  private subscribersNotifications: Subscription[] = [];

  count: number = 0;
  count$ = new Subject<number>;

  constructor() { 
        this.authenticationService.authState.subscribe( user => {
          if (user) {
            this.user = user;
            console.log('user -> ', user.uid);
            this.getMoreNotifications();
            this.getNewCount();
          }
        });
  }

  getMoreNotifications(event: any = null) {
    const path = `${Models.Auth.PathUsers}/${this.user.uid}/${Models.Notifications.pathNotificaciones}`;
    const query: Models.Firestore.whereQuery[] = [[]];
    const extras: Models.Firestore.extrasQuery = {
      limit: this.numItems,
      orderParam: 'date',
      directionSort: 'desc',
      group: false
    }

    if (this.notifications?.length) {
      const last = this.notifications[ this.notifications.length - 1 ];
      extras.startAfter = new Date(last.date.seconds * 1000 );
      console.log('extras.startAfter -> ', extras.startAfter);
      
    }

    // crear regla e indices
    const subscriberNotifications = this.firestoreService.getDocumentsQueryChanges<Models.Notifications.Notification>(path, query, extras).subscribe( res => {
      console.log('loadNotifications changes -> ', res);

      let news: boolean = false;

      if (res.length) {
        if (this.notifications) {
          res.forEach ( notificationLoad => {
            const index = this.notifications.findIndex( notification => notification.id == notificationLoad.id);
            if (index >= 0) {
              this.notifications[index] = notificationLoad
            } else {
              this.notifications.push(notificationLoad);
              news = true;
            }
          });
        } 
      } 

      if (!this.notifications) {
        this.notifications = res;
      }

      // ordenar por fecha 
      this.notifications.sort((a, b) => b.date?.seconds - a.date?.seconds); 

  
      if (res.length == this.numItems) {
        this.enableMore = true;
      } else {
        this.enableMore = false;
      }

      if (event) {
        event.target.complete();
      }

      console.log('this.enableMore -> ', this.enableMore);
      

      if (!event && news) {
        // getNewCount
        console.log('getNewCount');
        this.getNewCount();
        
      }

      this.notifications$.next(this.notifications);
      
    });
    this.subscribersNotifications.push(subscriberNotifications);
  }

  getNotications() {
    return this.notifications;
  }

  getNoticationsChanges() {
    return this.notifications$.asObservable();
  }

  async view(notification: Models.Notifications.Notification) {
    if (notification.state == 'nueva') {
      const path = `${Models.Auth.PathUsers}/${this.user.uid}/${Models.Notifications.pathNotificaciones}/${notification.id}`;
      const updateData = {
        state: 'vista'
      }
      this.count --;
      this.count$.next(this.count);
      // crear regla de actualización
      await this.firestoreService.updateDocument(path, updateData);
    }
  }

  async delete(notification: Models.Notifications.Notification) {
    console.log('delete -> ', notification);
    const response = await this.interactionService.presentAlert('Importante', 
            '¿Seguro que desea eliminar esta notificación?', 'Cancelar', 'Ok');
    if (response) {
      const path = `${Models.Auth.PathUsers}/${this.user.uid}/${Models.Notifications.pathNotificaciones}/${notification.id}`;
      // crear regla de eliminacion
      this.firestoreService.deleteDocument(path);
      const index = this.notifications.findIndex( notifitionExist => notifitionExist.id == notification.id);
      if (index >= 0 ) {
        this.notifications.splice(index, 1);
        this.notifications$.next(this.notifications);
      }
      if (notification.state == 'nueva') {
        this.count --;
        this.count$.next(this.count);
      }
    }
    
  }


  async getNewCount() {
    console.log('call getNewCount');
    const path = `${Models.Auth.PathUsers}/${this.user.uid}/${Models.Notifications.pathNotificaciones}`;
    const response = await this.firestoreService.getCountOneQuery(path, 'state', '==', 'nueva');
    this.count = response;
    this.count$.next(this.count);
  }

  getCount() {
    return this.count;
  }

  getCountChanges() {
    return this.count$.asObservable();
  }
    



}
