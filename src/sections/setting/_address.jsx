import React, { useState, useContext, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import Universal from "@utils/openApi/universal";

import s from "@pages/setting/setting.module.scss";

export default function Address(props) {
  const { profile, setProfile } = useContext(AuthContext);
  const [state, setState] = useState({
    country: "",
    countryShortName: "",
    countryCode: "",
    state: "",
  });
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const universal = new Universal();

  const onChange = async (e) => {
    let name = e.target.name;
    let val = e.target.value;

    if (name == "country") {
      let shortName = e.currentTarget.dataset.shortname;
      let code = e.currentTarget.dataset.code;

      setState({ ...state, countryShortName: shortName, countryCode: code });

      let stateArr = await universal.getState(val);
      setStates(stateArr);
    } else {
      setState({ ...state, [name]: val });
    }
  };

  const renderMenuItem = (arr, name) => {
    if (arr.length <= 0) {
      return (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      );
    }

    return arr.map((item, i) => {
      return (
        <MenuItem
          key={i}
          value={item[name]}
          data-shortName={item.country_short_name}
          data-code={item.country_phone_code}
        >
          {item[name]}
        </MenuItem>
      );
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      id: profile.id,
      country: state.country,
      countryShortName: state.countryShortName,
      countryCode: state.countryCode,
      state: state.state,
    };

    return console.log(payload);
    let res = await patchUserProfile(payload);
    if (res.code == "user-profile/updated") {
      setNvalue(res.message);
      setNopen(true);
    }
  };

  const handleSnackbar = () => {
    setNvalue("");
    setNopen(false);
    setNtype("success");
  };

  useEffect(async () => {
    let countriesArr = await universal.getCountries();
    setCountries(countriesArr);
  }, []);

  return (
    <div className={s.section}>
      {/* <div className={s.header}>
        <h3>Address Details</h3>
        <Button variant="contained" size="small">
          Edit
        </Button>
      </div> */}

      <div className={s.form}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="country-label">Nationality</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              label="Nationality"
              value={state.country}
              name="country"
              onChange={onChange}
            >
              {renderMenuItem(countries, "country_name")}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state"
              label="State"
              value={state.state}
              name="state"
              onChange={onChange}
            >
              {renderMenuItem(states, "state_name")}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            fullWidth
            label="State"
            defaultValue={props.data.state}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Pincode"
            defaultValue={props.data.pincode}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Area"
            defaultValue={props.data.area}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Address"
            defaultValue={props.data.address}
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
