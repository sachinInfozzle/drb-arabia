import React from "react";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function Gallery() {
  return (
    <>
      <section className="camp-section gallery-grid-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12" data-aos="fade-up">
            <FadeUpWrapper>
              <div className="section-header">
                <h2>Experience the Magic Through Our Lens</h2>
              </div>
              </FadeUpWrapper>
            </div>
          </div>

          <div className="grid-gallery">
            <div
              className="grid-item"
              data-src="assets/img/gallery/gallery-1.jpg"
            >
              <a href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}>
                <img
                  src={`${apiUrl}/uploads/gallery_1_7aa9807816.jpg`}
                  alt="image1"
                />
              </a>
            </div>
            <a
              href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_2_27f0c1ecf6.jpg`}
                alt="image2"
              />
            </a>
            <a
              href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_3_337177e01f.jpg`}
                alt="image3"
              />
            </a>

            <a
              href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_4_f15db10456.jpg`}
                alt="image4"
              />
            </a>
            <a
              href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_5_62536e72aa.jpg`}
                alt="image5"
              />
            </a>

            <a
              href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_6_a244ea136e.jpg`}
                alt="image6"
              />
            </a>
          </div>

          <div className="gallery-last">
            <a href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}>
              <img
                src={`${apiUrl}/uploads/gallery_7_bce5276064.jpg`}
                alt="image7"
              />
            </a>

            <a
              href={`${apiUrl}/uploads/gallery_7_bce5276064.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_8_23fad1c4b3.jpg`}
                alt="image8"
              />
            </a>

            <a
              href={`${apiUrl}/uploads/grid_img_4_66ab26a9ad.jpg`}
              className="grid-item"
            >
              <img
                src={`${apiUrl}/uploads/gallery_9_7cde368bbf.jpg`}
                alt="image9"
              />
            </a>
          </div>
        </div>
      </section>
      <section className="banner-section">
        <div className="container">
          <img
            src={`${apiUrl}/uploads/gallerybanner_162f2fa206.png`}
            // style="width: 100%"
          />
        </div>
      </section>
    </>
  );
}
