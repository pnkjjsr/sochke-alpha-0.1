import Head from "next/head";
import { contentfulClient, getEntry } from "@libs/contentful";
import Layout from "@layouts/open/index";

export default function Home({ data }) {
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
          <h1>
            Welcome to <a href="https://nextjs.org">{pageData.title}</a>
          </h1>
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
