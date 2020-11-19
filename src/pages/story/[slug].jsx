import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Date from "@utils/date";
import Layout from "@layouts/open/index";
import TagStory from "@components/Tag/story";
import CommonBack from "@components/Common/back";
import { getLanguage } from "@utils/session";

import GlobalContext from "@contexts/GlobalContext";
import { getStory } from "@libs/contentful/story";
import s from "./story.module.scss";

export default function Story({ story, param }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);

  const [title, setTitle] = useState(story.title);
  const [desc, setDesc] = useState(story.desc);
  const [tag, setTag] = useState(story.tag);
  const [url, setUrl] = useState(`url(${story.image.url})`);

  const DEFAULT = {
    title: title,
    defaultOGURL: `https://sochke.com/story/${param}`,
    defaultOGImage: story.image.url,
  };

  if (language != lang) {
    getStory(story.slug, language)
      .then((data) => {
        setLang(language);
        setTitle(data.story.title);
        setDesc(data.story.desc);
        setTag(data.story.tag);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let description = desc.map((para, i) => {
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
  let formatDate = date.format(story.date, "full");

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setUrl(`url("")`);
    }
  }, []);

  return (
    <div className={s.story} style={{ backgroundImage: url }}>
      <div className={s.banner}>
        <figure>
          <img src={story.image.url} alt={title} />
        </figure>
      </div>

      <div className={s.container}>
        <Layout>
          <Head>
            <title>{title}</title>

            <meta property="og:url" content={DEFAULT.defaultOGURL} />
            <meta property="og:title" content={DEFAULT.title} />
            <meta name="twitter:site" content={DEFAULT.defaultOGURL} />
            <meta name="twitter:image" content={DEFAULT.defaultOGImage} />
            <meta property="og:image" content={DEFAULT.defaultOGImage} />
          </Head>

          <main>
            {/* heading */}
            <h1 className={s.heading}>{title}</h1>

            {/* Info Bar */}
            <div className={s.info}>
              <TagStory value={tag} />

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

export async function getServerSideProps({ req, params }) {
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      let language = res;
      data = await getStory(params.slug, language);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      story: data?.story ?? null,
      param: params.slug,
    },
  };
}
