import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchUserProfile, traceUserName } from "@libs/firebase/users";

import s from "@pages/setting/setting.module.scss";

export default function Profile(props) {
  const { profile, setProfile } = useContext(AuthContext);
  // const [allowSubmit, setAllowSubmit] = useState(false);
  const [state, setState] = useState({
    // userName: props.data.userName,
    fullName: props.data.displayName,
    // email: props.data.email,
    mobile: props.data.phoneNumber,
  });
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      id: profile.id,
      // userName: state.userName,
      displayName: state.fullName,
      // email: state.email,
      phoneNumber: state.mobile,
    };

    // if (state.username == props.data.username || allowSubmit) {
    //   await patchUserProfile(payload);
    // }

    let res = await patchUserProfile(payload);

    if (res.code == "user-profile/updated") {
      setNvalue(res.message);
      setNopen(true);
    }
  };

  const onChange = async (e) => {
    let name = e.target.name;
    let val = e.target.value;

    if (name == "userName") return;

    setState({ ...state, [name]: val });
  };

  //TODO: 1st July 2021, @pankaj | Need to improvise USERNAME cases.
  const onBlur = async (e) => {
    let name = e.target.name;
    let val = e.target.value;

    let check = await traceUserName(val);

    if (check.code == "username/available") {
      setState({ ...state, [name]: val });
      setAllowSubmit(true);
    }
  };

  const handleSnackbar = () => {
    setNvalue("");
    setNopen(false);
    setNtype("success");
  };

  return (
    <div className={s.section}>
      <div className={s.form}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          {/* <TextField
            variant="outlined"
            fullWidth
            label="User Name"
            defaultValue={state.userName}
            name="userName"
            onChange={onChange}
            onBlur={onBlur}
          /> */}
          <TextField
            variant="outlined"
            fullWidth
            label="Full Name"
            defaultValue={state.fullName}
            name="fullName"
            onChange={onChange}
          />
          {/* <TextField
            variant="outlined"
            fullWidth
            label="Email"
            defaultValue={state.email}
            name="email"
            onChange={onChange}
          /> */}
          <TextField
            variant="outlined"
            fullWidth
            label="Mobile"
            defaultValue={state.mobile}
            name="mobile"
            onChange={onChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>

      <MuiSnackbar
        value={nValue}
        open={nOpen}
        type={nType}
        action={handleSnackbar}
      />
    </div>
  );
}
