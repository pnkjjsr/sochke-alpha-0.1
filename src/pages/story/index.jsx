import Head from "next/head";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Date from "@utils/date";
import { getLanguage } from "@utils/session";
import { getAllStory } from "@libs/contentful/story";

import TagStory from "@components/Tag/story";

import Layout from "@layouts/open/index";
import s from "./index.module.scss";

export default function Index({ data }) {
  const head = data.head;
  const stories = data.stories;

  const DEFAULT = {
    title: head.title,
    desc: head.desc,
    defaultOGURL: `https://sochke.com/story`,
    defaultOGImage:
      "https://firebasestorage.googleapis.com/v0/b/sochke-web.appspot.com/o/cdn%2Fintro%2Fsochke.jpg?alt=media",
  };

  const renderLatestStory = () => {
    let story = stories[0];
    let date = new Date();
    let formatDate = date.format(story.date, "full");
    return (
      <div className={`${s.thumb} ${s.banner}`}>
        <Link href={`https://www.sochke.com/story/${story.slug}`}>
          <a>
            <Card>
              <CardActionArea>
                <figure>
                  <img src={story.image[0]} alt={story.slug} />
                </figure>

                <CardContent>
                  <div className={s.info}>
                    <TagStory value={story.tag} />
                    <span>{formatDate}</span>
                  </div>

                  <h3 className={s.title}>{story.title}</h3>
                </CardContent>
              </CardActionArea>
            </Card>
          </a>
        </Link>
      </div>
    );
  };

  const renderPreviousStory = () => {
    let isFirst = true;
    return stories.map((story, i) => {
      if (isFirst) {
        isFirst = false;
        return;
      }
      let date = new Date();
      let formatDate = date.format(story.date, "full");
      return (
        <div key={i} className={s.thumb}>
          <Link href={`story/${story.slug}`}>
            <a>
              <Card>
                <CardActionArea>
                  <figure>
                    <img src={story.image[0]} alt={story.slug} />
                  </figure>

                  <CardContent>
                    <div className={s.info}>
                      <TagStory value={story.tag} />
                      <span>{formatDate}</span>
                    </div>

                    <h3 className={s.title}>{story.title}</h3>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
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
      <main className={s.landing}>
        <h1>
          All latest Indian &amp; political news, information which matters you.
        </h1>

        <div className={s.section}>
          <h2>Latest Story</h2>
          {renderLatestStory()}
        </div>

        <div className={s.section}>
          <h2>Previous Stories</h2>
          <div className={s.stories}>{renderPreviousStory()}</div>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  let data = {};

  await getLanguage(req)
    .then(async (res) => {
      let language = res;
      data = await getAllStory(language);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: { data },
  };
}
