import React, { useEffect, useState } from "react";
import { RichText, SectionData } from "@/utils/helper";
import {
  FadeLeftWrapper,
  FadeRightWrapper,
  FadeUpWrapper,
} from "@/utils/FadeAnimation";

export default function DualSideImage({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const {
    Title: title,
    Content: contents,
    LeftImage,
    RightImage,
    Position,
    Title_Image,
  } = getContent;

  const titleImage =
    Title_Image?.[0]?.formats?.large?.url || Title_Image?.[0]?.url;
  const leftImage = LeftImage?.[0]?.formats?.large?.url || LeftImage?.[0]?.url;
  const rightImage =
    RightImage?.[0]?.formats?.large?.url || RightImage?.[0]?.url;

  // Process content through RichText
  const content = RichText(contents);

  return (
    <section
      className="path-section dual-side-image"
      style={{ order: Position }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 justify-content-center">
            {/* Path Shapes */}
            <FadeUpWrapper>
              <div className="path-shapes" data-aos="fade-up">
                <img
                  src={`${apiUrl}/uploads/design_shape_1_e07384dcdd.png`}
                  className="shape-left"
                  alt="Shape Left"
                />
                <img
                  src={`${apiUrl}/uploads/design_shape_1_e07384dcdd.png`}
                  className="shape-right"
                  alt="Shape Right"
                />
              </div>
            </FadeUpWrapper>

            {/* Section Header */}
            <FadeUpWrapper>
              <div className="section-header" data-aos="fade-up">
                {titleImage && (
                  <img
                    src={apiUrl + titleImage}
                    className="img-fluid leaf-img-en"
                    alt="Path"
                  ></img>
                )}

                {title && <h2 className="text-white custom-rtl">{title}</h2>}
              </div>
            </FadeUpWrapper>

            {/* Path Content */}
            <FadeUpWrapper>
              <div className="path-content" data-aos="fade-up">
                <p className="majlis-p custom-rtl">{content}</p>
              </div>
            </FadeUpWrapper>
          </div>
        </div>
      </div>
      <div className="path-imgs">
        <FadeRightWrapper>
          <div className="path-left" data-aos="fade-right">
            <img
              src={rightImage ? `${apiUrl}${rightImage}` : ""}
              className="img-fluid"
              alt="Right Path"
            />
          </div>
        </FadeRightWrapper>
        <FadeLeftWrapper>
          <div className="path-right" data-aos="fade-left">
            <img
              src={leftImage ? `${apiUrl}${leftImage}` : ""}
              className="img-fluid"
              alt="Left Path"
            />
          </div>
        </FadeLeftWrapper>
      </div>
    </section>
  );
}
