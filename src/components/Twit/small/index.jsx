import React, { Component } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import s from "./small.module.scss";

export default class TwitSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.color,
    };
  }

  render() {
    const { color } = this.state;

    let theme = "";
    if (color == "white") theme = s.white;

    return (
      <div className={`${s.twit} ${theme}`}>
        <figure>
          <TwitterIcon />
        </figure>
        <p>
          Felicitations to my dear friend @EmmanuelMacron and the friendly
          people of Fra...
        </p>
      </div>
    );
  }
}
