import { useState, useEffect, useContext } from "react";
import Head from "next/head";

import { firebaseCloudMessaging } from "@libs/firebase/cloudMessaging";

import { Session, getLanguage } from "@utils/session";
import Layout from "@layouts/open/index";

import SubscribeSmall from "@components/Subscribe/small";

import GlobalContext from "@contexts/GlobalContext";
import { getHome } from "@libs/contentful/home";
import { getPromotedMinisters } from "@libs/firebase/home";
import Tags from "@pages/index/_tags";
import Thumbs from "@pages/index/_thumbs";
import s from "./home.module.scss";

export default function Home({ data }) {
  const head = data.head;
  const tags = data.tags;
  // const ministers = data.minister;

  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [tag, setTag] = useState(tags);

  const [d_Subscribed, setd_Subscribed] = useState(true);
  const [title, setTitle] = useState(head.title);
  const [desc, setDesc] = useState(head.desc);
  const [ministers, setMinisters] = useState();

  const DEFAULT = {
    title: title,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  if (language != lang) {
    getHome(language)
      .then((data) => {
        setLang(language);
        setTitle(data.head.title);
        setDesc(data.head.desc);
        setTag(data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getMinisters = async () => {
    let data = await getPromotedMinisters();
    setMinisters(data.minister);
  };

  useEffect(() => {
    firebaseCloudMessaging.init();
    let session = new Session();
    let isSubscribed = session.getSubscribed();
    if (isSubscribed === "true") setd_Subscribed(false);

    getMinisters();
  }, []);

  return (
    <div className={s.home}>
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name="description" content={desc} />

          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:title" content={DEFAULT.title} />
          <meta name="twitter:site" content={DEFAULT.defaultOGURL} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
        </Head>

        <main>
          {/* heading */}
          <h1>
            {/* {pageData.title} */}
            Political networking platform for <span>citizens</span> &amp;{" "}
            <span className={s.grn}>leaders</span>.
          </h1>

          {/* Story Tags */}
          <div className={s.tags}>
            <Tags data={tag} />
          </div>

          {/* Neta */}
          <div className={s.neta}>
            <Thumbs data={ministers} />
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

export async function getServerSideProps({ req }) {
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      let language = res;
      data = await getHome(language);
    })
    .catch((err) => {
      console.log(err);
    });

  // let minister = await getPromotedMinisters();
  // Object.assign(data, minister);

  return {
    props: { data },
  };
}
