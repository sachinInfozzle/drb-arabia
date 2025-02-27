import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function OurGalleryPage({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const getContent = data;

  // Helper function to generate full image URL
  // const fullImageUrl = (path) => `${apiUrl}${path}`;

  // Extracting data from the API response
  const { Title: title, Position: position, Image: images = [] } = data;

  const image = getContent.Image?.[0]?.url;
  const image2 = getContent.Image2?.[0]?.url;
  const image3 = getContent.Image3?.[0]?.url;
  const image4 = getContent.Image4?.[0]?.url;
  const image5 = getContent.Image5?.[0]?.url;
  const image6 = getContent.Image6?.[0]?.url;
  const image7 = getContent.Image7?.[0]?.url;
  const image8 = getContent.Image8?.[0]?.url;
  const image9 = getContent.Image9?.[0]?.url;
  const image10 = getContent.Image10?.[0]?.url;

  // Create a ref to attach to the lightGallery element
  const galleryRef = useRef(null);

 

  return (
    <>
<section className="camp-section gallery-grid-section"  style={{ order: position }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 aos" data-aos="fade-up">
              <div className="section-header">
                <FadeUpWrapper>
                <h2>{title}</h2>
                </FadeUpWrapper>
              </div>
            </div>
          </div>

          <div className="grid-gallery">
            <div className="grid-item" data-src={`${apiUrl}${image}`}>
              <a href={`${apiUrl}${image}`}>
                <img src={`${apiUrl}${image}`} alt="image" />
              </a>
            </div>
            <a href={`${apiUrl}${image2}`} className="grid-item">
              <img src={`${apiUrl}${image2}`} alt="image2" />
            </a>
            <a href={`${apiUrl}${image3}`} className="grid-item">
              <img src={`${apiUrl}${image3}`} alt="image3" />
            </a>
            <a href={`${apiUrl}${image4}`} className="grid-item">
              <img src={`${apiUrl}${image4}`} alt="image4" />
            </a>
            <a href={`${apiUrl}${image5}`} className="grid-item">
              <img src={`${apiUrl}${image5}`} alt="image5" />
            </a>
            <a href={`${apiUrl}${image6}`} className="grid-item">
              <img src={`${apiUrl}${image6}`} alt="image6" />
            </a>
          </div>

          <div className="gallery-last">
            {/* Additional Gallery Items */}
            <a href={`${apiUrl}${image7}`} className="grid-item">
              <img src={`${apiUrl}${image7}`} alt="image7" />
            </a>
            <a href={`${apiUrl}${image8}`} className="grid-item">
              <img src={`${apiUrl}${image8}`} alt="image8" />
            </a>
            <a href={`${apiUrl}${image9}`} className="grid-item">
              <img src={`${apiUrl}${image9}`} alt="image9" />
            </a>
          </div>
        </div>
      </section>

      <section className="banner-section" style={{ order: position }}>
        <div className="container">
          <img
            src={`${apiUrl}${image10}`}
            alt="Gallery Banner"
            style={{ width: "100%" }}
          />
        </div>
      </section>
    </>
  );
}
