import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import TagStory from "@components/Tag/story";

export default function Tags(props) {
  const tagData = props.data;
  const [tags, setTags] = useState([]);

  useEffect(() => {}, []);

  if (!tagData) {
    return "no data available";
  }

  return tagData.map((item, key) => {
    return (
      <Link key={key} href={`story/${item.fields.slug}`}>
        <a>
          <TagStory value={item.fields.tag} />
        </a>
      </Link>
    );
  });
}
