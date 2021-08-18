import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogChildren, setDialogChildren] = useState();
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [sliceName, setSliceName] = useState(citizen.slug.split("-")[0]);
  const [dSignup, setDSignup] = useState("none");

  const [state, setState] = useState({
    type: citizen.type,
  });

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

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleSetting = () => {
    router.push("/setting");
  };

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;

    if (token == false) setDSignup("block");
  }, []);

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

              <div className={s.thumb}>
                <ThumbPhoto src={citizen.photoURL} name={citizen.name} />
              </div>
            </div>

            {/* User Info */}
            <div className={s.top}>
              <div className={s.header}>
                <small>{state.type}</small>
                <h1>{citizen.name || sliceName}</h1>
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

            {/* Constituency and Leader links */}
            {token == citizen.id && !citizen.area ? (
              <div className={s.section}>
                <div className={s.address}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={handleSetting}
                  >
                    Add Your Address
                  </Button>
                </div>
                <p>
                  Always get updated! Know more about your ‘Locality’.
                  <br />
                  Share, discuss and review together about what is best and
                  worst in your locality.
                </p>
              </div>
            ) : (
              <>
                <div className={s.section}>
                  <div className={s.scrollable}>
                    <div className={s.demothumb}>
                      <figure>
                        <img
                          src="/images/thumb-area.png"
                          alt="Area Thumbnail"
                        />
                      </figure>
                      <figcaption>{citizen.area || "Area"}</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure>
                        <img
                          src="/images/thumb-district.png"
                          alt="Area Thumbnail"
                        />
                      </figure>
                      <figcaption>{citizen.district || "District"}</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure>
                        <img
                          src="/images/thumb-city.png"
                          alt="Area Thumbnail"
                        />
                      </figure>
                      <figcaption>{citizen.city || "City"}</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure>
                        <img
                          src="/images/thumb-country.png"
                          alt="Area Thumbnail"
                        />
                      </figure>
                      <figcaption>{citizen.country || "Country"}</figcaption>
                    </div>
                  </div>
                </div>

                <div className={s.section}>
                  <div className={s.scrollable}>
                    <div className={s.demothumb}>
                      <figure></figure>
                      <figcaption>Councillor</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure></figure>
                      <figcaption>Minister of Legislative Assembly</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure></figure>
                      <figcaption>Member of Parliament</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure></figure>
                      <figcaption>Chief Minister</figcaption>
                    </div>

                    <div className={s.demothumb}>
                      <figure></figure>
                      <figcaption>Prime Minister</figcaption>
                    </div>
                  </div>
                </div>
              </>
            )}
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
