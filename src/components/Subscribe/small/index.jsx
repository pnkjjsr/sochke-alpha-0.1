import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { service } from "@utils/api";

import MuiSnackbar from "@components/Mui/Snackbar";

import validation from "./_validation";
import s from "./small.module.scss";

export default class SubscribeSmall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      d_form: s.show,
      d_notification: s.hide,
      loading: "",
      n_value: "",
      n_open: false,
    };
  }

  handleClose = (e) => {
    e.preventDefault();
    this.setState({
      d_notification: s.hide,
    });
  };

  handleChange = (e) => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleDefault = () => {
    this.setState({
      n_value: "",
      n_open: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { valid, errors } = validation({ email });
    this.setState({ loading: s.loading });

    if (!valid) {
      return this.setState({
        n_value: errors.email,
        n_open: true,
        loading: "",
      });
    }

    let data = {
      email: email,
      type: "mobile-home",
    };

    service
      .post("/subscribe", data)
      .then((res) => {
        console.log(res);
        if (res.data.code === "subscriber/repeat") {
          return this.setState({
            n_value: res.data.message,
            n_open: true,
            loading: "",
          });
        }

        setTimeout(() => {
          this.setState({
            d_form: s.hide,
            d_notification: s.show,
          });
        }, 2000);
      })
      .catch((err) => {
        console.log(err.json);
      });
  };

  render() {
    const { d_form, d_notification, loading, n_open, n_value } = this.state;
    return (
      <div className={s.subscribe_small}>
        <div className={`${s.notification} ${d_notification}`}>
          <div className="close" onClick={this.handleClose}>
            <i className="material-icons">close</i>
          </div>

          <i className="material-icons">thumb_up</i>
          <p>
            <b>Thank you for the subscribe!</b>
            You’ll get all latest update now.
          </p>
        </div>
        <form
          action=""
          autoComplete="off"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <div className={`${s.form} ${d_form}`}>
            <div className={s.group}>
              <TextField
                name="email"
                label="Enter email id"
                type="email"
                inputProps={{
                  "aria-label": "email",
                }}
                InputLabelProps={{
                  htmlFor: "email",
                }}
                size="small"
                color="primary"
                variant="filled"
                onChange={this.handleChange}
              />

              <Button
                className={loading}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Subscribe
              </Button>
            </div>

            <div className={s.note}>Get latest update of Indian Politcs</div>
          </div>
        </form>

        <MuiSnackbar
          value={n_value}
          open={n_open}
          type="error"
          action={this.handleDefault}
        />
      </div>
    );
  }
}
