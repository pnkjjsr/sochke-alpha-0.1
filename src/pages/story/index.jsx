import Head from "next/head";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Layout from "@layouts/open/index";
import TagStory from "@components/Tag/story";

import CommonBack from "@components/Common/back";

import s from "./story.module.scss";

export default function Story() {
  const DEFAULT = {
    TITLE:
      "Notice to rebels in Rajasthan; BJP may have to reconcile to Pilot floating own party",
    DESC:
      "The Rajasthan assembly speaker’s notice to 19 rebel Congress MLAs and Sachin Pilot’s announcement that he will not join the BJP has led the saffron party to look at the legal implications in case of disqualification of these lawmakers and ways to stall the process. BJP is still hopeful of toppling the Ashok Gehlot government but may have to reconcile with Pilot floating his own party... The Rajasthan assembly speaker’s notice to 19 rebel Congress MLAs and Sachin Pilot’s announcement that he will not join the BJP has led the saffron party to look at the legal implications in case of disqualification of these lawmakers and ways to stall the process. BJP is still hopeful of toppling the Ashok Gehlot government but may have to reconcile with Pilot floating his own party...",
  };

  return (
    <div className={s.story}>
      <div className={s.container}>
        <Layout>
          <Head>
            <title>{DEFAULT.TITLE}</title>
            <meta name="description" content={DEFAULT.DESC} />
          </Head>

          <main>
            {/* heading */}
            <h1 className={s.heading}>{DEFAULT.TITLE}</h1>

            {/* Info Bar */}
            <div className={s.info}>
              <TagStory value="Politics" />

              <span>Wednesday, 15 July 2020</span>
            </div>

            <p>{DEFAULT.DESC}</p>

            <div className={s.bottom}>
              <CommonBack />

              <div className={s.action}>
                <IconButton size="small" aria-label="share">
                  <ShareIcon /> <label htmlFor="share">10K</label>
                </IconButton>
                <IconButton size="small" aria-label="view">
                  <VisibilityIcon /> <label htmlFor="view">10K</label>
                </IconButton>
              </div>
            </div>
          </main>
        </Layout>
      </div>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}
