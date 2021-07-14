import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { getLanguage } from "@utils/session";
import { getHome } from "@libs/contentful/home";
import { getCitizensByChar } from "@libs/firebase/citizen";

import Layout from "@layouts/open";
import Thumbs from "@sections/index/_thumbs";

import s from "../index.module.scss";

export default function CitizenAlphabetic({ citizens, slug, head, language }) {
  console.log(citizens);
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

        <div className={s.citizen}>
          <Container maxWidth="xl">
            <div className={s.header}>
              <h1>Citizens by ({slug}) alphabet</h1>
            </div>

            <section className={s.section}>
              <div className={s.header}>
                <h2>Citizens</h2>
              </div>

              <div className={`${s.thumb} ${s.ofNone}`}>
                {citizens.length <= 0 ? (
                  `No citizen available by (${slug})`
                ) : (
                  <Thumbs data={citizens} />
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
  let citizens = await getCitizensByChar(params.slug);

  await getLanguage(req)
    .then(async (res) => {
      head = await getHome(res);
      language = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: { head, language, citizens, slug },
  };
}
