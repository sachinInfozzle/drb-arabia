import React from "react";
import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function Sustainability({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const {
    Title: title,
    Head_Image,
    Content_Title,
    Button,
    Content: contents,
    Image,
    Description: description,
    Position: position,
  } = getContent;

  const image = Image?.[0]?.formats?.small?.url || Image?.url;
  const headImage = Head_Image?.[0]?.formats?.small?.url || Head_Image?.url;

  // Process content through RichText
  const content = RichText(contents);
  return (
    <section className="camp-section bg-style1" style={{ order: position }}>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1 aos" data-aos="fade-up">
            <div className="section-header">
              {headImage && (
                <img
                  src={image ? `${apiUrl}${headImage}` : ""}
                  className="img-fluid"
                  alt="Experiences"
                />
              )}
              {title && (
                <FadeUpWrapper>
                  <h2>{title}</h2>
                  {description && (
                    <h6 className="custom-hfont2">{description}</h6>
                  )}
                </FadeUpWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="private-info">
          <div className="row align-items-center custom-row-reverse">
            <div className="col-md-6 aos" data-aos="fade-up">
              <div className="camp-img">
                <FadeUpWrapper>
                  <img
                    src={image ? `${apiUrl}${image}` : ""}
                    className="img-fluid"
                    alt="Experiences"
                  />
                </FadeUpWrapper>
              </div>
            </div>
            <div className="col-md-6 aos" data-aos="fade-up">
              <div className="camp-content">
                <FadeUpWrapper>
                  <div className="section-header text-start">
                    {Content_Title && (
                      <h2 className="text-white custom-right-align">
                        {Content_Title}
                      </h2>
                    )}
                  </div>
                  <p className="custom-right-align">{content}</p>
                </FadeUpWrapper>
              </div>
              <FadeUpWrapper>
                <div className="private-btn custom-right-align">
                  {Button && (
                    <a href={Button.Link} className="btn btn-primary">
                      {Button.Title}
                    </a>
                  )}
                </div>
              </FadeUpWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
