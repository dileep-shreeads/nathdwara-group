"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  MapPin,
  Search,
} from "lucide-react";
import {
  INSTITUTION_CATEGORIES,
  NGI_INSTITUTIONS,
  type Institution,
} from "@/data/ngiData";

type CategoryFilter = Institution["category"] | "all";

export default function InstitutionsDirectory() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = NGI_INSTITUTIONS.filter((inst) => {
    const matchesCategory =
      activeCategory === "all" || inst.category === activeCategory;
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.featuredCourses.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Category Filter and Search Toolbar */}
      <section className="bg-white border-b border-slate-200 sticky top-[76px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search colleges, trades, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#102c52] focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === "all"
                    ? "bg-[#102c52] text-amber-300 shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All 6 Institutions
              </button>
              {Object.entries(INSTITUTION_CATEGORIES).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as Institution["category"])}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === key
                      ? "bg-[#102c52] text-amber-300 shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institutions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <div className="text-sm font-bold text-slate-800">
            Displaying {filtered.length} of {NGI_INSTITUTIONS.length} Constituent Institutions
          </div>
          {(activeCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-blue-900 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((institution) => (
            <article
              key={institution.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Link
                  href={`/${institution.id}`}
                  className="absolute inset-0"
                  aria-label={`Learn more about ${institution.name}`}
                >
                  <img
                    src={institution.bannerImage}
                    alt={`${institution.name} campus`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-90"
                    loading="lazy"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-[#102c52]/90 via-transparent to-transparent pointer-events-none" />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#102c52] shadow">
                  {INSTITUTION_CATEGORIES[institution.category]}
                </span>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-2xl font-black tracking-wide text-amber-300 drop-shadow">
                    {institution.shortName}
                  </span>
                  <div className="text-xs text-white/90 truncate mt-0.5">
                    {institution.name}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span>{institution.location}, {institution.district}</span>
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 flex-1">
                  {institution.description}
                </p>

                {/* Affiliation info */}
                <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <Landmark className="w-3.5 h-3.5 text-blue-900" />
                    <span>Recognition &amp; Affiliation</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-700 leading-snug">
                    {institution.affiliation}
                  </p>
                </div>

                {/* Programs available */}
                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Academic Areas
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {institution.featuredCourses.map((c) => (
                      <span
                        key={c}
                        className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-950 border border-blue-100"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/${institution.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#102c52] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1d4b7f]"
                  >
                    <span>Visit College Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={`/admissions?course=${encodeURIComponent(institution.shortName)}`}
                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Campus Map & Transport Strip */}
      <section className="bg-gradient-to-r from-[#102c52] to-[#1e4878] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full">
              Unified 30-Acre Campus
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              All 6 Institutions on One Vibrant Campus
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mt-1 leading-relaxed">
              Every college shares modern central facilities including our 35,000+ volume digital library, advanced engineering workshops, sports grounds, cafeteria, and secure residential hostels.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Explore Admissions 2026
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              Plan Campus Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}