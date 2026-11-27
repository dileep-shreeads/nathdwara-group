import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, Info } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CtaBand, Section, SectionHeading } from "@/components/ui";
import { NGI_INSTITUTIONS } from "@/data/ngiData";
import { INSTITUTION_SITES } from "@/data/institutionSites";

export const metadata: Metadata = {
  title: "Mandatory Disclosures | Nathdwara Group of Institutions",
  description:
    "Affiliation orders, NCTE recognition, BCI approval, government NOCs, staff lists and academic documents for each college of the Nathdwara Group.",
};

export default function DisclosuresPage() {
  const colleges = NGI_INSTITUTIONS.map((institution) => ({
    institution,
    documents: INSTITUTION_SITES[institution.id]?.documents ?? [],
  })).sort((a, b) => b.documents.length - a.documents.length);

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Mandatory disclosures"
        description="Approval letters, affiliation orders, NOCs, staff lists and statutory documents published by each NGI college."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Mandatory Disclosures" }]}
      />

      <Section>
        <div className="mb-8 flex gap-3 rounded-xl border border-line bg-soft p-4 text-sm leading-6 text-slate-600">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>
            Documents open from the colleges&apos; official websites (nibmedu.com and ngi.edu.in) in a new tab. If a
            document you need is not listed, contact the college office.
          </p>
        </div>

        <nav aria-label="Colleges" className="mb-10 flex flex-wrap gap-2">
          {colleges.map(({ institution, documents }) => (
            <a
              key={institution.id}
              href={`#docs-${institution.id}`}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:border-primary hover:text-primary"
            >
              {institution.shortName}
              <span className="ml-1.5 text-xs text-slate-400">{documents.length}</span>
            </a>
          ))}
        </nav>

        <div className="space-y-10">
          {colleges.map(({ institution, documents }) => (
            <section key={institution.id} id={`docs-${institution.id}`} className="scroll-mt-32">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-dark">{institution.shortName}</p>
                  <h2 className="font-display text-xl font-bold text-primary md:text-2xl">{institution.name}</h2>
                </div>
                <Link href={`/${institution.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent-dark">
                  College website <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              {documents.length > 0 ? (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {documents.map((doc) => (
                    <li key={doc.href}>
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:border-primary"
                      >
                        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" />
                        <span className="flex-1 text-sm font-medium leading-6 text-slate-800 group-hover:text-primary">
                          {doc.label}
                          <span className="block text-xs font-normal text-slate-500">
                            {doc.note ?? (doc.href.endsWith(".pdf") ? "PDF" : "Image")}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-primary" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl border border-dashed border-line p-5 text-sm text-slate-500">
                  No documents are published online for {institution.shortName} yet. Request copies from the college office.
                </p>
              )}
            </section>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Also see" title="Related information" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { href: "/committees", title: "Committees & Cells", text: "Anti-ragging, ICC, grievance redressal and more" },
            { href: "/nibm#fees", title: "Fee & Seat Intake", text: "NIBM programme fees and approved seats" },
            { href: "/about#approvals", title: "Approvals & Affiliations", text: "Universities and regulators for each college" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-line bg-white p-5 hover:border-primary">
              <span className="font-display text-base font-bold text-primary">{item.title}</span>
              <span className="mt-1 block text-sm text-slate-600">{item.text}</span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
