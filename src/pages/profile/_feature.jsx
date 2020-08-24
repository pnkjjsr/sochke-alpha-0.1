import React, { Component, Fragment } from "react";

import TextMobileStepper from "./_stepper";
import s from "./profile.module.scss";

export default class Feature extends Component {
  render() {
    return (
      <>
        <div className={s.feature}>
          <div className={`${s.item} ${s.active}`}>
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

        <div className={s.achievement}>
          <TextMobileStepper />
        </div>
      </>
    );
  }
}
