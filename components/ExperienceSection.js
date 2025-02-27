import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function ExperienceSection({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [position, setPosition] = useState(null);

  const getContent = data;

  useEffect(() => {
    if (getContent) {
      setTitle(getContent.Title || null);
      setContent(getContent.Content || null);
      setPosition(getContent.Position || null);
    }
  }, [getContent]);
  // Early return if no content
  if (!getContent) return null;
  return (
    <div className="exp-section" style={{ order: position }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-header">
              <FadeUpWrapper>
                <h2>{title}</h2>
                <h6 className="custom-hfont2">{content}</h6>
              </FadeUpWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
