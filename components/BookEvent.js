import React, { useEffect, useState } from "react";
import { SectionData } from "@/utils/helper";
import { useRouter } from "next/router";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function BookEvent({ data }) {
  const router = useRouter();
  const { activity } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getContent = data;

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    date: { day: "", month: "", year: "" },
    event_type: "",
    people_count: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["day", "month", "year"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        date: { ...prev.date, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date
    if (!formData.date.day || !formData.date.month || !formData.date.year) {
      setResponseMessage("Please select a valid date.");
      return;
    }

    try {
      const rawData = JSON.stringify({
        data: {
          Name: formData.name,
          last_name: formData.lastname,
          Email: formData.email,
          Date: `${formData.date.day}-${formData.date.month}-${formData.date.year}`,
          event_type: formData.event_type,
          people_count: formData.people_count,
          Message: formData.message,
        },
      });

      const response = await fetch(
        "https://drbarabia.com/api/booking-entries",
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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = ["2024", "2025", "2026"];
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      event_type: activity,
    }));
  }, [activity]);

  if (!getContent) return null;

  const {
    Title,
    phone_number,
    phone_head,
    email_head,
    email,
    Position,
    name_heading,
    lastname_heading,
    email_heading,
    date_heading,
    day_heading,
    month_heading,
    year_heading,
    event_heading,
    people_heading,
    message_heading,
    button_heading,
  } = getContent;

  return (
    <footer className="booking-form footer pb-0" style={{ order: Position }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 aos" data-aos="fade-up">
            <div className="section-header">
              <FadeUpWrapper>
                <h2 className="text-white">{Title}</h2>
              </FadeUpWrapper>
            </div>
          </div>
        </div>
        <div className="contact-info aos" data-aos="fade-up">
          <FadeUpWrapper>
            <ul className="nav">
              <li>
                <h4 className="custom-centre">{phone_head}</h4>
                <p>{phone_number}</p>
              </li>
              <li>
                <h4 className="custom-centre">{email_head}</h4>
                <p>{email}</p>
              </li>
            </ul>
          </FadeUpWrapper>
        </div>
        <div className="map-blk align-items-center text-center">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <FadeUpWrapper>
                <div className="footer-form mb-0">
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className="footer-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={name_heading}
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="footer-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={lastname_heading}
                        required
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="footer-form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder={email_heading}
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex cal-blk footer-form-group align-items-center gap-3 custom-row-reverse">
                      <label>{date_heading}</label>
                      <div className="d-flex select-group gap-4 custom-row-reverse">
                        <select
                          className="form-control select"
                          required
                          name="day"
                          value={formData.date.day}
                          onChange={handleChange}
                        >
                          <option value="">{day_heading}</option>
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <select
                          className="form-control select"
                          required
                          name="month"
                          value={formData.date.month}
                          onChange={handleChange}
                        >
                          <option value="">{month_heading}</option>
                          {months.map((month, i) => (
                            <option key={i} value={i + 1}>
                              {month}
                            </option>
                          ))}
                        </select>
                        <select
                          className="form-control select"
                          required
                          name="year"
                          value={formData.date.year}
                          onChange={handleChange}
                        >
                          <option value="">{year_heading}</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="footer-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={event_heading}
                        required
                        name="event_type"
                        value={formData.event_type}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="footer-form-group">
                      <input
                        type="number"
                        className="form-control custom-rtl"
                        placeholder={people_heading}
                        required
                        name="people_count"
                        value={formData.people_count}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="footer-form-group">
                      <textarea
                        className="form-control"
                        placeholder={message_heading}
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="footer-form-btn">
                      <button type="submit" className="btn white-btn">
                        {button_heading}
                      </button>
                    </div>
                    {responseMessage && (
                      <div className="alert alert-success">
                        {responseMessage}
                      </div>
                    )}
                  </form>
                </div>
              </FadeUpWrapper>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
