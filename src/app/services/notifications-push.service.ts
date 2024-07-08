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
import { AuthenticationService } from '../firebase/authentication.service';
import { User } from '@angular/fire/auth';
import { FirestoreService } from '../firebase/firestore.service';
import { Models } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsPushService {

  private interactionService: InteractionService = inject(InteractionService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private firestoreService: FirestoreService = inject(  FirestoreService);
  user: User;

  constructor() { }

  init() {

    this.authenticationService.authState.subscribe( user => {
        if (user) {
          this.user = user;
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
    });


  }

  private addListener() {
            // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        // this.interactionService.presentAlert('Importante', `Registro exitoso, el token es: ${token.value}`);
        this.saveToken(token.value);
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
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        this.interactionService.presentAlert('Notificación en segundo plano', `${JSON.stringify(notification)}`)
      }
    );

    LocalNotifications.addListener('localNotificationActionPerformed', 
      (response) => {
        console.log('Click en notificación local -> ', response.notification);
        this.interactionService.presentAlert('Click en notificación local', `${JSON.stringify(response.notification)}`)
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



}