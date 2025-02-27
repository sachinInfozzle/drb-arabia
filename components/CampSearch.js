"use client";
import React, { useEffect, useRef, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { FadeUpWrapper } from "@/utils/FadeAnimation";

export default function CampSearch({ data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [date, setDate] = useState(null);
  const [position, setPosition] = useState(null);
  const [travelers, setTravelers] = useState(null);
  const [kids, setKids] = useState(null);
  const [adults, setAdults] = useState(null);
  const [search, setSearch] = useState(null);
  const [bookLink, setBookLink] = useState(
    "https://drbarabia.book-onlinenow.net/index.aspx"
  );
  const [bookMobileLink, setBookMobileLink] = useState(
    "https://drbarabia.book-onlinenow.net/mobile/index.aspx"
  );
  const [locations, setLocations] = useState([]);
  const [adultsCount, setAdultsCount] = useState(0);
  const [kidsCount, setKidsCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const [isMobile, setIsMobile] = useState(false);

  const getContent = data;

  // Early return if no content

  useEffect(() => {
    const checkWindowSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 767); // Check window width
      }
    };
    // Call the function on component mount
    checkWindowSize();

    // Add event listener to track window resizing
    window.addEventListener("resize", checkWindowSize);
    if (getContent) {
      setDate(getContent.Date || null);
      setTravelers(getContent.Travelers || null);
      setKids(getContent.Kids || null);
      setAdults(getContent.Adults || null);
      setSearch(getContent.Search || null);
      setLocations(getContent.Location || null);
      setPosition(getContent.Position || null);
      setBookLink(
        getContent.Book_Now_Main_Link ||
          "https://drbarabia.book-onlinenow.net/index.aspx"
      );
      setBookMobileLink(
        getContent.Book_Now_Mobile_Link ||
          "https://drbarabia.book-onlinenow.net/mobile/index.aspx"
      );
    }

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [data]);

  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const pathGroupRef = useRef(null);

  const [showTravellerPickers, setShowTravellerPickers] = useState(false);

  // Function to format the date to 'dd/mm/yyyy'
  const formatDate = (date) => {
    if (!date) return ""; // If date is null, return an empty string
    return new Date(date).toLocaleDateString("en-GB");
  };

  // Function to handle date range change
  const handleDateRangeChange = (dates) => {
    const startDate = formatDate(dates.start);
    const endDate = formatDate(dates.end);
    setSelectedDates({ startDate, endDate });
  };

  const handleSubmit = () => {
    let selectedLocation = locations.find(
      (loc) => loc.Title === document.getElementById("camp").value
    );
  
    let baseSearchUrl =
      selectedLocation && selectedLocation.Title === "The Leaf Ha'il"
        ? "https://drbarabia-leafhail.book-onlinenow.net/"
        : "https://drbarabia.book-onlinenow.net/";
  
    if (isMobile) {
      baseSearchUrl += "mobile/index.aspx";
    } else {
      baseSearchUrl += "index.aspx";
    }
  
    // Construct the query parameters
    const urlParams = `?arrival=${selectedDates.startDate}&departure=${selectedDates.endDate}&rooms=1&selectedroom=1&adults=${adultsCount}&kids=${kidsCount}&lan_id=en-US&kid1=-1&kid2=1&kid3=-1&extra=0&cot=0`;
  
    // Combine the base URL with the parameters
    const url = `${baseSearchUrl}${urlParams}`;
  
    // Open the URL in a new tab
    window.open(url, "_blank");
  };

  const handleClickOutside = (event) => {
    if (
      showTravellerPickers &&
      pathGroupRef.current &&
      !pathGroupRef.current.contains(event.target)
    ) {
      setShowTravellerPickers(false);
    }
  };
  console.log(selectedDates.startDate);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTravellerPickers]);

  // Early return if no content
  if (!getContent) return <></>;

  return (
    <div className="camp-search-container" style={{ order: position }}>
      <NextUIProvider>
        <FadeUpWrapper>
          <div className="container">
            <div className="path-search aos" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="path-group">
                    <img
                      src={`${apiUrl}/uploads/nav_icon_bf8a706414.svg`}
                      alt="Icon"
                    />
                    <div className="path-input">
                      <select
                        className="form-control"
                        id="camp"
                        name="camp"
                        placeholder="The Leaf"
                      >
                        {Array.isArray(locations) &&
                          locations.map((location) => {
                            if (!location || typeof location !== "object")
                              return null;

                            return (
                              <option key={location.id} value={location.Title}>
                                {location.Title}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="path-group" onClick={handleClick}>
                    <img
                      alt="Icon"
                      src={`${apiUrl}/uploads/calender_0eb8d6ae8f.svg`}
                    />
                    <DateRangePicker
                      label={`\n${date}`}
                      visibleMonths={isMobile ? 1 : 2}
                      placeholder="Pick a date range"
                      className="date-range"
                      isOpen={isOpen}
                      onChange={handleDateRangeChange}
                      onOpenChange={handleOpenChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6" ref={pathGroupRef}>
                  <div className="path-group">
                    <img
                      alt="Icon"
                      src={`${apiUrl}/uploads/user_cc9080cc67.svg`}
                    />
                    <div className="path-input">
                      <label>{travelers}</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="2 Adult, 1 Kids"
                        value={`${adultsCount} ${adults}, ${kidsCount} ${kids}`}
                        onClick={() =>
                          setShowTravellerPickers(!showTravellerPickers)
                        }
                      />
                    </div>
                    {showTravellerPickers ? (
                      <div className="date-picker-container">
                        <label>{adults}</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Adults"
                          value={adultsCount}
                          min={0}
                          onChange={(e) => setAdultsCount(e.target.value)}
                        />

                        <label>{kids}</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Kids"
                          value={kidsCount}
                          min={0}
                          onChange={(e) => setKidsCount(e.target.value)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="path-btn">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-primary"
                    >
                      {search}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUpWrapper>
      </NextUIProvider>
    </div>
  );
}
