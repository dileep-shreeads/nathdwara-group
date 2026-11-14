"use client";

import React, { useState } from "react";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
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
import EnquiryModal from "@/components/EnquiryModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Top Announcement and Hotlines */}
      <TopHeader />

      {/* 2. Main Navigation Bar with Dropdowns and Actions */}
      <Navbar onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

      {/* 3. Dynamic Hero Carousel with Instant Enquiry Form */}
      <HeroSlider />

      {/* 4. Live Updates and Circulars Ticker */}
      <NoticeTicker />

      {/* 5. Key Institutional Stats (56+ Years, 20+ Colleges, 90+ Courses, 18,000+ Students) */}
      <StatsCounter />

      {/* 6. Comprehensive Legacy & About NGI Section */}
      <AboutSection />

      {/* 7. Directory of All 20+ Institutions across TN and Kerala */}
      <InstitutionsGrid />

      {/* 8. Interactive Course Finder & Explorer */}
      <CourseFinder />

      {/* 9. Unique Campus Infrastructure (Real Aircraft Hangars, Hospital, Knowledge Fort) */}
      <InfrastructureSection />

      {/* 10. NCPIR Corporate Placements, Recruiters & Packages */}
      <PlacementsSection />

      {/* 11. Scholarships & Interactive Calculator */}
      <ScholarshipsSection />

      {/* 12. Alumni Success Stories & Global Testimonials */}
      <TestimonialsSection />

      {/* 13. Institutional Footer with Campuses & Helplines */}
      <Footer />

      {/* Interactive Quick Counselling Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
}
