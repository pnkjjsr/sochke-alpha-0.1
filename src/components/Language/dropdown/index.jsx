import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Cookie } from "@utils/session";

import GlobalContext from "@contexts/GlobalContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

export default function LanguageSelect() {
  const classes = useStyles();
  const { language, setLanguage } = useContext(GlobalContext);

  let cookie = new Cookie();
  let storeLang = cookie.getCookie("language") || language;
  const [lang, setLang] = useState(storeLang);

  const handleChange = (event) => {
    setLang(event.target.value);
    setLanguage(event.target.value);

    let cookie = new Cookie();
    cookie.setCookie("language", event.target.value);
    //@TODO: firebase won't accept other than __session as cookie
    cookie.setCookie("__session", `language=${event.target.value}?`);
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
