import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { firebaseCloudMessaging } from "@libs/firebase/cloudMessaging";

import { Session, getLanguage } from "@utils/session";
import Layout from "@layouts/open/index";

import NetaThumb from "@components/Neta/thumb";
import SubscribeSmall from "@components/Subscribe/small";

import GlobalContext from "@contexts/GlobalContext";
import { getHome } from "@libs/contentful/home";
import Tags from "@pages/index/_tags";
import s from "./home.module.scss";

export default function Home({ data }) {
  const head = data.head;
  const tags = data.tags;
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [tag, setTag] = useState(tags);

  const [d_Subscribed, setd_Subscribed] = useState(true);
  const [title, setTitle] = useState(head.title);
  const [desc, setDesc] = useState(head.desc);

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

  useEffect(() => {
    firebaseCloudMessaging.init();
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

          {/* Neta */}
          <div className={s.neta}>
            <div>
              <Link href="/neta/narendra-modi">
                <a>
                  <NetaThumb
                    name="Narendra Modi"
                    src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Fnarendra-modi.png?alt=media&token=afe4e029-512c-462c-a56e-5fa80cc0e991"
                    like="999"
                  />
                </a>
              </Link>
            </div>

            {/* <div>
              <Link href="/neta/rahul-gandhi">
                <a>
                  <NetaThumb
                    name="Rahul Gandhi"
                    src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Frahul-gandhi.png?alt=media&token=c6368ad6-1100-4b7e-a1c9-111a31f6d374"
                    like="450"
                  />
                </a>
              </Link>
            </div>

            <div>
              <Link href="/neta/arvind-kejriwal">
                <a>
                  <NetaThumb
                    name="Arvind Kejriwal"
                    src="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fthumb_90x90%2Farvind-kejriwal.png?alt=media&token=90e5f567-8b3c-43df-91b3-c2d111cfaa48"
                    like="780"
                  />
                </a>
              </Link>
            </div> */}
          </div>

          {/* Story Tags */}
          <div className={s.tags}>
            <Tags data={tag} />
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

  return {
    props: { data },
  };
}
