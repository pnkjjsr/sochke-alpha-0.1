import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import { getLanguage } from "@utils/session";

import Layout from "@layouts/open";

import s from "./index.module.scss";

export default function Citizen() {
  const [isSmallDevice, setIsSmallDevice] = useState();

  const genCharArray = (charA, charZ) => {
    var a = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
  };

  const renderAlphabetical = () => {
    let alpha = genCharArray("a", "z");

    return alpha.map((item, i) => {
      return (
        <li key={i}>
          <Link href={`/citizen/alpha/${item}`}>
            <a>{item}</a>
          </Link>
        </li>
      );
    });
  };

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
              <h1>Aware and awake Citizens.</h1>
            </div>

            <section className={s.section}>
              <div className={s.header}>
                <h2>Citizen via alphabet.</h2>
              </div>

              <div className={s.alphabet}>
                <ul>{renderAlphabetical()}</ul>
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
