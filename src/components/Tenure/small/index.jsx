import React, { Component } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";

import s from "./small.module.scss";

export default class TenureSmall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      start: this.props.start,
      end: this.props.end,
      value: this.props.value,
      color: this.props.color,
    };
  }

  render() {
    const { title, start, end, value, color } = this.state;

    let theme = "";
    if (color == "white") theme = s.white;

    return (
      <div className={`${s.tenure} ${theme}`}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.bar}>
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={value}
          />
        </div>

        <div className={s.year}>
          <label htmlFor="2019">{start}</label>
          <label htmlFor="2020">{end}</label>
        </div>
      </div>
    );
  }
}

TenureSmall.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
