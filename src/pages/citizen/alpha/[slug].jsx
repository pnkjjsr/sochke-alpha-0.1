import { useState, useEffect, useContext } from "react";

import Container from "@material-ui/core/Container";

import { getCitizensByChar } from "@libs/firebase/citizen";

import Layout from "@layouts/open";
import Thumbs from "@sections/citizen/_thumbs";

import s from "../index.module.scss";

export default function CitizenAlphabetic({ citizens, slug, head, language }) {
  const [isSmallDevice, setIsSmallDevice] = useState(true);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  return (
    <>
      <Layout>
        <div className={s.citizen}>
          <Container maxWidth="xl">
            <div className={s.header}>
              <h1>Citizens by ({slug}) alphabet</h1>
            </div>

            <section className={s.section}>
              <div className={s.header}>
                <h2>Citizens</h2>
              </div>

              <div className={`${s.thumb} ${s.ofNone}`}>
                {citizens.length <= 0 ? (
                  `No citizen available by (${slug})`
                ) : (
                  <Thumbs data={citizens} />
                )}
              </div>
            </section>
          </Container>

          <style jsx>{``}</style>
          <style jsx global>{``}</style>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  let slug = params.slug;
  let citizens = await getCitizensByChar(params.slug);

  return {
    props: { citizens, slug },
  };
}
