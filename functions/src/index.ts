/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {initializeApp} from "firebase-admin/app";
initializeApp();

import { Users } from "./users";

export const setRol = Users.setRol;
export const newUser = Users.newUser

// Users.initAdmin();

import { Notifications } from "./notificacions";

const message = {
    title: `Demo notification`,
    content: `Desde functions`,
    image: 'https://firebasestorage.googleapis.com/v0/b/busetamap.appspot.com/o/PhotosPerfil%2F2yzK7aX1n4aNS0Kd8R80V8HWjsw1%2Ficon-5887113_1280.png?alt=media&token=f91ab0e1-4951-457d-9ad7-5b5cbc60b2b7'
}
const tokens = ['ebEBxLY2Ra6dvFcFDiHQO5:APA91bHbFeXA2mSHxSVy9qgXq75Dc81yU00dtrIoIN3qgiSluN-W2HB57IfDrn9h74SgF6duKuN6bsxSdD3_WTrJQHPIsTXfzLI4asR-S7HfrO6sg-WLGcR0XT0JjmRh2Q4BXwplYDXP']
const data = {
    enlace: '/store/pedidos',
};
Notifications.sendNotificationPush(tokens, message, data)


import { Store } from "./store";
export const newPedido = Store.newPedido;
export const cambioEstadoPedido = Store.cambioEstadoPedido

// setTimeout(() => {
    // Store.createPedidoDemo();
// }, 3000);