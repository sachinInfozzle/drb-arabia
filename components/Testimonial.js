import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Custom Previous Arrow component
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <img src={`${apiUrl}/uploads/arrow_left_3b096ddd75.svg`} alt="Previous" />
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
      <img src={`${apiUrl}/uploads/arrow_right_e6a88f5fec.svg`} alt="Next" />
    </button>
  );
}

export default function Testimonial({ data }) {
  const [testimonials, setTestimonials] = useState([]);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [position, setPosition] = useState(null);

  const testimonialSection = data;

  useEffect(() => {
    if (testimonialSection) {
      setTitle(testimonialSection.Title || null);
      setContent(testimonialSection.Content || null);
      setTestimonials(testimonialSection.contents || []);
      setPosition(testimonialSection.Position || null);
    }
  }, [testimonialSection]);

  const Slider = dynamic(() => import("react-slick"), {
    ssr: false,
  });

  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    cssEase: "linear",
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    adaptiveHeight: true, // Enable this option
  };

  // Early return if no content
  if (!testimonialSection) return null;

  return (
    <section className="testimonial-section" style={{ order: position }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <h2 className="text-center">{title}</h2>
            <div id="testimonial-slider">
              <div className="all-testimonials">
                <FadeUpWrapper>
                  <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="single-testimonial">
                        <div className="row justify-content-center">
                          <div className="col-md-8">
                            <div className="align-items-center text-center justify-content-center">
                              <img
                                src={`${apiUrl}/uploads/quote_img_0a79ca0b17.png`}
                                alt=""
                              />
                              <p className="testimonial-content">
                                {testimonial.Description}
                              </p>
                              <h3 className="testimonial-title">
                                {testimonial.Title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </FadeUpWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
