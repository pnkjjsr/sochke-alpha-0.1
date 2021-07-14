import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import NetaThumb from "@components/Thumb/neta";

export default function Thumbs(props) {
  const thumbData = props.data;

  useEffect(() => {}, []);

  if (!thumbData) {
    // return "no data available";
    return true;
  }

  return thumbData.map((item, key) => {
    return (
      <Link key={key} href={`/citizen/${item.slug}`}>
        <a>
          <NetaThumb name={item.name} src={item.thumbUrl} like="999" />
        </a>
      </Link>
    );
  });
}
