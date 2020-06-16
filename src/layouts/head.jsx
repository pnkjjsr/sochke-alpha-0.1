import React, { Fragment } from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const DEFAULT_CONFIG = {
  title: "Sochke | Political Networking | Society | Politics | Societal Issues",
  desc:
    "Sochke | SochKeApp, a political networking platform to enable citizens contribute societal issues, connect political leaders digitally & build a healthy democracy.",
  keyword:
    "Sochke,SochkeApp,Neta,Society Issues,Leaders,Politics,Political,Politician,Political Networking,Minister,Election,Vote,Citizne,Problem,Issue,Development,India,Growth,Agenda,Propganda",
  defaultOGURL: "https://www.sochke.com",
  defaultOGImage:
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  defaultDescription:
    "Sochke | SochKeApp, a political networking platform to enable citizens contribute societal issues, connect political leaders digitally & build a healthy democracy.",
};

class Head extends React.Component {
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/service-worker.js", { scope: "/" })
          .then(function (res) {
            console.log("SW registered: ", res);
          })
          .catch(function (err) {
            console.log("SW registration failed: ", err);
          });
      });
    }
  }

  render() {
    return (
      <Fragment>
        <NextHead>
          <meta charSet="UTF-8" />
          <title>{DEFAULT_CONFIG.title}</title>
          <meta name="description" content={DEFAULT_CONFIG.desc} />
          <meta name="keywords" content={DEFAULT_CONFIG.keyword}></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="google-site-verification"
            content="X_UAViRRJK8KBMJtpV6wJmolpk-h5vIn8ooaBt7AHL0"
          />

          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link
            rel="mask-icon"
            href="/static/favicon-mask.svg"
            color="#49B882"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />

          <meta
            property="og:url"
            content={this.props.url || DEFAULT_CONFIG.defaultOGURL}
          />
          <meta property="og:title" content={this.props.title || ""} />
          <meta
            property="og:description"
            content={this.props.desc || DEFAULT_CONFIG.defaultDescription}
          />
          <meta
            name="twitter:site"
            content={this.props.url || DEFAULT_CONFIG.defaultOGURL}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={this.props.ogImage || DEFAULT_CONFIG.defaultOGImage}
          />
          <meta
            property="og:image"
            content={this.props.ogImage || DEFAULT_CONFIG.defaultOGImage}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="theme-color" content="#000088" />
          <meta
            name="apple-mobile-web-app-capable"
            content="black-translucent"
          />
        </NextHead>

        <noscript>
          <div className="alert  alert-warning">
            <h4>Warning!</h4>
            <h5>Javascript is disabled for this website.</h5>
            <p>Javascript is required to use this website.</p>
            <p>
              {`You won't be able to navigate in this website until you activate javascript.`}
            </p>
          </div>
        </noscript>
      </Fragment>
    );
  }
}

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
