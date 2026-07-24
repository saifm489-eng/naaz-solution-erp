"use client";

import { useEffect, useState } from "react";

import LoadingScreen from "@/components/shared/LoadingScreen";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SearchSection from "@/components/sections/SearchSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ServiceCategories from "@/components/sections/ServiceCategories";
import AITools from "@/components/sections/AITools";
import WhyChoose from "@/components/sections/WhyChoose";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import ScrollProgress from "@/components/shared/ScrollProgress";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      {!loading && (
        <>
          <ScrollProgress />

          <Header />
          <Hero />
          <SearchSection />
          <ServicesGrid />
          <ServiceCategories />
          <AITools />
          <WhyChoose />
          <Stats />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />

          <FloatingWhatsApp />
        </>
      )}
    </>
  );
}