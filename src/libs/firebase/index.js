import * as firebase from "firebase/app";
import firebaseConfig from "@configs/firebaseConfig";
export default class Firebase {
  init() {
    return new Promise((resolve, reject) => {
      if (!firebase.apps.length) {
        let firebaseApp = firebase.initializeApp(firebaseConfig);
        resolve(firebaseApp.firebase_);
      }
      else {
        let firebaseApp = firebase.app();
        resolve(firebaseApp.firebase_);
      }
    });
  }
}
