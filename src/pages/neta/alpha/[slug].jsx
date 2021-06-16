import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { getLanguage } from "@utils/session";
import { getHome } from "@libs/contentful/home";
import { getMinistersByChar } from "@libs/firebase/neta";

import Layout from "@layouts/open";
import Thumbs from "@sections/index/_thumbs";

import s from "../index.module.scss";

export default function NetaLanding({ ministers, slug, head, language }) {
  const [lang, setLang] = useState(language);
  const [isSmallDevice, setIsSmallDevice] = useState(true);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  const DEFAULT = {
    title: head.title,
    desc: head.desc,
    keyword: head.tags,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  return (
    <>
      <Layout>
        <Head>
          {/* <title>{DEFAULT.title}</title>
          <meta property="og:title" content={DEFAULT.title} />
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
          <meta name="twitter:title" content={DEFAULT.title} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} /> */}
        </Head>

        <div className={s.neta}>
          <Container maxWidth="xl">
            <div className={s.header}>
              <h1>Leaders by ({slug}) alphabet</h1>
            </div>

            <section className={s.section}>
              <div className={s.header}>
                <h2>Leaders</h2>
              </div>

              <div className={`${s.neta} ${s.ofNone}`}>
                {ministers.length <= 0 ? (
                  `No leader available by (${slug})`
                ) : (
                  <Thumbs data={ministers} />
                )}
              </div>
            </section>
          </Container>

          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  let head = "";
  let language = "";
  let slug = params.slug;
  let ministers = await getMinistersByChar(params.slug);

  await getLanguage(req)
    .then(async (res) => {
      head = await getHome(res);
      language = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: { head, language, ministers, slug },
  };
}
