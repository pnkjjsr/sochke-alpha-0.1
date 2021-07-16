import React, { useState, useContext, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchUserAddress } from "@libs/firebase/setting";
import Universal from "@utils/openApi/universal";
import DataGov from "@utils/openApi/dataGov";
import StringModifier from "@utils/modifier/string";

import s from "@pages/setting/setting.module.scss";

export default function Address(props) {
  const { profile, setProfile } = useContext(AuthContext);
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");
  const [state, setState] = useState({
    country: "",
    countryShortName: "",
    countryCode: "",
    state: "",
    city: "",
    pincode: props.data.pincode,
    area: "",
    address: props.data.address,
    district: "",
    division: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const universal = new Universal();
  const dataGov = new DataGov();
  const modifier = new StringModifier();

  const onChange = async (e) => {
    let name = e.target.name;
    let val = e.target.value;

    switch (name) {
      case "country":
        let shortName = e.currentTarget.dataset.shortname;
        let code = e.currentTarget.dataset.code;
        setState({
          ...state,
          [name]: val,
          countryShortName: shortName,
          countryCode: code,
        });

        let stateArr = await universal.getState(val);
        setStates(stateArr);
        break;
      case "state":
        setState({ ...state, [name]: val });

        let cityArr = await universal.getCity(val);
        setCities(cityArr);
        break;
      case "pincode":
        setState({ ...state, [name]: val });

        if (val.length != 6) return;

        let areaArr = await dataGov.getAreaByPincode(val);

        // let newArr = await modifier.removeWordInArr(areaArr, [
        //   "S.O",
        //   "B.O",
        //   "H.O",
        // ]);
        setAreas(areaArr);
        break;
      case "area":
        let district = e.currentTarget.dataset.district;
        let division = e.currentTarget.dataset.division;
        setState({
          ...state,
          [name]: val,
          district: district,
          division: division,
        });
        break;
      default:
        setState({ ...state, [name]: val });
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      id: profile.id,
      country: state.country,
      countryShortName: state.countryShortName,
      countryCode: state.countryCode,
      state: state.state,
      city: state.city,
      pincode: state.pincode,
      area: state.area,
      address: state.address,
      district: state.district,
      division: state.division,
    };

    let res = await patchUserAddress(payload);
    if (res.code == "user-address/updated") {
      setNvalue(res.message);
      setNopen(true);
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
      case "country_name":
        return arr.map((item, i) => {
          return (
            <MenuItem
              key={i}
              value={item[name]}
              data-shortname={item.country_short_name}
              data-code={item.country_phone_code}
            >
              {item[name]}
            </MenuItem>
          );
        });
        break;
      case "Name":
        return arr.map((item, i) => {
          return (
            <MenuItem
              key={i}
              value={item[name]}
              data-district={item.District}
              data-division={item.Division}
            >
              {item[name]}
            </MenuItem>
          );
        });
        break;
      default:
        return arr.map((item, i) => {
          return (
            <MenuItem key={i} value={item[name]}>
              {item[name]}
            </MenuItem>
          );
        });
        break;
    }
  };

  useEffect(async () => {
    let countriesArr = await universal.getCountries();
    setCountries(countriesArr);
  }, []);

  return (
    <div className={s.section}>
      <div className={s.header}>
        <h3>
          <small>
            <b>Current Address</b>
          </small>
          <br />
          {state.address || props.data.address},
          <br />
          {state.city || props.data.city}, {state.country || props.data.country}{" "}
          - {state.pincode || props.data.pincode}
        </h3>
      </div>

      <div className={s.form}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="country-label">Nationality</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              value={state.country}
              label="Nationality"
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
              value={state.state}
              label="State"
              name="state"
              onChange={onChange}
            >
              {renderMenuItem(states, "state_name")}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              id="city"
              value={state.city}
              label="City"
              name="city"
              onChange={onChange}
            >
              {renderMenuItem(cities, "city_name")}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            fullWidth
            label="Pincode"
            name="pincode"
            defaultValue={state.pincode}
            onChange={onChange}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="area-label">Area</InputLabel>
            <Select
              labelId="area-label"
              id="area"
              value={state.area}
              label="Area"
              name="area"
              onChange={onChange}
            >
              {renderMenuItem(areas, "Name")}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            fullWidth
            label="Address"
            name="address"
            defaultValue={state.address}
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
