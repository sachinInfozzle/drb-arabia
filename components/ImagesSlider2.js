import React, { useState } from "react";
import { SectionData } from "@/utils/helper";
import dynamic from "next/dynamic";

export default function ImagesSlider2({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const { Position, Images } = getContent;

  const Slider = dynamic(() => import("react-slick"), { ssr: false });

  const settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    arrows: false,
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    speed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="images-slider exp-section" style={{ order: Position }}>
      <div className="full-container">
        <div className="row">
          <div className="col-md-12">
            <Slider {...settings}>
              {Images.map((image) => {
                return (
                  <div className="single-image" key={image.id}>
                    <img src={`${apiUrl}${image.url}`} alt="slider-image" />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
