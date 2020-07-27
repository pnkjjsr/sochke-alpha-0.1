import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./story.module.scss";

export default class TagStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    const { value } = this.state;

    return <label className={s.tag}>{value}</label>;
  }
}

TagStory.propTypes = {
  value: PropTypes.string.isRequired,
};
