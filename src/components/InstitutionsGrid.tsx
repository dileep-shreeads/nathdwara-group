"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  INSTITUTION_CATEGORIES,
  NGI_INSTITUTIONS,
  type Institution,
} from "@/data/ngiData";

type CategoryFilter = Institution["category"] | "all";

const categories = Array.from(
  new Set(NGI_INSTITUTIONS.map((institution) => institution.category)),
);

export default function InstitutionsGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const filteredInstitutions = NGI_INSTITUTIONS.filter(
    (institution) =>
      activeCategory === "all" || institution.category === activeCategory,
  );
  const filters: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All Constituent Colleges" },
    ...categories.map((category) => ({
      value: category,
      label: INSTITUTION_CATEGORIES[category],
    })),
  ];

  return (
    <section id="colleges" className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching KNU's 'Seven Schools. One Standard of Excellence.' */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-blue-100/80 border border-blue-200/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B1B3D]">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Academic Wings • Nathdwara Campus</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0B1B3D] sm:text-4xl lg:text-5xl">
            Six Constituent Colleges. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">One Standard of Excellence.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            From Engineering and Computer Applications to Law, Pharmacy, Ayurveda Nursing, and Skill Development, each college delivers rigorous academics, dedicated laboratories, and university affiliations.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveCategory(filter.value)}
                aria-pressed={activeCategory === filter.value}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === filter.value
                    ? "bg-[#0B1B3D] text-white shadow-md shadow-blue-950/20"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInstitutions.map((institution) => (
            <article
              key={institution.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-400/50"
            >
              {/* Image Banner */}
              <Link
                href={`/${institution.id}`}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                aria-label={`Visit ${institution.name}`}
              >
                <img
                  src={institution.bannerImage}
                  alt={`${institution.name} campus`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent" />
                
                {/* Affiliation / Approval Badge */}
                <span className="absolute left-3.5 top-3.5 rounded-md bg-[#0B1B3D]/90 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] font-bold text-amber-300 shadow">
                  {institution.affiliation}
                </span>

                {/* College Abbreviation Tag */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <span className="text-2xl font-black tracking-wide text-white drop-shadow-md">
                    {institution.shortName}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                    {institution.district}, {institution.state}
                  </span>
                </div>
              </Link>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{INSTITUTION_CATEGORIES[institution.category]}</span>
                  </div>

                  <Link href={`/${institution.id}`}>
                    <h3 className="text-lg font-bold text-[#0B1B3D] transition-colors group-hover:text-amber-600 line-clamp-2 leading-snug">
                      {institution.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{institution.location}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {institution.description}
                  </p>

                  {/* Featured Disciplines / Degrees */}
                  <div className="mt-4 border-t border-slate-100 pt-3.5">
                    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <GraduationCap className="h-3.5 w-3.5 text-blue-700" />
                      Offered Degrees &amp; Disciplines
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {institution.featuredCourses.map((course) => (
                        <span
                          key={course}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-900 transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Link
                    href={`/${institution.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B3D] transition-colors hover:text-amber-600 group/link"
                  >
                    <span>Explore College</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="rounded-xl bg-slate-100 hover:bg-[#0B1B3D] text-slate-800 hover:text-white px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Comprehensive Link */}
        <div className="mt-14 text-center">
          <Link
            href="/institutions"
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 hover:border-[#0B1B3D] px-6 py-3 text-sm font-bold text-[#0B1B3D] shadow-sm hover:shadow transition-all"
          >
            <span>View Full Profiles of All 6 Constituent Colleges</span>
            <ArrowUpRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
