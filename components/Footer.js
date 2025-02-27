import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FadeUpWrapper } from "@/utils/FadeAnimation";
export default function Footer() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [logo, setLogo] = useState("");
  const [title, setTitle] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const router = useRouter();
  const { locale, asPath } = router;

  // Fetch menu data from API
  const fetchFooterData = async (locale) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/footer?populate=Menu.Item&populate=SocialLink&populate=logo&locale=${locale}`
      );
      if (!response.ok) throw new Error("Failed to fetch footer data");

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const footerData = await fetchFooterData(locale);
      if (footerData) {
        setLogo(footerData.logo[0]?.url || null);
        setTitle(footerData.Title || "");
        setMenuItems(footerData.Menu || []);
        setSocialLinks(footerData.SocialLink || []);
      }
    };

    fetchData();
  }, [locale]);

  return (
    <footer className="footer">
      <div className="container">
      <FadeUpWrapper>
        <div className="row custom-row-reverse">
          {/* Logo and Title */}
          <div className="col-lg-2 col-md-4 aos" data-aos="fade-up">
            <div className="footer-widget footer-about custom-right-align">
              <img
                src={`${apiUrl}${logo}`}
                className="mb-3"
                alt="Logo"
                width="114"
                height="108"
              />
              <p className="custom-right-align">{title}</p>
            </div>
          </div>

          {/* Menu Items */}
          {menuItems.map((menu) => (
            <div key={menu.id} className="col-lg-2 col-md-4 aos" data-aos="fade-up">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title custom-right-align">{menu.Title}</h2>
                <ul>
                  {menu.Item.map((item) => (
                    <li key={item.id} className="custom-row-reverse">
                      <Link href={`${item.Link}`}>{item.Title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="social-link custom-footer-icons">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.Platform === "Instagram" ? `https://instagram.com/${link.Link}` : link.Link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.Platform === "Instagram" && <i className="fab fa-instagram hi-icon"></i>}
              {link.Platform === "Facebook" && <i className="fab fa-facebook-f hi-icon"></i>}
              {link.Platform === "LinkedIn" && <i className="fab fa-linkedin-in hi-icon"></i>}
              {link.Platform === "YouTube" && <i className="fab fa-youtube hi-icon"></i>}
            </a>
          ))}
        </div>
      </FadeUpWrapper>
      <div class="back-to-top">
        <a
          class="back-to-top-icon align-items-center justify-content-center d-flex"
          href="#top"
        >
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
      </div>
    </footer>
  );
}
