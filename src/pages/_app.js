import "@styles/global.scss";
import React, { Component } from "react";

export default class MyApp extends Component {
  render() {
    const { Component, ctx, router, pageProps, store } = this.props;
    return <Component {...pageProps} />;
  }
}
