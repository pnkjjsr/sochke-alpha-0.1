import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { getLanguage } from "@utils/session";
import { getNetaHead } from "@libs/contentful/neta";

import Layout from "@layouts/open";

import s from "./index.module.scss";

export default function Citizen({ data }) {
  const head = data.head;
  const [isSmallDevice, setIsSmallDevice] = useState();

  const DEFAULT = {
    title: head.title,
    desc: head.desc,
    keyword: head.tags,
    defaultOGURL: `https://sochke.com/neta`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
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
          <Link href={`/citizen/alpha/${item}`}>
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

        <div className={s.citizen}>
          <Container maxWidth="xl">
            <div className={s.header}>
              <h1>Aware and awake Citizens.</h1>
            </div>

            <section className={s.section}>
              <div className={s.header}>
                <h2>Citizen via alphabet.</h2>
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

  return {
    props: { data },
  };
}
