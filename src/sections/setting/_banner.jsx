import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchUserBanner } from "@libs/firebase/user";

import s from "@pages/setting/setting.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  let dummyImage =
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fglobal%2Fsochke-banner.png?alt=media&token=6da487e1-3b49-43db-bd6e-bc6f2ba609cc";
  const { profile, setProfile } = useContext(AuthContext);
  const [base64, setBase64] = useState(props.data || dummyImage);
  const [nValue, setNvalue] = useState("Saved!");
  const [nOpen, setNopen] = useState(false);
  const [nType, setNtype] = useState("success");

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

  const onFileSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      id: profile.id,
      bannerUrl: base64,
    };

    let res = await patchUserBanner(payload);

    if (res.code == "user-banner/updated") {
      setNvalue(res.message);
      setNopen(true);
    }
  };

  const handleSnackbar = () => {
    setNvalue("");
    setNopen(false);
    setNtype("success");
  };

  return (
    <div className={s.banner}>
      <figure>
        <img src={base64} alt="Banner will show in profile page." />
      </figure>
      <figcaption>
        Best size for banner is <b>944</b> width x <b>250</b> height.
      </figcaption>

      <form className={s.form} onSubmit={(e) => onFileSubmit(e)}>
        <div className={classes.root}>
          <input
            id="banner-file"
            className={classes.input}
            accept="image/*"
            multiple
            type="file"
            onChange={photoUpload}
          />
          <label htmlFor="banner-file">
            <ButtonGroup aria-label="outlined primary button group">
              <Button variant="contained" component="span">
                Add your banner
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Save
              </Button>
            </ButtonGroup>
          </label>
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
