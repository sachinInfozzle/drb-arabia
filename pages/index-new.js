import {
  CampSearch,
  Header,
  Hero,
  DualSideImage,
  Overview,
  TripleImage,
  ImageContent,
  Events,
  ExperienceSection,
  AdvanceGallery,
  FeatureAbout,
  Testimonial,
  ExperiencesCards,
  OurGalleryPage,
} from "@/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

import Head from "next/head";
import Summary from "@/components/Summary";
import ContactUs from "@/components/ContactUs";

import enlocales from "../public/locale/en.json";
import arlocales from "../public/locale/ar.json";

export default function Home2() {
  const id = "vhs0xfaivja8dktcd1tu99sg";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const { locale } = useRouter(); // Get the current locale

  useEffect(() => {
    setLoading(false);
    const loadData = async () => {
      try {
        // Check if the data exists in the corresponding locale file first
        const localeData = locale === "ar" ? arlocales : enlocales;

        // Set the initial data from the locale-specific file
        // setData(localeData.data);
        // setLoading(false);

        // Include the locale in the fetch URL
        const fetchUrl = `${apiUrl}/api/pages/${id}?locale=${locale}&populate=Sections.contents&populate=Sections.Image&populate=Sections.Location&populate=Sections.RightImage&populate=Sections.LeftImage&populate=Sections.Content&populate=Sections.TitleImage&populate=Sections.FirstImage&populate=Sections.SecondImage&populate=Sections.ThirdImage&populate=Sections.image&populate=Sections.Button&populate=Sections.privetEventImage&populate=Sections.corporateEventImage&populate=Sections.images&populate=Sections.Title&populate=Sections.ExperienceItem.Image&populate=Sections.Image`;
        const response = await fetch(fetchUrl);
        const updatedata = await response.json();

        setData(updatedata.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [locale]); // Refetch data when the locale changes

  if (loading) {
    return (
      <div class="grid h-screen w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          class="text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-900"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div id="home">
      <Head>
        <title>{data.Meta_Title}</title>
        <meta name="description" content={data.Meta_Description} />
      </Head>
      <Header />
      <Hero data={data} />
      <CampSearch data={data} />
      <DualSideImage data={data} />
      <Overview data={data} />
      <TripleImage data={data} />
      <ImageContent data={data} />
      <Events data={data} />
      <AdvanceGallery data={data} />
      <ExperiencesCards data={data} />
      <FeatureAbout data={data} />
      <Testimonial data={data} />
      <ContactUs data={data} />
      <OurGalleryPage data={data} />
      <Footer data={data} />
    </div>
  );
}
