import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import s from "@pages/setting/setting.module.scss";

export default function Profile() {
  return (
    <div className={s.section}>
      {/* <div className={s.header}>
        <h3>Profile</h3>
        <Button variant="contained" size="small">
          Edit
        </Button>
      </div> */}

      <div className={s.form}>
        <form noValidate autoComplete="off">
          <TextField variant="outlined" fullWidth label="User Name" />
          <TextField variant="outlined" fullWidth label="Full Name" />
          <TextField variant="outlined" fullWidth label="Email" />
          <TextField variant="outlined" fullWidth label="Mobile" />
          <Button variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
