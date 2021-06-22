import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import s from "@pages/setting/setting.module.scss";

export default function Address() {
  return (
    <div className={s.section}>
      {/* <div className={s.header}>
        <h3>Address Details</h3>
        <Button variant="contained" size="small">
          Edit
        </Button>
      </div> */}

      <div className={s.form}>
        <form noValidate autoComplete="off">
          <TextField variant="outlined" fullWidth label="Address" />
          <TextField variant="outlined" fullWidth label="Pincode" />
          <TextField variant="outlined" fullWidth label="Area" />
          <TextField variant="outlined" fullWidth label="State" />
          <TextField variant="outlined" fullWidth label="Nationality" />
          <Button variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
