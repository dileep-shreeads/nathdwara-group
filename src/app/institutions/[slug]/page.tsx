import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import {
  INSTITUTION_CATEGORIES,
  NGI_INSTITUTIONS,
} from "@/data/ngiData";

interface InstitutionPageProps {
  params: Promise<{ slug: string }>;
}

function getInstitution(slug: string) {
  return NGI_INSTITUTIONS.find((institution) => institution.id === slug);
}

export function generateStaticParams() {
  return NGI_INSTITUTIONS.map((institution) => ({ slug: institution.id }));
}

export async function generateMetadata({
  params,
}: InstitutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const institution = getInstitution(slug);

  if (!institution) {
    return { title: "Institution not found | Nathdwara Group of Institutions" };
  }

  return {
    title: `${institution.name} | Nathdwara Group of Institutions`,
    description: institution.description,
  };
}

export default async function InstitutionPage({ params }: InstitutionPageProps) {
  const { slug } = await params;
  const institution = getInstitution(slug);

  if (!institution) {
    notFound();
  }

  return (
    <article>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/institutions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 transition-colors hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4" />
          All institutions
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
          <img
            src={institution.bannerImage}
            alt={`${institution.name} campus`}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>

        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
            {INSTITUTION_CATEGORIES[institution.category]}
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#102c52] sm:text-4xl">
            {institution.name}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            {institution.description}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <MapPin className="h-4 w-4 text-amber-700" />
            {institution.location}, {institution.district}, {institution.state}
          </p>

          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Areas of study
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {institution.featuredCourses.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/admissions"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
          >
            Ask about admissions
            <ArrowUpRight className="h-4 w-4 text-amber-300" />
          </Link>
        </div>
      </section>
    </article>
  );
}