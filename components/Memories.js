import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";
import { RichText, SectionData } from "@/utils/helper";

export default function Memories({ data }) {
  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const { Title: title, Content, Position: position } = getContent;

  const image1 = getContent.Image?.[0]?.url;
  const image2 = getContent.Image2?.[0]?.url;
  const image3 = getContent.Image3?.[0]?.url;
  const image4 = getContent.Image4?.[0]?.url;
  const image5 = getContent.Image5?.[0]?.url;
  const image6 = getContent.Image6?.[0]?.url;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <section
        className="experience-section memories-section"
        style={{ order: position }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header">
                <FadeUpWrapper>
                  <h2>{title}</h2>
                  <h6 className="text-color-change">{Content}</h6>
                </FadeUpWrapper>
              </div>
            </div>
          </div>
          <div className="row">
            {/* First Column */}
            <div className="col-md-3 custom-margin-top">
              <FadeUpWrapper>
                <img src={`${apiUrl}${image1}`} alt="" className="img-fluid custom-image-sachin" />
              </FadeUpWrapper>
            </div>

            {/* Second Column */}
            <div className="col-md-3">
              <FadeUpWrapper>
                <img src={`${apiUrl}${image2}`} alt="" className="img-fluid custom-image-sachin" />
              </FadeUpWrapper>
              <FadeUpWrapper>
                <img
                  src={`${apiUrl}${image3}`}
                  alt=""
                  className="img-fluid custom-image-sachin"
                  style={{ marginTop: "30px" }}
                />
              </FadeUpWrapper>
            </div>

            {/* Third Column */}
            <div className="col-md-3 custom-margin-top2">
              <FadeUpWrapper>
                <img src={`${apiUrl}${image4}`} alt="" className="img-fluid custom-image-sachin" />
              </FadeUpWrapper>
            </div>

            {/* Fourth Column */}
            <div className="col-md-3">
              <FadeUpWrapper>
                <img src={`${apiUrl}${image5}`} alt="" className="img-fluid custom-image-sachin" />
              </FadeUpWrapper>
              <FadeUpWrapper>
                <img
                  src={`${apiUrl}${image6}`}
                  alt=""
                  className="img-fluid custom-image-sachin"
                  style={{ marginTop: "30px" }}
                />
              </FadeUpWrapper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
