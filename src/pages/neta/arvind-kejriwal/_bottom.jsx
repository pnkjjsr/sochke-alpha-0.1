import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";

import CommonBack from "@components/Common/back";

import s from "./neta.module.scss";

export default class Bottom extends Component {
  render() {
    return (
      <div className={s.bottom}>
        <CommonBack />

        <div className={s.action}>
          <IconButton size="small" aria-label="share">
            <ShareIcon /> <label htmlFor="share">Share</label>
          </IconButton>
        </div>
      </div>
    );
  }
}
