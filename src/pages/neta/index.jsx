import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { getPromotedMinisters } from "@libs/firebase/home";
import { getMinisters } from "@libs/firebase/neta";

import Layout from "@layouts/open";
import Thumbs from "@pages/index/_thumbs";

import s from "./index.module.scss";

export default function Neta({ data }) {
  const [promoted, setPromoted] = useState();
  const [trending, setTrending] = useState();
  const [isSmallDevice, setIsSmallDevice] = useState();

  const DEFAULT = {
    title:
      "Sochke | Political Networking | Society | Politics | Societal Issues",
    defaultOGURL: `https://sochke.com/neta`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

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

  const promotedMinister = async () => {
    let data = await getPromotedMinisters();
    setPromoted(data.minister);
  };

  const trendingMP = async () => {
    let data = await getMinisters();
    setTrending(data);
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;

    trendingMP();
    promotedMinister();
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>{DEFAULT.title}</title>
          <meta property="og:title" content={DEFAULT.title} />
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
          <meta name="twitter:title" content={DEFAULT.title} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
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
          </Container>

          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}
