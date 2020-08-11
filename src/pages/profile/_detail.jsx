import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import TwitSmall from "@components/Twit/small";
import TenureSmall from "@components/Tenure/small";
import NetaThumb from "@components/Neta/thumb";

import s from "./profile.module.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d_collapse: s.hide,
      t_expand: "expand_less",
    };
  }

  handleCollapse = () => {
    const { d_collapse } = this.state;
    if (d_collapse == s.hide) {
      this.setState({
        d_collapse: s.show,
        t_expand: "expand_more",
      });
    } else {
      this.setState({
        d_collapse: s.hide,
        t_expand: "expand_less",
      });
    }
  };

  render() {
    const { d_collapse, t_expand } = this.state;

    return (
      <div className={`${s.detail} ${d_collapse}`}>
        <div className={s.thumb}>
          <NetaThumb
            // name="Narendra Modi"
            src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Fnarendra-modi.png?alt=media&token=afe4e029-512c-462c-a56e-5fa80cc0e991"
            like="999"
          />
        </div>

        <div className={s.top}>
          <h1>Narendra Modi</h1>
          <small>Prime Minister</small>
        </div>

        <div className={s.middle}>
          <div className={s.feature}>
            <div className={s.item}>
              <div name="achievement">28</div>
              <label htmlFor="achievement">Achievement</label>
            </div>

            <div className={s.item}>
              <div name="work">15</div>
              <label htmlFor="work">Work</label>
            </div>

            <div className={s.item}>
              <div className={s.symbol}>
                <figure>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fparty%2Fbjp.svg?alt=media&token=2ba59de4-f0ae-486a-b899-560df15a86ab"
                    alt="BJP Symbols"
                  />
                </figure>
              </div>

              <label htmlFor="work">BJP</label>
            </div>
          </div>

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
      </div>
    );
  }
}
