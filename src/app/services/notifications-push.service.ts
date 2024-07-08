import { inject, Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsPushService {

  private interactionService: InteractionService = inject(InteractionService)

  constructor() { }

  init() {
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

  private addListener() {
            // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        this.interactionService.presentAlert('Importante', `Registro exitoso, el token es: ${token.value}`)
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
        this.interactionService.presentAlert('Notificación', `${JSON.stringify(notification)}`)
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        this.interactionService.presentAlert('Notificación en segundo plano', `${JSON.stringify(notification)}`)
      }
    );
    
  }



}
