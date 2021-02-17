import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Container from "@material-ui/core/Container";

import { firebaseCloudMessaging } from "@libs/firebase/cloudMessaging";

import { Cookie } from "@utils/session";
import { Session, getLanguage } from "@utils/session";

import Layout from "@layouts/open/index";

import SubscribeSmall from "@components/Subscribe/small";
import StoryThumb from "@components/Thumb/story";

import GlobalContext from "@contexts/GlobalContext";
import { getHome } from "@libs/contentful/home";
import { getPromotedMinisters } from "@libs/firebase/home";
import Tags from "@pages/index/_tags";
import Thumbs from "@pages/index/_thumbs";
import s from "./home.module.scss";

export default function Home({ data }) {
  const head = data.head;
  const tags = data.tags;
  const latestStory = data.story;
  const clientLang = data.language;

  const { language, setLanguage } = useContext(GlobalContext);
  let cookie = new Cookie();
  let cookieLang = cookie.getCookie("language");
  if (!cookieLang) setLanguage(clientLang);

  const [lang, setLang] = useState(language);
  const [tag, setTag] = useState(tags);
  const [story, setStory] = useState(latestStory);

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
        setStory(data.story);
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
    <>
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

        <div className={s.home}>
          <Container maxWidth="xl">
            {/* heading */}
            <h1>
              {/* {pageData.title} */}
              Political networking platform for <span>citizens</span> &amp;{" "}
              <span className={s.grn}>leaders</span>.
            </h1>

            <div className={s.ticket}>
              Upcoming legislative election April 2021, Assam, Kerala,
              Puducherry, Tamil Nadu, West Bengal
            </div>

            {/* Neta */}
            <section className={s.section}>
              <h2>Trending Leaders</h2>
              <div className={s.neta}>
                <Thumbs data={ministers} />
              </div>
            </section>
            {/* Latest Story */}
            <section className={`${s.section} ${s.card}`}>
              <h2>Latest Story</h2>
              <StoryThumb data={story} />
            </section>
            {/* Story Tags */}
            <div className={s.tags}>
              <Tags data={tag} />

              <div>
                <Link href="/story">
                  <a>Check All Story</a>
                </Link>
              </div>
            </div>
            {/* Subscriber */}
            <div className={s.subscribe}>
              {d_Subscribed ? <SubscribeSmall /> : ""}
            </div>
          </Container>
        </div>
      </Layout>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  );
}

export async function getServerSideProps({ req }) {
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      data = await getHome(res);
      data.language = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: { data },
  };
}
