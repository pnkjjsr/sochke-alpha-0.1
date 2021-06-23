import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { contentfulClient, getEntry } from "@libs/contentful";
import { getLanguage, isLoggedIn } from "@utils/session";
import { AuthContext } from "@contexts/Auth";

import Layout from "@layouts/open/index";
import SettingTabs from "@sections/setting/_tabs";

import s from "./setting.module.scss";

export default function Setting({ data }) {
  const head = data.items[0].fields;
  // const { authenticated } = useContext(AuthContext);
  // const [auth, setAuth] = useState(authenticated);

  const DEFAULT = {
    title: head.title,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>{DEFAULT.title}</title>
        <meta name="description" content={head.desc} />

        <meta property="og:url" content={DEFAULT.defaultOGURL} />
        <meta property="og:title" content={DEFAULT.title} />
        <meta name="twitter:site" content={DEFAULT.defaultOGURL} />
        <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
        <meta property="og:image" content={DEFAULT.defaultOGImage} />
      </Head>

      <Layout>
        <Container maxWidth="xl">
          <div className={s.setting}>
            <div className={s.header}>
              <h1>
                Setting
                <small>You can update your profile here!</small>
              </h1>
            </div>

            <div className={s.tabs}>
              <SettingTabs />
            </div>
          </div>
        </Container>
      </Layout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  );
}

export async function getServerSideProps({ req }) {
  let isAuth = await isLoggedIn(req);

  if (!isAuth) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  let data = await contentfulClient.getEntries({
    content_type: "pageHead",
    locale: "en-US",
    "fields.slug": "about",
  });

  return {
    props: { data },
  };
}
