import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function AdvanceGallery({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [content, setContent] = useState([]);
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState(null);
  const [title, setTitle] = useState(null);
  const [position, setPosition] = useState(null);

  const getContent = data;

  useEffect(() => {
    if (getContent) {
      setContent(getContent.Content || null);
      setImages(
        getContent.Image?.[0]?.formats?.small?.url ||
          getContent.Image?.url ||
          null
      );
      setTitle(getContent.Title || null);
      setDescription(getContent.Description || null);
      setPosition(getContent.Position || null);
    }
  }, [getContent]);

  // Early return if no content
  if (!getContent) return null;
  return (
    <div className="exp-section advance-gallery" style={{ order: position }}>
      <div className="container">
        <div className="row align-items-center custom-row-reverse">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-header">
              <FadeUpWrapper>
                <h2>{title}</h2>
              </FadeUpWrapper>
              <FadeUpWrapper>
                <h6 className="custom-hfont2 text-color-change custom-color-experience">{description}</h6>
              </FadeUpWrapper>
            </div>
          </div>
          <div className="col-md-6 aos" data-aos="fade-up">
            <FadeUpWrapper>
              <img
                src={apiUrl + images}
                className="img-fluid"
                alt="Experiences"
              />
            </FadeUpWrapper>
          </div>
          <div className="col-md-6 aos" data-aos="fade-up">
            <FadeUpWrapper>
              <div className="content-info">
                {content.map((cont, i) => {
                  return (
                    <p key={i} className="custom-right-align">
                      {cont.children[0].text}
                    </p>
                  );
                })}
              </div>
            </FadeUpWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
