import React, { Component } from "react";

import NetaThumb from "@components/Thumb/neta";

import Feature from "./_feature";
import Info from "./_info";
import s from "@pages/neta/neta.module.scss";

export default class Detail extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className={s.detail}>
        <div className={s.thumb}>
          {!data.imageUrl ? (
            ""
          ) : (
            <NetaThumb
              // name="Narendra Modi"
              src={data.imageUrl}
              name={data.name}
              like="999"
            />
          )}
        </div>

        <div className={s.top}>
          <h1>{data.name}</h1>
          <small>{data.title}</small>
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
