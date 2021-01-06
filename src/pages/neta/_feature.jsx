import React, { Component, Fragment } from "react";

import TextMobileStepper from "./_stepper";
import s from "./neta.module.scss";

export default class Feature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      party: "",
      partyShort: "",
      imgSrc: "",
    };
  }

  renderLogo = async () => {
    const { partyShort } = this.state;

    let img = "";
    switch (partyShort) {
      case "BJP":
        this.setState({
          imgSrc:
            "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fparties%2Fbjp.svg?alt=media&token=71e28a82-b1d5-4f92-a9dc-c29040dba548",
        });

        break;
      case "INC":
        this.setState({
          imgSrc:
            "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fparties%2Finc.svg?alt=media&token=897342d1-b96d-45e0-8072-ed02e669a319",
        });
        break;
      case "AAP":
        this.setState({
          imgSrc:
            "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fparties%2Faap.svg?alt=media&token=d20ded3e-45d0-4ebd-b278-b8466160e741",
        });

        break;
      default:
        break;
    }

    return img;
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState(
      {
        party: data.party,
        partyShort: data.partyShort,
      },
      () => {
        this.renderLogo();
      }
    );
  }

  render() {
    const { imgSrc, party } = this.state;

    return (
      <>
        <div className={s.feature}>
          {/* <div className={`${s.item}`}>
            <div name="achievement">10</div>
            <label htmlFor="achievement">Achievement</label>
          </div>

          <div className={`${s.item} ${s.active}`}>
            <div name="work">15</div>
            <label htmlFor="work">Work</label>
          </div> */}

          <div className={s.item}>
            <div className={s.symbol}>
              <figure>
                {!imgSrc ? "" : <img src={imgSrc} alt={imgSrc} />}
              </figure>
            </div>

            <label htmlFor="work">{party}</label>
          </div>
        </div>

        <div className={s.achievement}>{/* <TextMobileStepper /> */}</div>
      </>
    );
  }
}
