import { MulticastMessage, getMessaging } from "firebase-admin/messaging";

const messaging = getMessaging()


const sendNotificationPush = async (tokens: string[], message: {title: string, content: string, image?: string}, data: any = {}, tag: string = null) => {

    console.log('sendNotification push');
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

export const Notifications = {
    sendNotificationPush
}




