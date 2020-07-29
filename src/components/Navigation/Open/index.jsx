import React, { Component } from "react";
import Link from "next/link";

import SocialComponent from "./_socialComponent";

import s from "./open.module.scss";

export default class Open extends Component {
  render() {
    return (
      <div className={s.nav}>
        <div className={s.top}>
          <figure>
            <img src="/graphics/icon-57.png" alt="Sochke Logo" />
          </figure>
          <figcaption>Sochke</figcaption>
        </div>

        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/story">
              <a>Story</a>
            </Link>
          </li>
        </ul>

        <div className={s.bot}>
          <SocialComponent />
          <div className={s.copy}>Sochke © 2019-2020 </div>
        </div>
      </div>
    );
  }
}
