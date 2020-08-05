import React, { Component } from "react";
import s from "./small.module.scss";

export default class TwitSmall extends Component {
  render() {
    return (
      <div className={s.twit}>
        <figure>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Ftwitter.svg?alt=media&token=6ba77c09-c983-4a31-9b4f-1090a4bae1b2"
            alt="twitter logo"
          />
        </figure>
        <p>
          Felicitations to my dear friend @EmmanuelMacron and the friendly
          people of Fra...
        </p>
      </div>
    );
  }
}
