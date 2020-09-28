import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { contentfulClient } from "@libs/contentful";
import { firebaseCloudMessaging } from "@libs/firebase/cloudMessaging";
import { Session } from "@utils/session";
import Layout from "@layouts/open/index";

import NetaThumb from "@components/Neta/thumb";
import SubscribeSmall from "@components/Subscribe/small";

import GlobalContext from "@contexts/GlobalContext";
import Tags from "@pages/index/_tags";
import s from "./home.module.scss";

export default function Home({ data }) {
  const pageData = data.head.items[0].fields;
  const tagsData = data.tags.items;
  const { language } = useContext(GlobalContext);

  const [d_Subscribed, setd_Subscribed] = useState(true);
  const [title, setTitle] = useState(pageData.title);
  const [desc, setDesc] = useState(pageData.desc);
  const [lang, setLang] = useState(language);

  if (language != lang) {
    contentfulClient
      .getEntries({
        content_type: "pageHead",
        locale: language,
        "fields.slug": "home",
      })
      .then((res) => {
        let newData = res.items[0].fields;
        setLang(language);
        setTitle(newData.title);
        setDesc(newData.desc);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // firebaseCloudMessaging.init();
    let session = new Session();
    let isSubscribed = session.getSubscribed();
    if (isSubscribed === "true") setd_Subscribed(false);
  }, []);

  return (
    <div className={s.home}>
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name="description" content={desc} />
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
            <Tags data={tagsData} />
          </div>

          {/* Subscriber */}
          <div className={s.subscribe}>
            {d_Subscribed ? <SubscribeSmall /> : ""}
          </div>
        </main>
      </Layout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}

export async function getServerSideProps() {
  let data = {};
  data.head = await contentfulClient.getEntries({
    content_type: "pageHead",
    locale: "en-US",
    "fields.slug": "home",
  });

  data.tags = await contentfulClient.getEntries({
    content_type: "story",
    locale: "en-US",
    limit: 10,
  });
  return {
    props: { data },
  };
}
