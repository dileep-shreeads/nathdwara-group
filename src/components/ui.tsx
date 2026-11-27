import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE_CONTACT, telHref } from "@/data/siteConfig";

export function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: "white" | "soft";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`overflow-x-clip py-12 md:py-16 ${tone === "soft" ? "bg-soft" : "bg-white"} ${className}`}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-8 md:mb-10 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-dark">
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-primary md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
      ) : null}
    </div>
  );
}

export function CtaBand({
  title = "Admissions for 2026-27 are open.",
  description = "Talk to our admission desk for eligibility, seats and scholarships across all six colleges.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-gradient text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-[0.06]" />
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:py-14 lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-accent-dark"
          >
            Apply now <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={telHref(SITE_CONTACT.admissionPhone)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" /> {SITE_CONTACT.admissionPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
