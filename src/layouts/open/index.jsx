import Head from "@layouts/head";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SocialComponent from "./SocialComponent";
// import PWAInstall from "./PWAInstall";
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

        {/* <PWAInstall /> */}
      </header>

      {children}

      <footer id={s.footer}>
        <div className={s.copy}>Sochke © 2019-2020 </div>

        <SocialComponent />
      </footer>
    </>
  );
}
