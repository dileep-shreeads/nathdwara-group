"use client";

import Link from "next/link";
import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function TopHeader() {
  return (
    <div className="bg-[#050e1d] text-white border-b border-white/10 text-[11px] sm:text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-1.5 sm:px-6 lg:px-8">
        {/* Left: Admissions Ticker & Live Highlights */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#061024] shadow-sm shrink-0">
            <Sparkles className="h-3 w-3 fill-current" />
            <span>ADMISSIONS 2026–27</span>
          </span>

          <div className="truncate text-slate-300 text-xs">
            <span className="hidden sm:inline font-medium">
              Open for B.Tech, BCA, Law (LL.B), Ayurveda Nursing, Pharmacy &amp; Integrated B.Ed &bull;
            </span>{" "}
            <span className="text-amber-300 font-semibold">
              RTU Kota &amp; MLSU Affiliated
            </span>
          </div>

          <Link
            href="/admissions"
            className="hidden md:inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 transition shrink-0 underline underline-offset-2 ml-1"
          >
            <span>Apply Online</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Helplines, Anti-Ragging & Portals */}
        <div className="flex items-center gap-3.5 sm:gap-5 text-slate-300 text-[11px] shrink-0">
          {/* Direct Phone */}
          <a
            href="tel:+919571345444"
            className="inline-flex items-center gap-1.5 font-bold text-white hover:text-amber-300 transition"
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span>+91 95713 45444</span>
          </a>

          {/* Email */}
          <a
            href="mailto:info@ngi.edu.in"
            className="hidden lg:inline-flex items-center gap-1.5 hover:text-amber-300 transition"
          >
            <Mail className="h-3.5 w-3.5 text-amber-400" />
            <span>info@ngi.edu.in</span>
          </a>

          {/* Campus Location */}
          <span className="hidden xl:inline-flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>Nathdwara (Raj.)</span>
          </span>

          {/* Anti Ragging Helpline */}
          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-rose-300 hover:text-rose-200 transition bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded"
          >
            <ShieldAlert className="h-3 w-3 text-rose-400" />
            <span>Anti-Ragging: 1800-180-5522</span>
          </Link>

          {/* Grievance / Disclosures */}
          <Link
            href="/about"
            className="hidden md:inline-flex items-center gap-1 text-slate-400 hover:text-amber-300 transition"
          >
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span>Disclosures</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
