import React, { useState, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchLeaderProfile } from "@libs/firebase/users";

import s from "@pages/setting/setting.module.scss";

export default function LeaderType(props) {
  const { profile, setProfile } = useContext(AuthContext);
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [state, setState] = useState({
    type: props.data.userType,
    typeOther: "",
  });
  const [viewOther, setViewOther] = useState(["none"]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      id: profile.id,
      userType: state.type,
      userTypeOther: state.typeOther,
    };

    let res = await patchLeaderProfile(payload);
    if (res.code == "user-leaderInfo/updated") {
      setNvalue(res.message);
      setNopen(true);
    }
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
    <div className={s.section}>
      <div className={s.form}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="type-label">
              What type of leader you are?
            </InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={state.type}
              label="What type of leader you are?"
              name="type"
              onChange={onChange}
            >
              <MenuItem value="citizen">
                I'm awake &amp; aware Citizen!
              </MenuItem>
              <MenuItem value="politician">Politician</MenuItem>
              <MenuItem value="socialWorker">Social Worker</MenuItem>
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
