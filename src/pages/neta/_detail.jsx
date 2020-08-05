import React, { Component } from "react";

import s from "./neta.module.scss";

export default class Detail extends Component {
  render() {
    return (
      <div className={s.detail}>
        <div className={s.top}>
          <h1>Narendra Modi</h1>
          <small>Prime Minister</small>
        </div>

        <div className={s.feature}>
          <div className={s.action}>
            <i class="material-icons">expand_less</i>
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
      </div>
    );
  }
}
