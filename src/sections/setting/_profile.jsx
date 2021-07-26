import React, { useState, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchUserProfile, traceUserName } from "@libs/firebase/user";

import s from "@pages/setting/setting.module.scss";

export default function Profile(props) {
  const { profile, setProfile } = useContext(AuthContext);
  // const [allowSubmit, setAllowSubmit] = useState(false);
  const [state, setState] = useState({
    fullName: props.data.displayName,
    mobile: props.data.phoneNumber,
    education: "",
    dob: "",
    date: "",
    month: "",
    year: "",
    monthArr: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  });
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");

  const onSubmit = async (e) => {
    e.preventDefault();

    let dob = "";
    if (date && month && year) {
      let time = `${state.date} ${state.month} ${state.year}`;
      dob = new Date(`${time} UTC+05:30`).toISOString();
    }

    let payload = {
      id: profile.id,
      displayName: state.fullName,
      phoneNumber: state.mobile,
      dateOfBirth: dob,
      education: state.education,
    };

    // if (state.username == props.data.username || allowSubmit) await patchUserProfile(payload);

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

  const dataLoop = (e) => {
    let digiCount = e.toString().length;
    let i;
    let count;

    if (digiCount == 4) {
      i = e - 100;
      count = e;
    } else {
      i = 1;
      count = e;
    }

    let arr = [];
    for (i; i <= count; i++) {
      arr.push(i);
    }
    return arr;
  };

  const renderDate = (e) => {
    let dataArr = [];

    if (e == "date") {
      dataArr = dataLoop(31);
    }
    if (e == "month") {
      dataArr = state.monthArr;
    }
    if (e == "year") {
      let currentYear = new Date().getFullYear();
      dataArr = dataLoop(currentYear).reverse();
    }

    let options = dataArr.map((item, key) => {
      return (
        <MenuItem key={key} value={item}>
          {item}
        </MenuItem>
      );
    });

    return options;
  };

  return (
    <div className={s.section}>
      <div className={s.form}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="Full Name"
            defaultValue={state.fullName}
            name="fullName"
            onChange={onChange}
          />

          <TextField
            variant="outlined"
            fullWidth
            label="Mobile"
            defaultValue={state.mobile}
            name="mobile"
            onChange={onChange}
          />

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="type-label">Date</InputLabel>
                <Select
                  labelId="date-label"
                  id="date"
                  value={state.date}
                  label="Date"
                  name="date"
                  onChange={onChange}
                >
                  {renderDate("date")}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="type-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={state.month}
                  label="Month"
                  name="month"
                  onChange={onChange}
                >
                  {renderDate("month")}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="type-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  value={state.year}
                  label="Year"
                  name="year"
                  onChange={onChange}
                >
                  {renderDate("year")}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            fullWidth
            label="Education"
            placeholder=""
            defaultValue={state.education}
            name="education"
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
