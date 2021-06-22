import Button from "@material-ui/core/Button";

import PhotoThumb from "@components/Thumb/photo";

import s from "@pages/setting/setting.module.scss";

export default function Photo() {
  const [spacing, setSpacing] = React.useState(2);

  return (
    <div className={s.photo}>
      <PhotoThumb />
      <Button variant="contained" size="small">
        Upload profile photo
      </Button>
    </div>
  );
}
