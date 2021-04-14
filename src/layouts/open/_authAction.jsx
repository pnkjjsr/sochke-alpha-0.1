import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import s from "./open.module.scss";

export default function AuthAction() {
  const router = useRouter();

  const handleAuth = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <Button
      size="small"
      variant="contained"
      color="secondary"
      className={s.action}
      startIcon={<LockOpenIcon />}
      title="Install app"
      aria-label="Install app"
      onClick={handleAuth}
    >
      Login
    </Button>
  );
}
