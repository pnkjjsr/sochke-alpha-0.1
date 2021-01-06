import React, { Component } from "react";

import TwitSmall from "@components/Twit/small";
import TenureSmall from "@components/Tenure/small";
import NetaThumb from "@components/Neta/thumb";

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

        <p className="notice">
          Disclaimer: This information is an archive of the candidate's
          self-declared affidavit that was filed during the elections. The
          current status of this information may be different. For the latest
          available information, please refer to the affidavit filed by the
          candidate to the Election Commission in the most recent election.
        </p>
      </div>
    );
  }
}
