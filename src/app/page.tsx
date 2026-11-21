import HeroSlider from "@/components/HeroSlider";
import NoticeTicker from "@/components/NoticeTicker";
import StatsCounter from "@/components/StatsCounter";
import AboutSection from "@/components/AboutSection";
import InstitutionsGrid from "@/components/InstitutionsGrid";
import CourseFinder from "@/components/CourseFinder";
import InfrastructureSection from "@/components/InfrastructureSection";
import PlacementsSection from "@/components/PlacementsSection";
import ScholarshipsSection from "@/components/ScholarshipsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NoticeTicker />
      <StatsCounter />
      <AboutSection />
      <InstitutionsGrid />
      <CourseFinder />
      <InfrastructureSection />
      <PlacementsSection />
      <ScholarshipsSection />
      <TestimonialsSection />
    </>
  );
}
