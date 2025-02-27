import React, { useState } from "react";

import { SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function ContactUs({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rawData = JSON.stringify({
        data: {
          Name: formData.name,
          Phone: formData.phone,
          Email: formData.email,
          Message: formData.message,
        },
      });
      const response = await fetch(
        "https://drbarabia.com/api/contact-entries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: rawData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Form submitted successfully!");
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage("An unexpected error occurred.");
      console.error(error);
    }
  };

  // Destructure content values
  const {
    Title: title,
    Form,
    Image,
    Form_Title: formTitle,
    phone_number,
    phone_head,
    email_head,
    email,
    Position,
  } = getContent;

  const image = Image?.[0]?.formats?.small?.url || Image?.url;

  return (
    <footer className="footer contact-section" style={{ order: Position }}>
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="col-md-12">
            <FadeUpWrapper>
              <div className="section-header">
                <h2 className="text-white">{title || "Contact Us"}</h2>
              </div>
            </FadeUpWrapper>
          </div>
        </div>

        {/* Contact Info */}
        <FadeUpWrapper>
          <div className="contact-info">
            <ul className="nav">
              {phone_number && (
                <li>
                  <h4 className="custom-centre">{phone_head || "Phone"}</h4>
                  <a
                    className="custom-a"
                    href={`tel:${phone_number}`}
                    style={{ direction: "ltr" }}
                  >
                    {phone_number}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <h4 className="custom-centre">{email_head || "Email"}</h4>
                  <a className="custom-a" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </FadeUpWrapper>

        {/* Contact Form and Image */}
        <div className="row align-items-center custom-row-reverse contact-us-sachin">
          {/* Contact Form */}
          <div className="col-md-7">
            <FadeUpWrapper>
              <div className="footer-form">
                {formTitle ? <p>{formTitle}</p> : ""}
                <form onSubmit={handleSubmit}>
                  <div className="footer-form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder={Form.name_heading}
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="footer-form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder={Form.phone_heading}
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="footer-form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder={Form.email_heading}
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="footer-form-group">
                    <textarea
                      className="form-control"
                      name="message"
                      placeholder={Form.message_heading}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="footer-form-btn custom-right-align">
                    <button type="submit" className="btn white-btn">
                      {Form.button_heading}
                    </button>
                  </div>
                  {responseMessage && (
                    <div className="alert alert-success">{responseMessage}</div>
                  )}
                </form>
              </div>
            </FadeUpWrapper>
          </div>

          {/* Footer Image */}
          {image && (
            <div className="col-md-5">
              <FadeUpWrapper>
                <div className="footer-img custom-flip">
                  <img
                    src={
                      image
                        ? `${apiUrl}${image}`
                        : "/assets/img/default-image.jpg"
                    }
                    className="img-fluid"
                    alt="Footer"
                  />
                </div>
              </FadeUpWrapper>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
