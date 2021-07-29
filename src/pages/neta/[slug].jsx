import { useState, useEffect, useContext } from "react";
import Head from "next/head";
// import base64Img from "base64-img";
import Container from "@material-ui/core/Container";

import { GlobalContext } from "@contexts/Global";
import { getMinister } from "@libs/firebase/neta";
import Wiki from "@utils/openApi/wiki";
import Youtube from "@utils/openApi/youtube";

import Layout from "@layouts/open";
import Photo from "@sections/neta/_photo";
import DetailM from "@sections/neta/_detailM";
import DetailW from "@sections/neta/_detailW";
import About from "@sections/neta/_about";
import SocialTabs from "@sections/neta/_socialTabs";
import Bottom from "@sections/neta/_bottom";
import s from "./neta.module.scss";

export default function NetaLanding({ neta, para, ytSearch }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [minister, setMinister] = useState(neta);
  const [paragraph, setParagraph] = useState(para);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  if (!minister) return "";

  let imageUrl =
    neta.photo ||
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media";

  const DEFAULT = {
    title: `${minister.name} ${minister.title} ${minister.party}`,
    defaultOGURL: `https://www.sochke.com/neta/${minister.slug}`,
    defaultOGImage: `${imageUrl}`,
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
          <Photo data={neta} />
          {isSmallDevice ? <DetailM data={neta} /> : <DetailW data={neta} />}

          <Container>
            <p className={`notice ${s.notice}`}>
              Disclaimer: This information is an archive of the candidate's
              self-declared affidavit that was filed during the elections. The
              current status of this information may be different. For the
              latest available information, please refer to the affidavit filed
              by the candidate to the Election Commission in the most recent
              election.
            </p>

            <About data={paragraph} />
            <p className="notice">
              Disclaimer: About directly getting from wiki page by keyword: "
              {minister.name}"
            </p>

            <SocialTabs twitter={minister.twitterHandle} youtube={ytSearch} />
            <p className="notice">
              Disclaimer: Tweets, directly from twitter widget and youtube data
              is last search by keyword: "{minister.name} {minister.party}"
            </p>
          </Container>

          <Bottom data={DEFAULT} />
          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let neta = await getMinister(params.slug);

  let yt = new Youtube();
  let ytSearch = await yt.getSearchList(`${neta.name} ${neta.party}`);

  let wiki = new Wiki();
  let para = await wiki.getShortIntro(neta.name);
  if (!para.para) para.para = "Description not available.";

  // if (neta.imageUrl.startsWith("data:")) {
  //   let photoName = neta.slug.split("-")[0];
  //   let path = base64Img.imgSync(neta.imageUrl, "public/cache", photoName);
  //   let arr = path.split("/");
  //   let publicPath = `/${arr[1]}/${arr[2]}`;
  //   neta.photo = publicPath;
  // }

  return {
    props: { neta, para, ytSearch },
  };
}
