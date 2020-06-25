import Head from "@layouts/head";

import PWAInstall from "./_PWAInstall";
import SocialComponent from "./_socialComponent";
import Drawer from "./_drawer";
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
        <Drawer />

        <PWAInstall />
      </header>

      {children}

      <footer id={s.footer}>
        <div className={s.copy}>Sochke © 2019-2020 </div>

        <SocialComponent />
      </footer>
    </>
  );
}
