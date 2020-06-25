import Head from "next/head";
import { contentfulClient, getEntry } from "@libs/contentful";
import Layout from "@layouts/open/index";

export default function About({ data }) {
  const pageData = data.fields;

  return (
    <>
      <Layout>
        <Head>
          <title>{pageData.title}</title>
          <meta name="description" content={pageData.desc} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>About Us</h1>
          <section className="context__section">
            <h2>Introduction</h2>
            <p>
              Sochke is a technology and data-driven platform that enables
              citizens to connect with their area minister and minister’s work,
              experience and background.
            </p>
            <p>
              Sochke is a networking platform that enables users to connect with
              other users. And it's a digital platform that empowers citizens to
              contribute to their constituencies to make it a better place.
            </p>
            <p>We’ll make politics transparent for the citizens.</p>
            <p>
              We want to change the perspective of politics and make politics
              and minister work transparent and accessible every time for
              citizens. Instead of the minister's word, citizens will believe in
              data.
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
        </main>
      </Layout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  );
}

export async function getStaticProps() {
  let data = await getEntry("4AMXmeupFBkkkJwuwRM99M");

  return {
    props: { data },
  };
}
