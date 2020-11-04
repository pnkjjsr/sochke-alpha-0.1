import React, { Component } from "react";
import Link from "next/link";

import s from "./logo.module.scss";

export default class Logo extends Component {
  render() {
    return (
      <div className={s.logo}>
        <Link href="/">
          <a>Sochke</a>
        </Link>
        <span>alpha 0.1</span>
      </div>
    );
  }
}
