import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Container from "@material-ui/core/Container";

import { getLanguage } from "@utils/session";

import { getPromotedMinisters } from "@libs/firebase/home";
import { getMinister } from "@libs/firebase/neta";

import Layout from "@layouts/open";
import Thumbs from "@pages/index/_thumbs";

import s from "./index.module.scss";

export default function Neta({ data }) {
  const [ministers, setMinisters] = useState();

  const DEFAULT = {
    title:
      "Sochke | Political Networking | Society | Politics | Societal Issues",
    defaultOGURL: `https://sochke.com/neta`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  const getMinisters = async () => {
    let data = await getPromotedMinisters();
    setMinisters(data.minister);
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;

    getMinisters();
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
                <h2>Trending Leaders</h2>
              </div>

              <div className={s.neta}>
                <Thumbs data={ministers} />
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
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      // data = await getHome(res);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(data);

  return {
    props: data,
  };
}
