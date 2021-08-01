import React, { Component } from "react";
import router from "next/router";

import NetaThumb from "@components/Thumb/neta";

import Info from "./_info";
import s from "@pages/neta/neta.module.scss";

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

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      thumb: data.imageUrl,
      name: data.name,
      title: data.title,
    });
  }

  render() {
    const { data, about } = this.props;

    return (
      <div className={s.detail}>
        <div className={s.thumb}>
          {!data.imageUrl ? (
            ""
          ) : (
            <NetaThumb src={data.imageUrl} name={data.name} like="999" />
          )}
        </div>

        <div className={s.top}>
          <div>
            <h1>{data.name}</h1>
            <small>{data.title}</small>
            <br />
            <p>{about.para}</p>
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
