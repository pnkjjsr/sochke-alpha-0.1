import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { GlobalContext } from "@contexts/Global";
import { getCitizen } from "@libs/firebase/citizen";
import { isLoggedIn } from "@utils/session";

import Layout from "@layouts/open";
import ThumbPhoto from "@components/Thumb/photo";

import s from "./citizen.module.scss";

export default function CitizenPublicProfile({ citizen, token }) {
  const router = useRouter();
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [sliceName, setSliceName] = useState(citizen.slug.split("-")[0]);
  const [dSignup, setDSignup] = useState("none");

  const DEFAULT = {
    title: `${citizen.name || sliceName} | responsible citizen of ${
      citizen.country
    }`,
    defaultOGURL: `https://www.sochke.com/neta/${citizen.slug}`,
    defaultOGImage: `${citizen.photoURL}`,
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;

    if (token == false) setDSignup("block");
  }, []);

  if (language != lang) {
    getHome(language)
      .then((data) => {
        setLang(language);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSignup = () => {
    router.push("/signup");
  };

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

        <div className={s.citizen}>
          <div className={s.banner}>
            <Container>
              <ThumbPhoto src={citizen.photoURL} name={citizen.name} />
            </Container>
          </div>

          <Container>
            <div className={s.details}>
              <div className={s.header}>
                <h2>{citizen.name || sliceName}</h2>
                <small>I'm responsible citizen of {citizen.country}</small>
              </div>

              <Box component="div" display={dSignup}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleSignup}
                >
                  Signup
                </Button>

                <Typography variant="caption" display="block" gutterBottom>
                  Claim your account!
                </Typography>
              </Box>
            </div>
          </Container>

          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  let citizen = await getCitizen(params.slug);
  let token = await isLoggedIn(req);

  return {
    props: { citizen, token },
  };
}
