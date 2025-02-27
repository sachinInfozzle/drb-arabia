import React from "react";
import { useState, useEffect } from "react";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function TripleImage({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [content, setContent] = useState(null);
  const [titleImage, setTitleImage] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [position, setPosition] = useState(null);

  const getContent = data;

  useEffect(() => {
    if (getContent) {
      setContent(getContent.Content || null);
      setTitleImage(getContent.TitleImage?.[0]?.url || null);
      setFirstImage(getContent.FirstImage?.[0]?.url || null);
      setSecondImage(getContent.SecondImage?.[0]?.url || null);
      setThirdImage(getContent.ThirdImage?.[0]?.url || null);
      setPosition(getContent.Position || null);
    }
  }, [getContent]);

  // Early return if no content
  if (!getContent) return null;
  return (
    <>
      <section className="leaf-section" style={{ order: position }}>
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 aos" data-aos="fade-up">
              <FadeUpWrapper>
                <div className="section-header">
                  <img
                    src={apiUrl + titleImage}
                    className="img-fluid items-center"
                    alt="Leaf"
                  />
                  <p>{content}</p>
                </div>
              </FadeUpWrapper>
            </div>
          </div>
          <FadeUpWrapper>
            <div className="row">
              <div className="col-md-4 aos" data-aos="fade-up">
                <div className="leaf-img">
                  <img
                    src={apiUrl + firstImage}
                    className="img-fluid"
                    alt="Leaf"
                  />
                </div>
              </div>
              <div className="col-md-4 aos" data-aos="fade-up">
                <div className="leaf-img">
                  <img
                    src={apiUrl + secondImage}
                    className="img-fluid"
                    alt="Leaf"
                  />
                </div>
              </div>
              <div className="col-md-4 aos" data-aos="fade-up">
                <div className="leaf-img">
                  <img
                    src={apiUrl + thirdImage}
                    className="img-fluid"
                    alt="Leaf"
                  />
                </div>
              </div>
            </div>
          </FadeUpWrapper>
        </div>
      </section>
    </>
  );
}
