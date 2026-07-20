import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import SearchSection from "@/components/sections/SearchSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChoose from "@/components/sections/WhyChoose";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SearchSection />
      <ServicesGrid />
      <WhyChoose />
      <Stats />
    </>
  );
}
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function Home() {
  return (
    <>
      <AnnouncementBar />

      <main className="min-h-screen">
        {/* Next Component */}
      </main>
    </>
  );
}