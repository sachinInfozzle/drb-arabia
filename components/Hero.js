import { useState, useEffect } from "react";

import { RichText } from "@/utils/helper";

export default function Hero({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content is found
  if (!getContent) return null;

  const {
    Title: title,
    Description: description,
    Image,
    Button,
    Position,
  } = getContent;
  const image = Image?.[0]?.url;
  const btnText = Button?.Title;
  const btnLink = Button?.Link;

  return (
    <div className="banner-slider" style={{ order: Position }}>
      <div className="banner-slide">
        <div
          className={title ? "slider-main" : "slider-main no-overlay"}
          style={{ backgroundImage: `url(${image ? apiUrl + image : ""})` }}
        >
          {/* Image is set as background, no need to render an <img> */}
        </div>
        <div className="slider-text-overlay">
          {title && <h2>{title}</h2>}
          {description && <h3>{description}</h3>}
          {btnText && btnLink && (
            <a
              href={btnLink}
              className="custom-btn-opening btn btn-primary mt-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {btnText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
