import type { Metadata } from "next";
import { ArrowUpRight, FileText, Phone, ShieldAlert, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CtaBand, Section, SectionHeading } from "@/components/ui";
import { COMMITTEES } from "@/data/campusContent";
import { INSTITUTION_SITES } from "@/data/institutionSites";
import { telHref } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Committees & Cells | Nathdwara Group of Institutions",
  description:
    "Anti-ragging committee, Internal Complaints Committee, Grievance Redressal Cell, Women Development Cell, SC/ST and OBC cells at the Nathdwara Group of Institutions.",
};

const NLC_COMMITTEE_DOCS = (INSTITUTION_SITES.nlc.documents ?? []).filter((doc) => doc.href.endsWith(".jpg"));

export default function CommitteesPage() {
  return (
    <>
      <PageHero
        eyebrow="Student welfare"
        title="Committees & cells"
        description="Statutory committees that keep the campus safe, fair and inclusive — and the people you can approach with a concern."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Campus", href: "/campus-life" }, { label: "Committees & Cells" }]}
      />

      <div className="border-b border-rose-200 bg-rose-50">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="flex items-start gap-3 text-sm font-medium text-rose-900">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
            Ragging is a punishable offence. If you face or witness ragging, call the national anti-ragging helpline — it is free and confidential.
          </p>
          <a
            href={telHref("18001805522")}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700"
          >
            <Phone className="h-4 w-4" /> 1800-180-5522
          </a>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Session 2025-26"
          title="Who to approach, and how each committee works"
          description="Membership shown is as published by NIBM for 2025-26. Each college constitutes its own committees; the Law College's are linked below."
        />
        <nav aria-label="Committees" className="mb-8 flex flex-wrap gap-2">
          {COMMITTEES.map((committee) => (
            <a
              key={committee.id}
              href={`#${committee.id}`}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:border-primary hover:text-primary"
            >
              {committee.title}
            </a>
          ))}
        </nav>

        <div className="grid gap-6 lg:grid-cols-2">
          {COMMITTEES.map((committee) => (
            <article
              key={committee.id}
              id={committee.id}
              className="scroll-mt-40 flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm md:p-7"
            >
              <h3 className="font-display text-lg font-bold text-primary md:text-xl">{committee.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{committee.summary}</p>

              <ul className="mt-4 space-y-1.5">
                {committee.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                    {point}
                  </li>
                ))}
              </ul>

              {committee.members ? (
                <div className="mt-5 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <caption className="sr-only">Members of the {committee.title}</caption>
                    <thead className="bg-soft text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Member</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Designation</th>
                        {committee.members.some((member) => member.role) ? (
                          <th scope="col" className="px-4 py-2.5 font-semibold">Role</th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {committee.members.map((member) => (
                        <tr key={member.name}>
                          <td className="px-4 py-2.5 font-medium text-primary">{member.name}</td>
                          <td className="px-4 py-2.5 text-slate-600">{member.designation}</td>
                          {committee.members?.some((m) => m.role) ? (
                            <td className="px-4 py-2.5 text-slate-600">{member.role ?? "Member"}</td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-3 pt-5">
                {committee.helpline ? (
                  <a
                    href={telHref(committee.helpline)}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
                  >
                    <Phone className="h-4 w-4 text-accent" /> Helpline {committee.helpline}
                  </a>
                ) : null}
                {committee.link ? (
                  <a
                    href={committee.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-primary hover:border-primary"
                  >
                    {committee.link.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Nathdwara Law College"
          title="Law College committees"
          description="The Law College publishes its committee composition as official notices."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {NLC_COMMITTEE_DOCS.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-5 hover:border-primary"
            >
              <span className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent-dark" />
                <span className="text-sm font-semibold text-primary">{doc.label}</span>
              </span>
              <FileText className="h-4 w-4 text-slate-400 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </Section>

      <CtaBand title="Questions about campus safety?" description="Speak to the admission desk or any committee member — every concern is taken seriously." />
    </>
  );
}
