import Head from "next/head";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { contentfulClient, getEntry } from "@libs/contentful";
import Layout from "@layouts/open/index";

export default function Home({ data }) {
  const pageData = data.fields;

  return (
    <>
      <Layout>
        <Head>
          <title>Home | {pageData.company}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <header>
            <Button variant="contained" color="primary" href="/test">
              Go to the test page
            </Button>
          </header>
          <h1 className="text-3xl">
            Welcome to <a href="https://nextjs.org">{pageData.company}</a>
          </h1>

          <p className="description">
            Get started by editing <code>pages/index.js</code>
          </p>
        </main>

        <footer>{"I`m here to stay"}</footer>
      </Layout>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
  );
}

export async function getStaticProps() {
  let data = await getEntry("15jwOBqpxqSAOy2eOO4S0m");

  return {
    props: { data },
  };
}
