import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { GlobalContext } from "@contexts/Global";
import { Session, getLanguage, isLoggedIn } from "@utils/session";
import { firebaseCloudMessaging } from "@libs/firebase/cloudMessaging";
import { getHome } from "@libs/contentful/head/home";
import { getPromotedMinisters } from "@libs/firebase/home";

import Layout from "@layouts/open/index";
import SubscribeSmall from "@components/Subscribe/small";
import StoryThumb from "@components/Thumb/story";

import Tags from "@sections/home/_tags";
import Thumbs from "@sections/home/_thumbs";
import AuthAction from "@sections/home/_authAction";
import s from "./home.module.scss";

export default function Home({ data }) {
  const { language, setLanguage } = useContext(GlobalContext);
  const head = data.head;
  const tags = data.tags;
  const latestStory = data.story;
  const clientLang = data.language;

  const [lang, setLang] = useState(language);
  const [tag, setTag] = useState(tags);
  const [story, setStory] = useState(latestStory);
  const [languages, setLanguages] = useState(head.languages);

  const [d_Subscribed, setd_Subscribed] = useState(true);
  const [title, setTitle] = useState(head.title);
  const [desc, setDesc] = useState(head.desc);
  const [ministers, setMinisters] = useState(data.promotedMinisters);

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
        setLanguages(data.head.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setLanguage(clientLang);

    firebaseCloudMessaging.init();
    let session = new Session();
    let isSubscribed = session.getSubscribed();
    if (isSubscribed === "true") setd_Subscribed(false);
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
              Sochke, political networking platform for <span>
                citizens
              </span>{" "}
              &amp; <span className={s.grn}>leaders</span>.
            </h1>

            <div className={s.authAction}>
              <AuthAction />
            </div>

            {languages?.ticker ? (
              <div className={s.ticket}>{languages?.ticker}</div>
            ) : (
              ""
            )}

            {/* Neta */}
            <section className={s.section}>
              <div className={s.header}>
                <h2>Trending Leaders</h2>

                <Link href="/neta">
                  <a>view all</a>
                </Link>
              </div>

              <div className={s.neta}>
                <Thumbs data={ministers} />
              </div>
            </section>

            {/* Latest Story */}
            <section className={`${s.section} ${s.card}`}>
              <div className={s.header}>
                <h2>Latest Story</h2>

                <Link href="/story">
                  <a>view all</a>
                </Link>
              </div>

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

            {/* Faq */}
            <section className={`${s.section} ${s.mb_0}`}>
              <div className={s.header}>
                <h2>FAQ's</h2>
              </div>

              <div className={s.context}>
                <h3>What is 'Sochke'?</h3>
                <p>
                  Sochke is a technology and data-driven platform that enables
                  citizens to connect with their area minister and minister’s
                  work, experience and background.
                </p>

                <h3>What is 'Political Networking Platform'?</h3>
                <p>
                  Sochke is a 'political networking platform' that enables users
                  to connect with other users. And it's a digital platform that
                  empowers citizens to contribute to their constituencies to
                  make it a better place.
                </p>

                <h3>What is 'Story'?</h3>
                <p>
                  Sochke (Alpha 0.1), platform helps you get updated with all
                  the latest political news. We try to provide all the latest
                  information related to 'Politics' in short and simple manner.
                  Source of the information is realiable and trusted indian
                  media (online/offline/paper).
                </p>
              </div>
            </section>

            {/* Hidden Context */}
            <Box component="div" display="none">
              <Link href="/citizen">
                <a className="d-none">Citizen</a>
              </Link>
            </Box>
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

  data.promotedMinisters = await getPromotedMinisters();

  return {
    props: { data },
  };
}
