import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import {
  INSTITUTION_CATEGORIES,
  NGI_INSTITUTIONS,
} from "@/data/ngiData";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Institutions | Nathdwara Group of Institutions",
  description:
    "Explore the six institutions in Nathdwara Group of Institutions, covering medical sciences, Ayurveda nursing, biotechnology and management, industrial training, law and engineering.",
};

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="The NGI community"
        title="Six institutions. A range of paths to explore."
        description="Get to know the specialist institutions that make up Nathdwara Group of Institutions, from medical sciences and nursing to law, engineering and industrial training."
        image="/institutions/niet-card.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Six institutions · Nathdwara</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52] sm:text-4xl">
              A campus community with room to explore.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">
            Based in Nathdwara, Rajsamand district, Rajasthan.
          </p>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NGI_INSTITUTIONS.map((institution) => (
            <article
              key={institution.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden bg-slate-200">
                <Link
                  href={`/institutions/${institution.id}`}
                  className="absolute inset-0"
                  aria-label={`Learn about ${institution.name}`}
                >
                  <img
                    src={institution.bannerImage}
                    alt={`${institution.name} campus`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-[#102c52]/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-[#102c52]">
                  {INSTITUTION_CATEGORIES[institution.category]}
                </span>
                <span className="absolute bottom-4 left-5 text-lg font-black tracking-wide text-white">
                  {institution.shortName}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-amber-700" />
                  {institution.location}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-snug text-[#102c52]">
                  {institution.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{institution.description}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Institution group</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{institution.affiliation}</p>
                </div>
                <div className="mt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Areas of study</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {institution.featuredCourses.slice(0, 3).join(" · ")}
                  </p>
                </div>
                <Link
                  href={`/institutions/${institution.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#174879] transition hover:text-amber-700"
                >
                  View institution <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/admissions"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#174879] transition hover:text-amber-700"
                >
                  Ask about admissions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
