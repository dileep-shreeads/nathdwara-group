"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  LogIn,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  Scale,
  School,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock on mobile when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileExpandedGroup(null);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMobileGroup = (name: string) => {
    setMobileExpandedGroup((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-xl shadow-md border-b border-slate-200/90 py-2 sm:py-2.5"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2 sm:py-3"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8">
          {/* Brand & Proper Logo */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 sm:gap-3.5 shrink-0"
            onClick={closeMenu}
            aria-label="Nathdwara Group of Institutions home"
          >
            {/* Natural aspect ratio logo display without squashing or square letterbox */}
            <div className="relative flex items-center justify-center shrink-0">
              <img
                src="/ngi-logo.png"
                alt="Nathdwara Group of Institutions Logo"
                className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.16em] text-amber-600 truncate leading-none">
                  ESTD. 2010 &bull; 16+ YEARS
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold">
                  NAAC / AICTE
                </span>
              </div>
              <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-black tracking-tight text-[#0B1B3D] leading-tight truncate">
                NATHDWARA <span className="text-amber-600">GROUP</span>
                <span className="hidden sm:inline"> OF INSTITUTIONS</span>
              </span>
              <span className="hidden md:block truncate text-[10px] font-medium text-slate-500 leading-tight">
                Affiliated to RTU Kota &amp; MLSU Udaipur &bull; Approved by AICTE, BCI &amp; NCTE
              </span>
            </div>
          </Link>

          {/* Grouped Desktop Navigation (Clean Dropdowns) */}
          <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
            {/* Home */}
            <Link
              href="/"
              className={`rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
                pathname === "/"
                  ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
              }`}
            >
              Home
            </Link>

            {/* 1. About Us Group */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive("/about")
                    ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
                }`}
              >
                <span>About</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full pt-2 w-64 text-xs z-50">
                <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                  <Link
                    href="/about"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-amber-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Overview &amp; Heritage</div>
                      <div className="text-[10px] text-slate-500">History, vision &amp; values</div>
                    </div>
                  </Link>
                  <Link
                    href="/about#leadership"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Users className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Leadership Messages</div>
                      <div className="text-[10px] text-slate-500">Chairman &amp; Managing Director</div>
                    </div>
                  </Link>
                  <Link
                    href="/about#approvals"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Approvals &amp; Affiliations</div>
                      <div className="text-[10px] text-slate-500">AICTE, RTU, MLSU, BCI, NCTE</div>
                    </div>
                  </Link>
                  <Link
                    href="/about#governance"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-rose-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Mandatory Disclosures</div>
                      <div className="text-[10px] text-slate-500">RTI, Anti-Ragging &amp; Policies</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Colleges Group (Mega Dropdown) */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive("/institutions") ||
                  pathname.startsWith("/niet") ||
                  pathname.startsWith("/nibm") ||
                  pathname.startsWith("/nlc") ||
                  pathname.startsWith("/ayurved-nursing") ||
                  pathname.startsWith("/vdsms") ||
                  pathname.startsWith("/npiti")
                    ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
                }`}
              >
                <span>Colleges</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute -left-20 top-full pt-2 w-[520px] text-xs z-50">
                <div className="rounded-3xl bg-white p-4 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                  <div className="px-3 py-1.5 font-black uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-100 mb-2.5 flex items-center justify-between">
                    <span>6 Constituent Colleges • Nathdwara Campus</span>
                    <span className="text-amber-600 font-bold">RTU &bull; MLSU &bull; BCI &bull; NCTE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/niet"
                      className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        ET
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1B3D]">NIET — Engineering</div>
                        <div className="text-[11px] text-slate-500">B.Tech &amp; Polytechnic (RTU)</div>
                      </div>
                    </Link>

                    <Link
                      href="/nibm"
                      className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        BM
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1B3D]">NIBM — Biotech &amp; IT</div>
                        <div className="text-[11px] text-slate-500">BCA, B.Sc, M.Sc &amp; ITEP</div>
                      </div>
                    </Link>

                    <Link
                      href="/nlc"
                      className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-purple-50/70 border border-transparent hover:border-purple-200 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        LC
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1B3D]">Nathdwara Law College</div>
                        <div className="text-[11px] text-slate-500">LL.B &amp; B.A. LL.B (BCI)</div>
                      </div>
                    </Link>

                    <Link
                      href="/ayurved-nursing"
                      className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-rose-50/70 border border-transparent hover:border-rose-200 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        AN
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1B3D]">Ayurveda Nursing (NCAN)</div>
                        <div className="text-[11px] text-slate-500">B.Sc Ayurved Nursing</div>
                      </div>
                    </Link>

                    <Link
                      href="/vdsms"
                      className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        MS
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1B3D]">VDSMS Medical Science</div>
                        <div className="text-[11px] text-slate-500">DMLT &amp; Paramedical</div>
                      </div>
                    </Link>

                    <Link
                      href="/npiti"
                      className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-cyan-50/70 border border-transparent hover:border-cyan-200 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                        ITI
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1B3D]">NPITI Industrial Training</div>
                        <div className="text-[11px] text-slate-500">NCVT Electrician &amp; Fitter</div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/institutions"
                      className="text-xs font-bold text-[#0B1B3D] hover:text-amber-600 transition inline-flex items-center gap-1"
                    >
                      <span>View All 6 Colleges Directory</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-slate-500 font-medium">35-Acre Smart Campus</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Academics Group */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive("/programs")
                    ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
                }`}
              >
                <span>Academics</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full pt-2 w-64 text-xs z-50">
                <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                  <Link
                    href="/programs"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">All 45+ Programmes</div>
                      <div className="text-[10px] text-slate-500">UG, PG, Diploma &amp; Certificate</div>
                    </div>
                  </Link>
                  <Link
                    href="/niet"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Engineering &amp; Tech</div>
                      <div className="text-[10px] text-slate-500">B.Tech CSE, Civil, ME, EE</div>
                    </div>
                  </Link>
                  <Link
                    href="/nlc"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Scale className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Law Programmes</div>
                      <div className="text-[10px] text-slate-500">LL.B 3-Yr &amp; B.A. LL.B 5-Yr</div>
                    </div>
                  </Link>
                  <Link
                    href="/ayurved-nursing"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Stethoscope className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Healthcare &amp; Nursing</div>
                      <div className="text-[10px] text-slate-500">Ayurveda Nursing &amp; DMLT</div>
                    </div>
                  </Link>
                  <Link
                    href="/npiti"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Wrench className="w-4 h-4 text-cyan-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">ITI Vocational Trades</div>
                      <div className="text-[10px] text-slate-500">Electrician, Fitter, Wireman</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Admissions Group */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive("/admissions")
                    ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
                }`}
              >
                <span>Admissions</span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-[#0B1B3D] text-[9px] font-black uppercase">
                  2026
                </span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full pt-2 w-64 text-xs z-50">
                <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                  <Link
                    href="/admissions"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Admission Process 2026</div>
                      <div className="text-[10px] text-slate-500">Step-by-step guidance</div>
                    </div>
                  </Link>
                  <Link
                    href="/admissions#eligibility"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Eligibility &amp; Cutoffs</div>
                      <div className="text-[10px] text-slate-500">REAP, 12th Marks, Entrance</div>
                    </div>
                  </Link>
                  <Link
                    href="/admissions#scholarships"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Fee &amp; Scholarships</div>
                      <div className="text-[10px] text-slate-500">Merit &amp; Govt. Schemes</div>
                    </div>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 bg-amber-50 text-amber-900 font-bold transition hover:bg-amber-100 mt-1"
                  >
                    <ArrowUpRight className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div>Register for 2026-27 &rarr;</div>
                      <div className="text-[10px] text-amber-700 font-normal">Fast-track direct application</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* 5. Campus & Placements Group */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive("/campus-life") || isActive("/placements")
                    ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
                }`}
              >
                <span>Campus &amp; Life</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full pt-2 w-64 text-xs z-50">
                <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                  <Link
                    href="/campus-life"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <School className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Campus Life &amp; Hostels</div>
                      <div className="text-[10px] text-slate-500">35-Acre campus, gym, sports</div>
                    </div>
                  </Link>
                  <Link
                    href="/placements"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Placements &amp; Careers</div>
                      <div className="text-[10px] text-slate-500">Highest ₹12.5 LPA, 200+ recruiters</div>
                    </div>
                  </Link>
                  <Link
                    href="/campus-life#labs"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                  >
                    <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">11+ Labs &amp; Workshops</div>
                      <div className="text-[10px] text-slate-500">IoT, AI, Biotech &amp; CAD/CAM</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* 6. Contact */}
            <Link
              href="/contact"
              className={`rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
                isActive("/contact")
                  ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons on Right (Desktop + Mobile) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Student Portal / Login CTA */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 hover:border-[#0B1B3D] px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-[#0B1B3D] transition hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              <User className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span className="hidden md:inline">Student Portal</span>
              <span className="md:hidden">Portal</span>
            </Link>

            {/* Modern Apply CTA Button */}
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black text-[#061024] shadow-md shadow-amber-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
              <span className="hidden sm:inline">Apply 2026</span>
              <span className="sm:hidden">Apply</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-[#0B1B3D] transition hover:bg-slate-100 lg:hidden cursor-pointer"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Grouped Accordions */}
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 space-y-3">
              {/* Quick Mobile Top Action Grid */}
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
                <Link
                  href="/admissions"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-[#0B1B3D] font-black text-xs shadow-md shadow-amber-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Apply 2026</span>
                </Link>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0B1B3D] text-white font-bold text-xs shadow-md"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Student Portal</span>
                </Link>
              </div>

              {/* Grouped Accordions for Mobile */}
              <div className="space-y-1.5 text-sm font-bold text-slate-800">
                {/* Home */}
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`block px-3 py-2.5 rounded-xl ${
                    pathname === "/" ? "bg-[#0B1B3D] text-amber-300" : "hover:bg-slate-100"
                  }`}
                >
                  Home
                </Link>

                {/* About Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup("about")}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold"
                  >
                    <span>About Us</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedGroup === "about" ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedGroup === "about" && (
                    <div className="pl-3 pr-2 py-2 space-y-1 text-xs bg-slate-50 rounded-2xl mt-1 border border-slate-100">
                      <Link
                        href="/about"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Overview &amp; Heritage
                      </Link>
                      <Link
                        href="/about#leadership"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Leadership Messages
                      </Link>
                      <Link
                        href="/about#approvals"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Approvals &amp; Affiliations (AICTE/RTU/MLSU)
                      </Link>
                      <Link
                        href="/about#governance"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Mandatory Disclosures &amp; Anti-Ragging
                      </Link>
                    </div>
                  )}
                </div>

                {/* Colleges Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup("colleges")}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold"
                  >
                    <span>Constituent Colleges (6)</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedGroup === "colleges" ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedGroup === "colleges" && (
                    <div className="pl-3 pr-2 py-2 space-y-1 text-xs bg-slate-50 rounded-2xl mt-1 border border-slate-100">
                      <Link
                        href="/niet"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        NIET — Engineering &amp; Technology (RTU Kota)
                      </Link>
                      <Link
                        href="/nibm"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        NIBM — Biotechnology &amp; Management (MLSU)
                      </Link>
                      <Link
                        href="/nlc"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        NLC — Nathdwara Law College (BCI)
                      </Link>
                      <Link
                        href="/ayurved-nursing"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        NCAN — Ayurved Nursing College
                      </Link>
                      <Link
                        href="/vdsms"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        VDSMS — Medical Science &amp; Paramedical
                      </Link>
                      <Link
                        href="/npiti"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        NPITI — Industrial Training (NCVT)
                      </Link>
                      <Link
                        href="/institutions"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg bg-amber-50 text-amber-900 font-bold"
                      >
                        View All 6 Colleges Directory &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                {/* Academics Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup("academics")}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold"
                  >
                    <span>Academic Programmes</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedGroup === "academics" ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedGroup === "academics" && (
                    <div className="pl-3 pr-2 py-2 space-y-1 text-xs bg-slate-50 rounded-2xl mt-1 border border-slate-100">
                      <Link
                        href="/programs"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        All 45+ Programmes Directory
                      </Link>
                      <Link
                        href="/niet"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        B.Tech &amp; Engineering Disciplines
                      </Link>
                      <Link
                        href="/nlc"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        LL.B &amp; B.A. LL.B Law Courses
                      </Link>
                      <Link
                        href="/ayurved-nursing"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Ayurveda Nursing &amp; Paramedical
                      </Link>
                      <Link
                        href="/npiti"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        NCVT ITI Industrial Trades
                      </Link>
                    </div>
                  )}
                </div>

                {/* Admissions Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup("admissions")}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold"
                  >
                    <span>Admissions 2026–27</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedGroup === "admissions" ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedGroup === "admissions" && (
                    <div className="pl-3 pr-2 py-2 space-y-1 text-xs bg-slate-50 rounded-2xl mt-1 border border-slate-100">
                      <Link
                        href="/admissions"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Admission Overview &amp; Key Dates
                      </Link>
                      <Link
                        href="/admissions#eligibility"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Eligibility Criteria &amp; Direct Seats
                      </Link>
                      <Link
                        href="/admissions#scholarships"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Scholarship Schemes &amp; Fee Structure
                      </Link>
                      <Link
                        href="/register"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg bg-amber-100 text-[#0B1B3D] font-bold"
                      >
                        Register Online for 2026 &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                {/* Campus & Careers Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup("campus")}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold"
                  >
                    <span>Campus &amp; Careers</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedGroup === "campus" ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedGroup === "campus" && (
                    <div className="pl-3 pr-2 py-2 space-y-1 text-xs bg-slate-50 rounded-2xl mt-1 border border-slate-100">
                      <Link
                        href="/campus-life"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Campus Life, Hostels &amp; Sports
                      </Link>
                      <Link
                        href="/placements"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        Placements &amp; Top Recruiters
                      </Link>
                      <Link
                        href="/campus-life#labs"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white font-semibold text-[#0B1B3D]"
                      >
                        High-Tech Laboratories &amp; Workstations
                      </Link>
                    </div>
                  )}
                </div>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`block px-3 py-2.5 rounded-xl ${
                    isActive("/contact") ? "bg-[#0B1B3D] text-amber-300" : "hover:bg-slate-100"
                  }`}
                >
                  Contact &amp; Campus Route
                </Link>
              </div>

              {/* Bottom Support Info in Mobile Drawer */}
              <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <a href="tel:+919571345444" className="font-bold text-slate-800 hover:text-amber-600">
                    Admission Helpline: +91 95713 45444
                  </a>
                </div>
                <div className="flex items-center gap-2 text-rose-600 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>Anti-Ragging Helpline: 1800-180-5522</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
