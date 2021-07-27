import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { isLoggedIn } from "@utils/session";
import { getUser } from "@libs/firebase/citizen";

import Layout from "@layouts/open/index";
import Header from "@sections/index/header";

import s from "./index.module.scss";
import { CenterFocusWeak } from "@material-ui/icons";

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

  const DEFAULT = {
    title: "Sochke",
    defaultOGURL: `https://www.sochke.com/citizen/${user.slug}`,
    defaultOGImage: user.photoURL,
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

  return {
    props: { user },
  };
}
