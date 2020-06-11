import Head from "next/head";
import { contentfulClient, getEntry } from "@libs/contentful";

export default function Home({ data }) {
  const pageData = data.fields;

  return (
    <div className="main ">
      <Head>
        <title>{pageData.company}</title>
        <link rel="icon" href="public/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl">
          Welcome to <a href="https://nextjs.org">{pageData.company}</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <footer></footer>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}

export async function getStaticProps() {
  let data = await getEntry("15jwOBqpxqSAOy2eOO4S0m");

  return {
    props: { data },
  };
}
