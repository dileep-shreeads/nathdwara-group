"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Clock,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { FEATURED_COURSES } from "@/data/ngiData";

export default function CourseFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All" | "UG" | "PG" | "Diploma" | "Integrated">("All");
  const [streamFilter, setStreamFilter] = useState("All");

  const streams = [
    "All",
    "Engineering",
    "Computer Applications",
    "Teacher Education",
    "Pharmacy",
    "Life Sciences",
    "Management",
    "Basic Sciences",
    "Technical Trades",
  ];

  const filteredCourses = FEATURED_COURSES.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.careerProspects.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "All" || course.level === levelFilter;
    const matchesStream = streamFilter === "All" || course.stream === streamFilter;
    return matchesSearch && matchesLevel && matchesStream;
  });

  return (
    <section id="courses" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Programs &bull; 45+ Courses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore Programs at Nathdwara Group
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            RTU Kota and MLSU Udaipur affiliated degree and diploma programs tailored for high corporate employability and competitive examinations.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses (e.g. B.Tech, BCA, B.Sc-B.Ed, Pharmacy, MBA)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Level Selector */}
            <div className="md:col-span-4 flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700 overflow-x-auto">
              {(["All", "UG", "PG", "Diploma", "Integrated"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                    levelFilter === lvl
                      ? "bg-amber-400 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Stream Dropdown */}
            <div className="md:col-span-3">
              <select
                value={streamFilter}
                onChange={(e) => setStreamFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {streams.map((s) => (
                  <option key={s} value={s}>
                    Stream: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-700/50">
                      {c.stream}
                    </span>
                    {c.badge && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mt-2">
                    {c.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{c.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{c.level} Level</span>
                    </div>
                  </div>

                  <div className="text-xs text-amber-200/90 font-medium mt-3 bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/50">
                    <span className="text-slate-400">Offered at: </span>
                    {c.institution}
                  </div>

                  {/* Eligibility */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-200">Eligibility: </span>
                        {c.eligibility}
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-200">Career Scope: </span>
                        {c.careerProspects}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <a
                    href="#apply-section"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow"
                  >
                    <span>Apply for 2026-27</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#scholarships"
                    className="text-xs text-slate-400 hover:text-white transition-colors underline"
                  >
                    Scholarship Scheme
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-12 text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">No courses matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLevelFilter("All");
                  setStreamFilter("All");
                }}
                className="mt-3 text-xs font-bold text-amber-400 underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
