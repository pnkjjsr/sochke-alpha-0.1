import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";

import firebaseAuth from "@libs/firebase/auth";
import { getUser } from "@libs/firebase/user";
import { getLeader } from "@libs/firebase/leader";
import { contentfulClient } from "@libs/contentful";
import { isLoggedIn } from "@utils/session";

import ThumbPhoto from "@components/Thumb/photo";
import SimpleDialog from "@components/Mui/Dialog";
import Layout from "@layouts/open/index";

import FormType from "@sections/profile/_formType";
import FormAddress from "@sections/profile/_formAddress";
import FormParty from "@sections/profile/_formParty";
import s from "@sections/profile/index.module.scss";

export default function Profile({ data }) {
  const router = useRouter();
  const head = data.items[0].fields;

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogChildren, setDialogChildren] = useState();

  const [user, setUser] = useState();
  const [leader, setLeader] = useState();
  const [banner, setBanner] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fglobal%2Fsochke-banner.png?alt=media&token=6da487e1-3b49-43db-bd6e-bc6f2ba609cc"
  );
  const [address, setAddress] = useState();
  const [type, setType] = useState();
  const [party, setParty] = useState();

  const DEFAULT = {
    title: head.title,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleDialogOpen = (type) => {
    setOpenDialog(true);
    setDialogChildren(type);
  };

  const handleDialogClose = (key, value) => {
    setOpenDialog(false);

    if (!value) return;
    switch (key) {
      case "address":
        setAddress(value);
        break;
      case "type":
        setType(value);
        break;
      case "party":
        setParty(value);
        break;

      default:
        break;
    }
  };

  const renderChildren = () => {
    switch (dialogChildren) {
      case "type":
        return <FormType user={user} close={handleDialogClose} />;
      case "address":
        return <FormAddress user={user} close={handleDialogClose} />;
      case "politician":
        return <FormParty user={user} close={handleDialogClose} />;
      default:
        "";
    }
  };

  useEffect(async () => {
    let auth = new firebaseAuth();
    await auth
      .currentUser()
      .then(async (user) => {
        let token = user.uid;
        let userData = await getUser(token);
        setUser(userData);
        setType(userData.type);
        setAddress({
          address: userData.address,
          city: userData.city,
          pincode: userData.pincode,
        });

        let leaderData = await getLeader(userData.leaderId);
        setLeader(leaderData);
        setParty({
          name: leaderData.party,
          nameShort: leaderData.partyShort,
          logo: leaderData.partyLogo,
        });
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
        <Container>
          <div className={s.profile}>
            {!user?.id ? (
              "...loading"
            ) : (
              <>
                {/* Banner */}
                <div className={s.banner}>
                  <figure>
                    <img
                      src={user.bannerUrl || banner}
                      alt={`${user.name} profile banner`}
                    />
                  </figure>

                  <Link href="/setting">
                    <a className={s.action}>Upload Banner</a>
                  </Link>

                  <div className={s.thumb}>
                    <Link href="/setting">
                      <a className={s.action}>
                        <PhotoCameraIcon />
                      </a>
                    </Link>

                    <ThumbPhoto src={user.photoURL} name={user.name} />
                  </div>
                </div>

                {/* User Info */}
                <div className={s.top}>
                  <div className={s.header}>
                    <small>
                      {type || user.type}
                      <span
                        className={s.action}
                        onClick={() => handleDialogOpen("type")}
                      >
                        <EditIcon />
                      </span>
                    </small>
                    <h1>{user.displayName}</h1>
                  </div>
                </div>

                {/* Constituency and Leader links */}
                {!address?.pincode ? (
                  <div className={s.section}>
                    <div className={`${s.address} ${s.add}`}>
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDialogOpen("address")}
                      >
                        Add Your Address
                      </Button>
                    </div>
                    <p className={s.note}>
                      Always get updated! Know more about your ‘Locality’.
                      <br />
                      Share, discuss and review together about what is best and
                      worst in your locality.
                    </p>
                  </div>
                ) : (
                  <div className={s.section}>
                    <div className={`${s.address} ${s.update}`}>
                      <p>
                        {`${address.address},`}
                        <br />
                        {`${address.city}, ${address.country} - ${address.pincode}`}
                      </p>

                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleDialogOpen("address")}
                      >
                        Update Your Address
                      </Button>
                    </div>
                  </div>
                )}

                {/* Leader */}
                {type == "politician" ? (
                  !party?.name ? (
                    <div className={`${s.section} ${s.bg}`}>
                      <div className={s.header}>
                        <h2>Your Politician Profile</h2>
                      </div>

                      <div className={s.info}>
                        <figure>
                          <img
                            src="/images/vector-politician.png"
                            alt="Politician Vector"
                          />
                        </figure>
                        <figcaption>
                          Update profile helps citizen’s to find you and learn
                          about your work.
                        </figcaption>
                      </div>

                      <div className={s.action}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDialogOpen("politician")}
                        >
                          Update Party Detail
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={`${s.section} ${s.party}`}>
                      <figure>
                        <img
                          src={party.logo}
                          alt={party.name}
                          title={party.name}
                        />
                      </figure>

                      <h3>
                        {party.nameShort}
                        <small>{party.name}</small>
                      </h3>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleDialogOpen("politician")}
                      >
                        Edit
                      </Button>
                    </div>
                  )
                ) : (
                  "" //user.type
                )}
              </>
            )}
          </div>
        </Container>
      </Layout>

      <SimpleDialog open={openDialog} onClose={(e) => handleDialogClose(e)}>
        {renderChildren()}
      </SimpleDialog>

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
