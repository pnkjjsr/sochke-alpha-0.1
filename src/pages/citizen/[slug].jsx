import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import base64Img from "base64-img";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getCitizen } from "@libs/firebase/citizen";
import { isLoggedIn } from "@utils/session";

import Layout from "@layouts/open";
import ThumbPhoto from "@components/Thumb/photo";

import s from "./citizen.module.scss";

export default function CitizenPublicProfile({ citizen, token }) {
  const router = useRouter();
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [sliceName, setSliceName] = useState(citizen.slug.split("-")[0]);
  const [dSignup, setDSignup] = useState("none");

  let imageUrl =
    citizen.photo ||
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media";

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
              <Button
                className={s.action}
                color="primary"
                variant="contained"
                size="small"
              >
                Upload Banner
              </Button>

              <figure>
                {citizen.bannerUrl ? (
                  <img
                    src={citizen.bannerUrl}
                    alt={`${citizen.name} profile banner`}
                  />
                ) : (
                  ""
                )}
              </figure>
              <ThumbPhoto src={citizen.photoURL} name={citizen.name} />
            </div>
          </Container>

          <Container>
            <div className={s.details}>
              <div className={s.header}>
                <h1>{citizen.name || sliceName}</h1>
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

  // if (citizen.photoURL.startsWith("data:")) {
  //   let photoName = citizen.slug.split("-")[0];
  //   let path = base64Img.imgSync(citizen.photoURL, "public/cache", photoName);
  //   let arr = path.split("/");
  //   let publicPath = `/${arr[1]}/${arr[2]}`;
  //   citizen.photo = publicPath;
  // }

  return {
    props: { citizen, token },
  };
}
