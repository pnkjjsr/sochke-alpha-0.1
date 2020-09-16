import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Local from "@utils/session/localStorage";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

export default function LanguageSelect() {
  const classes = useStyles();
  const [language, setLanguage] = useState("en");

  const handleChange = (event) => {
    setLanguage(event.target.value);

    let local = new Local();
    local.setLanguage(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select id="language" value={language} onChange={handleChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hi">Hindi</MenuItem>
      </Select>
      <FormHelperText>Select language.</FormHelperText>
    </FormControl>
  );
}
