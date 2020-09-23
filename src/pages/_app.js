import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@styles/theme";
import "@styles/global.scss";

import tracker from "@utils/trackers";
import LoaderPage from "@components/LoaderPage";

import GlobalContext from "./AppContext"

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [language, setLanguage] = useState("en-US");
  const value = { language, setLanguage }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    tracker();
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <LoaderPage />

        <GlobalContext.Provider value={value}>
          <Component {...pageProps} />
        </GlobalContext.Provider>

      </ThemeProvider>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
