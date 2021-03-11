import Head from "next/head";
import Container from "@material-ui/core/Container";

import { contentfulClient, getEntry } from "@libs/contentful";
import { getLanguage } from "@utils/session";

import Layout from "@layouts/open/index";

import s from "./about.module.scss";

export default function About({ data }) {
  const head = data.items[0].fields;

  const DEFAULT = {
    title: head.title,
    defaultOGURL: `https://sochke.com`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

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

export async function getStaticProps() {
  let data = await contentfulClient.getEntries({
    content_type: "pageHead",
    locale: "en-US",
    "fields.slug": "about",
  });

  return {
    props: { data },
  };
}
