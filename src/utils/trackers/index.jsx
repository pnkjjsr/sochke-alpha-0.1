import TagManager from "react-gtm-module";
import ReactGA from "react-ga";

export default function trakcers() {
  const tagManagerArgs = {
    gtmId: "GTM-K3KCVT2",
    dataLayer: {
      userId: "001",
      userProject: "nextjs-contentful-firebase",
    },
  };
  TagManager.initialize(tagManagerArgs);

  ReactGA.initialize("UA-171447266-1");
}
