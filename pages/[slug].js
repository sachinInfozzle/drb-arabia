import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CampSearch,
  Header,
  Hero,
  DualSideImage,
  Overview,
  TripleImage,
  ImageContent,
  Events,
  AdvanceGallery,
  FeatureAbout,
  Testimonial,
  ExperiencesCards,
  CorporateEvents,
  PrivateEvents,
  Faqs,
  OurGalleryPage,
} from "@/components";
import Footer from "@/components/Footer";
import Summary from "@/components/Summary";
import ContactUs from "@/components/ContactUs";
import AboutusPage from "@/components/Aboutus_page";
import RenewalBG from "@/components/Renewal-bg";
import Dining from "@/components/Dining";
import Memories from "@/components/Memories";
import VariableSection from "@/components/Variable_section";
import VariableSectionRev from "@/components/VariableSectionRev";
import Accommodation from "@/components/Accommodation";
import { MapSection } from "@/components/MapSections";
import Sustainability from "@/components/Sustainability";
import BookEvent from "@/components/BookEvent";
import ImagesSlider from "@/components/ImagesSlider";
import ImagesSlider2 from "@/components/ImagesSlider2";
import ExploreOurImage from "@/components/ExploreOurImage";
import AboutSummary from "@/components/AboutSummary";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getStaticPaths() {
  const fetchUrl = `${apiUrl}/api/pages/`;
  const response = await fetch(fetchUrl);
  const alldata = await response.json();
  const pages = alldata.data;

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const fetchUrl = `${apiUrl}/api/pages/`;
  const response = await fetch(fetchUrl);
  const alldata = await response.json();
  const allPages = alldata.data;

  const page = allPages.find((page) => page.slug === slug);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page },
    revalidate: 10,
  };
}

const componentMapping = {
  "pages.hero": Hero,
  "pages.camp-search": CampSearch,
  "pages.summary": Summary,
  "pages.about-section": AboutusPage,
  "pages.dual-side-image": DualSideImage,
  "pages.overview": Overview,
  "pages.renewal-nature": RenewalBG,
  "pages.variable-section": VariableSection,
  "pages.variable-section-rev": VariableSectionRev,
  "pages.accommodation-section": Accommodation,
  "pages.sustainability-section": Sustainability,
  "pages.triple-image": TripleImage,
  "pages.images-slider": ImagesSlider,
  "pages.images-slider-2": ImagesSlider2,
  "pages.image-content": ImageContent,
  "pages.dining": Dining,
  "sections.event-scection": Events,
  "pages.feature": AboutSummary,
  "pages.advanced-gallery": AdvanceGallery,
  "pages.experiences": ExperiencesCards,
  "pages.memories-section": ExploreOurImage,
  "pages.feature_about": FeatureAbout,
  "pages.five-images": Memories,
  "pages.testimonials": Testimonial,
  "pages.faqs": Faqs,
  "pages.contact-us-section": ContactUs,
  "pages.map": MapSection,
  "pages.corporate-events": CorporateEvents,
  "pages.private-events": PrivateEvents,
  "pages.booking-form": BookEvent,
  "pages.gallery-page": OurGalleryPage,
};

export default function Page({ page }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useRouter();

  useEffect(() => {
    setLoading(true);
    if (page) {
      const loadData = async () => {
        try {
          const fetchUrl = `${apiUrl}/api/pages/${page.documentId}?locale=${locale}&populate=Book_Now_Button&populate=Sections.Form&populate=Sections.contents&populate=Sections.Image&populate=Sections.Location&populate=Sections.RightImage&populate=Sections.LeftImage&populate=Sections.Content&populate=Sections.TitleImage&populate=Sections.FirstImage&populate=Sections.SecondImage&populate=Sections.ThirdImage&populate=Sections.image&populate=Sections.Button&populate=Sections.privetEventImage&populate=Sections.corporateEventImage&populate=Sections.images&populate=Sections.Images&populate=Sections.Title&populate=Sections.ExperienceItem.Image&populate=Sections.Faqs_Q_A&populate=Sections.Image2&populate=Sections.Image3&populate=Sections.Image4&populate=Sections.Image5&populate=Sections.Image6&populate=Sections.Image7&populate=Sections.Image8&populate=Sections.Image9&populate=Sections.Image10&populate=Sections.Head_Image&populate=Sections.Title_Image`;
          const response = await fetch(fetchUrl);
          const result = await response.json();
          setData(result.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      loadData();
    }
    console.log(data);
  }, [locale, page]);

  if (router.isFallback || loading) {
    return (
      <div className="grid h-screen place-items-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-t-4 border-gray-300"></div>
      </div>
    );
  }

  return (
    <div id={data.slug}>
      <Head>
        <title>{data.Meta_Title}</title>
        <meta name="description" content={data.Meta_Description} />
      </Head>
      <Header data={data.Book_Now_Button} />
      <div className="main-sections">
        {data.Sections.map((sec, index) => {
          const Component = componentMapping[sec.__component];
          return Component ? <Component key={index} data={sec} /> : null;
        })}
      </div>
      <Footer />
    </div>
  );
}
