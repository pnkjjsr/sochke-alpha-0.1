import "firebase/firestore";
import Firebase from "@libs/firebase";

export async function initializeApp() {
  let db = null;
  const firebase = new Firebase();
  await firebase
    .init()
    .then((firebase) => {
      db = firebase.firestore();
    })
    .catch((err) => {
      console.log(err);
    });

  return db;
}

export async function firestore() {
  let db = await initializeApp();

  return db;
}
