import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import s from "./open.module.scss";

export default class SocialComponent extends Component {
  render() {
    return (
      <div className={s.social}>
        <IconButton
          className={s.facebook}
          size="small"
          aria-label="facebook"
          href="https://www.facebook.com/sochkeApp"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          className={s.twitter}
          size="small"
          aria-label="twitter"
          href="https://www.twitter.com/sochkeApp"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          className={s.linkedin}
          size="small"
          aria-label="linkedin"
          href="https://www.linkedin.com/company/sochke"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon />
        </IconButton>
      </div>
    );
  }
}
