import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const PWAInstall = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      // e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const handleInstall = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      className={s.action}
      startIcon={<Icon>add</Icon>}
      title="Install app"
      aria-label="Install app"
      onClick={handleInstall}
    >
      Install
    </Button>
  );
};

export default PWAInstall;
