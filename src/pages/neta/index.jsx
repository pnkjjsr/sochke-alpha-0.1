import Head from "next/head";

import Layout from "@layouts/open/index";

import Photo from "./_photo";
import Detail from "./_detail";
import Bottom from "./_bottom";
import s from "./neta.module.scss";

export default function Story() {
  const DEFAULT = {
    TITLE: "",
    DESC: "",
  };

  return (
    <div className={s.neta}>
      <div className={s.container}>
        <Layout>
          <Head>
            <title>{DEFAULT.TITLE}</title>
            <meta name="description" content={DEFAULT.DESC} />
          </Head>

          <main>
            <Photo />
            <Detail />
            <Bottom />
          </main>
        </Layout>
      </div>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}
