import React from "react";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function CorporateEvents({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const corporateEventSection = data;

  if (!corporateEventSection) return null;

  const {
    Head_Title,
    Head_Content,
    Content,
    Button,
    Link: sectionLink,
    Image,
    Position,
  } = corporateEventSection;

  // Get the image URL (fallback to an empty string if not available)
  const imageUrl =
    Image && Image.length > 0
      ? Image[0].formats?.small?.url || Image[0].url
      : "";

  return (
    <section className="leaf-section camp-section" style={{ order: Position }}>
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-header">
              <FadeUpWrapper>
                <h2>{Head_Title}</h2>
                <h6>{Head_Content}</h6>
              </FadeUpWrapper>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="row align-items-center custom-row-reverse">
          {/* Image Section */}
          <div className="col-md-6 aos" data-aos="fade-up">
            <div className="camp-img custom-flip">
              {imageUrl && (
                <FadeUpWrapper>
                  <img
                    src={imageUrl}
                    className="img-fluid"
                    alt={Head_Title || "Corporate Event"}
                    width={500}
                    height={300}
                  />
                </FadeUpWrapper>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="col-md-6 aos" data-aos="fade-up">
            <div className="camp-content">
              {Content &&
                Content.map((contentItem, index) =>
                  contentItem.type === "paragraph" &&
                  contentItem.children?.[0]?.text ? (
                    <FadeUpWrapper key={index}>
                      <p
                        key={index}
                        style={{ marginTop: index > 0 ? "30px" : "0" }}
                      >
                        {contentItem.children[0].text}
                      </p>
                    </FadeUpWrapper>
                  ) : null
                )}

              {/* Call-to-Action Button */}
              {Button && sectionLink && (
                  <div
                    className="private-btn private-btn-right aos custom-right-align"
                    data-aos="fade-up"
                    style={{ marginTop: "30px" }}
                  >
                    <Link
                      href={sectionLink}
                      className="btn btn-primary mt-auto"
                    >
                      {Button}
                    </Link>
                  </div> 
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
