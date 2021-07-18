import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { GlobalContext } from "@contexts/Global";
import { getLanguage } from "@utils/session";
import { getHead } from "@libs/contentful/head/privacy";

import Layout from "@layouts/open/index";
import s from "./privacy.module.scss";

export default function About({ data }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);
  const [title, setTitle] = useState(data.head.title);
  const [desc, setDesc] = useState(data.head.desc);

  const DEFAULT = {
    title: title,
    desc: desc,
    defaultOGURL: `https://sochke.com/privacy`,
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
          <div className={s.privacy}>
            <main>
              <div>
                <h1>Privacy Policy</h1>
                <section className="context__section">
                  <h2>Information Policy</h2>

                  <h3>What kinds of information we provide?</h3>
                  <p>
                    We try to provide all the latest information related to
                    'Politics' in short and simple manner. Source of the
                    information is realiable and trusted indian media
                    (online/offline/paper).
                  </p>

                  <p>
                    All the information belongs to 'Politicians/Neta' is an
                    archive of the candidate's self-declared affidavit that was
                    filed during the elections. The current status of this
                    information may be different. For the latest available
                    information, please refer to the affidavit filed by the
                    candidate to the Election Commission in the most recent
                    election.
                  </p>

                  <p>
                    You can contact with 'Sochke' via email at{" "}
                    <b>
                      <a href="mailto:">policy@sochke.com</a>
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
