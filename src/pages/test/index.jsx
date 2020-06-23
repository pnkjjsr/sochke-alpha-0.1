import React, { Component } from "react";
import Head from "next/head";
import Button from "@material-ui/core/Button";
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
          <Button variant="contained" color="primary" href="/">
            Go to the main page
          </Button>
        </header>
        <div className={s.title}>test</div>
      </Layout>
    );
  }
}
