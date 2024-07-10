import { MulticastMessage, getMessaging } from "firebase-admin/messaging";
import { ModelsFunctions } from "./models";
import { getFirestore } from "firebase-admin/firestore";

const messaging = getMessaging()
const firestore = getFirestore();

const sendNotificationPush = async (tokens: string[], message: {title: string, content: string, image?: string}, data: any = {}, tag: string = null) => {

    console.log('sendNotification push -> ', tokens.length);
    const multicastMessage: MulticastMessage = {
        tokens,
        data,
        notification: {
            title: message.title,
            body: message.content
        },
        android: {
            collapseKey: '2',
            notification: {
                // icon: 'ic_stat_name',
                color: '#05498C',
                priority: 'max',
                // sticky: true,
                visibility: 'public',
                // icon: message.image ? message.image : '',
                // defaultVibrateTimings: false,
                // defaultSound: true,
                // sound:"default",
                // channelId: 'notification'
            } 
        },
        apns: {
            payload: {
                aps: {
                    sound: {
                        critical: true,
                        name: 'default',
                        volume: 1,
                    },
                    // badge: 1,
                }
            }
        }

    }

    if (message.image) {
        multicastMessage.notification.imageUrl = message.image;
    }
    if (tag) {
        multicastMessage.android.notification.tag = tag;
        multicastMessage.apns.payload.aps.threadId = tag;
    }

    return await messaging.sendEachForMulticast(multicastMessage);
};

const sendNotificationApp = async (uids: string[], notification: ModelsFunctions.NotificationApp) => {
    console.log('sendNotificationApp');
    for (let index = 0; index < uids.length; index++) {
        const uid = uids[index];
        const path = `Users/${uid}/notificaciones`;
        notification.date = new Date();
        const doc = firestore.collection(path).doc();
        notification.id = doc.id;
        await doc.create(notification);
    }
    console.log('success send notification app');
};

const createNotificationDemo = (numero: number, icono: string, color: string) => {
    console.log('createNotificationDemo');
    const demo: ModelsFunctions.NotificationApp = {
      titulo: 'Notificación demo from functions' + numero,
      descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur accusamus a ut explicabo molestiae, aspernatur iure laborum voluptates, aperiam culpa iste aut quis officiis praesentium alias obcaecati. Nam, unde minus!',
      enlace: '/store/pedido/m0VgT4aAWFZGMnUBIMoz',
      icono,
      color,
      state: 'nueva'
    }
    sendNotificationApp(['xe9yPCGoG9WjMzBPYmiGlGWmYXx2'], demo,);
}

export const Notifications = {
    sendNotificationPush,
    sendNotificationApp,
    createNotificationDemo
}




