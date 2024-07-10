import { inject, Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { InteractionService } from './interaction.service';
import { LocalNotifications} from '@capacitor/local-notifications';
import { LocalStorageService } from './local-storage.service';
import { User } from '@angular/fire/auth';
import { FirestoreService } from '../firebase/firestore.service';
import { Models } from '../models/models';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsPushService {

  private interactionService: InteractionService = inject(InteractionService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private firestoreService: FirestoreService = inject(  FirestoreService);
  private user: User;
  private enable: boolean = false;

  constructor(private route: Router) { }

  init(user: User) {
    this.user = user;
    if (Capacitor.isNativePlatform()) {
        console.log('Initializing NotificationsPushService');
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
            this.interactionService.presentAlert('Error', 'Debes habilitar las notificaciones')
          }
        });
        this.addListener();
    }
  }

  private addListener() {
            // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        // this.interactionService.presentAlert('Importante', `Registro exitoso, el token es: ${token.value}`);
        this.saveToken(token.value);
        this.enable = true;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
        this.interactionService.presentAlert('Error', `Registro fallido`)
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        // this.interactionService.presentAlert('Notificación', `${JSON.stringify(notification)}`)
        if (Capacitor.getPlatform() == 'android') {
          LocalNotifications.schedule({
            notifications: [
              {
                title: notification.title,
                body: notification.body,
                id: 1,
                extra: {
                  data: notification.data
                },
                sound: "default",
                smallIcon: 'ic_stat_name',
                // iconColor: '#05498C',
                // channelId: 'notification',
              }
            ]
          });
        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        // this.interactionService.presentAlert('Notificación en segundo plano', `${JSON.stringify(notification)}`)
        if (notification?.notification?.data?.enlace) {
          this.route.navigateByUrl(notification.notification.data.enlace)
        }
      }
    );

    LocalNotifications.addListener('localNotificationActionPerformed', 
      (response) => {
        console.log('Click en notificación local -> ', response.notification);
        // this.interactionService.presentAlert('Click en notificación local', `${JSON.stringify(response.notification)}`)
        if (response?.notification?.extra?.data?.enlace) {
          this.route.navigateByUrl(response.notification.extra.data.enlace)
        }
    });
    
  }

  private async saveToken(token: string) {
    const path = 'Token';
    console.log('saveToken -> ', token);
    const data = await this.localStorageService.getData(path);
    console.log('get token saved -> ', data);
    if (data) {
        if (data.token == token) {
          console.log('el token es el mismo');
          return;
        }
    }
    const updateDoc = {
      token
    }
    await this.firestoreService.updateDocument(`${Models.Auth.PathUsers}/${this.user.uid}`, updateDoc);
    console.log('saved token éxito');
    await this.localStorageService.setData(path, updateDoc);  
  }

  async deleteToken() {
    if (this.enable) {
      // del local storage
      const path = 'Token';
      await this.localStorageService.deleteData(path);
      // de firestore
      const updateDoc: any = {
        token: null
      }
      await this.firestoreService.updateDocument(`${Models.Auth.PathUsers}/${this.user.uid}`, updateDoc);
    } 

  }



}
