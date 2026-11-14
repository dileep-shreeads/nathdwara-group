"use client";

import React from "react";
import { Phone, Mail, GraduationCap, MapPin, ExternalLink, ShieldCheck, HeartHandshake } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="w-full bg-slate-900 text-white text-xs border-b border-slate-800">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-1.5 font-semibold text-center flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-slate-950 text-amber-300 animate-pulse">
          ADMISSIONS 2026-27
        </span>
        <span className="hidden sm:inline">
          Admissions Open for B.Tech, BCA, B.Sc, B.Pharm, Integrated BA/B.Sc-B.Ed, MBA &amp; Polytechnic!
        </span>
        <span className="sm:hidden">
          Admissions Open for UG, PG &amp; Diplomas 2026-27!
        </span>
        <a
          href="#apply-section"
          className="underline font-bold hover:text-blue-900 ml-1 inline-flex items-center gap-0.5"
        >
          Apply Online &rarr;
        </a>
      </div>

      {/* Main Top Header Strip */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Contact Info */}
        <div className="flex items-center flex-wrap gap-4 text-slate-300">
          <a
            href="tel:+919571345444"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">+91 95713 45444 / 02953-230077</span>
          </a>
          <span className="text-slate-600 hidden md:inline">|</span>
          <a
            href="mailto:info@ngi.edu.in"
            className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>info@ngi.edu.in</span>
          </a>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Upali Oden, Nathdwara, Dist. Rajsamand (Near Udaipur), Rajasthan</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          <a
            href="#institutions"
            className="text-slate-300 hover:text-white transition-colors hidden md:inline-flex items-center gap-1"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            Colleges &amp; Wings
          </a>
          <a
            href="#scholarships"
            className="text-slate-300 hover:text-white transition-colors hidden md:inline-flex items-center gap-1"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            Govt. &amp; Merit Scholarships
          </a>
          <a
            href="#about-section"
            className="text-slate-300 hover:text-white transition-colors hidden lg:inline-flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            RTU Kota &amp; MLSU Affiliated
          </a>
          <a
            href="#apply-section"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
          >
            <span>Admission Enquiry</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
