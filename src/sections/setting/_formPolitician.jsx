import React, { useState, useContext, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { AuthContext } from "@contexts/Auth";
import { getLeaderTypes, getPolitician } from "@libs/firebase/leader";
import MuiSnackbar from "@components/Mui/Snackbar";

import s from "@pages/setting/setting.module.scss";

export default function FormPolotician(props) {
  const { profile, setProfile } = useContext(AuthContext);
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [state, setState] = useState({
    type: "",
    typeShort: "",
    typeOther: "",
  });
  const [viewOther, setViewOther] = useState(["none"]);
  const [leaderTypes, setLeaderTypes] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      leaderId: profile.leaderId,
      type: state.type,
      typeShort: state.typeShort,
      userTypeOther: state.typeOther,
    };

    let res = await getPolitician(payload);
    if (res.code == "leader/updated") {
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

        let shortName = e.currentTarget.dataset.typeshort;

        setState({
          ...state,
          [name]: val,
          typeOther: "",
          typeShort: shortName || "",
        });
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

  const renderMenuItem = (arr, name) => {
    if (arr.length <= 0) {
      return (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      );
    }

    switch (name) {
      default:
        return arr.map((item, i) => {
          return (
            <MenuItem
              key={i}
              value={item[name]}
              data-typeshort={item.nameShort}
            >
              {item[name]}
            </MenuItem>
          );
        });
        break;
    }
  };

  useEffect(async () => {
    let leaderTypesArr = await getLeaderTypes();
    setLeaderTypes(leaderTypesArr);
  }, []);

  return (
    <div className={s.section}>
      <div className={s.form}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="type-label">Title of your role</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={state.type}
              label="Title of your role"
              name="type"
              onChange={onChange}
            >
              {renderMenuItem(leaderTypes, "name")}
              <MenuItem value="other">Others</MenuItem>
            </Select>
          </FormControl>

          <TextField
            style={{ display: viewOther }}
            variant="outlined"
            fullWidth
            label="Other"
            placeholder="Your role in your organisation."
            defaultValue={state.typeOther}
            name="typeOther"
            onChange={onChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Save your leader profile
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
