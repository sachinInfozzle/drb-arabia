import React from "react";

import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function Overview({ data }) {
  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const { Title: title, Content, Position } = getContent;

  const content = RichText(Content);

  return (
    <section
      className="camp-section overview-section"
      style={{ order: Position }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header mb-0 aos" data-aos="fade-up">
              <FadeUpWrapper>
                <h2>{title}</h2>
                <h6 className="overview-text">{content}</h6>
              </FadeUpWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
