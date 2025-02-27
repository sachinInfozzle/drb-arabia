import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function Events({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [privetEventButton, setPrivetEventButton] = useState(null);
  const [privetEventDecs, setPrivetEventDecs] = useState(null);
  const [privetEventTitle, setPrivetEventTitle] = useState(null);
  const [privetEventLink, setPrivetEventLink] = useState(null);
  const [corporateEventTitle, setCorporateEventTitle] = useState(null);
  const [corporateEventDesc, setCorporateEventDesc] = useState(null);
  const [corporateEventButton, setCorporateEventButton] = useState(null);
  const [corporateEventLink, setCorporateEventLink] = useState(null);
  const [privetEventImage, setPrivetEventImage] = useState(null);
  const [corporateEventImage, setCorporateEventImage] = useState(null);
  const [position, setPosition] = useState(null);

  const getContent = data;

  console.log(data);

  useEffect(() => {
    if (getContent) {
      setPrivetEventButton(getContent.privetEventButton || null);
      setPrivetEventDecs(getContent.privetEventDecs || null);
      setPrivetEventTitle(getContent.privetEventTitle || null);
      setPrivetEventLink(getContent.privetEventLink || null);
      setCorporateEventTitle(getContent.corporateEventTitle || null);
      setCorporateEventDesc(getContent.corporateEventDesc || null);
      setCorporateEventButton(getContent.corporateEventButton || null);
      setCorporateEventLink(getContent.corporateEventLink || null);
      setPrivetEventImage(
        getContent?.privetEventImage?.[0]?.formats?.large?.url ||
          getContent?.privetEventImage?.[0]?.url ||
          null
      );
      setCorporateEventImage(
        getContent.corporateEventImage?.[0]?.formats?.large?.url ||
          getContent.corporateEventImage?.[0]?.url ||
          null
      );
      setPosition(getContent.Position || null);
      setTitle(getContent.Title || null);
      setDescription(getContent.Content || null);
    }
  }, [getContent]);

  // Early return if no content
  if (!getContent) return <h1>Hello</h1>;
  return (
    <>
      <section
        className="camp-section private-section custom-rtl"
        style={{ order: position }}
      >
        <div className="container">
          {/* Private Events Section */}
          <div className="private-info">
            <FadeUpWrapper>
              <div className="section-header">
                <h2 className="text-white">{title}</h2>
                <p className="text-white">{description}</p>
              </div>
            </FadeUpWrapper>
            <div className="row align-items-center">
              <div className="col-md-6 aos" data-aos="fade-up">
                <div className="camp-img custom-flip">
                  <FadeUpWrapper>
                    <img
                      src={apiUrl + privetEventImage}
                      className="img-fluid"
                    />
                  </FadeUpWrapper>
                </div>
              </div>
              <div className="col-md-6 aos" data-aos="fade-up">
                <FadeUpWrapper>
                  <div className="camp-content">
                    <div className="section-header text-start">
                      <h2 className="text-white custom-right-align">
                        {privetEventTitle}
                      </h2>
                    </div>

                    <p className="custom-right-align">{privetEventDecs}</p>
                  </div>
                  <div className="private-btn custom-right-align">
                    {privetEventLink ? (
                      <Link href={privetEventLink} className="btn white-btn">
                        {privetEventButton}
                      </Link>
                    ) : (
                      <span className="btn white-btn disabled">
                        {privetEventButton}
                      </span>
                    )}
                  </div>
                </FadeUpWrapper>
              </div>
            </div>
          </div>

          {/* Corporate Events Section */}
          <div className="private-info mb-0">
            <div className="row align-items-center">
              <div className="col-md-6 aos" data-aos="fade-up">
                <FadeUpWrapper>
                  <div className="camp-content">
                    <div className="section-header text-start">
                      <h2 className="text-white custom-right-align">
                        {corporateEventTitle}
                      </h2>
                    </div>

                    <p className="custom-right-align">{corporateEventDesc}</p>
                  </div>
                  <div className="private-btn private-btn-right custom-right-align">
                    {corporateEventLink ? (
                      <Link href={corporateEventLink} className="btn white-btn">
                        {corporateEventButton}
                      </Link>
                    ) : (
                      <span className="btn white-btn disabled">
                        {corporateEventButton}
                      </span>
                    )}
                  </div>
                </FadeUpWrapper>
              </div>
              <div className="col-md-6 aos" data-aos="fade-up">
                <div className="camp-img custom-flip">
                  <FadeUpWrapper>
                    <img
                      src={apiUrl + corporateEventImage}
                      className="img-fluid"
                    />
                  </FadeUpWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
