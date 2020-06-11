import React, { Component } from "react";
import s from "./test.module.scss";

export default class test extends Component {
  render() {
    return (
      <div className={s.title}>
        test
        <br />
        <button className="btn">check</button>
      </div>
    );
  }
}
