import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Quote,
  Target,
} from "lucide-react";
import {
  INSTITUTION_CATEGORIES,
  INSTITUTION_SITES,
  INSTITUTION_SLUG_ALIASES,
  LATEST_NEWS,
  NGI_INSTITUTIONS,
  getInstitutionCourses,
} from "@/data/ngiData";

interface InstitutionSitePageProps {
  params: Promise<{ institution: string }>;
}

function getInstitution(slug: string) {
  return NGI_INSTITUTIONS.find((institution) => institution.id === slug);
}

export function generateStaticParams() {
  return [
    ...NGI_INSTITUTIONS.map((institution) => ({ institution: institution.id })),
    ...Object.keys(INSTITUTION_SLUG_ALIASES).map((alias) => ({
      institution: alias,
    })),
  ];
}

export async function generateMetadata({
  params,
}: InstitutionSitePageProps): Promise<Metadata> {
  const { institution: slug } = await params;
  const institution = getInstitution(INSTITUTION_SLUG_ALIASES[slug] ?? slug);

  if (!institution) {
    return { title: "Page not found | Nathdwara Group of Institutions" };
  }

  const site = INSTITUTION_SITES[institution.id];
  return {
    title: `${institution.name} (${institution.shortName}) | Nathdwara Group of Institutions`,
    description: site?.welcome[0] ?? institution.description,
  };
}

