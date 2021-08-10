import React, { useState, useContext, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchUserAddress } from "@libs/firebase/user";
import Universal from "@utils/openApi/universal";
import DataGov from "@utils/openApi/dataGov";
import StringModifier from "@utils/modifier/string";

import s from "@pages/citizen/citizen.module.scss";

export default function FormAddress({ user, close }) {
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
    pincode: "",
    address: "",
    area: "",
    block: "",
    branchtype: "",
    circle: "",
    district: "",
    division: "",
    region: "",
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

        setAreas(areaArr);
        break;
      case "area":
        let block = e.currentTarget.dataset.block;
        let branchtype = e.currentTarget.dataset.branchtype;
        let circle = e.currentTarget.dataset.circle;
        let district = e.currentTarget.dataset.district;
        let division = e.currentTarget.dataset.division;
        let region = e.currentTarget.dataset.region;

        setState({
          ...state,
          [name]: val,
          block: block,
          branchtype: branchtype,
          circle: circle,
          district: district,
          division: division,
          region: region,
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
      id: user.id,
      country: state.country,
      countryShortName: state.countryShortName,
      countryCode: state.countryCode,
      state: state.state,
      city: state.city,
      pincode: state.pincode,
      address: state.address,
      area: state.area,
      block: state.block,
      branchtype: state.branchtype,
      circle: state.circle,
      district: state.district,
      division: state.division,
      region: state.region,
    };

    let res = await patchUserAddress(payload);
    if (res.code == "user-address/updated") {
      setNvalue(res.message);
      setNopen(true);
    }

    setTimeout(() => {
      close();
    }, 1000);
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
              data-block={item.Block}
              data-branchtype={item.BranchType}
              data-circle={item.Circle}
              data-district={item.District}
              data-division={item.Division}
              data-region={item.Region}
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

  const renderCurrentAddress = () => {
    if (props.data.address && props.data.city && props.data.pincode) {
      return (
        <div className={s.header}>
          <h3>
            <small>
              <b>Current Address</b>
            </small>
            <br />
            {state.address || props.data.address},
            <br />
            {state.city || props.data.city},{" "}
            {state.country || props.data.country} -{" "}
            {state.pincode || props.data.pincode}
          </h3>
        </div>
      );
    } else {
      return "";
    }
  };

  useEffect(async () => {
    let countriesArr = await universal.getCountries();
    setCountries(countriesArr);
  }, []);

  return (
    <>
      {/* {renderCurrentAddress()} */}

      <div className={s.form}>
        <form autoComplete="off" onSubmit={onSubmit} required>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="country-label">Nationality</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              value={state.country}
              label="Nationality"
              name="country"
              onChange={onChange}
              required
              autoComplete="off"
            >
              {renderMenuItem(countries, "country_name")}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              required
              labelId="state-label"
              id="state"
              value={state.state}
              label="State"
              name="state"
              onChange={onChange}
              required
              autoComplete="off"
            >
              {renderMenuItem(states, "state_name")}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              required
              labelId="city-label"
              id="city"
              value={state.city}
              label="City"
              name="city"
              onChange={onChange}
              required
              autoComplete="off"
            >
              {renderMenuItem(cities, "city_name")}
            </Select>
          </FormControl>

          <TextField
            required
            variant="outlined"
            fullWidth
            label="Pincode"
            name="pincode"
            defaultValue={state.pincode}
            onChange={onChange}
            required
            autoComplete="off"
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="area-label">Area</InputLabel>
            <Select
              required
              labelId="area-label"
              id="area"
              value={state.area}
              label="Area"
              name="area"
              onChange={onChange}
              required
              autoComplete="off"
            >
              {renderMenuItem(areas, "Name")}
            </Select>
          </FormControl>

          <TextField
            required
            variant="outlined"
            fullWidth
            label="Address"
            name="address"
            defaultValue={state.address}
            onChange={onChange}
            required
            autoComplete="off"
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
    </>
  );
}
