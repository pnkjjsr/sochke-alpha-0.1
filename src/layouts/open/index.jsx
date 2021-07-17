import Link from "next/link";

import Head from "@layouts/head";
import Logo from "@components/Logo";
import AuthAction from "@layouts/_authAction";

import Drawer from "@layouts/_drawer";

import s from "./open.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header id={s.header}>
        <div className={s.aside}>
          <div className={s.drawer}>
            <Drawer />
          </div>

          <Logo />
        </div>

        <div className={s.authAction}>
          <AuthAction />
        </div>
      </header>

      <main id={s.main}>{children}</main>

      <footer id={s.footer}>
        <div className={s.links}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/privacy">
            <a>Privacy</a>
          </Link>
          {/* <Link href="/cookies">
            <a>Cookies</a>
          </Link> */}
        </div>
        <div className={s.copy}>© 2019-2021 Sochke</div>
      </footer>
    </>
  );
}
