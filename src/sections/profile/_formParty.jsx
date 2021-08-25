import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { postNewParty, getParties } from "@libs/firebase/parties";

import MuiSnackbar from "@components/Mui/Snackbar";

import s from "@pages/citizen/citizen.module.scss";

export default function FormType({ user, close }) {
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [state, setState] = useState({
    party: "",
    name: "",
    nameShort: "",
    logo: "",
  });
  const [viewOther, setViewOther] = useState(["none"]);
  const [base64, setBase64] = useState();
  const [parties, setParties] = useState([]);

  const onChange = async (e) => {
    let name = e.target.name;
    let val = e.target.value;

    switch (name) {
      case "party":
        if (val == "other") setViewOther("block");
        else setViewOther("none");
        setState({ ...state, [name]: val, partyOther: "" });
        break;
      default:
        setState({ ...state, [name]: val });
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      leaderId: user.leaderId,
      party: state.party,
      name: state.name,
      nameShort: state.nameShort,
      logo: base64,
    };

    // return console.log(payload);

    await postNewParty(payload);

    setTimeout(() => {
      if (state.type == "other") close(state.typeOther);
      else close(state.type);
    }, 1000);
  };

  const handleSnackbar = () => {
    setNvalue("");
    setNopen(false);
    setNtype("success");
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(async () => {
    let partiesData = await getParties();
    setParties(partiesData);
  }, []);

  console.log(parties);

  return (
    <div className={s.form}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="party-label">Party</InputLabel>
          <Select
            labelId="party-label"
            id="party"
            value={state.party}
            label="Your Party"
            name="party"
            onChange={onChange}
          >
            {/* <MenuItem value="citizen">I'm awake &amp; aware Citizen!</MenuItem> */}
            <MenuItem value="other">Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          style={{ display: viewOther }}
          variant="outlined"
          fullWidth
          label="Your Party Full Name"
          placeholder="Party full name"
          defaultValue={state.name}
          name="name"
          onChange={onChange}
        />

        <TextField
          style={{ display: viewOther }}
          variant="outlined"
          fullWidth
          label="Party Short Name"
          placeholder="Party short name"
          defaultValue={state.nameShort}
          name="nameShort"
          onChange={onChange}
        />

        <TextField
          style={{ display: viewOther }}
          fullWidth
          type="file"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          label="Party Logo"
          placeholder="Party logo"
          name="logo"
          defaultValue={state.logo}
          onChange={photoUpload}
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
