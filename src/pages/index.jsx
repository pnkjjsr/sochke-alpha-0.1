import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import base64Img from "base64-img";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { isLoggedIn } from "@utils/session";
import { getUser } from "@libs/firebase/citizen";

import Layout from "@layouts/open/index";
import Header from "@sections/index/header";

import s from "./index.module.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 20,
    marginBottom: 30,
    textAlign: "center",
  },
});

export default function Home({ user }) {
  const classes = useStyles();
  const router = useRouter();

  let imageUrl =
    user.photo ||
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media";

  const DEFAULT = {
    title: "Sochke",
    defaultOGURL: `https://www.sochke.com/citizen/${user.slug}`,
    defaultOGImage: `${imageUrl}`,
  };

  const handleSetting = () => {
    router.push("/setting");
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{DEFAULT.title}</title>
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:title" content={DEFAULT.title} />
          <meta name="twitter:site" content={DEFAULT.defaultOGURL} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
        </Head>

        <Container maxWidth="xl">
          <div className={s.index}>
            <Header user={user} />

            <Paper className={classes.root} elevation={4}>
              <Typography variant="body2" component="p">
                Update profile &amp; address in the setting.
              </Typography>
              <br />

              <Button
                color="primary"
                variant="contained"
                onClick={handleSetting}
              >
                Update Your Profile
              </Button>
            </Paper>

            <div className={s.notice}>
              I'm working on the "<b>Contribution</b>" board. Let's joint hand
              in development.
              <br />
              <br />
              Here, you can easily share your work, progress, development,
              problems, and hurdles as a <b>LEADER</b>.
              <br />
              <br />
              And appreciation, thoughts, wishes, complaints, anger, and rant as{" "}
              <b>CITIZEN</b>.
              <br />
              <br />
              <b>You have the idea!</b>
              <br />
              share with me on email:{" "}
              <a href="mailto:contact@sochke.com">contact@sochke.com</a>
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

  let user = await getUser(token);

  // if (user.photoURL.startsWith("data:")) {
  //   let photoName = user.slug.split("-")[0];
  //   let path = base64Img.imgSync(user.photoURL, "public/cache", photoName);
  //   let arr = path.split("/");
  //   let publicPath = `/${arr[1]}/${arr[2]}`;
  //   user.photo = publicPath;
  // }

  return {
    props: { user },
  };
}
