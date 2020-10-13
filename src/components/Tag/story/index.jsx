import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./story.module.scss";

export default class TagStory extends Component {
  render() {
    const { value } = this.props;

    return <label className={s.tag}>{value}</label>;
  }
}

TagStory.propTypes = {
  value: PropTypes.string.isRequired,
};
