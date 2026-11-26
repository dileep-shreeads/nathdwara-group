"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import EnquiryModal from "@/components/EnquiryModal";

export default function SiteHeader() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const pathname = usePathname();

  // Hide public site header on standalone app / portal routes
  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/update-password");

  if (isAppRoute) return null;

  return (
    <>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
