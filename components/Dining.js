import React, { useState, useEffect } from "react";
import Link from "next/link";

import { RichText, SectionData } from "@/utils/helper";

export default function Dining({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  // Early return if no content
  if (!getContent) return null;

  const { Title: title, Content, Position: position } = getContent;

  const image1 = getContent.Image?.[0]?.url;
  const image2 = getContent.Image2?.[0]?.url;
  const image3 = getContent.Image3?.[0]?.url;
  return (
    <section className="grid-img-wrapper px-40" style={{ order: position }}>
      <div className="container">
        <div className="row align-items-center custom-row-reverse">
          <div className="col-md-6">
            <div className="grid-img-info">
              <div className="section-header">
                <h3 className="custom-right-align">{title}</h3>
              </div>
              <p className="custom-right-align">{Content}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="grid-img-blk">
              <div className="row align-items-center">
                <div className="col-md-6 dining-imgs dine-img">
                  <img src={`${apiUrl}${image1}`} alt="" />
                </div>
                <div className="col-md-6 dining-imgs">
                  <img src={`${apiUrl}${image2}`} className="mb-4" alt="" />
                  <img src={`${apiUrl}${image3}`} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
