import React, { Component } from "react";
import "firebaseui/dist/firebaseui.css";

import Firebase from "@libs/firebase";

export default class FirebaseUI extends Component {
  componentDidMount() {
    const firebaseui = require("firebaseui");

    let ui = null;
    let firebaseApp = new Firebase();
    firebaseApp
      .init()
      .then((firebase) => {
        if (firebaseui.auth.AuthUI.getInstance()) {
          ui = firebaseui.auth.AuthUI.getInstance();
        } else {
          ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        ui.start("#firebaseui-auth-container", {
          signInSuccessUrl: "/",
          signInFlow: "popup",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          ],
          // Terms of service url.
          tosUrl: "/privacy",
          // Privacy policy url.
          privacyPolicyUrl: "/privacy",
          callbacks: {
            // Called when the user has been successfully signed in.
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              if (authResult.user) {
                // console.log(authResult);
              }
              if (authResult.additionalUserInfo) {
                let checkUser = authResult.additionalUserInfo.isNewUser
                  ? "New User"
                  : "Existing User";
                // console.log(checkUser);
              }
              // Do not redirect.
              // return false;
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return <div id="firebaseui-auth-container"></div>;
  }
}
