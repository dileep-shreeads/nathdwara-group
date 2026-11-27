import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Bus, CheckCircle2, FlaskConical, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CtaBand, Section, SectionHeading } from "@/components/ui";
import { FACILITIES } from "@/data/campusContent";
import { INSTITUTION_SITES } from "@/data/institutionSites";
import { SITE_CONTACT, telHref } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Campus Facilities | Nathdwara Group of Institutions",
  description:
    "Library, 11 laboratories, hostels for about 1,000 students, canteen, 16-bus college transport and sports facilities on the NGI campus at Nathdwara.",
};

const QUICK_LINKS = [
  { href: "#library", label: "Library" },
  { href: "#labs", label: "Laboratories" },
  ...FACILITIES.map((facility) => ({ href: `#${facility.id}`, label: facility.title })),
];

export default function FacilitiesPage() {
  const nibm = INSTITUTION_SITES.nibm;
  const nlc = INSTITUTION_SITES.nlc;

  return (
    <>
      <PageHero
        eyebrow="Campus & facilities"
        title="Everything you need on one campus"
        description="Libraries, eleven laboratories, residential hostels, a 1,000-seat canteen and a 16-bus transport fleet — shared by all six NGI colleges at Upali Odan, Nathdwara."
        image="/institutions/nibm-card.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Campus", href: "/campus-life" }, { label: "Facilities" }]}
      />

      <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-line bg-white md:top-20">
        <div className="mx-auto flex max-w-[1320px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-soft hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <Section id="library">
        <SectionHeading
          eyebrow="Library"
          title="Two well-stocked libraries with digital access"
          description="NIBM's library serves science, computer-application and teacher-education students; the Law College library supports LL.B. students with journals and a book bank."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { name: "NIBM Library", stats: nibm.library ?? [], notes: nibm.libraryNotes ?? [] },
            { name: "Law College Library", stats: nlc.library ?? [], notes: nlc.libraryNotes ?? [] },
          ].map((library) => (
            <article key={library.name} className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
                <BookOpen className="h-5 w-5 text-accent-dark" />
                {library.name}
              </h3>
              <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {library.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-soft p-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{stat.label}</dt>
                    <dd className="mt-1 font-display text-xl font-bold text-primary">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-5 space-y-2.5">
                {library.notes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-sm leading-6 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="labs" tone="soft">
        <SectionHeading
          eyebrow="Laboratories"
          title="Eleven specialised laboratories"
          description="Science, computer and teacher-education labs at NIBM, used for B.Sc., M.Sc., BCA and integrated B.Ed. practicals."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(nibm.labs ?? []).map((lab) => (
            <article key={lab.name} className="rounded-xl border border-line bg-white p-5 transition-shadow hover:shadow-md">
              <FlaskConical className="h-5 w-5 text-accent-dark" />
              <h3 className="mt-3 font-display text-base font-bold text-primary">{lab.name}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{lab.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      {FACILITIES.map((facility, index) => (
        <Section key={facility.id} id={facility.id} tone={index % 2 === 0 ? "white" : "soft"}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div>
              <SectionHeading eyebrow={facility.eyebrow} title={facility.title} description={facility.intro} />
              <dl className="grid grid-cols-3 gap-3">
                {facility.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-line bg-white p-4">
                    <dd className="font-display text-xl font-bold text-primary md:text-2xl">{stat.value}</dd>
                    <dt className="mt-1 text-xs font-medium text-slate-500">{stat.label}</dt>
                  </div>
                ))}
              </dl>
              {facility.id === "transport" ? (
                <a
                  href={telHref(SITE_CONTACT.transportContact.phone)}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
                >
                  <Bus className="h-4 w-4 text-accent" />
                  Bus routes: {SITE_CONTACT.transportContact.name} · {SITE_CONTACT.transportContact.phone}
                </a>
              ) : null}
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2">
              {facility.points.map((point) => (
                <li key={point} className="flex gap-2.5 rounded-xl border border-line bg-white p-4 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section tone="soft">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="font-display text-xl font-bold text-primary">Want to see the campus in person?</h2>
            <p className="mt-1 text-sm text-slate-600">{SITE_CONTACT.address}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={telHref(SITE_CONTACT.admissionPhone)} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-primary hover:border-primary">
              <Phone className="h-4 w-4" /> {SITE_CONTACT.admissionPhone}
            </a>
            <Link href="/contact" className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light">
              Plan a visit
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
