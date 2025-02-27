import { useState, useEffect } from "react";

export default function Reviews({ data }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const getContent = data;

  useEffect(() => {
    if (getContent) {
      setTitle(getContent.Title || null);
      setDescription(getContent.Content || null);
    }
  }, [getContent]);

  // Early return if no content
  if (!getContent) return null;

  return (
    <>
      <section className="camp-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header mb-0 aos" data-aos="fade-up">
                <h2>{title}</h2>
                <h6 className="custom-hfont">{description}</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
