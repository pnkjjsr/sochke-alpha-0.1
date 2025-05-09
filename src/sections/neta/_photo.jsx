import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import s from "@pages/neta/neta.module.scss";

export default class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: "",
      imgSrcLg: "",
      isSmallDevice: true,
    };
  }

  renderMobile = () => {
    const { imgSrc, imgSrcLg } = this.state;
    let url = `#26264c url(${imgSrcLg}) no-repeat center center`;
    return (
      <div className={s.photo} style={{ background: url }}>
        {/* <figure>
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="photo">
                <path
                  d="M0 0H320V208.5C320 208.5 249.5 333.5 84 319.5C40.3024 315.804 0 293.5 0 293.5V0Z"
                  fill="black"
                />
              </clipPath>
            </defs>

            <image href={imgSrcLg} clipPath="url(#photo)" />
          </svg>
        </figure> */}

        {/* <div className={s.count}>
          <IconButton size="small" aria-label="view">
            <VisibilityIcon /> <label htmlFor="view">10K</label>
          </IconButton>
        </div> */}
      </div>
    );
  };

  renderWeb = () => {
    const { imgSrc, imgSrcLg } = this.state;

    return (
      <div className={s.photo}>
        <picture>
          <source media="(min-width:735px)" srcSet={imgSrcLg} />
          <source media="(min-width:568px)" srcSet={imgSrc} />
          {!imgSrcLg ? "" : <img src={imgSrcLg} alt="Flowers" />}
        </picture>
      </div>
    );
  };

  componentDidMount() {
    const { data } = this.props;
    let screenWidth = window.innerWidth;
    screenWidth >= 768 ? this.setState({ isSmallDevice: false }) : null;

    this.setState({
      imgSrc: data.imageUrl,
      imgSrcLg: data.bannerUrl,
    });
  }

  render() {
    const { isSmallDevice } = this.state;

    return isSmallDevice ? this.renderMobile() : this.renderWeb();
  }
}
