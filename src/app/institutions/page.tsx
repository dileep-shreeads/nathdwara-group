import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InstitutionsDirectory from "@/components/InstitutionsDirectory";

export const metadata: Metadata = {
  title: "Constituent Institutions | Nathdwara Group of Institutions (NGI)",
  description:
    "Explore the six constituent colleges of Nathdwara Group of Institutions: NIET (Engineering), NIBM (Biotechnology & Management), NLC (Law), NCAN (Ayurveda Nursing), VDSMS (Medical Science), and NPITI (Industrial Training).",
  keywords: [
    "NIET Nathdwara",
    "NIBM Nathdwara",
    "Nathdwara Law College",
    "Nathdwara Ayurveda Nursing",
    "NPITI Nathdwara",
    "VDSMS Nathdwara",
    "Colleges in Rajsamand Udaipur",
  ],
};

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="NGI Constituent Institutions · Nathdwara, Rajasthan"
        title="Six specialized institutions. One thriving academic campus."
        description="Discover our specialist colleges spanning engineering, computer applications, legal studies, Ayurveda nursing, medical sciences, and technical vocational trades."
        image="/institutions/niet-card.jpg"
      />
      <InstitutionsDirectory />
    </>
  );
}