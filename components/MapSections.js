import React from "react";
import { SectionData } from "@/utils/helper";

export const MapSection = ({ data }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const {
    Title: title,
    GoogleMapLink,
    Button,
    Position: position,
  } = getContent;

  return (
    <footer className="footer" style={{ order: position }}>
      <div className="container">
        <div className="map-blk mb-5 d-flex flex-column mx-auto align-items-center text-center">
          {title && <h3 className="text-white">{title}</h3>}

          <div className="map-container">
            <iframe
              src={GoogleMapLink}
              width="100%" // Make iframe width responsive
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {Button && (
            <a href={Button.Link} className="btn btn-primary">
              {Button.Title}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};
