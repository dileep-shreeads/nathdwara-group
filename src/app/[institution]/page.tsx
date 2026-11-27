import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  FlaskConical,
  IndianRupee,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { CtaBand, Section, SectionHeading } from "@/components/ui";
import { INSTITUTION_CATEGORIES, NGI_INSTITUTIONS } from "@/data/ngiData";
import {
  INSTITUTION_SITES,
  INSTITUTION_SLUG_ALIASES,
  getInstitutionCourses,
} from "@/data/institutionSites";
import { SITE_CONTACT, telHref } from "@/data/siteConfig";

interface InstitutionSitePageProps {
  params: Promise<{ institution: string }>;
}

function getInstitution(slug: string) {
  return NGI_INSTITUTIONS.find((institution) => institution.id === slug);
}

export function generateStaticParams() {
  return [
    ...NGI_INSTITUTIONS.map((institution) => ({ institution: institution.id })),
    ...Object.keys(INSTITUTION_SLUG_ALIASES).map((alias) => ({ institution: alias })),
  ];
}

export async function generateMetadata({ params }: InstitutionSitePageProps): Promise<Metadata> {
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

export default async function InstitutionSitePage({ params }: InstitutionSitePageProps) {
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
  const siblings = NGI_INSTITUTIONS.filter((other) => other.id !== institution.id);
  const hasFeeTable =
    (site.programmes?.length ?? 0) > 1 &&
    (site.programmes ?? []).some((programme) => programme.fee !== "On enquiry");

  const sections = [
    { id: "overview", label: "Overview", show: true },
    { id: "leadership", label: "Leadership", show: Boolean(site.messages?.length) },
    { id: "programmes", label: "Programmes", show: true },
    { id: "fees", label: "Fees & Seats", show: hasFeeTable },
    { id: "labs", label: "Labs", show: Boolean(site.labs?.length) },
    { id: "library", label: "Library", show: Boolean(site.library?.length) },
    { id: "placements", label: "Placements", show: Boolean(site.placementNotes?.length) },
    { id: "documents", label: "Documents", show: Boolean(site.documents?.length) },
    { id: "contact", label: "Contact", show: true },
  ].filter((section) => section.show);

  let tone = 0;
  const nextTone = () => (tone++ % 2 === 0 ? "white" : "soft") as "white" | "soft";

  return (
    <article>
      <PageHero
        eyebrow={`${INSTITUTION_CATEGORIES[institution.category]} · ${institution.shortName}`}
        title={institution.name}
        description={`${site.tagline}. ${institution.location}, ${institution.district}, ${institution.state}.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/institutions" },
          { label: institution.shortName },
        ]}
      >
        <Link
          href="/admissions"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-accent-dark"
        >
          Apply for admission <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={telHref(site.phone ?? SITE_CONTACT.admissionPhone)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <Phone className="h-4 w-4" /> {site.phone ?? SITE_CONTACT.admissionPhone}
        </a>
      </PageHero>

      {/* Quick facts */}
      <div className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-[1320px] gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: MapPin, label: "Campus", value: `${institution.location}, ${institution.district}` },
            { icon: Landmark, label: "Affiliation", value: institution.affiliation },
            { icon: Phone, label: "Phone", value: site.phone ?? SITE_CONTACT.admissionPhone },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-soft">
                <Icon className="h-5 w-5 text-accent-dark" />
              </span>
              <span>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
                <dd className="text-sm font-semibold text-primary">{value}</dd>
              </span>
            </div>
          ))}
        </dl>
      </div>

      {/* In-page navigation */}
      <nav aria-label={`${institution.shortName} sections`} className="sticky top-16 z-30 border-b border-line bg-white md:top-20">
        <div className="mx-auto flex max-w-[1320px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-soft hover:text-primary"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <Section id="overview" tone={nextTone()}>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14">
          <div>
            <SectionHeading eyebrow={`Welcome to ${institution.shortName}`} title="About the institution" />
            {site.welcome.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-4 text-base leading-7 text-slate-600 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-soft shadow-md">
              <img
                src={institution.bannerImage}
                alt={`${institution.name} campus`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {site.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 rounded-xl border border-line bg-white p-3.5 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {site.vision || site.mission ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {site.vision ? (
              <div
                className={`rounded-2xl bg-brand-gradient p-6 text-white ${
                  site.mission?.length ? "lg:row-span-2" : "lg:col-span-3 md:p-8"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Vision</p>
                <p className="mt-3 font-display text-lg font-semibold leading-relaxed">{site.vision}</p>
              </div>
            ) : null}
            {site.mission?.map((pillar, index) => (
              <div key={pillar.title} className="rounded-2xl border border-line bg-white p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-dark">Mission {index + 1}</p>
                <h3 className="mt-2 font-display text-base font-bold text-primary">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      {/* Leadership */}
      {site.messages?.length ? (
        <Section id="leadership" tone={nextTone()}>
          <SectionHeading eyebrow="From the desk of" title="Leadership messages" />
          <div className={`grid gap-6 ${site.messages.length > 1 ? "lg:grid-cols-2" : ""} ${site.messages.length > 2 ? "xl:grid-cols-3" : ""}`}>
            {site.messages.map((message) => (
              <figure key={`${message.name}-${message.role}`} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm md:p-7">
                {message.quote ? (
                  <blockquote className="border-l-4 border-accent pl-4 font-display text-base font-semibold leading-7 text-primary">
                    &ldquo;{message.quote}&rdquo;
                  </blockquote>
                ) : null}
                <div className="mt-4 space-y-3">
                  {message.text.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-sm leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-accent">
                    {message.name.replace(/^(Mr\.|Dr\.|Ms\.)\s*/, "").split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-primary">{message.name}</span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-accent-dark">{message.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Programmes */}
      <Section id="programmes" tone={nextTone()}>
        <SectionHeading
          eyebrow={`Programmes at ${institution.shortName}`}
          title="Courses offered"
          description={site.programmes ? site.feeNote : undefined}
        />

        {site.programmes ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {site.programmes.map((programme) => (
              <article key={programme.name} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm">
                <h3 className="font-display text-base font-bold text-primary">{programme.name}</h3>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: Clock, label: "Duration", value: programme.duration },
                    { icon: Users, label: "Seats", value: programme.seats },
                    { icon: IndianRupee, label: "Fee", value: programme.fee },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-lg bg-soft px-2 py-2.5">
                      <Icon className="mx-auto h-4 w-4 text-accent-dark" />
                      <dt className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
                      <dd className="text-xs font-semibold leading-snug text-primary">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  <strong className="text-primary">Eligibility:</strong> {programme.eligibility}
                </p>
                {programme.admission ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    <strong className="text-primary">Admission:</strong> {programme.admission}
                  </p>
                ) : null}
                {programme.subjects ? (
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    {programme.subjects.map((subject) => (
                      <li key={subject} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                        {subject}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {programme.careers ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {programme.careers.map((career) => (
                      <span key={career} className="rounded-full bg-soft px-2.5 py-1 text-xs font-medium text-slate-700">
                        {career}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article key={course.id} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-bold text-primary">{course.name}</h3>
                  {course.badge ? (
                    <span className="shrink-0 rounded-full bg-accent/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                      {course.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> {course.duration} · {course.level}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  <strong className="text-primary">Eligibility:</strong> {course.eligibility}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  <strong className="text-primary">Careers:</strong> {course.careerProspects}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line p-8 text-center">
            <p className="text-sm text-slate-600">
              Course details for {institution.shortName} are shared on enquiry. Current areas of study:
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {institution.featuredCourses.map((area) => (
                <li key={area} className="rounded-full bg-soft px-3.5 py-1.5 text-sm font-semibold text-primary">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {site.admissionNotes ? (
          <div className="mt-8 rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-base font-bold text-primary">Admission notes</h3>
            <ul className="mt-3 space-y-2">
              {site.admissionNotes.map((note) => (
                <li key={note} className="flex gap-2.5 text-sm leading-6 text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      {/* Fee table */}
      {hasFeeTable && site.programmes ? (
        <Section id="fees" tone={nextTone()}>
          <SectionHeading eyebrow="Fee & seat intake" title="Fees and approved seats" description={site.feeNote} />
          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">{institution.shortName} fee and seat intake</caption>
              <thead className="bg-primary text-xs uppercase tracking-wider text-white">
                <tr>
                  {["Programme", "Duration", "Seats", "Fee", "Eligibility"].map((heading) => (
                    <th key={heading} scope="col" className="px-4 py-3 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {site.programmes.map((programme) => (
                  <tr key={programme.name} className="even:bg-soft/60">
                    <th scope="row" className="px-4 py-3 font-semibold text-primary">{programme.name}</th>
                    <td className="px-4 py-3 text-slate-600">{programme.duration}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{programme.seats}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-800">{programme.fee}</td>
                    <td className="px-4 py-3 text-slate-600">{programme.eligibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ) : null}

      {/* Labs */}
      {site.labs?.length ? (
        <Section id="labs" tone={nextTone()}>
          <SectionHeading eyebrow="Laboratories" title={`${site.labs.length} specialised labs`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {site.labs.map((lab) => (
              <div key={lab.name} className="rounded-xl border border-line bg-white p-5">
                <FlaskConical className="h-5 w-5 text-accent-dark" />
                <h3 className="mt-3 font-display text-base font-bold text-primary">{lab.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{lab.summary}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Library */}
      {site.library?.length ? (
        <Section id="library" tone={nextTone()}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading eyebrow="Library" title="Books, journals and digital resources" />
              <ul className="space-y-2.5">
                {site.libraryNotes?.map((note) => (
                  <li key={note} className="flex gap-2.5 text-sm leading-6 text-slate-600">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              {site.library.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-white p-6 text-center">
                  <dd className="font-display text-3xl font-bold text-primary">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-slate-500">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      ) : null}

      {/* Placements */}
      {site.placementNotes?.length ? (
        <Section id="placements" tone={nextTone()}>
          <SectionHeading
            eyebrow="Placement cell"
            title="Training & placement support"
            description="The placement cell coordinates with companies and students, and follows a transparent placement policy."
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.placementNotes.map((note) => (
              <li key={note} className="flex gap-2.5 rounded-xl border border-line bg-white p-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                {note}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Documents */}
      {site.documents?.length ? (
        <Section id="documents" tone={nextTone()}>
          <SectionHeading
            eyebrow="Mandatory disclosure"
            title="Approvals & official documents"
            description="Opens the document on the college's official website."
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:border-primary"
                >
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" />
                  <span className="flex-1 text-sm font-medium leading-6 text-slate-800 group-hover:text-primary">{doc.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Contact + sibling colleges */}
      <Section id="contact" tone={nextTone()}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow="Get in touch" title={`Contact ${institution.shortName}`} description={SITE_CONTACT.address} />
            <div className="grid gap-4 sm:grid-cols-2">
              {(site.contacts ?? []).map((person) => (
                <div key={`${person.name}-${person.role}`} className="rounded-xl border border-line bg-white p-5">
                  <p className="text-sm font-bold text-primary">{person.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">{person.role}</p>
                  {person.phone ? (
                    <a href={telHref(person.phone)} className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary">
                      <Phone className="h-4 w-4 text-accent-dark" /> {person.phone}
                    </a>
                  ) : null}
                  {person.email ? (
                    <a href={`mailto:${person.email}`} className="mt-1.5 flex items-center gap-2 break-all text-sm font-semibold text-slate-700 hover:text-primary">
                      <Mail className="h-4 w-4 shrink-0 text-accent-dark" /> {person.email}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
            {site.sourceUrl ? (
              <p className="mt-6 text-xs text-slate-500">
                Official college website:{" "}
                <a href={site.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline">
                  {site.sourceUrl.replace(/^https?:\/\//, "")}
                </a>
              </p>
            ) : null}
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-primary">Other NGI colleges</h3>
            <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
              {siblings.map((other) => (
                <li key={other.id}>
                  <Link href={`/${other.id}`} className="group flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-soft">
                    <span>
                      <span className="block text-sm font-bold text-primary">{other.shortName}</span>
                      <span className="block text-xs text-slate-500">{other.name}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-accent-dark" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand title={`Begin your journey at ${institution.shortName}.`} />
    </article>
  );
}
