import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

import Date from "@utils/date";
import Layout from "@layouts/open/index";
import TagStory from "@components/Tag/story";
import CommonBack from "@components/Common/back";
import ShareComponent from "@components/Social/share";
import LanguageComponent from "@components/Language/dropdown";
import { getLanguage } from "@utils/session";

import GlobalContext from "@contexts/GlobalContext";
import { getStory } from "@libs/contentful/story";
import s from "./story.module.scss";

export default function StoryLanding({ story, param }) {
  const { language } = useContext(GlobalContext);
  const [lang, setLang] = useState(language);

  const [title, setTitle] = useState(story.title);
  const [desc, setDesc] = useState(story.desc);
  const [tag, setTag] = useState(story.tag);
  const [metatags, setMetatags] = useState(story.metatags);
  const [url, setUrl] = useState(`url(${story.image[0]})`);

  const DEFAULT = {
    title: title,
    keyword: metatags,
    defaultOGURL: `https://sochke.com/story/${param}`,
    defaultOGImage: story.image[0],
  };

  if (language != lang) {
    getStory(story.slug, language)
      .then((data) => {
        setLang(language);
        setTitle(data.story.title);
        setDesc(data.story.desc);
        setTag(data.story.tag);
        setMetatags(data.story.metatags);
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
    <>
      <Layout>
        <Head>
          <title>{DEFAULT.title}</title>
          <meta name="keywords" content={DEFAULT.keyword}></meta>
          <meta property="og:url" content={DEFAULT.defaultOGURL} />
          <meta property="og:title" content={DEFAULT.title} />
          <meta property="og:image" content={DEFAULT.defaultOGImage} />
        </Head>

        <div className={s.story}>
          <Container maxWidth="lg">
            {/* heading */}

            <figure className={s.banner}>
              <img src={story.image[0]} alt={title} />
            </figure>

            <h1 className={s.heading}>{title}</h1>

            {/* Info Bar */}
            <div className={s.info}>
              <div>
                <TagStory value={tag} />
                <span>{formatDate}</span>
              </div>

              <div className={s.language}>
                <LanguageComponent />
              </div>
            </div>

            <div className={s.description}>{description}</div>

            <div className={s.bottom}>
              <CommonBack />

              <div className={s.action}>
                <ShareComponent data={DEFAULT} />
              </div>
            </div>
          </Container>
        </div>
      </Layout>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </>
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
