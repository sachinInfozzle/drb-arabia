import React, { useState } from "react";
import { SectionData } from "@/utils/helper";
import dynamic from "next/dynamic";

export default function ImagesSlider({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const getContent = data;

  // Early return if no content
  if (!getContent) return null;
  const { Position, Images } = getContent;

  // Custom Previous Arrow component
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          src={`${apiUrl}/uploads/arrow_left_white_06f52984f2.svg`}
          alt="Previous"
        />
      </button>
    );
  }

  // Custom Next Arrow component
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          src={`${apiUrl}/uploads/arrow_right_white_d311735eca.svg`}
          alt="Next"
        />
      </button>
    );
  }

  const Slider = dynamic(() => import("react-slick"), { ssr: false });

  const settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    arrows: false,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
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
        <div className="row-2">
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
