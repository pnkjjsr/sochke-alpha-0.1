import React, { Component } from "react";
import router from "next/router";
import Button from "@material-ui/core/Button";

import TwitSmall from "@components/Twit/small";
import TenureSmall from "@components/Tenure/small";

import Feature from "./_feature";
import Info from "./_info";
import s from "./neta.module.scss";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d_collapse: s.hide,
      t_expand: "expand_less",
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

  render() {
    const { d_collapse, t_expand } = this.state;

    return (
      <div className={s.detail}>
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

              <Info />

              <TenureSmall
                title="Prime Minister Of India"
                start={2019}
                end={2020}
                value={20}
              />
              <TenureSmall
                title="Prime Minister Of India"
                start={2014}
                end={2019}
                value={100}
              />
            </div>
            <div>
              <Feature />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
