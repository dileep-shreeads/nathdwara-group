"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function SiteFooter() {
  const pathname = usePathname();

  // Hide public footer on standalone app / portal routes
  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/update-password");

  if (isAppRoute) return null;

  return <Footer />;
}
