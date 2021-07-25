import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { getHome } from "@libs/contentful/head";
import { isLoggedIn } from "@utils/session";

import Layout from "@layouts/open/index";

import s from "./index.module.scss";

export default function Home({ head }) {
  const DEFAULT = {
    title: head.title,
    desc: head.desc,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage: head.image,
  };

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>{DEFAULT.title}</title>
        <meta name="description" content={DEFAULT.desc} />

        <meta property="og:url" content={DEFAULT.defaultOGURL} />
        <meta property="og:title" content={DEFAULT.title} />
        <meta name="twitter:site" content={DEFAULT.defaultOGURL} />
        <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
        <meta property="og:image" content={DEFAULT.defaultOGImage} />
      </Head>

      <Layout>
        <Container maxWidth="xl">
          <div className={s.index}>
            <div className={s.header}>
              <h1>
                Dashboard
                <small>Need to create Dashboard for user/leader.</small>
              </h1>
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
  let token = await isLoggedIn(req);

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  let head = await getHome();

  return {
    props: { head },
  };
}
