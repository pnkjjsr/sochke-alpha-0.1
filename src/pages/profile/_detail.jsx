import React, { Component } from "react";

import TwitSmall from "@components/Twit/small";
import TenureSmall from "@components/Tenure/small";
import NetaThumb from "@components/Neta/thumb";

import Feature from "./_feature";
import Info from "./_info";
import s from "./profile.module.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={s.detail}>
        <div className={s.thumb}>
          <NetaThumb
            // name="Narendra Modi"
            src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Fnarendra-modi.png?alt=media&token=afe4e029-512c-462c-a56e-5fa80cc0e991"
            name="Narendra Modi"
            like="999"
          />
        </div>

        <div className={s.top}>
          <h1>Narendra Modi</h1>
          <small>Prime Minister</small>
        </div>

        <Feature />

        <Info />

        <TwitSmall />

        <TenureSmall
          title="Prime Minister Of India"
          start={2019}
          end={2020}
          value={20}
        />
        <TenureSmall
          title="Prime Minister Of India"
          start={2014}
          end={2019}
          value={100}
        />
      </div>
    );
  }
}
