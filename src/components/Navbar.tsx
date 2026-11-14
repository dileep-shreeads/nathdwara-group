"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Building,
  BookOpen,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Briefcase,
  Compass,
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [institutionsDropdown, setInstitutionsDropdown] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md transition-all">
      {/* 1. Main Brand & Quick Actions Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-slate-100">
        {/* Logo / Brand */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md border-2 border-amber-400 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-wider text-amber-300">NGI</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-2xl text-blue-950 tracking-tight">
                NATHDWARA
              </span>
              <span className="font-light text-xl sm:text-2xl text-amber-500 tracking-tight">
                GROUP
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-600 uppercase">
              OF INSTITUTIONS &bull; NATHDWARA (RAJASTHAN)
            </span>
            <span className="text-[9px] text-slate-500 font-medium hidden sm:inline">
              RTU Kota &amp; MLSU Udaipur Affiliated &bull; Approved by AICTE, NCTE &amp; PCI
            </span>
          </div>
        </a>

        {/* Action CTAs (No menu button on desktop) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenEnquiry}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-950 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-900" />
            <span>Call Counselor</span>
          </button>

          <a
            href="#apply-section"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Direct Admission 2026-27</span>
          </a>

          {/* Mobile Enquiry button */}
          <button
            onClick={onOpenEnquiry}
            className="sm:hidden px-3 py-1.5 text-xs font-bold bg-amber-400 text-slate-950 rounded-lg shadow-sm"
          >
            Enquiry
          </button>

          {/* Mobile-only Hamburger Toggle (HIDDEN ON DESKTOP) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-950 rounded-xl hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 2. Desktop Navigation Menu Bar: DIRECTLY VISIBLE ON DESKTOP (All menu items shown) */}
      <nav className="hidden lg:block bg-blue-950 text-white border-t border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs xl:text-sm font-semibold">
            {/* 1. Home */}
            <a
              href="#"
              className="py-3 px-3 hover:bg-blue-900 text-white hover:text-amber-300 transition-colors"
            >
              Home
            </a>

            {/* 2. Institutes (NIET, NIBM, SITE, NCOE) */}
            <div
              className="relative group py-3"
              onMouseEnter={() => setInstitutionsDropdown(true)}
              onMouseLeave={() => setInstitutionsDropdown(false)}
            >
              <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-900 text-white hover:text-amber-300 transition-colors">
                <span>Institutes (NIET, NIBM, SITE, NCOE)</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform" />
              </button>

              {institutionsDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-3 grid gap-2 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1">
                    Constituent Colleges &bull; NGI Campus
                  </div>
                  <a
                    href="#institutions"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group/item"
                  >
                    <Building className="w-5 h-5 text-blue-700 mt-0.5 group-hover/item:text-blue-900" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">NIET Engineering &amp; Poly</div>
                      <div className="text-xs text-slate-500">B.Tech &bull; Civil, CSE, Mech, Elect &bull; RTU Kota</div>
                    </div>
                  </a>
                  <a
                    href="#institutions"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group/item"
                  >
                    <Building className="w-5 h-5 text-blue-700 mt-0.5 group-hover/item:text-blue-900" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">NIBM Biotech &amp; Mgmt</div>
                      <div className="text-xs text-slate-500">BCA &bull; B.Sc &bull; BBA &bull; M.Sc &bull; MLSU Udaipur</div>
                    </div>
                  </a>
                  <a
                    href="#institutions"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group/item"
                  >
                    <Building className="w-5 h-5 text-blue-700 mt-0.5 group-hover/item:text-blue-900" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Nathdwara College of Education</div>
                      <div className="text-xs text-slate-500">4-Year Integrated BA-B.Ed / B.Sc-B.Ed &bull; NCTE</div>
                    </div>
                  </a>
                  <a
                    href="#institutions"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group/item"
                  >
                    <Building className="w-5 h-5 text-blue-700 mt-0.5 group-hover/item:text-blue-900" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Nathdwara Institute of Pharmacy</div>
                      <div className="text-xs text-slate-500">B.Pharm &bull; D.Pharm &bull; PCI Approved</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 3. Courses (B.Tech, BCA, B.Sc, B.Pharm) */}
            <div
              className="relative group py-3"
              onMouseEnter={() => setCoursesDropdown(true)}
              onMouseLeave={() => setCoursesDropdown(false)}
            >
              <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-900 text-white hover:text-amber-300 transition-colors">
                <span>Courses (B.Tech, BCA, B.Sc, B.Pharm)</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-180 transition-transform" />
              </button>

              {coursesDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-3 grid gap-2 z-50">
                  <a
                    href="#courses"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-amber-50 text-slate-800 hover:text-amber-900 text-sm font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Engineering &amp; Poly (B.Tech, Diploma)</span>
                  </a>
                  <a
                    href="#courses"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-amber-50 text-slate-800 hover:text-amber-900 text-sm font-medium"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>Computer &amp; Science (BCA, B.Sc, M.Sc)</span>
                  </a>
                  <a
                    href="#courses"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-amber-50 text-slate-800 hover:text-amber-900 text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Teacher Education (Integrated B.Ed)</span>
                  </a>
                  <a
                    href="#courses"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-amber-50 text-slate-800 hover:text-amber-900 text-sm font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Pharmacy (B.Pharm &amp; D.Pharm)</span>
                  </a>
                </div>
              )}
            </div>

            {/* 4. Admissions 2026-27 */}
            <a
              href="#admissions"
              className="py-3 px-3 hover:bg-blue-900 text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 font-bold"
            >
              <span>Admissions 2026-27</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </a>

            {/* 5. Training & Placements */}
            <a
              href="#placements"
              className="py-3 px-3 hover:bg-blue-900 text-white hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Training &amp; Placements</span>
            </a>

            {/* 6. Aravali Campus & Hostels */}
            <a
              href="#campus-facilities"
              className="py-3 px-3 hover:bg-blue-900 text-white hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Aravali Campus &amp; Hostels</span>
            </a>

            {/* 7. Govt. & Merit Scholarships */}
            <a
              href="#scholarships"
              className="py-3 px-3 hover:bg-blue-900 text-white hover:text-amber-300 transition-colors"
            >
              Govt. &amp; Merit Scholarships
            </a>

            {/* 8. About Nathdwara Group (NGI) */}
            <a
              href="#about-section"
              className="py-3 px-3 hover:bg-blue-900 text-white hover:text-amber-300 transition-colors"
            >
              About Nathdwara Group (NGI)
            </a>

            {/* 9. Contact & Campus Location */}
            <a
              href="#contact"
              className="py-3 px-3 hover:bg-blue-900 text-white hover:text-amber-300 transition-colors"
            >
              Contact &amp; Campus Location
            </a>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Slide-out Drawer (ONLY for Mobile Screens < 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full sm:max-w-md w-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 z-50">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-3 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md border-2 border-amber-400 shrink-0">
                  <span className="font-extrabold text-base tracking-wider text-amber-300">NGI</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-sm text-blue-950 tracking-tight">
                      NATHDWARA
                    </span>
                    <span className="font-light text-sm text-amber-500 tracking-tight">
                      GROUP
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold tracking-wider text-slate-600 uppercase">
                    OF INSTITUTIONS &bull; NATHDWARA (RAJASTHAN)
                  </span>
                  <span className="text-[8px] text-slate-400">
                    RTU Kota &amp; MLSU Udaipur Affiliated
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenEnquiry) onOpenEnquiry();
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-lg shadow-sm transition-colors"
                >
                  Enquiry
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Menu Items List */}
            <div className="p-4 sm:p-6 space-y-2 flex-1">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                Home
              </a>

              <a
                href="#institutions"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors group"
              >
                <span>Institutes (NIET, NIBM, SITE, NCOE)</span>
                <Building className="w-5 h-5 text-blue-800 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors group"
              >
                <span>Courses (B.Tech, BCA, B.Sc, B.Pharm)</span>
                <BookOpen className="w-5 h-5 text-blue-800 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="#admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors group"
              >
                <span>Admissions 2026-27</span>
                <GraduationCap className="w-5 h-5 text-blue-800 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="#placements"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors group"
              >
                <span>Training &amp; Placements</span>
                <Briefcase className="w-5 h-5 text-blue-800 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="#campus-facilities"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors group"
              >
                <span>Aravali Campus &amp; Hostels</span>
                <Compass className="w-5 h-5 text-blue-800 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="#scholarships"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                Govt. &amp; Merit Scholarships
              </a>

              <a
                href="#about-section"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                About Nathdwara Group (NGI)
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 rounded-xl font-bold text-base text-slate-900 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                Contact &amp; Campus Location
              </a>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-2.5">
              <a
                href="#apply-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all text-sm"
              >
                Apply Online 2026-27
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full text-center py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-semibold rounded-xl shadow transition-colors text-sm"
              >
                Request Call Back
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
