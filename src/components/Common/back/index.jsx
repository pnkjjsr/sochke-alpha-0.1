import React, { Component } from "react";
import router from "next/router";

import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import s from "./back.module.scss";

const BackButton = styled(Button)({
  color: "white",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)", //linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)
  // boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)", //0 3px 5px 2px rgba(255, 105, 135, .3)
});

export default class CommonBack extends Component {
  handleBack = () => {
    router.back();
  };
  render() {
    return (
      <BackButton
        className={s.back}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={this.handleBack}
      >
        Back
      </BackButton>
    );
  }
}
