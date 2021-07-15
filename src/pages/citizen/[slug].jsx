import { useState, useEffect, useContext } from "react";
import Head from "next/head";

import Container from "@material-ui/core/Container";

import { GlobalContext } from "@contexts/Global";

import Layout from "@layouts/open";

import Thumbs from "@sections/citizen/_thumbs";

import s from "./citizen.module.scss";

export default function CitizenPublicProfile({ citizen }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [isSmallDevice, setIsSmallDevice] = useState(true);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  const DEFAULT = {
    // title: `${minister.name} ${minister.title} ${minister.party}`,
    // defaultOGURL: `https://www.sochke.com/neta/${minister.slug}`,
    // defaultOGImage: `${minister.imageUrl}`,
  };

  if (language != lang) {
    getHome(language)
      .then((data) => {
        setLang(language);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{DEFAULT.title}</title>

          {/* <meta property="og:title" content={DEFAULT.title} />
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />

          <meta name="twitter:title" content={DEFAULT.title} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} /> */}
        </Head>

        <div className={s.citizen}>
          <Container>{/* <Thumbs data={citizens} /> */}</Container>

          {/* <Bottom data={DEFAULT} /> */}
          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // let citizen = await getMinister(params.slug);

  return {
    props: {},
  };
}
