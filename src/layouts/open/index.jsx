import Head from "@layouts/head";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import SocialComponent from "./SocialComponent";
import s from "./open.module.scss";

export default function Layout({
  children,
  title = "This is the default title",
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header id={s.header}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Button
          size="small"
          variant="contained"
          color="primary"
          className={s.action}
          startIcon={<Icon>add</Icon>}
        >
          Install
        </Button>
      </header>

      {children}

      <footer id={s.footer}>
        <div className={s.copy}>Sochke © 2019-2020 </div>

        <SocialComponent />
      </footer>
    </>
  );
}
