"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  MapPin,
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
    { value: "all", label: "All institutions" },
    ...categories.map((category) => ({
      value: category,
      label: INSTITUTION_CATEGORIES[category],
    })),
  ];

  return (
    <section id="institutions" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
            <Building2 className="h-3.5 w-3.5 text-blue-700" />
            <span>NGI Campus Network · Nathdwara, Rajasthan</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
            Our Constituent Institutes &amp; Specialized Wings
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Explore the six institutions in the Nathdwara Group, from medical
            sciences and Ayurveda nursing to law, engineering and industrial
            training.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveCategory(filter.value)}
                aria-pressed={activeCategory === filter.value}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === filter.value
                    ? "bg-blue-950 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {filteredInstitutions.map((institution) => (
            <article
              key={institution.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/institutions/${institution.id}`}
                className="relative block aspect-[16/9] overflow-hidden bg-slate-100"
                aria-label={`Learn about ${institution.name}`}
              >
                <img
                  src={institution.bannerImage}
                  alt={`${institution.name} campus`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-blue-900/90 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  {institution.district}, {institution.state}
                </span>
                <span className="absolute bottom-3 left-4 text-xl font-black tracking-wide text-amber-300 drop-shadow">
                  {institution.shortName}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div>
                  <Link href={`/institutions/${institution.id}`}>
                    <h3 className="text-base font-bold text-blue-950 transition-colors group-hover:text-blue-700">
                      {institution.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{institution.location}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {institution.description}
                  </p>

                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <div className="mb-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <BookOpen className="h-3 w-3" />
                      Areas of study
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {institution.featuredCourses.map((area) => (
                        <span
                          key={area}
                          className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link
                    href={`/institutions/${institution.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 transition-colors hover:text-amber-600"
                  >
                    Institution details <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-200"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
