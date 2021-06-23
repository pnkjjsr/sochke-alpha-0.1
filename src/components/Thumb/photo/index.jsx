import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./photo.module.scss";

export default class PhotoThumb extends Component {
  renderImage = () => {
    const { src, name, like } = this.props;

    if (!src) return <i className="material-icons">person</i>;
    else return <img src={src} alt={name} title={name} />;
  };

  render() {
    const { src, name, like } = this.props;

    return <figure className={s.thumb}>{this.renderImage()}</figure>;
  }
}

// PhotoThumb.propTypes = {
//   src: PropTypes.string.isRequired,
// };
