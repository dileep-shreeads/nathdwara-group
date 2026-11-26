import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathdwara Group of Institutions (NGI) | Nathdwara, Rajasthan",
  description:
    "Explore the six institutions in the Nathdwara Group, Rajasthan, including medical sciences, Ayurveda nursing, biotechnology and management, industrial training, law, and engineering.",
  keywords: [
    "Nathdwara Group of Institutions",
    "NGI",
    "ngi.edu.in",
    "NIET Nathdwara",
    "NIBM Nathdwara",
    "B.Tech in Nathdwara Udaipur",
    "BCA MLSU Udaipur",
    "Integrated B.Sc B.Ed Rajasthan",
    "Engineering College in Rajsamand",
    "RTU Kota Affiliated College",
    "Nathdwara College Admission 2026",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-800 antialiased selection:bg-amber-300 selection:text-[#102c52]">
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
