import React from "react";

export default function TheLeafLogo() {
  return (
    <section className="leaf-section camp-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-header">
              {/* <!--			<h2>  {{ $t('camps.The_Leaf_Title') }} </h2>--> */}

              <img
                src={`${apiUrl}/uploads/full_colour_logo_a5e071d5e3.png`}
                className="img-fluid leaf-img-en"
                alt="Leaf"
              />
              {/* <img
                  src={`${apiUrl}/uploads/the_leaf_ar_04a0b03dd4.png`}
                  className="img-fluid leaf-img-ar"
                  alt="Leaf"
                /> */}

              <h6>
                The Leaf offers a harmonious blend of nature and luxury,
                providing a tranquil escape in the heart of the desert.
              </h6>
            </div>
          </div>
        </div>
        <div className="row align-items-center custom-row-reverse">
          <div className="col-md-6 aos" data-aos="fade-up">
            <div className="camp-img">
              <img
                src={`${apiUrl}/uploads/leaf_10_eb3697697a.png`}
                className="img-fluid"
                alt="Leaf"
              />
            </div>
          </div>
          <div className="col-md-6 aos" data-aos="fade-up">
            <div className="camp-content custom-right-align">
              <h2>Where Classic Camping Meets Contemporary Luxury</h2>
              <p>
                Nestled in the heart of the King Khalid Royal Reserve, The Leaf
                of Riyadh offers a perfect blend of comfort and nature. Our
                glamping experience provides a unique opportunity to disconnect
                from the world and reconnect with yourself. Enjoy cool desert
                breezes, starry nights, and a range of activities from rock
                climbing to stargazing. The Leaf of Riyadh is ideal for
                weekends, holidays, and corporate retreats, all designed with
                sustainability and community integration in mind.
              </p>
              <a href="getMenu('/camps-leaf')" className="btn btn-primary">
                view more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
