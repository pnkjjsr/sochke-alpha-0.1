import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import s from "./small.module.scss";

export default class SubscribeSmall extends Component {
  render() {
    return (
      <div className={s.subscribe_small}>
        <form action="" autoComplete="off">
          <div className={s.form}>
            <TextField
              name="subscribe-email"
              label="Enter email id"
              type="email"
              inputProps={{
                "aria-label": "subscribe-email",
              }}
              InputLabelProps={{
                htmlFor: "subscribe-email",
              }}
              size="small"
              color="primary"
              variant="filled"
            />

            <Button variant="contained" color="secondary">
              Subscribe
            </Button>
          </div>
        </form>

        <div className={s.note}>Get latest update of Indian Politcs</div>
      </div>
    );
  }
}
