import { useEffect } from "react";
import Head from "next/head";

import { contentfulClient, getEntry } from "@libs/contentful";
import { firebaseCloudMessaging } from "@libs/firebase/cloudMessaging";
import Layout from "@layouts/open/index";

import NetaThumb from "@components/Neta/thumb";
import TagStory from "@components/Tag/story";
import SubscribeSmall from "@components/Subscribe/small";

import s from "./home.module.scss";

export default function Home({ data }) {
  const pageData = data.fields;

  useEffect(() => {
    firebaseCloudMessaging.init();
  }, []);

  return (
    <div className={s.home}>
      <Layout>
        <Head>
          <title>{pageData.title}</title>
          <meta name="description" content={pageData.desc} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {/* heading */}
          <h1>
            {/* {pageData.title} */}
            Political networking platform for <span>leaders</span> &amp;{" "}
            <span className={s.grn}>citizens</span>.
          </h1>

          {/* Neta */}
          <div className={s.neta}>
            <div>
              <NetaThumb name="Narendra Modi" src="" like="999" />
            </div>

            <div>
              <NetaThumb name="Rahult Gandhi" src="" like="450" />
            </div>

            <div>
              <NetaThumb name="Arvind Kejriwal" src="" like="780" />
            </div>

            <div>
              <NetaThumb name="Arvind Kejriwal" src="" like="780" />
            </div>

            <div>
              <NetaThumb name="Arvind Kejriwal" src="" like="780" />
            </div>
          </div>

          {/* Story Tags */}
          <div className={s.tags}>
            <TagStory value="Today's Politics" />
            <TagStory value="Corona" />
            <TagStory value="China" />
            <TagStory value="Indian Army" />
            <TagStory value="Today's Politics" />
            <TagStory value="Corona" />
            <TagStory value="China" />
            <TagStory value="Indian Army" />
            <TagStory value="Today's Politics" />
          </div>

          {/* Subscriber */}
          <div className={s.subscribe}>
            <SubscribeSmall />
          </div>
        </main>
      </Layout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}

export async function getStaticProps() {
  let data = await getEntry("4AMXmeupFBkkkJwuwRM99M");

  return {
    props: { data },
  };
}
