
import {getFirestore} from "firebase-admin/firestore";
import { getAuth} from "firebase-admin/auth";

import { onCall, HttpsError} from "firebase-functions/v2/https";
import { ModelsFunctions} from "./models";

const firestore = getFirestore();
const auth = getAuth();

export const initAdmin = async () => {

  console.log(' initAdmin ');

  const data: ModelsFunctions.RequestSetRol = {
    roles: {
      admin: true
    },
    uid: 'QlLrD2D7PxZcpEUqeiSx8nRxT4h1'
  }
  const claims = {
    roles: data.roles
  }
  await auth.setCustomUserClaims(data.uid, claims);
  await firestore.doc(`Users/${data.uid}`).update(claims)

  console.log('set claim con éxito');

};

export const setRol = onCall({cors: true}, async (request) => {

    // console.log('setRol user -> ', request.auth.token);

    let valid = false;
    // valid = await isRol(request.auth.uid, ['admin']);
    if (request?.auth?.token) {
        const token: any = request.auth.token    
        // console.log('token ', token);
        if (token.roles) {
          valid = token.roles.admin
        }
        if (valid) {
          
          const data: ModelsFunctions.RequestSetRol = request.data;
          console.log('hacer la funcion -> ', data.uid);
          const claims = {
            roles: data.roles
          }
          await auth.setCustomUserClaims(data.uid, claims);
          await firestore.doc(`Users/${data.uid}`).update(claims)
    
          console.log('set claim con éxito');
          return {ok: true}
    
        } else {
          console.log('hacer la funcion -> ', token.uid);
          const claims = {
            roles: {
              cliente: true
            }
          }
          await auth.setCustomUserClaims(token.uid, claims);
          // await firestore.doc(`Users/${token.uid}`).update(claims)
          console.log('set claim con éxito');
          return {ok: true}
        }
    } 
    throw new HttpsError("permission-denied", "no es admin");
});

export const Users = {
    setRol,
    initAdmin
}
