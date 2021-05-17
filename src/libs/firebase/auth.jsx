import "firebase/auth";

import Firebase from "@libs/firebase";

export default class firebaseAuth {
  currentUser = () => {
    return new Promise((resolve, reject) => {
      let firebaseLibs = new Firebase();
      firebaseLibs
        .init()
        .then((firebase) => {
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              resolve(user);
            } else {
              // console.log("Non loggedIn user");
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
