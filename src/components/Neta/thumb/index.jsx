import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./thumb.module.scss";

export default class NetaThumb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      src: this.props.src,
      like: this.props.like,
    };
  }

  renderImage = () => {
    const { src } = this.state;

    if (!src) return <i className="material-icons">person</i>;
    else return <img src={src} alt={name} />;
  };

  render() {
    const { name, src, like } = this.state;

    return (
      <div className={s.thumb}>
        <figure>{this.renderImage()}</figure>
        <figcaption>{name}</figcaption>
      </div>
    );
  }
}

NetaThumb.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
