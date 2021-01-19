import React, { Component } from "react";

import CommonBack from "@components/Common/back";
import ShareComponent from "@components/Social/share";

import s from "./neta.module.scss";

export default class Bottom extends Component {
  render() {
    return (
      <div className={s.bottom}>
        <CommonBack />

        <div className={s.action}>
          <ShareComponent data={this.props.data} />
        </div>
      </div>
    );
  }
}
