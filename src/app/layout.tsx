import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathdwara Group of Institutions (NGI) | Nathdwara, Rajasthan",
  description:
    "Official portal of Nathdwara Group of Institutions (NGI), Upali Oden, Nathdwara, Rajasthan. Affiliated to RTU Kota & MLSU Udaipur. Offering B.Tech, BCA, B.Sc, B.Pharm, Integrated B.Ed, MBA & Polytechnic.",
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
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-blue-950">
        {children}
      </body>
    </html>
  );
}
