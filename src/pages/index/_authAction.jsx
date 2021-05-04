import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { GlobalContext } from "@contexts/Global";

export default function AuthAction() {
  const router = useRouter();
  const { authenticated } = useContext(GlobalContext);

  const handleAuth = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  if (!authenticated) {
    return (
      <>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<LockOpenIcon />}
          title="Install app"
          aria-label="Install app"
          onClick={handleAuth}
        >
          Login
        </Button>
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}
