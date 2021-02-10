import Head from "next/head";
import { contentfulClient, getEntry } from "@libs/contentful";
import Layout from "@layouts/open/index";
import Container from "@material-ui/core/Container";

import s from "./privacy.module.scss";

export default function About({ data }) {
  const pageData = data.items[0].fields;

  return (
    <>
      <Head>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.desc} />
      </Head>

      <Layout>
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

export async function getStaticProps() {
  let data = await contentfulClient.getEntries({
    content_type: "pageHead",
    locale: "en-US",
    "fields.slug": "home",
  });

  return {
    props: { data },
  };
}
