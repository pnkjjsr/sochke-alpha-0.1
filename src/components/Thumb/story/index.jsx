import React, { Component } from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Date from "@utils/date";

import TagStory from "@components/Tag/story";

import s from "./story.module.scss";

export default class StoryThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { data } = this.props;

    let date = new Date();
    let formatDate = date.format(data.date, "full");

    return (
      <div className={`${s.thumb} ${s.banner}`}>
        <Link href={`https://www.sochke.com/story/${data.slug}`}>
          <a>
            <Card>
              <CardActionArea>
                <figure>
                  <img src={data.image[0]} alt={data.slug} />
                </figure>

                <CardContent>
                  <div className={s.info}>
                    <TagStory value={data.tag} />
                    <span>{formatDate}</span>
                  </div>

                  <h3 className={s.title}>{data.title}</h3>
                </CardContent>
              </CardActionArea>
            </Card>
          </a>
        </Link>
      </div>
    );
  }
}
