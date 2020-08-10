import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import TwitSmall from "@components/Twit/small";
import TenureSmall from "@components/Tenure/small";

import s from "./neta.module.scss";

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
        <div className={s.top}>
          <h1>Profiel | Narendra Modi</h1>
          <small>Prime Minister</small>
        </div>

        <div className={s.middle}>
          <div className={s.feature}>
            <div className={s.action}>
              <i className="material-icons" onClick={this.handleCollapse}>
                {t_expand}
              </i>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fupward.svg?alt=media&token=735498ef-0ed1-430b-a8d4-11d81e7bd29b"
                alt="upward-shape"
              />
            </div>

            <div className={s.item}>
              <div name="achievement">28</div>
              <label htmlFor="achievement">Achievement</label>
            </div>

            <div className={s.item}>
              <div name="work">15</div>
              <label htmlFor="work">Work</label>
            </div>

            <div className={s.symbol}>
              <figure>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fparty%2Fbjp.svg?alt=media&token=2ba59de4-f0ae-486a-b899-560df15a86ab"
                  alt="BJP Symbols"
                />
              </figure>
            </div>
          </div>

          <div className={s.display}>
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

            <div className={s.action}>
              <Button variant="contained" color="secondary" size="small">
                More Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
