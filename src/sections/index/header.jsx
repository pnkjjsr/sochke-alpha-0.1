import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import Thumb from "@components/Thumb/photo";

import s from "@pages/index.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <>
      <div className={s.header}>
        <Link href={`/citizen/${props.user.slug}`}>
          <a>
            <Thumb src={props.user.photoURL} />

            <h1>{props.user.name}</h1>
          </a>
        </Link>

        {/* <IconButton
          className={classes.root}
          color="primary"
          variant="contained"
          aria-label="delete"
        >
          <EditIcon />
        </IconButton> */}
      </div>
    </>
  );
}
