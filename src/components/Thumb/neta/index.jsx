import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./thumb.module.scss";

export default class NetaThumb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      src: "",
      like: "",
    };
  }

  renderImage = () => {
    const { src, name } = this.state;

    if (!src) return <i className="material-icons">person</i>;
    else return <img src={src} alt={name} />;
  };

  componentDidMount() {
    const { src, name, like } = this.props;
    this.setState({
      name: name,
      src: src,
    });
  }

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
  // name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
