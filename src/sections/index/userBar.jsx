import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

import Thumb from "@components/Thumb/photo";

import s from "@pages/index.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
}));

export default function UserBar(props) {
  const classes = useStyles();
  const router = useRouter();

  const handleProfile = () => {
    router.push("/profile");
  };

  const handlePublicProfile = () => {
    router.push(`/citizen/${props.user.slug}`);
  };

  return (
    <>
      <div className={s.userbar}>
        <Link href={`/citizen/${props.user.slug}`}>
          <a>
            <Thumb src={props.user.photoURL} />
            <h1>{props.user.name}</h1>
          </a>
        </Link>

        <div className={s.links}>
          <IconButton
            className={classes.root}
            color="secondary"
            variant="contained"
            aria-label="delete"
            onClick={handlePublicProfile}
          >
            <PersonIcon />
          </IconButton>

          <IconButton
            className={classes.root}
            color="primary"
            variant="contained"
            aria-label="delete"
            onClick={handleProfile}
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
