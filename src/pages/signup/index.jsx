import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";

import { contentfulClient, getEntry } from "@libs/contentful";
import { getLanguage } from "@utils/session";
import { AuthContext } from "@contexts/Auth";

import Layout from "@layouts/open/index";
import FirebaseUI from "@components/Firebase/FirebaseUI";

import s from "./signup.module.scss";

export default function About({ data }) {
  const router = useRouter();
  const head = data.items[0].fields;
  const { authenticated } = useContext(AuthContext);
  const [auth, setAuth] = useState(authenticated);

  const DEFAULT = {
    title: head.title,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  if (authenticated != auth) router.push("/");

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
          <div className={s.signup}>
            <div className={s.header}>
              <h1>
                Signup
                <small>It's Free! to contribute in your society</small>
              </h1>
            </div>

            <div className={s.provider}>
              <FirebaseUI />
            </div>
          </div>
        </Container>
      </Layout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  );
}

export async function getStaticProps() {
  let data = await contentfulClient.getEntries({
    content_type: "pageHead",
    locale: "en-US",
    "fields.slug": "about",
  });

  return {
    props: { data },
  };
}
