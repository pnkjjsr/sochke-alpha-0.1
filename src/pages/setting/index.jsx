import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { AuthContext } from "@contexts/Auth";
import firebaseAuth from "@libs/firebase/auth";
import { getUser } from "@libs/firebase/user";
import { contentfulClient, getEntry } from "@libs/contentful";
import { isLoggedIn } from "@utils/session";

import Layout from "@layouts/open/index";
import SettingTabs from "@sections/setting/_tabs";

import s from "./setting.module.scss";

export default function Setting({ data }) {
  const { setProfile } = useContext(AuthContext);
  const head = data.items[0].fields;
  const [user, setUser] = useState();

  const DEFAULT = {
    title: head.title,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  useEffect(() => {
    let auth = new firebaseAuth();
    auth
      .currentUser()
      .then(async (user) => {
        let token = user.uid;
        let userData = await getUser(token);
        setUser(userData);
        setProfile(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              {!user ? "Loading.." : <SettingTabs data={user} />}
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
