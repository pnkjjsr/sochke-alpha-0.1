import Link from "next/link";
import Head from "@layouts/head";
import Logo from "@components/Logo";
import PWAInstall from "./_PWAInstall";

import Drawer from "./_drawer";

import s from "./open.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <header id={s.header}>
        <div className={s.drawer}>
          <Drawer />
        </div>

        <Logo />
        {/* <PWAInstall /> */}
      </header>

      {children}

      <footer id={s.footer}>
        <div class={s.links}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/cookies">
            <a>Cookies</a>
          </Link>
        </div>
        <div class={s.copy}>© 2020 Sochke</div>
      </footer>
    </>
  );
}
