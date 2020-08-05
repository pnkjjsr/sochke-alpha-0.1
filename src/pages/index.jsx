import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

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
              <Link href="/neta">
                <a>
                  <NetaThumb
                    name="Narendra Modi"
                    src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Fnarendra-modi.png?alt=media&token=afe4e029-512c-462c-a56e-5fa80cc0e991"
                    like="999"
                  />
                </a>
              </Link>
            </div>

            <div>
              <NetaThumb
                name="Rahul Gandhi"
                src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Frahul-gandhi.png?alt=media&token=c6368ad6-1100-4b7e-a1c9-111a31f6d374"
                like="450"
              />
            </div>

            <div>
              <NetaThumb
                name="Arvind Kejriwal"
                src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Farvind-kejriwal.png?alt=media&token=90e5f567-8b3c-43df-91b3-c2d111cfaa48"
                like="780"
              />
            </div>
          </div>

          {/* Story Tags */}
          <div className={s.tags}>
            <Link href="/story">
              <a>
                <TagStory value="Today's Politics" />
              </a>
            </Link>
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
