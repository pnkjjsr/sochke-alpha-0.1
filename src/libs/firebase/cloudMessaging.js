import "firebase/messaging";
import localforage from "localforage";

import Firebase from "@libs/firebase";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function () {
    const firebaseLibs = new Firebase();
    await firebaseLibs
      .init()
      .then(async (firebase) => {
        if ((await this.tokenInlocalforage()) !== null) {
          return false;
        }

        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();

        localforage.setItem("fcm_token", token);
        console.log("fcm_token", token);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export { firebaseCloudMessaging };
