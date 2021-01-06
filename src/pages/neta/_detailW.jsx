import React, { Component } from "react";
import router from "next/router";
import Button from "@material-ui/core/Button";

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
      d_collapse: s.hide,
      t_expand: "expand_less",
      thumb: "",
      name: "",
      title: "",
    };
  }

  handleCollapse = () => {
    const { d_collapse } = this.state;
    if (d_collapse == s.hide) {
      this.setState({
        d_collapse: s.show,
        t_expand: "expand_more",
      });
    } else {
      this.setState({
        d_collapse: s.hide,
        t_expand: "expand_less",
      });
    }
  };

  handleAction = () => {
    router.push("/profile");
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      thumb: data.imageUrl,
      name: data.name,
      title: data.title,
    });
  }

  render() {
    const { thumb, name, title } = this.state;
    const { data } = this.props;
    const { d_collapse, t_expand } = this.state;

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
          <div>
            <h1>Narendra Modi</h1>
            <small>Prime Minister</small>
          </div>
        </div>

        <div className={s.middle}>
          <div className={s.display}>
            <div>
              {/* <TwitSmall /> */}

              <Info data={data} />

              {/* <TenureSmall
                title="Prime Minister Of India"
                start={2019}
                end={2020}
                value={20}
              /> */}
            </div>

            {/* <div>
              <Feature data={data} />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
