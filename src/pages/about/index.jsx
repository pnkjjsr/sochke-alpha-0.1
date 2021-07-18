import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { GlobalContext } from "@contexts/Global";
import { getLanguage } from "@utils/session";
import { getHead } from "@libs/contentful/head/about";

import Layout from "@layouts/open/index";
import s from "./about.module.scss";

export default function About({ data }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [title, setTitle] = useState(data.head.title);
  const [desc, setDesc] = useState(data.head.desc);

  const DEFAULT = {
    title: title,
    desc: desc,
    defaultOGURL: `https://sochke.com/about`,
    defaultOGImage: data.head.image,
  };

  if (language != lang) {
    getHead(language)
      .then((data) => {
        setLang(language);
        setTitle(data.head.title);
        setDesc(data.head.desc);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{DEFAULT.title}</title>
          <meta name="description" content={DEFAULT.desc} />

          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:title" content={DEFAULT.title} />
          <meta name="twitter:site" content={DEFAULT.defaultOGURL} />
          <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
        </Head>

        <Container maxWidth="xl">
          <div className={s.about}>
            <main>
              <div>
                <h1>About Us</h1>
                <section className="context__section">
                  <h2>Introduction</h2>

                  <p>
                    Sochke (Alpha 0.1), platform helps you get updated with all
                    the latest political news.
                  </p>

                  <p>
                    Sochke is a technology and data-driven platform that enables
                    citizens to connect with their area minister and minister’s
                    work, experience and background.
                  </p>
                  <p>
                    Sochke is a networking platform that enables users to
                    connect with other users. And it's a digital platform that
                    empowers citizens to contribute to their constituencies to
                    make it a better place.
                  </p>
                  <p>We’ll make politics transparent for the citizens.</p>
                  <p>
                    We want to change the perspective of politics and make
                    politics and minister work transparent and accessible every
                    time for citizens. Instead of the minister's word, citizens
                    will believe in data.
                  </p>
                  <p>
                    And want to break the hidden wall between the common man and
                    minister. Ministers should be accessible all the time.
                  </p>
                  <p>
                    All of this makes India a more cohesive, participative and
                    involved democracy.
                  </p>
                  <p>
                    You can contact with 'Sochke' via email at{" "}
                    <b>
                      <a href="mailto:">contact@sochke.com</a>
                    </b>
                  </p>
                </section>
              </div>
            </main>
          </div>
        </Container>
      </Layout>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  );
}

export async function getServerSideProps({ req }) {
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      data = await getHead(res);
      data.language = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: { data },
  };
}
