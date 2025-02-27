import React from "react";
import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function VariableSection({ data }) {
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
    <div className="exp-section variable-section" style={{ order: position }}>
      <div className="container">
        <div className="row">
          <FadeUpWrapper>
            <div className="col-md-12">
              <div className="section-header">
                {headImage && (
                  <img
                    src={image ? `${apiUrl}${headImage}` : ""}
                    className="img-fluid"
                    alt="Experiences"
                  />
                )}
                {title && <h2>{title}</h2>}
                {description && (
                  <h6 className="custom-hfont2">{description}</h6>
                )}
              </div>
            </div>
          </FadeUpWrapper>
        </div>

        <div className="row align-items-center custom-row-reverse">
          {/* Image Section */}
          <div className="col-md-6">
            <FadeUpWrapper>
              <img
                src={image ? `${apiUrl}${image}` : ""}
                className="img-fluid"
                alt="Experiences"
              />
            </FadeUpWrapper>
          </div>

          {/* Content Section */}
          <div className="col-md-6">
            <div className="camp-content custom-right-align">
              {Content_Title && (
                <FadeUpWrapper>
                  <h2>{Content_Title}</h2>
                </FadeUpWrapper>
              )}
              <FadeUpWrapper>
                <div className="content-info">{content}</div>
              </FadeUpWrapper>
            </div>
          </div>
        </div>

        <div className="row">
          <FadeUpWrapper>
            <div className="camp-btn custom-mt60">
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
  );
}
