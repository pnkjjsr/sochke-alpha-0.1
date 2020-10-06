import Head from "next/head";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { contentfulClient } from "@libs/contentful";
import Date from "@utils/date";

import Layout from "@layouts/open/index";
import TagStory from "@components/Tag/story";

import CommonBack from "@components/Common/back";

import { getStory } from "./_api";
import s from "./story.module.scss";

export default function Story({ story }) {
  const DEFAULT = {
    TITLE: story.title,
    DESC: story.desc,
    IMAGE: story.image,
    TAG: story.tag,
    DATE: story.date,
  };

  let description = DEFAULT.DESC.map((para, i) => {
    if (para.content.length == 1) {
      return <p key={i}>{para.content[0].value}</p>;
    } else {
      return (
        <p key={i}>
          {para.content.map((text, x) => {
            let style = {};
            if (text.marks[0]?.type) {
              style = { fontWeight: text.marks[0]?.type };
            }

            return (
              <span key={x} style={style}>
                {text.value}
              </span>
            );
          })}
        </p>
      );
    }
  });

  let date = new Date();
  let formatDate = date.format(DEFAULT.DATE, "full");
  let url = `url(${DEFAULT.IMAGE.url})`;

  return (
    <div className={s.story} style={{ backgroundImage: url }}>
      <div className={s.container}>
        <Layout>
          <Head>
            <title>{DEFAULT.TITLE}</title>
            <meta name="description" content={DEFAULT.DESC} />
          </Head>

          <main>
            {/* heading */}
            <h1 className={s.heading}>{DEFAULT.TITLE}</h1>

            {/* Info Bar */}
            <div className={s.info}>
              <TagStory value={DEFAULT.TAG} />

              <span>{formatDate}</span>
            </div>

            <div className={s.description}>{description}</div>

            <div className={s.bottom}>
              <CommonBack />

              <div className={s.action}>
                <IconButton size="small" aria-label="share">
                  <ShareIcon /> <label htmlFor="share">10K</label>
                </IconButton>
                <IconButton size="small" aria-label="view">
                  <VisibilityIcon /> <label htmlFor="view">10K</label>
                </IconButton>
              </div>
            </div>
          </main>
        </Layout>
      </div>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const data = await getStory(params.slug);

  return {
    props: {
      story: data?.story ?? null,
    },
  };
}
