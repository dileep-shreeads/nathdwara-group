"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import EnquiryModal from "@/components/EnquiryModal";

export default function SiteHeader() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
