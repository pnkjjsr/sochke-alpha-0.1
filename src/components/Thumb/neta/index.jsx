import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./thumb.module.scss";

export default class NetaThumb extends Component {
  renderImage = () => {
    const { src, name, like } = this.props;

    if (!src) return <i className="material-icons">person</i>;
    else return <img src={src} alt={name} title={name} />;
  };

  render() {
    const { src, name, like } = this.props;

    return (
      <div className={s.thumb}>
        <figure>{this.renderImage()}</figure>
        <figcaption>{name}</figcaption>
      </div>
    );
  }
}

NetaThumb.propTypes = {
  // name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
