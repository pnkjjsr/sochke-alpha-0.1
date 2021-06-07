import React, { Component } from "react";
import stringModifier from "@utils/modifier/string";

import s from "@pages/neta/neta.module.scss";

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: "",
      liability: "",
      education: "",
      type: "",
      constituency: "",
      year: "",
      cases: "",
      age: "",
    };
  }

  componentDidMount() {
    const { data } = this.props;

    this.setState({
      asset: data.asset,
      liability: data.liability,
      education: data.education,
      type: data.type,
      constituency: data.constituency,
      year: data.year,
      cases: data.cases,
      age: data.age,
    });
  }

  render() {
    const { asset, liability, education, constituency, year, cases, age } =
      this.state;
    const string = new stringModifier();

    //let assets = string.currencyFormat(asset);
    let assetsCompact = string.currencyFormatCompact(asset);
    //let liabilities = string.currencyFormat(liability);
    let liabilitiesCompact = string.currencyFormatCompact(liability);
    let edu = string.tillFirstCommaString(education);

    return (
      <div className={s.info}>
        <div className={s.top}>
          <h2 className={s.title}>{constituency}</h2>
          <small>Constituency</small>
        </div>

        <div className={s.pointer}>
          <div className={s.item}>
            <div name="Election Year">{year}</div>
            <label htmlFor="Election Year">Election</label>
          </div>
          <div className={s.item}>
            <div name="Cases">{cases}</div>
            <label htmlFor="Cases">Cases(s)</label>
          </div>
          <div className={s.item}>
            <div name="Age">{age}</div>
            <label htmlFor="Age">Age</label>
          </div>
          <div className={s.item}>
            <div name="Assets">{assetsCompact}</div>
            <label htmlFor="Assets">Assets</label>
          </div>
          <div className={s.item}>
            <div name="Liabilities">{liabilitiesCompact}</div>
            <label htmlFor="Liabilities">Liabilities</label>
          </div>
        </div>

        <div className={s.bot}>Information</div>
      </div>
    );
  }
}
