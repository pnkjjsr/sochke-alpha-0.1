import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";

import Firebase from "@libs/firebase";

export default class FirebaseAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          ],
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
