import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import s from "./profile.module.scss";

export default class Photo extends Component {
  render() {
    return (
      <div className={s.photo}>
        <figure>
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

            <image
              href="https://firebasestorage.googleapis.com/v0/b/nextjs-contentful-firebase.appspot.com/o/cdn%2Fneta%2Fprofile%2Fnarendra-modi.png?alt=media&token=68d77a43-4f01-451b-86ce-cf641db45651"
              clipPath="url(#photo)"
            />
          </svg>
        </figure>

        <div className={s.count}>
          <IconButton size="small" aria-label="view">
            <VisibilityIcon /> <label htmlFor="view">10K</label>
          </IconButton>
        </div>
      </div>
    );
  }
}
