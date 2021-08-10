import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// import base64Img from "base64-img";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";

import { getCitizen } from "@libs/firebase/citizen";
import { isLoggedIn } from "@utils/session";

import Layout from "@layouts/open";
import ThumbPhoto from "@components/Thumb/photo";
import SimpleDialog from "@components/Mui/Dialog";

import FormType from "@sections/citizen/_formType";
import FormAddress from "@sections/citizen/_formAddress";
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

  const handleDialogOpen = (type) => {
    setOpenDialog(true);
    setDialogChildren(type);
  };

  const handleDialogClose = (value) => {
    setOpenDialog(false);

    if (!value) return;
    setState({ type: value });
  };

  const renderChildren = () => {
    switch (dialogChildren) {
      case "type":
        return <FormType user={citizen} close={handleDialogClose} />;
      case "address":
        return <FormAddress user={citizen} close={handleDialogClose} />;
      default:
        "";
    }
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

              {token == citizen.id ? (
                <Link href="/setting">
                  <a className={s.action}>Upload Banner</a>
                </Link>
              ) : (
                ""
              )}

              <div className={s.thumb}>
                {token == citizen.id ? (
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

            <div className={s.top}>
              <div className={s.header}>
                <small>
                  {state.type}

                  {token == citizen.id ? (
                    <span
                      className={s.action}
                      onClick={() => handleDialogOpen("type")}
                    >
                      <EditIcon />
                    </span>
                  ) : (
                    ""
                  )}
                </small>
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

            {token == citizen.id && !citizen.area ? (
              <div className={s.section}>
                <div>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDialogOpen("address")}
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
              ""
            )}
          </Container>

          <SimpleDialog open={openDialog} onClose={(e) => handleDialogClose(e)}>
            {renderChildren()}
          </SimpleDialog>

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
