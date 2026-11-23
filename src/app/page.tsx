import HeroSlider from "@/components/HeroSlider";
import NoticeTicker from "@/components/NoticeTicker";
import StatsCounter from "@/components/StatsCounter";
import InstitutionsGrid from "@/components/InstitutionsGrid";
import PillarsSection from "@/components/PillarsSection";
import CourseFinder from "@/components/CourseFinder";
import CampusLifeSection from "@/components/CampusLifeSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import PlacementsSection from "@/components/PlacementsSection";
import ScholarshipsSection from "@/components/ScholarshipsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NoticeTicker />
      <StatsCounter />
      <InstitutionsGrid />
      <PillarsSection />
      <CourseFinder />
      <CampusLifeSection />
      <InfrastructureSection />
      <PlacementsSection />
      <ScholarshipsSection />
      <AboutSection />
      <TestimonialsSection />
    </>
  );
}
