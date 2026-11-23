"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const PILLARS = [
  {
    number: "01",
    tag: "CURRICULUM & AFFILIATIONS",
    title: "RTU Kota & MLSU Affiliated Academic Rigor",
    description:
      "All programs adhere strictly to National Education Policy (NEP 2020) and CBCS grading framework with recognized university degrees, approved by statutory bodies including AICTE, BCI, NCTE, PCI, and NCISM.",
    points: [
      "RTU Kota & MLSU Udaipur degree awarding bodies",
      "NEP 2020 choice-based multidisciplinary credits",
      "Regular university examination centers & transparent evaluation",
    ],
    icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
    borderColor: "hover:border-amber-400",
    link: "/about",
  },
  {
    number: "02",
    tag: "INFRASTRUCTURE & LABS",
    title: "11+ Advanced Laboratories & High-Tech Workstations",
    description:
      "Hands-on scientific training with 500+ high-performance computer terminals, molecular biology and tissue culture wet labs, civil surveying stations, pharmacy formulation labs, and mock moot courts.",
    points: [
      "Dedicated biotechnology, tissue culture & pharmacology labs",
      "High-speed campus-wide Wi-Fi & modern software simulators",
      "Central computerized library with Delnet & e-journals",
    ],
    icon: <Cpu className="w-6 h-6 text-blue-600" />,
    borderColor: "hover:border-blue-500",
    link: "/#campus-facilities",
  },
  {
    number: "03",
    tag: "INDUSTRY IMMERSION",
    title: "Corporate Linkages & 100% Placement Support",
    description:
      "Proactive Training and Placement Cell partnering with 120+ leading corporate employers. Systematic pre-placement aptitude training, mock interviews, and industrial internships across Rajasthan and NCR.",
    points: [
      "₹14.5 LPA highest package secured by graduates",
      "Recruiters include Wonder Cement, Secure Meters, TCS & Ambuja",
      "Industry MoUs for live projects & site visits",
    ],
    icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    borderColor: "hover:border-emerald-500",
    link: "/#placements",
  },
  {
    number: "04",
    tag: "ACCESSIBILITY & LIFE",
    title: "Inclusive Scholarships & 30-Acre Campus Life",
    description:
      "Ensuring quality higher education is accessible to all deserving youth through Rajasthan SJE post-matric scholarships, merit concessions, and a vibrant student life with athletics, annual garba nights, and cultural fests.",
    points: [
      "Up to 100% tuition assistance for meritorious & reserved candidates",
      "Separate boys & girls hostels with 24/7 security & sports facilities",
      "Active clubs: NSS, Red Ribbon, Cultural Society & Tech Guild",
    ],
    icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
    borderColor: "hover:border-rose-500",
    link: "/#scholarships",
  },
];

export default function PillarsSection() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching KNU's 'Built Different, On Purpose' */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3.5 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>THE NGI ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1B3D] tracking-tight">
            Built Different, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">On Purpose.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Why thousands of aspiring engineers, scientists, lawyers, healthcare professionals, and entrepreneurs from across Rajasthan and northwest India choose Nathdwara Group of Institutions.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className={`bg-slate-50/70 hover:bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${pillar.borderColor} group`}
            >
              <div>
                {/* Card Top: Number + Tag + Icon */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-amber-500 transition-colors">
                      {pillar.number}
                    </span>
                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-500 group-hover:text-[#0B1B3D] transition-colors">
                      {pillar.tag}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mt-5 leading-snug group-hover:text-blue-900 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2.5">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link Action */}
              <div className="mt-7 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  href={pillar.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B3D] group-hover:text-amber-600 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] font-semibold text-slate-400">
                  NGI Benchmark
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
