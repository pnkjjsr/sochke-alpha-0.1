import React, { Component } from "react";

import s from "./logo.module.scss";

export default class Logo extends Component {
  render() {
    return (
      <div className={s.logo}>
        Sochke
        <span>alpha 0.1</span>
      </div>
    );
  }
}