export default async function InstitutionSitePage({
  params,
}: InstitutionSitePageProps) {
  const { institution: slug } = await params;

  const canonical = INSTITUTION_SLUG_ALIASES[slug];
  if (canonical) {
    redirect(`/${canonical}`);
  }

  const institution = getInstitution(slug);
  const site = institution ? INSTITUTION_SITES[institution.id] : undefined;

  if (!institution || !site) {
    notFound();
  }

  const courses = getInstitutionCourses(institution.id);
  const siblings = NGI_INSTITUTIONS.filter(
    (other) => other.id !== institution.id,
  );
  const notices = LATEST_NEWS.slice(0, 4);

  return (
    <article>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-[#102c52] bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(10, 30, 56, .94), rgba(16, 44, 82, .78) 58%, rgba(16, 44, 82, .48)), url("${site.heroImage}")`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/institutions" className="hover:text-amber-300 transition-colors">Institutions</Link>
              <span>/</span>
              <span className="text-amber-300">{institution.shortName}</span>
            </nav>

            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-sm">
              <span className="h-px w-8 bg-amber-300" />
              {INSTITUTION_CATEGORIES[institution.category]} · Nathdwara Group of Institutions
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {institution.shortName}
            </h1>
            <p className="mt-3 text-lg font-bold text-amber-300 sm:text-xl">
              {institution.name}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              {site.tagline}. {institution.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Apply for admission <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact the college
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts strip */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
            <MapPin className="h-5 w-5 shrink-0 text-amber-600" />
            {institution.location}, {institution.district},{" "}
            {institution.state}
          </p>
          <p className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
            <Landmark className="h-5 w-5 shrink-0 text-amber-600" />
            {institution.affiliation}
          </p>
          <p className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
            <Phone className="h-5 w-5 shrink-0 text-amber-600" />
            {site.phone ?? "Enquire via the NGI admissions desk"}
          </p>
        </div>
      </section>

      {/* Welcome */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
            <Building2 className="h-3.5 w-3.5 text-blue-700" />
            Welcome to {institution.shortName}
          </div>
          <h2 className="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
            About the institution
          </h2>
          {site.welcome.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-5 text-base leading-7 text-slate-600"
            >
              {paragraph}
            </p>
          ))}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {site.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-medium leading-6 text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
          <img
            src={institution.bannerImage}
            alt={`${institution.name} campus`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      {site.vision || site.mission ? (
        <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
                <Target className="h-3.5 w-3.5 text-blue-700" />
                Our purpose
              </div>
              <h2 className="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
                Vision &amp; Mission
              </h2>
              {site.vision ? (
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {site.vision}
                </p>
              ) : null}
            </div>
            {site.mission ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {site.mission.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-base font-bold text-blue-950">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Leadership messages */}
      {site.messages ? (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Quote className="h-3.5 w-3.5 text-blue-700" />
              From the desk
            </div>
            <h2 className="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
              Leadership messages
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {site.messages.map((message) => (
              <div
                key={message.role}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                {message.quote ? (
                  <p className="text-lg font-bold italic leading-7 text-blue-950">
                    &ldquo;{message.quote}&rdquo;
                  </p>
                ) : null}
                {message.text.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-sm leading-7 text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-sm font-bold text-blue-950">
                    {message.name}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    {message.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Courses */}
      <section className="bg-[#102c52] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <GraduationCap className="h-3.5 w-3.5" />
              Programs at {institution.shortName}
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Courses offered
            </h2>
          </div>

          {courses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col rounded-2xl bg-white p-6 text-slate-800 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-blue-950">
                      {course.name}
                    </h3>
                    {course.badge ? (
                      <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                        {course.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                      <BookOpen className="h-3 w-3" /> {course.level} ·{" "}
                      {course.stream}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-slate-600">
                    <strong className="text-slate-800">Eligibility:</strong>{" "}
                    {course.eligibility}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    <strong className="text-slate-800">Careers:</strong>{" "}
                    {course.careerProspects}
                  </p>
                  <Link
                    href="/admissions"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-blue-900 transition-colors hover:text-amber-700"
                  >
                    Enquire about this course{" "}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl bg-white/10 p-8 text-center">
              <p className="text-sm leading-7 text-slate-200">
                Detailed course listings for {institution.shortName} are shared
                on enquiry. Current areas of study:
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {institution.featuredCourses.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-blue-950"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Request the course brochure <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Notices + other institutions */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:px-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
            <Bell className="h-3.5 w-3.5 text-blue-700" />
            Notice board
          </div>
          <h2 className="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl">
            Latest news &amp; notices
          </h2>
          <ul className="mt-6 space-y-4">
            {notices.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                  <span
                    className={`rounded px-2 py-0.5 ${item.urgent
                      ? "bg-rose-100 text-rose-700"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-slate-400">{item.date}</span>
                </div>
                <p className="mt-2.5 text-sm font-medium leading-6 text-slate-700">
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
            <Building2 className="h-3.5 w-3.5 text-blue-700" />
            NGI campus network
          </div>
          <h2 className="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl">
            Our institutions
          </h2>
          <ul className="mt-6 space-y-3">
            {siblings.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/${other.id}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <span>
                    <span className="block text-sm font-bold text-blue-950 transition-colors group-hover:text-blue-700">
                      {other.shortName}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                      {other.name}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-amber-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        {site.contacts ? (
          <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black tracking-tight text-blue-950">
              Contact persons
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {site.contacts.map((person) => (
                <div
                  key={person.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-bold text-blue-950">
                    {person.name}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    {person.role}
                  </p>
                  {person.phone ? (
                    <a
                      href={`tel:${person.phone.replace(/[^+\d]/g, "")}`}
                      className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-900"
                    >
                      <Phone className="h-4 w-4 text-amber-600" />
                      {person.phone}
                    </a>
                  ) : null}
                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-900"
                    >
                      <Mail className="h-4 w-4 text-amber-600" />
                      {person.email}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-blue-950">
              Visit {institution.shortName}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {institution.location}, {institution.district},{" "}
              {institution.state}
              {site.phone ? ` · Phone: ${site.phone}` : ""} · Daily bus service
              from Udaipur, Nathdwara, Rajsamand, Kankroli, Mavli &amp;
              Fatehnagar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              Admissions 2026-27 <ArrowRight className="h-4 w-4 text-amber-300" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100"
            >
              Get directions &amp; contact
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
