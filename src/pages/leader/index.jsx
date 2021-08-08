import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { getCitizen } from "@libs/firebase/citizen";
import { isLoggedIn } from "@utils/session";

import Layout from "@layouts/open";
import ThumbPhoto from "@components/Thumb/photo";

import s from "./index.module.scss";

export default function CitizenPublicProfile({ citizen, token }) {
  const router = useRouter();
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [sliceName, setSliceName] = useState(citizen.slug.split("-")[0]);
  const [dSignup, setDSignup] = useState("none");

  let imageUrl =
    citizen.photo ||
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media";

  let bannerUrl =
    citizen.bannerUrl ||
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fglobal%2Fsochke-banner.png?alt=media&token=6da487e1-3b49-43db-bd6e-bc6f2ba609cc";

  const DEFAULT = {
    title: `${citizen.name || sliceName} | Responsible citizen of ${
      citizen.country
    }`,
    defaultOGURL: `https://www.sochke.com/neta/${citizen.slug}`,
    defaultOGImage: `${imageUrl}`,
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;

    if (token == false) setDSignup("block");
  }, []);

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
          <Container>
            <div className={s.banner}>
              <figure>
                <img src={bannerUrl} alt={`${citizen.name} profile banner`} />
              </figure>

              {token ? (
                <Link href="/setting">
                  <a className={s.action}>Upload Banner</a>
                </Link>
              ) : (
                ""
              )}

              <div className={s.thumb}>
                {token ? (
                  <Link href="/setting">
                    <a className={s.action}>
                      <PhotoCameraIcon />
                    </a>
                  </Link>
                ) : (
                  ""
                )}

                <ThumbPhoto src={citizen.photoURL} name={citizen.name} />
              </div>
            </div>

            <div className={s.details}>
              <div className={s.header}>
                <h1>{citizen.name || sliceName}</h1>
                <small>A responsible citizen of {citizen.country}</small>
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
