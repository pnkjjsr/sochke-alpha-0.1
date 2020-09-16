import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Local from "@utils/session/localStorage";

export default function LanguageSelect() {
  const [language, setLanguage] = useState("en");

  const handleChange = (event) => {
    setLanguage(event.target.value);

    let local = new Local();
    local.setLanguage(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <Select id="language" value={language} onChange={handleChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
        </Select>
        <FormHelperText>Select language.</FormHelperText>
      </FormControl>
    </div>
  );
}
