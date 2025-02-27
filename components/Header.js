import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ data }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [logo, setLogo] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [booknow, setBooknow] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBookNowDropdownOpen, setIsBookNowDropdownOpen] = useState(false);

  const router = useRouter();
  const { locale, asPath } = router;
  
   
   

  const toggleSubMenu = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.toggle("submenu-open");
    const parent = target.closest(".nav-item");
    if (parent) {
      const submenu = parent.querySelector(".submenu");
      if (submenu) {
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
      }
    }
  };

  const fetchMenuData = async (locale) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/header?populate=Menus.Item&populate=Menus.Image&populate=Site_Logo&populate=book_now&locale=${locale}`
      );
      if (!response.ok) throw new Error("Failed to fetch menu data");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching menu data:", error);
      return { Menus: [], book_now: { Title: "", Link: "" } };
    }
  };

  const toggleClass = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const changeLanguage = (lang) => {
    router.push(asPath, asPath, { locale: lang });
    setCurrentLang(lang);
    document.body.classList.toggle("lang-ar", lang === "ar");
    setIsActive(!isActive);
  };

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetchMenuData(locale);
      setMenuItems(data.Menus);
      setBooknow(data.book_now[0]);
      setLogo(data.Site_Logo.url);
      setLoading(false);
    };

    fetchData();

    if (locale == "ar") {
      document.body.classList.add("lang-ar");
    }

    setCurrentLang(locale);
  }, [locale]);

  useEffect(() => {
    const overlayDiv = document.querySelector(".sidebar-overlay");

    if (isMobile && !overlayDiv) {
      const newOverlayDiv = document.createElement("div");
      newOverlayDiv.className = "sidebar-overlay";
      document.body.appendChild(newOverlayDiv);
    }

    if (!isMobile && overlayDiv) {
      overlayDiv.remove();
    }

    return () => {
      const existingOverlayDiv = document.querySelector(".sidebar-overlay");
      if (existingOverlayDiv) {
        existingOverlayDiv.remove();
      }
    };
  }, [isMobile]);

  const handleMobileMenuToggle = () => {
    document.body.classList.toggle("slide-nav");
    document.querySelector(".sidebar-overlay")?.classList.toggle("opened");
    document.querySelector("html").classList.toggle("menu-opened");
    setMenuOpened(!menuOpened);
  };

  const handleOverlayClick = () => {
    document.querySelector("html").classList.remove("menu-opened");
    document.querySelector(".sidebar-overlay")?.classList.remove("opened");
    document.body.classList.remove("slide-nav");
    setMenuOpened(false);
    setIsBookNowDropdownOpen(false); // Close the dropdown when overlay is clicked
  };

  const handleCloseBtnClick = () => {
    document.querySelector("html").classList.remove("menu-opened");
    document.querySelector(".sidebar-overlay")?.classList.remove("opened");
    document.body.classList.remove("slide-nav");
    setMenuOpened(false);
    setIsBookNowDropdownOpen(false); // Close the dropdown when close button is clicked
  };

  useEffect(() => {
    const closeBtn = document.querySelector("#menu_close");
    if (closeBtn) {
      closeBtn.addEventListener("click", handleCloseBtnClick);
    }

    return () => {
      if (closeBtn) {
        closeBtn.removeEventListener("click", handleCloseBtnClick);
      }
    };
  }, [menuOpened]);

  useEffect(() => {
    const overlay = document.querySelector(".sidebar-overlay");
    if (overlay) {
      overlay.addEventListener("click", handleOverlayClick);
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener("click", handleOverlayClick);
      }
    };
  }, [menuOpened]);

  if (loading) {
    return <></>;
  }


  return (
    <header className="header">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg header-nav custom-row-reverse">
          {/* Common Section: Logo and Language Dropdown */}
          <div className="custom-first-section">
            <div className="navbar-header">
              {/* Mobile Menu Toggle Button */}
              {isMobile && (
                <button
                  id="mobile_btns"
                  className="navbar-toggler"
                  onClick={handleMobileMenuToggle}
                >
                  <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
              )}
              {/* Logo */}
              <Link href="/" className="navbar-brand logo">
                <img src={`${apiUrl}/${logo}`} alt="Logo" />
              </Link>
              {/* Language Dropdown */}
              <div className="flag-dropdown">
                <Link
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  onClick={toggleClass}
                  className={`dropdown-toggle nav-link ${
                    isActive ? "show" : ""
                  }`}
                >
                  <img
                    src={`${apiUrl}/uploads/globe_icon_1acc98d4f0.svg`}
                    alt=""
                    height="20"
                    className="flag-img"
                  />
                  <span>{currentLang === "en" ? "EN" : "عربي"}</span>
                </Link>

                <div className="dropdown-menu dropdown-menu-end">
                  <a
                    className="dropdown-item"
                    onClick={() => changeLanguage("en")}
                  >
                    English
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={() => changeLanguage("ar")}
                  >
                    عربي
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View: Navigation Menu */}
          {!isMobile && (
            <div className="custom-second-section">
              <div className="main-menu-wrapper">
                <ul className="main-nav custom-row-reverse">
                  {menuItems.map((menu, index) => (
                    <li
                      key={menu.id}
                      className={`nav-item ${
                        menu.Item.length > 0 ? "has-submenu" : ""
                      }`}
                      style={{ order: menu.Position }}
                    >
                      <a
                        href={
                          index === menuItems.length - 1 && data?.Link
                            ? data?.Link
                            : menu.Link
                        }
                        className="nav-link"
                      >
                        {menu.Title}
                        {menu.Item && menu.Item.length > 0 && (
                          <i
                            onClick={(e) => toggleSubMenu(e)}
                            className="fas fa-chevron-right"
                          ></i>
                        )}
                      </a>
                      {menu.Item && menu.Item.length > 0 && (
                        <>
                          <ul className="submenu custom-right-align">
                            {menu.Item.map((subItem) => (
                              <li key={subItem.id}>
                                <a href={subItem.Link}>{subItem.Title}</a>
                              </li>
                            ))}
                            <div
                              className="menu-side-img"
                              style={{
                                backgroundImage: `url(${
                                  apiUrl + menu.Image?.url
                                })`,
                              }}
                            ></div>
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Desktop View: Book Now and Language Dropdown */}
          {!isMobile && (
            <div className="custom-third-section">
              <ul className="nav header-navbar-rht custom-row-reverse">
                <li className="nav-item">
                  <div className="relative">
                    <button
                      className="btn btn-primary w-[170px]"
                      onClick={() =>
                        setIsBookNowDropdownOpen(!isBookNowDropdownOpen)
                      }
                    >
                      {data?.Title || booknow?.Title || "Book Now"}
                    </button>

                    {isBookNowDropdownOpen && (
                      <div className="absolute left-0 w-[170px] bg-[#f1ebdf] shadow-lg">
                        {(
                          booknow?.Item || [
                            {
                              id: 1,
                              TitleEn: "The Leaf Riyadh",
                              TitleAr: "الورقة الرياض",
                              Link: "https://drbarabia.book-onlinenow.net/index.aspx?Page=1",
                            },
                            {
                              id: 2,
                              TitleEn: "The Leaf Ha'il",
                              TitleAr: "الورقة حائل",
                              Link: "https://drbarabia-leafhail.book-onlinenow.net/",
                            },
                          ]
                        ).map((subItem) => (
                          <div key={subItem.id}>
                            <a
                              href={subItem.Link}
                              className="block px-4 py-2 text-gray-700 hover:bg-[#ae4c29] hover:text-white"
                              onClick={() => setIsBookNowDropdownOpen(false)}
                            >
                              {currentLang === "en"
                                ? subItem.TitleEn
                                : subItem.TitleAr}
                            </a>
                            {subItem.TitleEn === "The Leaf Riyadh" && (
                              <div className="border-t border-gray-200"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>

                <li>
                  <div className="flag-dropdown">
                    <Link
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      onClick={toggleClass}
                      className={`dropdown-toggle nav-link ${
                        isActive ? "show" : ""
                      }`}
                    >
                      <img
                        src={`${apiUrl}/uploads/globe_icon_1acc98d4f0.svg`}
                        alt=""
                        height="20"
                        className="flag-img"
                      />
                      <span>{currentLang === "en" ? "EN" : "عربي"}</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a
                        className={`dropdown-item ${
                          currentLang === "en" ? "" : "inactive"
                        }`}
                        onClick={() => changeLanguage("en")}
                      >
                        English
                      </a>
                      <a
                        className={`dropdown-item ${
                          currentLang === "ar" ? "" : "inactive"
                        }`}
                        onClick={() => changeLanguage("ar")}
                      >
                        عربي
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile View: Navigation Menu and Book Now Dropdown */}
          {isMobile && (
            <div className="custom-second-section">
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <a href="getMenu('')" className="menu-logo">
                    <img
                      src={`${apiUrl}/${logo}`}
                      className="img-fluid"
                      alt="Logo"
                    />
                  </a>
                  <a id="menu_close" className="menu-close" href="#">
                    <i className="fas fa-times"></i>
                  </a>
                </div>
                <ul className="main-nav custom-row-reverse">
                  {menuItems.map((menu, index) => (
                    <li
                      key={menu.id}
                      className={`nav-item ${
                        menu.Item.length > 0 || index === menuItems.length - 1
                          ? "has-submenu"
                          : ""
                      }`}
                      style={{ order: menu.Position }}
                    >
                      <a
                        href={
                          index === menuItems.length - 1 && data?.Link
                            ? data?.Link
                            : menu.Link
                        }
                        className="nav-link"
                      >
                        {menu.Title}
                        {(menu.Item.length > 0 ||
                          index === menuItems.length - 1) && (
                          <i
                            onClick={(e) => toggleSubMenu(e)}
                            className="fas fa-chevron-right"
                          ></i>
                        )}
                      </a>

                      {(menu.Item.length > 0 ||
                        index === menuItems.length - 1) && (
                        <ul className="submenu custom-right-align">
                          {index !== menuItems.length - 1
                            ? menu.Item.map((subItem) => (
                                <li key={subItem.id}>
                                  <a href={subItem.Link}>{subItem.Title}</a>
                                </li>
                              ))
                            : (
                                booknow?.Item || [
                                  {
                                    id: 1,
                                    TitleEn: "The Leaf Riyadh",
                                    TitleAr: "الورقة الرياض",
                                    Link: "https://drbarabia.book-onlinenow.net/index.aspx?Page=1",
                                  },
                                  {
                                    id: 2,
                                    TitleEn: "The Leaf Ha'il",
                                    TitleAr: "الورقة حائل",
                                    Link: "https://drbarabia-leafhail.book-onlinenow.net/",
                                  },
                                ]
                              ).map((subItem) => (
                                <li key={subItem.id}>
                                  <a href={subItem.Link}>
                                    {currentLang === "en"
                                      ? subItem.TitleEn
                                      : subItem.TitleAr}
                                  </a>
                                </li>
                              ))}

                          {menu.Image?.url && (
                            <div
                              className="menu-side-img"
                              style={{
                                backgroundImage: `url(${
                                  apiUrl + menu.Image.url
                                })`,
                              }}
                            ></div>
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Mobile View: Book Now Dropdown */}
          {isMobile && (
            <div className="custom-third-section">
              <ul className="nav header-navbar-rht custom-row-reverse">
                <li className="nav-item">
                  <div className="relative">
                    <button
                      className="btn btn-primary w-[170px]"
                      onClick={() =>
                        setIsBookNowDropdownOpen(!isBookNowDropdownOpen)
                      }
                    >
                      {data?.Title || booknow?.Title || "Book Now"}
                    </button>

                    {isBookNowDropdownOpen && (
                      <div className="absolute left-0 w-[170px] bg-[#f1ebdf] shadow-lg">
                        {(
                          booknow?.Item || [
                            {
                              id: 1,
                              TitleEn: "The Leaf Riyadh",
                              TitleAr: "الورقة الرياض",
                              Link: "https://drbarabia.book-onlinenow.net/index.aspx?Page=1",
                            },
                            {
                              id: 2,
                              TitleEn: "The Leaf Ha'il",
                              TitleAr: "الورقة حائل",
                              Link: "https://drbarabia-leafhail.book-onlinenow.net/",
                            },
                          ]
                        ).map((subItem) => (
                          <div key={subItem.id}>
                            <a
                              href={subItem.Link}
                              className="block px-4 py-2 text-gray-700 hover:bg-[#ae4c29] hover:text-white"
                              onClick={() => setIsBookNowDropdownOpen(false)}
                            >
                              {currentLang === "en"
                                ? subItem.TitleEn
                                : subItem.TitleAr}
                            </a>
                            {subItem.TitleEn === "The Leaf Riyadh" && (
                              <div className="border-t border-gray-200"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;