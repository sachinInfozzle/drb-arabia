import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function ExploreOurImage({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [button, setButton] = useState([]);

  const [items, setItems] = useState([]);
  const [position, setPosition] = useState(null);

  const getContent = data;

  useEffect(() => {
    if (getContent) {
      setTitle(getContent.Title || null);
      setContent(getContent.Description || null);
      setItems(getContent.ExperienceItem || null);
      setButton({
        text: getContent.Button_Text || null,
        link: getContent.Button_Link || null,
      });
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
        <div className="row justify-content-center">
          {items.map((item) => {
            return (
              <div key={item.id} className="col-md-4 aos" data-aos="fade-up">
                <FadeUpWrapper>
                  <div className="hover-wrapper">
                    <a href="javascript:;" className="hover-main">
                      <img
                        src={`${apiUrl}${item.Image.url}`}
                        alt=""
                        className="img-fluid"
                      />
                      <div className="hover-blk custom-right-align">
                        <h4>{item.Title}</h4>
                        <p>{item.Content}</p>
                        <a
                          href=""
                          className="btn btn-primary mt-auto"
                          target="_blank"
                        >
                          {item.Button_Text}
                        </a>
                      </div>
                    </a>
                  </div>
                </FadeUpWrapper>
              </div>
            );
          })}
        </div>
        {button.text ? (
          <div className="camp-btn aos" data-aos="fade-up">
            <a href={button.link} className="btn btn-primary">
              {button.text}
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
