import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { AuthContext } from "@contexts/Auth";
import Firebase from "@libs/firebase";
import { logout } from "@utils/session";

import PhotoThumb from "@components/Thumb/photo";

import s from "./open/open.module.scss";

export default function AuthAction() {
  const router = useRouter();
  const { authenticated, setAuthenticated, profile, setProfile } =
    useContext(AuthContext);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl);

  const onSignup = () => {
    router.push("/signup");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (event) => {
    let el = event.currentTarget;
    let type = el.getAttribute("name");

    if (type == "setting") router.push("/setting");
    else if (type == "logout") handleLogout();

    setAnchorEl(null);
    handleMobileMenuClose();
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
            setProfile(null);

            logout();

            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem name="setting" onClick={handleMenuClose}>
        Setting
      </MenuItem>
      <MenuItem name="logout" onClick={handleMenuClose}>
        Logout
      </MenuItem>
    </Menu>
  );

  if (!authenticated) {
    return (
      <div>
        <IconButton
          color="secondary"
          size="small"
          aria-label="delete"
          onClick={onSignup}
        >
          <LockOpenIcon />
        </IconButton>
      </div>
    );
  } else {
    return (
      <div className={s.user}>
        <IconButton
          color="secondary"
          size="small"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          {!profile?.photoURL ? (
            <AccountCircle />
          ) : (
            <PhotoThumb src={profile.photoURL} />
          )}
        </IconButton>

        {renderMenu}
      </div>
    );
  }
}
