import React, { Component } from "react";
import s from "./profile.module.scss";

export default class Info extends Component {
  render() {
    return (
      <div className={s.info}>
        <div className={s.top}>
          <h2 className={s.title}>Varanasi, Ahmedabad</h2>
          <small>Constituency</small>
        </div>

        <div className={s.pointer}>
          <div className={s.item}>
            <div name="Election Year">2019</div>
            <label htmlFor="Election Year">Election</label>
          </div>
          <div className={s.item}>
            <div name="Cases">0</div>
            <label htmlFor="Cases">Cases(s)</label>
          </div>
          <div className={s.item}>
            <div name="Age">68</div>
            <label htmlFor="Age">Age</label>
          </div>
          <div className={s.item}>
            <div name="Assets">2.5Cr</div>
            <label htmlFor="Assets">Assets</label>
          </div>
          <div className={s.item}>
            <div name="Liabilities">0</div>
            <label htmlFor="Liabilities">Liabilities</label>
          </div>
        </div>

        <div className={s.bot}>Information</div>
      </div>
    );
  }
}
