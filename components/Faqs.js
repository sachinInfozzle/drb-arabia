"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { RichText, SectionData } from "@/utils/helper";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

const Faqs = ({ data }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  const handleClick = (e) => {
    const target = e.currentTarget;

    const title = target.querySelector("button.accordion-button");
    const parent = target.closest(".accordion-item");
    const content = parent.querySelector(".accordion-collapse");

    // Check if the accordion is already open
    const isOpen = content.classList.contains("show");

    if (isOpen) {
      // Close the accordion
      title.classList.add("collapsed");
      content.classList.remove("show");
      content.classList.add("collapse");
    } else {
      // Open the accordion
      title.classList.remove("collapsed");
      content.classList.remove("collapse");
      content.classList.add("show");
    }
  };

  // Early return if no content
  if (!getContent) return null;

  const { Title: title, Faqs_Q_A: faqs, Position } = getContent;

  return (
    <section className="faq_section" style={{ order: Position }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <FadeUpWrapper>
              <div className="section-header">
                <h2>{title}</h2>
              </div>
            </FadeUpWrapper>
          </div>
        </div>
        <div className="faq-wrapper">
          <div className="accordion" id="accordionExample">
            {faqs.map((faq, i) => {
              return (
                <div key={i} className="accordion-item">
                  <h2
                    onClick={handleClick}
                    className="accordion-header"
                    id={`heading-${i}`}
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${i}`}
                      aria-expanded="false"
                    >
                      {faq.Question}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${i}`}
                    className="accordion-collapse collapse custom-right-align"
                    aria-labelledby={`heading-${i}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{faq.Answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
