import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import s from "@pages/setting/setting.module.scss";

export default function Address(props) {
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
          <TextField
            variant="outlined"
            fullWidth
            label="Nationality"
            defaultValue={props.data.country}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="State"
            defaultValue={props.data.state}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Pincode"
            defaultValue={props.data.pincode}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Area"
            defaultValue={props.data.area}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Address"
            defaultValue={props.data.address}
          />
          <Button variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
