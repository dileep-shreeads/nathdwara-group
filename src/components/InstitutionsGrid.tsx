"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { NGI_INSTITUTIONS } from "@/data/ngiData";

type CategoryFilter = "all" | "engineering" | "biotech_mgmt" | "education" | "pharmacy" | "management" | "iti";

export default function InstitutionsGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredInstitutions = NGI_INSTITUTIONS.filter((inst) => {
    if (activeCategory === "all") return true;
    return inst.category === activeCategory;
  });

  return (
    <section id="institutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>NGI Campus Network &bull; Nathdwara, Rajasthan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Our Constituent Institutes &amp; Specialized Wings
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Discover premier colleges offering undergraduate, postgraduate, integrated, and diploma programs under Rajasthan Technical University (RTU) and Mohanlal Sukhadia University (MLSU).
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "all"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Institutes
            </button>
            <button
              onClick={() => setActiveCategory("engineering")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "engineering"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Engineering &amp; Poly (NIET &amp; SITE)
            </button>
            <button
              onClick={() => setActiveCategory("biotech_mgmt")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "biotech_mgmt"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              BCA, B.Sc &amp; Science (NIBM)
            </button>
            <button
              onClick={() => setActiveCategory("education")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "education"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Teacher Education (Integrated B.Ed)
            </button>
            <button
              onClick={() => setActiveCategory("pharmacy")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "pharmacy"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Pharmacy (B.Pharm &amp; D.Pharm)
            </button>
            <button
              onClick={() => setActiveCategory("management")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "management"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Management (MBA)
            </button>
            <button
              onClick={() => setActiveCategory("iti")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "iti"
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              NGI ITI (Vocational)
            </button>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInstitutions.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Banner Image with Badges */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={inst.bannerImage}
                  alt={inst.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-900/90 text-white backdrop-blur-sm shadow">
                    {inst.district}, {inst.state}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-amber-400 text-slate-950 shadow">
                    AICTE / NCTE Approved
                  </span>
                </div>

                {/* Bottom Short Name */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xl font-black text-amber-300 tracking-wide drop-shadow">
                    {inst.shortName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {inst.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{inst.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-blue-800 font-semibold mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span className="truncate">{inst.affiliation}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {inst.description}
                  </p>

                  {/* Featured Courses list */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      Key Offerings:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {inst.featuredCourses.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-900 transition-colors"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#apply-section"
                    className="text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors flex items-center gap-1"
                  >
                    <span>Admission Inquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#courses"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    View Courses
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
