import React from "react";
import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function Aboutus_page({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const { Title: title, Content: contents, Image, Position } = getContent;
  const image = Image?.[0]?.formats?.small?.url || Image?.url;

  // Process content through RichText
  const content = RichText(contents);
  return (
    <>
      <section
        className="aboutus-about-drb about-section p-0 custom-rtl"
        style={{ order: Position }}
      >
        {/* <div className="container">
          <div className="row align-items-end custom-row-reverse"> */}
        {/* <div className="col-md-6 aos" data-aos="fade-up"> */}
        <div className="img-blk">
          <FadeUpWrapper>
            <img
              src={image ? `${apiUrl}${image}` : ""}
              className="img-fluid"
              alt="Experiences"
            />
          </FadeUpWrapper>
        </div>
        {/* </div> */}

        <div className="content-blk text-start aos" data-aos="fade-up">
          <FadeUpWrapper>
            <div className="section-header text-start position-relative">
              <h2 className="text-white custom-right-align">{title}</h2>
              {/* <img
                src="https://drbarabia.com/assets/img/shape-01.png"
                className="shape-right about-right-shape position-absolute"
                alt="Shape"
                width="80"
              /> */}
            </div>
            <div>{content}</div>
          </FadeUpWrapper>
        </div>
        {/* </div>
        </div> */}
      </section>
    </>
  );
}
