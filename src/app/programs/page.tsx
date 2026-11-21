import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CourseDirectory from "@/components/CourseDirectory";

export const metadata: Metadata = {
  title: "Courses & Programs 2026–27 | Nathdwara Group of Institutions",
  description:
    "Explore undergraduate, postgraduate, integrated, polytechnic diploma and vocational courses in Engineering, Biotechnology, Computer Applications, Law, Nursing and Paramedical at NGI Nathdwara.",
  keywords: [
    "NGI Courses",
    "B.Tech Computer Science Nathdwara",
    "BCA MLSU Udaipur",
    "LL.B Nathdwara Law College",
    "B.Sc Ayurveda Nursing Rajasthan",
    "Polytechnic Diploma Rajsamand",
    "Integrated B.Sc B.Ed",
    "DMLT Paramedical Nathdwara",
    "ITI Electrician Fitter Nathdwara",
  ],
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academic Programs · Admissions Open 2026–27"
        title="Find a degree that accelerates your ambition."
        description="Browse 25+ degree and diploma programs across engineering, computer applications, life sciences, healthcare, law, education, and skilled industrial trades at Nathdwara Group of Institutions."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85"
      />
      <CourseDirectory />
    </>
  );
}