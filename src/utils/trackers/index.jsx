import Firebase from "@libs/firebase";

export default function analytics() {
  const firebase = new Firebase();
  firebase
    .init()
    .then((firebase) => {
      firebase.analytics();
    })
    .catch((err) => {
      console.log(err);
    });
}
