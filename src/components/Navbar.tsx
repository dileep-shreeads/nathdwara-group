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
      setIsScrolled(window.scrollY > 80);
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
    <header className="w-full relative z-40 bg-white">
      {/* Tier 2: University Identity Bar (White Background - matching KNU) */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* University Emblem & Official Title */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3.5 sm:gap-4"
            onClick={closeMenu}
            aria-label="Nathdwara Group of Institutions home"
          >
            <span className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-400 bg-white shadow-md p-1 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/ngi-logo.png"
                alt="NGI University Emblem"
                className="h-full w-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <span className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] text-amber-600">
                ESTD. 2010 • 16+ YEARS OF EXCELLENCE
              </span>
              <h1 className="truncate text-lg sm:text-2xl lg:text-[1.65rem] font-black leading-tight tracking-tight text-[#0B1B3D]">
                NATHDWARA <span className="text-amber-600">GROUP</span> OF INSTITUTIONS
              </h1>
              <p className="hidden sm:block truncate text-xs font-semibold text-slate-500 mt-0.5">
                Upali Oden, Nathdwara, Dist. Rajsamand, Rajasthan &ndash; 313301 (Near Udaipur)
              </p>
              <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-emerald-700 mt-0.5">
                <span>Affiliated to RTU Kota &amp; MLSU Udaipur</span>
                <span>&bull;</span>
                <span>Approved by AICTE, BCI, NCTE &amp; PCI</span>
              </div>
            </div>
          </Link>

          {/* Right: Admission Contact & Enquiry CTAs */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Helpline Card */}
            <div className="text-right border-r border-slate-200 pr-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Admissions Helpline
              </span>
              <a
                href="tel:+919571345444"
                className="text-sm font-black text-[#0B1B3D] hover:text-amber-600 transition flex items-center justify-end gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+91 95713 45444</span>
              </a>
              <span className="text-[10px] text-slate-500 block">
                admissions@ngi.edu.in
              </span>
            </div>

            {/* Quick Enquire Button */}
            {onOpenEnquiry && (
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 hover:border-[#0B1B3D] px-4 py-2.5 text-xs font-bold text-[#0B1B3D] transition hover:bg-slate-50 shadow-sm cursor-pointer"
              >
                <PhoneCall className="h-3.5 w-3.5 text-amber-600" />
                <span>Enquire Now</span>
              </button>
            )}

            {/* Apply Button */}
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 px-5 py-2.5 text-xs font-black text-[#061024] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>Apply Online 2026</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Apply & Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1 rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-black text-[#0B1B3D] shadow"
            >
              <Sparkles className="h-3 w-3" />
              <span>Apply</span>
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-[#0B1B3D] transition hover:bg-slate-100 cursor-pointer"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: Sticky Navy Navigation Bar (Solid #0B1B3D - matching KNU) */}
      <nav
        aria-label="Main university navigation"
        className="sticky top-0 z-50 bg-[#0B1B3D] text-white shadow-lg border-b border-[#182e5c]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-12 lg:h-[50px]">
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Scrolled Compact Logo */}
            {isScrolled && (
              <Link
                href="/"
                className="flex items-center gap-2 pr-3 mr-2 border-r border-white/20 text-white font-black text-sm"
              >
                <img src="/ngi-logo.png" alt="NGI" className="w-7 h-7 object-contain bg-white rounded-md p-0.5" />
                <span className="text-amber-400">NGI</span>
              </Link>
            )}

            {/* Home */}
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                isActive("/") && pathname === "/"
                  ? "bg-amber-400 text-[#0B1B3D] shadow font-black"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* About Us Dropdown */}
            <div className="relative group">
              <Link
                href="/about"
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  isActive("/about")
                    ? "bg-amber-400 text-[#0B1B3D] shadow font-black"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="h-3 w-3 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full w-64 rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-200 text-slate-800 text-xs">
                <Link
                  href="/about"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 font-semibold text-[#0B1B3D] transition"
                >
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Overview &amp; Heritage</span>
                </Link>
                <Link
                  href="/about#leadership"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 font-semibold text-[#0B1B3D] transition"
                >
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Leadership Messages</span>
                </Link>
                <Link
                  href="/about#approvals"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 font-semibold text-[#0B1B3D] transition"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Approvals &amp; Affiliations</span>
                </Link>
                <Link
                  href="/about#governance"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 font-semibold text-[#0B1B3D] transition"
                >
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span>Mandatory Disclosures</span>
                </Link>
              </div>
            </div>

            {/* Constituent Colleges Mega Menu */}
            <div className="relative group">
              <Link
                href="/institutions"
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  isActive("/institutions") || pathname.startsWith("/niet") || pathname.startsWith("/nibm") || pathname.startsWith("/nlc")
                    ? "bg-amber-400 text-[#0B1B3D] shadow font-black"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>Colleges</span>
                <ChevronDown className="h-3 w-3 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>

              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute -left-12 top-full w-[490px] rounded-3xl bg-white p-4 shadow-2xl border border-slate-200 text-slate-800 text-xs">
                <div className="px-3 py-1.5 font-black uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-100 mb-2 flex items-center justify-between">
                  <span>Six Constituent Colleges • Nathdwara Campus</span>
                  <span className="text-amber-600 font-bold">RTU &bull; MLSU &bull; BCI &bull; NCTE</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/niet"
                    className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0B1B3D] flex items-center justify-center shrink-0 font-black text-xs">
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
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-black text-xs">
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
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-black text-xs">
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
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 font-black text-xs">
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
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-xs">
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
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 font-black text-xs">
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

            {/* Programmes */}
            <Link
              href="/programs"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                isActive("/programs")
                  ? "bg-amber-400 text-[#0B1B3D] shadow font-black"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Programmes
            </Link>

            {/* Admissions 2026 */}
            <Link
              href="/admissions"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                isActive("/admissions")
                  ? "bg-amber-400 text-[#0B1B3D] shadow font-black"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>Admissions</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-[#0B1B3D] text-[9px] font-black uppercase">
                2026
              </span>
            </Link>

            {/* Campus Life */}
            <Link
              href="/#campus-life"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-200 hover:bg-white/10 hover:text-white transition-all"
            >
              Campus Life
            </Link>

            {/* Placements */}
            <Link
              href="/#placements"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-200 hover:bg-white/10 hover:text-white transition-all"
            >
              Placements
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                isActive("/contact")
                  ? "bg-amber-400 text-[#0B1B3D] shadow font-black"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action / Scrolled Fast Apply */}
          <div className="flex items-center gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#0B1B3D] bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-lg shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply Online 2026</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger in Navigation Bar */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-1.5 text-white hover:text-amber-300"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#182e5c] bg-[#071328] text-white shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 space-y-3">
              {/* Quick Mobile Action Bar */}
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
                <Link
                  href="/admissions"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 text-[#0B1B3D] font-black text-xs shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply 2026</span>
                </Link>
                <a
                  href="tel:+919571345444"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 text-white font-bold text-xs border border-white/15"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Helpline</span>
                </a>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 text-sm font-bold text-slate-200">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-xl ${
                    isActive("/") && pathname === "/" ? "bg-amber-400 text-[#0B1B3D]" : "hover:bg-white/10"
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-xl ${
                    isActive("/about") ? "bg-amber-400 text-[#0B1B3D]" : "hover:bg-white/10"
                  }`}
                >
                  About Us &amp; Leadership
                </Link>

                {/* Colleges Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleDropdown("colleges")}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl hover:bg-white/10 text-left font-bold"
                  >
                    <span>Constituent Colleges (6)</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === "colleges" ? "rotate-180 text-amber-400" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === "colleges" && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs bg-white/5 rounded-2xl mt-1 border border-white/10">
                      <Link
                        href="/niet"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white/10 font-semibold text-amber-300"
                      >
                        NIET — Engineering &amp; Technology (RTU)
                      </Link>
                      <Link
                        href="/nibm"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white/10 font-semibold text-amber-300"
                      >
                        NIBM — Biotechnology &amp; Management (MLSU)
                      </Link>
                      <Link
                        href="/nlc"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white/10 font-semibold text-amber-300"
                      >
                        NLC — Nathdwara Law College (BCI)
                      </Link>
                      <Link
                        href="/ayurved-nursing"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white/10 font-semibold text-amber-300"
                      >
                        NCAN — Ayurveda Nursing College
                      </Link>
                      <Link
                        href="/vdsms"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white/10 font-semibold text-amber-300"
                      >
                        VDSMS — Medical Science &amp; Paramedical
                      </Link>
                      <Link
                        href="/npiti"
                        onClick={closeMenu}
                        className="block p-2 rounded-lg hover:bg-white/10 font-semibold text-amber-300"
                      >
                        NPITI — Industrial Training (NCVT)
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/programs"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-xl ${
                    isActive("/programs") ? "bg-amber-400 text-[#0B1B3D]" : "hover:bg-white/10"
                  }`}
                >
                  Academic Programmes (45+)
                </Link>

                <Link
                  href="/admissions"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-xl ${
                    isActive("/admissions") ? "bg-amber-400 text-[#0B1B3D]" : "hover:bg-white/10"
                  }`}
                >
                  Admissions 2026–27
                </Link>

                <Link
                  href="/#campus-life"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-xl hover:bg-white/10"
                >
                  Campus Life &amp; Amenities
                </Link>

                <Link
                  href="/#placements"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-xl hover:bg-white/10"
                >
                  Placements &amp; Recruiters
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-xl ${
                    isActive("/contact") ? "bg-amber-400 text-[#0B1B3D]" : "hover:bg-white/10"
                  }`}
                >
                  Contact &amp; Campus Route
                </Link>
              </div>

              {/* Bottom info in mobile drawer */}
              <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Upali Oden, Nathdwara, Raj. &ndash; 313301</span>
                </div>
                <div className="flex items-center gap-2 text-rose-300 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span>Anti-Ragging Helpline: 1800-180-5522</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
