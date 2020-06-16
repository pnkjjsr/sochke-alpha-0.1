import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "@layouts/open/index";

import s from "./test.module.scss";

export default class test extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <nav>
            <Link href="/">
              <a>Home</a>
            </Link>{" "}
            |
            <Link href="/test">
              <a>test</a>
            </Link>{" "}
          </nav>
        </header>
        <div className={s.title}>
          test
          <br />
          <button className="btn">check</button>
        </div>
      </Layout>
    );
  }
}
