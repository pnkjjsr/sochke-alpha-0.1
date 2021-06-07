import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import TagStory from "@components/Tag/story";

export default function Tags(props) {
  const tagData = props.data;

  useEffect(() => {}, []);

  if (!tagData) {
    return "no data available";
  }

  return tagData.map((item, key) => {
    return (
      <Link key={key} href={`story/${item.slug}`}>
        <a>
          <TagStory value={item.tag} />
        </a>
      </Link>
    );
  });
}
