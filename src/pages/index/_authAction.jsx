import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

import { AuthContext } from "@contexts/Auth";
import Firebase from "@libs/firebase";

import s from "@pages/home.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
}));

export default function AuthAction() {
  const classes = useStyles();

  const router = useRouter();
  const { authenticated, setAuthenticated, profile } = useContext(AuthContext);

  const onSignup = () => {
    router.push("/signup");
  };

  const onSetting = () => {
    router.push("/setting");
  };

  const handleLogout = () => {
    let firebaseLibs = new Firebase();
    firebaseLibs
      .init()
      .then((firebase) => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            // console.log("Sign-out successful.");
            setAuthenticated(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  if (!authenticated) {
    return (
      <>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<LockOpenIcon />}
          title="Login"
          aria-label="login"
          onClick={onSignup}
        >
          Login
        </Button>

        <p>Login, and track your locality development.</p>
      </>
    );
  } else {
    return (
      <div className={s.loggedIn}>
        <figure>
          <img src={profile.photoURL} alt={profile.displayName} />
        </figure>

        <div>
          <div className={s.title}>
            <small>Welcome,</small>
            {profile.displayName}
          </div>

          <div className={s.action}>
            {/* <IconButton
              className={classes.root}
              variant="contained"
              color="primary"
              title="Setting"
              aria-label="setting"
              onClick={onSetting}
            >
              <SettingsIcon />
            </IconButton> */}

            <Button
              className={classes.root}
              // size="small"
              variant="contained"
              color="primary"
              startIcon={<ExitToAppIcon />}
              title="Logout"
              aria-label="logout"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
