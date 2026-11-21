import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AdmissionsPortal from "@/components/AdmissionsPortal";

export const metadata: Metadata = {
  title: "Admissions 2026–27 | Nathdwara Group of Institutions",
  description:
    "Apply online for direct admission 2026–27 at Nathdwara Group of Institutions. Check eligibility, admission dates, document requirements, and scholarship schemes for B.Tech, BCA, Law, Nursing, Pharmacy, and Polytechnic.",
  keywords: [
    "NGI Admissions 2026",
    "Direct Admission B.Tech Rajasthan",
    "BCA Admission MLSU",
    "LL.B Admission Nathdwara",
    "B.Sc Ayurveda Nursing Admission",
    "Rajasthan SJE Scholarship NGI",
    "Polytechnic Admission Rajsamand",
  ],
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions Open · Academic Year 2026–27"
        title="Your journey to educational excellence begins here."
        description="Fast-track your application to premier engineering, computer applications, healthcare, legal, and teacher education programs at Nathdwara Group of Institutions."
        image="/institutions/niet-card.jpg"
      />
      <AdmissionsPortal />
    </>
  );
}