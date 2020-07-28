import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MuiSnackbar(props) {
  const [value, setValue] = useState("Notification default message");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    props.action();
  };

  useEffect(() => {
    setValue(props.value);
    setOpen(props.open);
  }, [props.value, props.open]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={value}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      <Alert onClose={handleClose} severity={props.type}>
        {value}
      </Alert>
    </Snackbar>
  );
}

MuiSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
