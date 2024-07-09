import {getFirestore} from "firebase-admin/firestore";
import { Notifications } from "./notificacions";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import { ModelsFunctions } from "./models";

const firestore = getFirestore();


export const newPedido = onDocumentCreated("Users/{userId}/pedidos/{pedidoId}", async (event) => {
      console.log('newPedido -> ', event.params.userId);
      const pedido = event.data.data() as ModelsFunctions.Pedido;
      // obtener todos los admins para enviarles una notificación
      const response = await firestore.collection('Users').where('roles.admin', '==', true).get()
      if (response.size) {
        console.log('admins -> ', response.size);
        const tokens: string[] = [];
        for (let index = 0; index < response.docs.length; index++) {
            const element = response.docs[index];
            const data = element.data() as ModelsFunctions.UserProfile;
            // send notification    
            console.log('send notification -> ', data.id);
            if (data.token) {
              tokens.push(data.token);
            }
        }
        const notificationPush: ModelsFunctions.NotificationPush = {
          tokens,
          message: {
              title: 'Nuevo pedido',
              content: `De ${pedido.info.datos.name}, por un valor de $${pedido.carrito.total}`
          },
          data: {
            enlace: '/backoffice/pedidos'
          }
        }
        const responseNotifications = await Notifications.sendNotificationPush(notificationPush.tokens, 
                                           notificationPush.message, 
                                          notificationPush.data);
        console.log('success notifications -> ', responseNotifications.successCount);
      }
      return;
});

export const cambioEstadoPedido = onDocumentUpdated("Users/{userId}/pedidos/{pedidoId}", async (event) => {
  console.log('cambioEstadoPedido');
  const pedidoBefore = event.data.before.data() as ModelsFunctions.Pedido;
  const pedidoAfter = event.data.after.data() as ModelsFunctions.Pedido;
  // console.log('pedidoBefore -> ', pedidoBefore);
  // console.log('pedidoAfter -> ', pedidoAfter);
  if (pedidoBefore.state != pedidoAfter.state) {
    // notificar al usuario que ha cambiado el estado de su pedido
    // obtener el token del usuario
    const tokens: string[] = [];
    const response = await firestore.doc(`Users/${event.params.userId}`).get();
    console.log('user exists -> ', response.exists);
    if (response.exists) {
      const data = response.data() as ModelsFunctions.UserProfile;
      if (data.token) {
        tokens.push(data.token);
      }
      const notificationPush: ModelsFunctions.NotificationPush = {
        tokens,
        message: {
            title: `Pedido: ${pedidoAfter.state.toUpperCase()}`,
            content: `Hola ${pedidoAfter.info.datos.name}, tu pedido ha cambiado de estado a ${pedidoAfter.state}`
        },
        data: {
          enlace: `/store/pedido/${event.params.pedidoId}`
        },
        tag: event.params.pedidoId
      }
      // if (pedidoAfter.state == 'en camino') {
      // }
      const responseNotifications = await Notifications.sendNotificationPush(notificationPush.tokens, 
                                          notificationPush.message, 
                                          notificationPush.data,
                                          notificationPush.tag);
      console.log('success notifications -> ', responseNotifications.successCount);
    }
  }
  return;
});

export const createPedidoDemo = async () => {
  console.log('createPedidoDemo');
  const uid = 'wAPVEashEWRZsVhJ2yW1';
  const path = `Users/${uid}/pedidos`;
  const pedidoDemo = {
     info: {
      datos: { name: 'Demo cliente'},
    },
    carrito: {total: 40}
  }
  await firestore.collection(path).add(pedidoDemo);
  console.log('pedido demo creado con éxito'); 
};

export const Store = {
  newPedido,
  createPedidoDemo,
  cambioEstadoPedido
}