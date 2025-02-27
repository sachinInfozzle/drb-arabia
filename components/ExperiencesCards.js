import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function ExperiencesCards({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [button, setButton] = useState([]);

  const [items, setItems] = useState([]);
  const [position, setPosition] = useState(null);
  const { locale } = useRouter();

  const getContent = data;

  const isValidUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

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
                <div className="hover-wrapper">
                  <FadeUpWrapper>
                    <a href="javascript:;" className="hover-main">
                      {item.Image ? (
                        <img
                          src={`${apiUrl}${item.Image.url}`}
                          alt=""
                          className="img-fluid"
                        />
                      ) : (
                        ""
                      )}

                      <div className="hover-blk custom-right-align">
                        <h4>{item.Title}</h4>
                        <p>{item.Content}</p>
                        {item.Button_Link && item.Title ? (
                          <a
                            href={
                              isValidUrl(item.Button_Link)
                                ? item.Button_Link
                                : `/${locale}/bookanevent?activity=${item.Title}`
                            }
                            className="btn btn-primary mt-auto"
                          >
                            {item.Button_Text}
                          </a>
                        ) : null}
                      </div>
                    </a>
                  </FadeUpWrapper>
                </div>
              </div>
            );
          })}
        </div>
        {button.text ? (
          <FadeUpWrapper>
            <div className="camp-btn aos" data-aos="fade-up">
              <a href={button.link} className="btn btn-primary">
                {button.text}
              </a>
            </div>
          </FadeUpWrapper>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
