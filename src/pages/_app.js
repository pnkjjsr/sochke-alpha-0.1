import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@styles/theme";
import "@styles/global.scss";

import { GlobalProvider } from "@contexts/Global";
import analytics from "@libs/firebase/analytics";

import LoaderPage from "@components/LoaderPage";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    analytics();
  }, []);

  return (
    <Fragment>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <LoaderPage />
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ThemeProvider>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
