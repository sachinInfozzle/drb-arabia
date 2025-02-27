import React, { useState, useEffect } from "react";
import Link from "next/link";

import { RichText, SectionData } from "@/utils/helper";

export default function RenewalBG({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const {
    Title: title,
    Content: contents,
    Image,
    Description: description,
    Position: position,
  } = getContent;
  const image = Image?.[0]?.url || null;

  // Process content through RichText
  const content = contents ? RichText(contents) : "";
  return (
    <section
      className="aboutus_bg-image camp-bg-image"
      style={{ backgroundImage: `url(${apiUrl}${image})`, order: position }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="content-info">
              {title ? <h3>{title}</h3> : ""}

              {content ? <p>{content}</p> : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
