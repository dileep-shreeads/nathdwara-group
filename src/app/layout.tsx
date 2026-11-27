import type { Metadata } from "next";
import { Sora, Work_Sans } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

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
    <html
      lang="en"
      className={`scroll-smooth ${sora.variable} ${workSans.variable}`}
    >
      <body className="min-h-screen bg-white text-slate-800 antialiased selection:bg-accent selection:text-primary">
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
