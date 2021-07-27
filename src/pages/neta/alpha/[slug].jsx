import { useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";

import { getMinistersByChar } from "@libs/firebase/neta";

import Layout from "@layouts/open";
import Thumbs from "@sections/home/_thumbs";

import s from "../index.module.scss";

export default function NetaLanding({ ministers, slug }) {
  const [isSmallDevice, setIsSmallDevice] = useState(true);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? setIsSmallDevice(false) : null;
  }, []);

  return (
    <>
      <Layout>
        <div className={s.neta}>
          <Container maxWidth="xl">
            <div className={s.header}>
              <h1>Leaders by ({slug}) alphabet</h1>
            </div>

            <section className={s.section}>
              <div className={s.header}>
                <h2>Leaders</h2>
              </div>

              <div className={`${s.neta} ${s.ofNone}`}>
                {ministers.length <= 0 ? (
                  `No leader available by (${slug})`
                ) : (
                  <Thumbs data={ministers} />
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
  let ministers = await getMinistersByChar(params.slug);

  return {
    props: { ministers, slug },
  };
}
