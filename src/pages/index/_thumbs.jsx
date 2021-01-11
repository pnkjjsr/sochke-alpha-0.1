import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import NetaThumb from "@components/Neta/thumb";

export default function Thumbs(props) {
  const thumbData = props.data;

  useEffect(() => {}, []);

  if (!thumbData) {
    // return "no data available";
    return true;
  }

  return thumbData.map((item, key) => {
    return (
      <Link key={key} href={`/neta/${item.slug}`}>
        <a>
          <NetaThumb name={item.title} src={item.image} like="999" />
        </a>
      </Link>
    );
  });
}
