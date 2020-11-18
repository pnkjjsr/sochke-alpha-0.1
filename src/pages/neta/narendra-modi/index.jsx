import react, { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "@layouts/open/index";
import deviceChecker from "@utils/deviceChecker";

import Photo from "./_photo";
import DetailM from "./_detailM";
import DetailW from "./_detailW";
import Bottom from "./_bottom";
import s from "./neta.module.scss";

export default function Story({ data }) {
  const [title, setTitle] = useState(
    "Narendra Modi | sochke.com/neta First Political Networking Platform of India"
  );
  const [desc, setDesc] = useState(
    "Shri Narendra Modi, Get all the information news, updates, speeches on the official website of Prime Minister of India."
  );
  const [isSmallDevice, setIsSmallDevice] = useState(true);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  return (
    <div className={s.neta}>
      <div className={s.container}>
        <Layout>
          <Head>
            <title>{title}</title>
            <meta name="description" content={desc} />
          </Head>

          <Photo />
          {isSmallDevice ? <DetailM /> : <DetailW />}

          <p className="notice">
            Disclaimer: This information is an archive of the candidate's
            self-declared affidavit that was filed during the elections. The
            current status of this information may be different. For the latest
            available information, please refer to the affidavit filed by the
            candidate to the Election Commission in the most recent election.
          </p>
          <Bottom />
        </Layout>
      </div>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  let isMobile = deviceChecker(req);

  let data = {
    isMobile: isMobile,
  };
  return {
    props: { data },
  };
}
