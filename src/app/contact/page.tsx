import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactPortal from "@/components/ContactPortal";

export const metadata: Metadata = {
  title: "Contact Us & Campus Directions | Nathdwara Group of Institutions",
  description:
    "Get in touch with Nathdwara Group of Institutions. Find contact numbers for admissions, registrar, hostel warden, transport fleet, map location, and how to reach Upali Oden, Nathdwara.",
  keywords: [
    "NGI Contact",
    "Nathdwara Group helpline",
    "NIET contact number",
    "Upali Oden Nathdwara address",
    "NGI campus map",
    "Nathdwara college bus routes",
  ],
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect with NGI · Nathdwara, Rajasthan"
        title="We are here to assist your academic journey."
        description="Reach out to our central admissions team, departmental offices, or visit our 30-acre campus nestled in the Aravali hills at Upali Oden, Nathdwara."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
      />
      <ContactPortal />
    </>
  );
}