import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { postNewParty, getParties, getParty } from "@libs/firebase/profile";

import MuiSnackbar from "@components/Mui/Snackbar";

import s from "@pages/citizen/citizen.module.scss";

export default function FormType({ user, close }) {
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [state, setState] = useState({
    partyId: "",
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
    let id = e.currentTarget.dataset.id;

    switch (name) {
      case "party":
        if (val == "other") {
          setViewOther("block");
          setState({ ...state, [name]: val });
        } else {
          setViewOther("none");
          setState({
            partyId: id,
            party: val,
            name: "",
            nameShort: "",
            logo: "",
          });
        }

        break;
      default:
        setState({ ...state, [name]: val });
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {};
    if (state.party == "other") {
      payload = {
        leaderId: user.leaderId,
        party: state.party,
        name: state.name,
        nameShort: state.nameShort,
        logo: base64,
      };

      await postNewParty(payload);
    } else {
      let data = {
        partyId: state.partyId,
        leaderId: user.leaderId,
      };
      payload = await getParty(data);
    }

    setTimeout(() => {
      if (state.type == "other") close("party", payload);
      else close("party", payload);
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

  const renderMenuItem = (arr, name) => {
    return arr.map((item, i) => {
      if (item.status == "enable") {
        return (
          <MenuItem
            key={item.id}
            value={item[name]}
            data-id={item.id}
            data-shortname={item.nameShort}
          >
            {item[name]}
          </MenuItem>
        );
      }
    });
  };

  useEffect(async () => {
    let partiesData = await getParties();
    setParties(partiesData);
  }, []);

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
            {renderMenuItem(parties, "name")}
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
