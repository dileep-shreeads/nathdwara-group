"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  GraduationCap,
  Menu,
  PhoneCall,
  Sparkles,
  X,
  Building2,
  BookOpen,
  ClipboardCheck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collegesOpen, setCollegesOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setMenuOpen(false);
    setCollegesOpen(false);
    setAdmissionsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-[82px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3.5"
          onClick={closeMenu}
          aria-label="Nathdwara Group of Institutions home"
        >
          <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/80 bg-[#fbf8dc] shadow-sm transition-transform group-hover:scale-105">
            <img
              src="/ngi-logo.png"
              alt="NGI Logo"
              className="h-full w-full object-contain p-1"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black leading-tight tracking-tight text-[#0B1B3D] sm:text-xl">
              NATHDWARA <span className="text-amber-600">GROUP</span>
            </span>
            <span className="block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 sm:text-[11px] mt-0.5">
              Group of Institutions · Rajasthan
            </span>
            <span className="hidden lg:block truncate text-[9px] font-medium text-emerald-700 mt-0.5">
              Affiliated to RTU Kota &amp; MLSU Udaipur | AICTE, BCI, NCTE Approved
            </span>
          </span>
        </Link>

        {/* Main Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
          <Link
            href="/"
            className={`rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-all ${
              isActive("/") && pathname === "/"
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-all ${
              isActive("/about")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            About Us
          </Link>

          {/* Colleges / Schools Dropdown */}
          <div className="relative group">
            <Link
              href="/institutions"
              className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-all ${
                isActive("/institutions")
                  ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
              }`}
            >
              <span>Institutions</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
            </Link>

            {/* Dropdown Menu */}
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full w-80 rounded-2xl bg-white p-3 shadow-2xl border border-slate-100 text-xs">
              <div className="px-3 py-1.5 font-bold uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                6 Constituent Colleges
              </div>
              <Link
                href="/niet"
                className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition"
              >
                <Building2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0B1B3D]">NIET — Engineering</div>
                  <div className="text-[11px] text-slate-500">B.Tech &amp; Polytechnic (RTU Kota)</div>
                </div>
              </Link>
              <Link
                href="/nibm"
                className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition"
              >
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0B1B3D]">NIBM — Biotech &amp; IT</div>
                  <div className="text-[11px] text-slate-500">BCA, B.Sc. &amp; M.Sc. (MLSU)</div>
                </div>
              </Link>
              <Link
                href="/nlc"
                className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0B1B3D]">Nathdwara Law College</div>
                  <div className="text-[11px] text-slate-500">LL.B. &amp; B.A. LL.B. (BCI Approved)</div>
                </div>
              </Link>
              <Link
                href="/ayurved-nursing"
                className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition"
              >
                <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0B1B3D]">Ayurveda Nursing (NCAN)</div>
                  <div className="text-[11px] text-slate-500">B.Sc. Ayurveda Nursing &amp; Ayush</div>
                </div>
              </Link>
              <Link
                href="/vdsms"
                className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0B1B3D]">VDSMS Medical Science</div>
                  <div className="text-[11px] text-slate-500">DMLT &amp; Healthcare Skilling</div>
                </div>
              </Link>
              <Link
                href="/npiti"
                className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition"
              >
                <ClipboardCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0B1B3D]">NPITI Industrial Training</div>
                  <div className="text-[11px] text-slate-500">NCVT Electrician &amp; Fitter</div>
                </div>
              </Link>
            </div>
          </div>

          <Link
            href="/programs"
            className={`rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-all ${
              isActive("/programs")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Programs
          </Link>

          <Link
            href="/admissions"
            className={`rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-all ${
              isActive("/admissions")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Admissions
          </Link>

          <Link
            href="/#campus-facilities"
            className="rounded-full px-3.5 py-2 text-[13.5px] font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D] transition-all"
          >
            Campus Life
          </Link>

          <Link
            href="/contact"
            className={`rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-all ${
              isActive("/contact")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-2.5">
          {onOpenEnquiry && (
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-bold text-[#0B1B3D] transition hover:bg-slate-100 lg:inline-flex"
            >
              <PhoneCall className="h-3.5 w-3.5 text-amber-600" />
              <span>Enquire</span>
            </button>
          )}

          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-black text-slate-950 shadow-md transition hover:from-amber-500 hover:to-amber-600 hover:shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Apply Now 2026</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#0B1B3D] transition hover:bg-slate-100 xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-2xl xl:hidden max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              About NGI
            </Link>

            {/* Mobile Colleges Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setCollegesOpen(!collegesOpen)}
                className="w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                <span>Constituent Colleges (6)</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${collegesOpen ? "rotate-180" : ""}`} />
              </button>
              {collegesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl my-1 text-xs">
                  <Link href="/niet" onClick={closeMenu} className="block py-2 px-3 font-semibold text-slate-700 hover:text-blue-900">
                    NIET — Engineering &amp; Technology
                  </Link>
                  <Link href="/nibm" onClick={closeMenu} className="block py-2 px-3 font-semibold text-slate-700 hover:text-blue-900">
                    NIBM — Biotechnology &amp; Management
                  </Link>
                  <Link href="/nlc" onClick={closeMenu} className="block py-2 px-3 font-semibold text-slate-700 hover:text-blue-900">
                    Nathdwara Law College
                  </Link>
                  <Link href="/ayurved-nursing" onClick={closeMenu} className="block py-2 px-3 font-semibold text-slate-700 hover:text-blue-900">
                    Nathdwara College of Ayurveda Nursing
                  </Link>
                  <Link href="/vdsms" onClick={closeMenu} className="block py-2 px-3 font-semibold text-slate-700 hover:text-blue-900">
                    VDSMS Medical Sciences
                  </Link>
                  <Link href="/npiti" onClick={closeMenu} className="block py-2 px-3 font-semibold text-slate-700 hover:text-blue-900">
                    NPITI Industrial Training Institute
                  </Link>
                  <Link href="/institutions" onClick={closeMenu} className="block py-2 px-3 font-bold text-amber-700 underline">
                    View All 6 Colleges &rarr;
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/programs"
              onClick={closeMenu}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              Courses &amp; Programs
            </Link>
            <Link
              href="/admissions"
              onClick={closeMenu}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              Admissions 2026–27
            </Link>
            <Link
              href="/#campus-facilities"
              onClick={closeMenu}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              Campus Life &amp; Hostels
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B1B3D]"
            >
              Contact Campus
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/admissions"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 font-bold text-slate-950 text-sm shadow"
              >
                <span>Direct Admission 2026–27</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {onOpenEnquiry && (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenEnquiry();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-[#0B1B3D] text-sm"
                >
                  <PhoneCall className="h-4 w-4 text-amber-600" />
                  <span>Request Free Call Back</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}