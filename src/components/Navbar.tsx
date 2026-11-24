"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  FileText,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/90 py-2.5"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 sm:py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo (Modern University Emblem & Typography) */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 sm:gap-3.5"
          onClick={closeMenu}
          aria-label="Nathdwara Group of Institutions home"
        >
          <span className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-400/90 bg-white shadow-sm p-1 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/ngi-logo.png"
              alt="NGI Logo"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[9.5px] sm:text-[10px] font-black uppercase tracking-[0.16em] text-amber-600">
              ESTD. 2010 • 16+ YEARS OF EXCELLENCE
            </span>
            <span className="block truncate text-base sm:text-lg lg:text-xl font-black leading-tight tracking-tight text-[#0B1B3D]">
              NATHDWARA <span className="text-amber-600">GROUP</span> OF INSTITUTIONS
            </span>
            <span className="hidden sm:block truncate text-[10px] sm:text-[10.5px] font-bold text-slate-500">
              Affiliated to RTU Kota &amp; MLSU Udaipur • Approved by AICTE &amp; BCI
            </span>
          </span>
        </Link>

        {/* Main Modern Navigation Links (Desktop) */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex">
          {/* Home */}
          <Link
            href="/"
            className={`whitespace-nowrap rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
              isActive("/") && pathname === "/"
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div className="relative group">
            <Link
              href="/about"
              className={`whitespace-nowrap flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
                isActive("/about")
                  ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
              }`}
            >
              <span>About Us</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
            </Link>

            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full pt-2 w-64 text-xs">
              <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                <Link
                  href="/about"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                >
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Overview &amp; Heritage</span>
                </Link>
                <Link
                  href="/about#leadership"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                >
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Leadership Messages</span>
                </Link>
                <Link
                  href="/about#approvals"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Approvals &amp; Affiliations</span>
                </Link>
                <Link
                  href="/about#governance"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0B1B3D] font-semibold transition"
                >
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span>Mandatory Disclosures</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Constituent Colleges Mega Menu */}
          <div className="relative group">
            <Link
              href="/institutions"
              className={`whitespace-nowrap flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
                isActive("/institutions") || pathname.startsWith("/niet") || pathname.startsWith("/nibm") || pathname.startsWith("/nlc")
                  ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
              }`}
            >
              <span>Colleges</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
            </Link>

            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute -left-20 top-full pt-2 w-[500px] text-xs">
              <div className="rounded-3xl bg-white p-4 shadow-2xl border border-slate-200/90 backdrop-blur-xl">
                <div className="px-3 py-1.5 font-black uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-100 mb-2.5 flex items-center justify-between">
                  <span>Six Constituent Colleges • Nathdwara Campus</span>
                  <span className="text-amber-600 font-bold">RTU &bull; MLSU &bull; BCI &bull; NCTE</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/niet"
                    className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0B1B3D] flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
                      ET
                    </div>
                    <div>
                      <div className="font-bold text-[#0B1B3D]">NIET — Engineering</div>
                      <div className="text-[11px] text-slate-500">B.Tech &amp; Polytechnic (RTU)</div>
                    </div>
                  </Link>

                  <Link
                    href="/nibm"
                    className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
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
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
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
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
                      AN
                    </div>
                    <div>
                      <div className="font-bold text-[#0B1B3D]">Ayurveda Nursing (NCAN)</div>
                      <div className="text-[11px] text-slate-500">B.Sc Ayurveda Nursing</div>
                    </div>
                  </Link>

                  <Link
                    href="/vdsms"
                    className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
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
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
                      ITI
                    </div>
                    <div>
                      <div className="font-bold text-[#0B1B3D]">NPITI Industrial Training</div>
                      <div className="text-[11px] text-slate-500">NCVT Electrician &amp; Fitter</div>
                    </div>
                  </Link>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                  <Link
                    href="/institutions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B3D] hover:text-amber-600 transition"
                  >
                    <span>View Comprehensive Profiles of All 6 Colleges &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Programmes */}
          <Link
            href="/programs"
            className={`whitespace-nowrap rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
              isActive("/programs")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Programmes
          </Link>

          {/* Admissions 2026 */}
          <Link
            href="/admissions"
            className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
              isActive("/admissions")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            <span>Admissions</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-[#0B1B3D] text-[9px] xl:text-[9.5px] font-black uppercase shadow-sm">
              2026
            </span>
          </Link>

          {/* Campus Life */}
          <Link
            href="/#campus-life"
            className="whitespace-nowrap rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D] transition-all"
          >
            Campus Life
          </Link>

          {/* Placements */}
          <Link
            href="/#placements"
            className="whitespace-nowrap rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D] transition-all"
          >
            Placements
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`whitespace-nowrap rounded-xl px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-bold transition-all ${
              isActive("/contact")
                ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1B3D]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons on Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {onOpenEnquiry && (
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border border-slate-300 hover:border-[#0B1B3D] px-3.5 py-2 text-xs font-bold text-[#0B1B3D] transition hover:bg-slate-50 cursor-pointer shadow-sm"
            >
              <PhoneCall className="h-3.5 w-3.5 text-amber-600" />
              <span>Enquire</span>
            </button>
          )}

          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-black text-[#061024] shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>Apply Online 2026</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-slate-300 text-[#0B1B3D] transition hover:bg-slate-100 lg:hidden cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* Quick Mobile Action Bar */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
              <Link
                href="/admissions"
                onClick={closeMenu}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-[#0B1B3D] font-black text-xs shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Apply 2026</span>
              </Link>
              <a
                href="tel:+919571345444"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0B1B3D] text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Helpline</span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 text-sm font-bold text-slate-800">
              <Link
                href="/"
                onClick={closeMenu}
                className={`block px-3 py-2.5 rounded-xl ${
                  isActive("/") && pathname === "/" ? "bg-[#0B1B3D] text-amber-300" : "hover:bg-slate-100"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className={`block px-3 py-2.5 rounded-xl ${
                  isActive("/about") ? "bg-[#0B1B3D] text-amber-300" : "hover:bg-slate-100"
                }`}
              >
                About Us &amp; Leadership
              </Link>

              {/* Colleges Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleDropdown("colleges")}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left font-bold"
                >
                  <span>Constituent Colleges (6)</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === "colleges" ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "colleges" && (
                  <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs bg-slate-50 rounded-2xl mt-1 border border-slate-100">
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
                      NCAN — Ayurveda Nursing College
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
                  </div>
                )}
              </div>

              <Link
                href="/programs"
                onClick={closeMenu}
                className={`block px-3 py-2.5 rounded-xl ${
                  isActive("/programs") ? "bg-[#0B1B3D] text-amber-300" : "hover:bg-slate-100"
                }`}
              >
                Academic Programmes (45+)
              </Link>

              <Link
                href="/admissions"
                onClick={closeMenu}
                className={`block px-3 py-2.5 rounded-xl ${
                  isActive("/admissions") ? "bg-[#0B1B3D] text-amber-300" : "hover:bg-slate-100"
                }`}
              >
                Admissions 2026–27
              </Link>

              <Link
                href="/#campus-life"
                onClick={closeMenu}
                className="block px-3 py-2.5 rounded-xl hover:bg-slate-100"
              >
                Campus Life &amp; Amenities
              </Link>

              <Link
                href="/#placements"
                onClick={closeMenu}
                className="block px-3 py-2.5 rounded-xl hover:bg-slate-100"
              >
                Placements &amp; Recruiters
              </Link>

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

            {/* Bottom info in mobile drawer */}
            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Upali Oden, Nathdwara, Raj. &ndash; 313301</span>
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
  );
}
