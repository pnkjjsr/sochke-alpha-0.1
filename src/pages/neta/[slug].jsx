import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { Session, getLanguage } from "@utils/session";
import { GlobalContext } from "@contexts/Global";

import { getMinister } from "@libs/firebase/neta";

import Layout from "@layouts/open";

import Photo from "./_photo";
import DetailM from "./_detailM";
import DetailW from "./_detailW";
import Bottom from "./_bottom";
import s from "./neta.module.scss";

export default function NetaLanding(props) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [minister, setMinister] = useState(props.minister);

  const getNeta = async () => {
    let data = await getMinister(props.slug);
    setMinister(data.minister);
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;

    getNeta();
  }, []);

  if (!minister) return "";

  const DEFAULT = {
    title: `${minister.name} ${minister.title} ${minister.party}`,
    defaultOGURL: `https://www.sochke.com/neta/${minister.slug}`,
    defaultOGImage: `${minister.imageUrl}`,
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

          <meta property="og:title" content={DEFAULT.title} />
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />

          <meta name="twitter:title" content={DEFAULT.title} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
        </Head>

        <div className={s.neta}>
          <Photo data={minister} />

          {isSmallDevice ? (
            <DetailM data={minister} />
          ) : (
            <DetailW data={minister} />
          )}

          <p className={`notice ${s.notice}`}>
            Disclaimer: This information is an archive of the candidate's
            self-declared affidavit that was filed during the elections. The
            current status of this information may be different. For the latest
            available information, please refer to the affidavit filed by the
            candidate to the Election Commission in the most recent election.
          </p>

          <Bottom data={DEFAULT} />

          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  return {
    props: params,
  };
}
