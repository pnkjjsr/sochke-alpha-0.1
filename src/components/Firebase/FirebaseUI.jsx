import React, { Component } from "react";
import "firebaseui/dist/firebaseui.css";

import Firebase from "@libs/firebase";
import { postNewUser } from "@libs/firebase/signup";
import { AuthContext } from "@contexts/Auth";
import { service } from "@utils/api";

import { login } from "@utils/session";

export default class FirebaseUI extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const { setProfile, setAuthenticated } = this.context;

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
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            "yahoo.com",
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            {
              provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
              defaultCountry: "IN",
            },
          ],
          // Terms of service url.
          tosUrl: "/privacy",
          // Privacy policy url.
          privacyPolicyUrl: "/privacy",
          callbacks: {
            // Called when the user has been successfully signed in.
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              let isNewUser = authResult.additionalUserInfo.isNewUser;
              let user = authResult.user.providerData[0];

              if (authResult.additionalUserInfo.providerId == "phone") {
                user.signupType = "phone";
              }

              setAuthenticated(true);
              setProfile(user);

              login(authResult.user.uid);

              if (isNewUser) {
                postNewUser(user, authResult.user.uid);

                const emailData = {
                  email: user.email,
                  type: "new-user",
                };

                service
                  .post("/subscribe", emailData)
                  .then((res) => {
                    // console.log(res);
                  })
                  .catch((err) => {
                    // console.log(err);
                  });
              } else {
                // console.log("Existing User");
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
