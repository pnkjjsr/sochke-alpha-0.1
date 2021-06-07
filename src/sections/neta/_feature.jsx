import React, { Component, Fragment } from "react";
import FlagIcon from "@material-ui/icons/Flag";
import TextMobileStepper from "./_stepper";
import s from "@pages/neta/neta.module.scss";

export default class Feature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      party: "",
      partyShort: "",
      imgSrc: "",
    };
  }

  componentDidMount() {
    const { party, partyShort, partyLogo } = this.props.data;
    this.setState({
      party: party,
      partyShort: partyShort,
      imgSrc: partyLogo,
    });
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
                {!imgSrc ? <FlagIcon /> : <img src={imgSrc} alt={party} />}
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
