import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import MuiSnackbar from "@components/Mui/Snackbar";
import { AuthContext } from "@contexts/Auth";
import { patchUserPhoto } from "@libs/firebase/users";
import PhotoThumb from "@components/Thumb/photo";

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

export default function Photo(props) {
  const classes = useStyles();
  const { profile, setProfile } = useContext(AuthContext);
  const [base64, setBase64] = useState(props.data);
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
      photoURL: base64,
    };

    let res = await patchUserPhoto(payload);

    if (res.code == "user-photo/updated") {
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
    <div className={s.photo}>
      <PhotoThumb src={base64} />

      <form onSubmit={(e) => onFileSubmit(e)}>
        <div className={classes.root}>
          <input
            id="photo-file"
            className={classes.input}
            accept="image/*"
            multiple
            type="file"
            onChange={photoUpload}
          />
          <label htmlFor="photo-file">
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button variant="outlined" component="span">
                Add your photo
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
