import React, { useState, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { patchLeaderProfile } from "@libs/firebase/user";
import { postNewPolitician } from "@libs/firebase/leader";

import MuiSnackbar from "@components/Mui/Snackbar";

import s from "@pages/citizen/citizen.module.scss";

export default function FormType({ user, close }) {
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [state, setState] = useState({
    type: user.type,
    typeOther: "",
  });
  const [viewOther, setViewOther] = useState(["none"]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      id: user.id,
      type: state.type,
      typeOther: state.typeOther,
    };

    let res = await patchLeaderProfile(payload);
    if (res.code == "user-leaderInfo/updated") {
      setNvalue(res.message);
      setNopen(true);
    }

    let payloadPolitician = {
      ...payload,
      userName: user.slug,
    };
    await postNewPolitician(payloadPolitician);

    setTimeout(() => {
      if (state.type == "other") close(state.typeOther);
      else close(state.type);
    }, 1000);
  };

  const onChange = async (e) => {
    let name = e.target.name;
    let val = e.target.value;

    switch (name) {
      case "type":
        if (val == "other") setViewOther("block");
        else setViewOther("none");

        setState({ ...state, [name]: val, typeOther: "" });
        break;

      default:
        setState({ ...state, [name]: val });
        break;
    }
  };

  const handleSnackbar = () => {
    setNvalue("");
    setNopen(false);
    setNtype("success");
  };

  return (
    <div className={s.form}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="type-label">What type of leader you are?</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={state.type}
            label="What type of leader you are?"
            name="type"
            onChange={onChange}
          >
            <MenuItem value="citizen">I'm awake &amp; aware Citizen!</MenuItem>
            <MenuItem value="politician">Politician</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="other">Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          style={{ display: viewOther }}
          variant="outlined"
          fullWidth
          label="Your leadership type"
          placeholder="What type of Leader you are?"
          defaultValue={state.typeOther}
          name="typeOther"
          onChange={onChange}
        />

        <div className={s.action}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>

      <MuiSnackbar
        value={nValue}
        open={nOpen}
        type={nType}
        action={handleSnackbar}
      />
    </div>
  );
}
