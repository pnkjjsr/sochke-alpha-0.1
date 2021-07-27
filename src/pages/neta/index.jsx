import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { GlobalContext } from "@contexts/Global";
import { getLanguage } from "@utils/session";

import { getNetaHead } from "@libs/contentful/head/neta";
import { getPromotedMinisters } from "@libs/firebase/home";
import { getMinisters } from "@libs/firebase/neta";

import Layout from "@layouts/open";
import Thumbs from "@sections/home/_thumbs";

import s from "./index.module.scss";

export default function Neta({ data }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [title, setTitle] = useState(data.head.title);
  const [desc, setDesc] = useState(data.head.desc);

  const [promoted, setPromoted] = useState(data.promotedMinisters);
  const [trending, setTrending] = useState(data.trendingMinisters);
  const [isSmallDevice, setIsSmallDevice] = useState();

  const DEFAULT = {
    title: title,
    desc: desc,
    keyword: data.head.tags,
    defaultOGURL: `https://sochke.com/neta`,
    defaultOGImage: data.head.image,
  };

  if (language != lang) {
    getNetaHead(language)
      .then((data) => {
        setLang(language);
        setTitle(data.head.title);
        setDesc(data.head.desc);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const renderMinister = () => {
    if (!trending) return null; //@TODO: 23rd Feb 2021 | LOADER can be added here

    return Object.values(trending).map((arr, i) => {
      let type = arr[0].type;

      return (
        <section key={i} className={s.section}>
          <div className={s.header}>
            <h2>Delhi Trending {type}s</h2>
          </div>

          <div className={s.neta}>
            <Thumbs data={arr} />
          </div>
        </section>
      );
    });
  };

  const genCharArray = (charA, charZ) => {
    var a = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
  };

  const renderAlphabetical = () => {
    let alpha = genCharArray("a", "z");

    return alpha.map((item, i) => {
      return (
        <li key={i}>
          <Link href={`/neta/alpha/${item}`}>
            <a>{item}</a>
          </Link>
        </li>
      );
    });
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>{DEFAULT.title}</title>
          <meta name="keywords" content={DEFAULT.keyword}></meta>
          <meta name="description" content={DEFAULT.desc} />
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:title" content={DEFAULT.title} />
          <meta property="og:description" content={DEFAULT.desc} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
        </Head>

        <div className={s.neta}>
          <Container maxWidth="xl">
            <div className={s.header}>
              <h1>Indian trending leaders.</h1>
            </div>

            {/* Neta */}
            <section className={s.section}>
              <div className={s.header}>
                <h2>National Trending Leaders</h2>
              </div>

              <div className={s.neta}>
                <Thumbs data={promoted} />
              </div>
            </section>

            {renderMinister()}

            <section className={s.section}>
              <div className={s.header}>
                <h2>Search your leader alphabetically.</h2>
              </div>

              <div className={s.alphabet}>
                <ul>{renderAlphabetical()}</ul>
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

export async function getServerSideProps({ req }) {
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      data = await getNetaHead(res);
    })
    .catch((err) => {
      console.log(err);
    });

  data.promotedMinisters = await getPromotedMinisters();
  data.trendingMinisters = await getMinisters();

  return {
    props: { data },
  };
}
