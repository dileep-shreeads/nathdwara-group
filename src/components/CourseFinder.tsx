"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Clock,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Briefcase,
  ChevronRight,
  ArrowRight,
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
    <section id="courses" className="py-20 lg:py-24 bg-[#071328] text-white relative overflow-hidden border-b border-slate-800">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching KNU's 'Find the Programme That Fits Your Ambition' */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3.5 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ACADEMIC DIRECTORY &bull; 45+ COURSES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Find the Programme That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300">Fits Your Ambition</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            Filter our comprehensive catalogue of undergraduate, postgraduate, diploma, and integrated programs affiliated with RTU Kota and MLSU Udaipur.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-[#0B1B3D]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search programmes (e.g. B.Tech, BCA, B.Sc-B.Ed, Pharmacy, LL.B)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#071328]/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Level Selector */}
            <div className="md:col-span-4 flex items-center bg-[#071328]/80 p-1 rounded-xl border border-slate-700/80 overflow-x-auto">
              {(["All", "UG", "PG", "Diploma", "Integrated"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`flex-1 py-1.5 px-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    levelFilter === lvl
                      ? "bg-amber-400 text-[#071328] shadow font-extrabold"
                      : "text-slate-300 hover:text-white"
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
                className="w-full py-2.5 px-3 bg-[#071328]/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {streams.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-white">
                    Stream: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-[#0B1B3D]/70 hover:bg-[#0B1B3D] border border-white/10 hover:border-amber-400/50 rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/10">
                      {c.stream}
                    </span>
                    {c.badge && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-[#071328] shadow">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {c.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{c.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{c.level} Level Degree</span>
                    </div>
                  </div>

                  <div className="text-xs text-amber-200/95 font-medium mt-3.5 bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400 font-semibold">Constituent College: </span>
                    {c.institution}
                  </div>

                  {/* Eligibility & Career Scope */}
                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Eligibility: </span>
                        {c.eligibility}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Career Opportunities: </span>
                        {c.careerProspects}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/admissions?course=${encodeURIComponent(c.name)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#071328] transition-all shadow-md group-hover:shadow-amber-500/20"
                  >
                    <span>Apply for 2026-27</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/programs"
                    className="text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors"
                  >
                    Syllabus Details &rarr;
                  </Link>
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
                className="mt-3 text-xs font-bold text-amber-400 underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Explore Full Directory Link */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200 transition"
          >
            <span>View all 45+ undergraduate, postgraduate, and diploma programmes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
