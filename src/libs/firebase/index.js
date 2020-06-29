import * as firebase from "firebase/app";
import firebaseConfig from "@configs/firebaseConfig";

export default class Firebase {
  init() {
    return new Promise((resolve, reject) => {
      if (!firebase.apps.length) {
        let res = firebase.initializeApp(firebaseConfig);
        resolve(res);
      }
    });
  }
}
