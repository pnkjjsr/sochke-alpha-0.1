import React, { Component } from "react";

import NetaThumb from "@components/Thumb/neta";

import Feature from "./_feature";
import Info from "./_info";
import s from "./neta.module.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumb: "",
      name: "",
      title: "",
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      thumb: data.imageUrl,
      name: data.name,
      title: data.title,
    });
  }

  render() {
    const { data } = this.props;
    const { thumb, name, title } = this.state;

    return (
      <div className={s.detail}>
        <div className={s.thumb}>
          {!thumb ? (
            ""
          ) : (
            <NetaThumb
              // name="Narendra Modi"
              src={thumb}
              name={name}
              like="999"
            />
          )}
        </div>

        <div className={s.top}>
          <h1>{name}</h1>
          <small>{title}</small>
        </div>

        <Feature data={data} />

        <Info data={data} />

        {/* <TwitSmall /> */}

        {/* <TenureSmall
          title="Prime Minister Of India"
          start={2019}
          end={2020}
          value={20}
        /> */}
      </div>
    );
  }
}
