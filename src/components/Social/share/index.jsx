import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import s from "./share.module.scss";

export default function ShareComponent(props) {
  const [isSmallDevice, setIsSmallDevice] = useState(true);

  const handleShare = (e) => {
    const shareData = {
      title: props.data.title,
      text: `Share your thoughts on | ${props.data.title}`,
      url: props.data.defaultOGURL,
    };

    // For Web
    if (!navigator.share) {
      return setDisplaySocial(true);
    }

    // For Mobile Native
    return navigator
      .share(shareData)
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  };

  const renderSocial = () => {
    const { defaultOGURL, title } = props.data;

    return (
      <div className={s.share}>
        <FacebookShareButton url={defaultOGURL} quote={title}>
          <FacebookIcon size="30" round={true} />
        </FacebookShareButton>

        <LinkedinShareButton url={defaultOGURL} title={title}>
          <LinkedinIcon size="30" round={true} />
        </LinkedinShareButton>

        <TwitterShareButton url={defaultOGURL} title={title}>
          <TwitterIcon size="30" round={true} />
        </TwitterShareButton>
      </div>
    );
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      let screenWidth = window.innerWidth;
      screenWidth >= 768 ? setIsSmallDevice(false) : null;
    }
  }, []);

  return (
    <div className={s.share}>
      {isSmallDevice ? (
        <IconButton
          variant="outlined"
          color="secondary"
          size="small"
          aria-label="share"
          onClick={handleShare}
        >
          <ShareIcon /> <label htmlFor="share">Share</label>
        </IconButton>
      ) : (
        renderSocial()
      )}

      {/* <IconButton size="small" aria-label="view"><VisibilityIcon /> <label htmlFor="view">10K</label></IconButton> */}
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}

export async function getServerSideProps({ req }) {
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
