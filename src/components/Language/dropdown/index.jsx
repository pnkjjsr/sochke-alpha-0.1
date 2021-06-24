import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { setLanguage as cookieLanguage } from "@utils/session";

import { GlobalContext } from "@contexts/Global";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

export default function LanguageSelect() {
  const classes = useStyles();
  const { language, setLanguage } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);

  const handleChange = (event) => {
    setLang(event.target.value);
    setLanguage(event.target.value);

    //@TODO: firebase won't accept other than __session as cookie
    cookieLanguage(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select id="language" value={lang} onChange={handleChange}>
        <MenuItem value="en-US">English</MenuItem>
        <MenuItem value="hi-IN">Hindi</MenuItem>
      </Select>
      <FormHelperText>Select language.</FormHelperText>
    </FormControl>
  );
}
