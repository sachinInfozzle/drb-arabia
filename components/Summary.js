import React from "react";

import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function Summary({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const {
    Title: title,
    Image,
    Description: description,
    Position: position,
  } = getContent;
  const image = Image?.[0]?.url || null;
  return (
    <section
      className="experiences-path-section path-section pb-100 dark-section summary-section"
      style={{ paddingBottom: "200px", order: position }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1 text-center justify-content-center">
            <div className="section-header aos" data-aos="fade-up">
              <FadeUpWrapper>
                <h2 className="text-white">{title}</h2>
              </FadeUpWrapper>
            </div>
            <div className="path-content aos" data-aos="fade-up">
              <FadeUpWrapper>
                <p>{description}</p>
              </FadeUpWrapper>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="path-imgs" style={{ marginTop: "-50px" }}> */}
      <div className="path-left aos" data-aos="fade-right">
        <img
          src={`${apiUrl}/uploads/pattern_design_left_7d4c07d8f1.png`}
          alt="Path"
          className="img-fluid"
          style={{ marginBottom: "20px", marginLeft: "20px" }}
        />
      </div>
      <div className="path-right aos" data-aos="fade-left">
        <img
          src={`${apiUrl}/uploads/pattern_design_right_b15e9ac313.png`}
          alt="Path"
          className="img-fluid"
          style={{ marginBottom: "20px", marginRight: "20px" }}
        />
      </div>
      {/* </div> */}
    </section>
  );
}
