"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="bg-[#0B1B3D] text-white border-b border-white/10 text-[11px] sm:text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-2 sm:px-6 lg:px-8">
        {/* Left: Important Announcement */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
            <Sparkles className="h-3 w-3" /> Admissions 2026–27 Open
          </span>
          <span className="hidden sm:inline text-slate-200">
            B.Tech, BCA, Law (LL.B.), Nursing, Pharmacy, Integrated B.Ed &amp; Polytechnic
          </span>
          <Link
            href="/admissions"
            className="font-bold text-amber-300 underline underline-offset-2 hover:text-amber-200"
          >
            Apply Online &rarr;
          </Link>
        </div>

        {/* Right: Helpline & Quick Portals */}
        <div className="flex items-center gap-4 text-slate-200">
          <a
            className="inline-flex items-center gap-1.5 transition hover:text-amber-300"
            href="tel:+919571345444"
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold">+91 95713 45444</span>
          </a>
          <a
            className="hidden items-center gap-1.5 transition hover:text-amber-300 md:inline-flex"
            href="mailto:info@ngi.edu.in"
          >
            <Mail className="h-3.5 w-3.5 text-amber-400" />
            <span>info@ngi.edu.in</span>
          </a>
          <span className="hidden items-center gap-1.5 text-slate-300 lg:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>Upali Oden, Nathdwara (Raj.)</span>
          </span>
          <Link
            href="/contact"
            className="hidden items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 xl:inline-flex"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Anti-Ragging Cell</span>
          </Link>
        </div>
      </div>
    </div>
  );
}