import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  children,
}: PageHeroProps) {
  const crumbs: Crumb[] = breadcrumbs ?? [{ label: "Home", href: "/" }, { label: title }];

  return (
    <section className="relative isolate overflow-hidden bg-brand-gradient text-white">
      {image ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.18] mix-blend-luminosity"
          style={{ backgroundImage: `url("${image}")` }}
        />
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#4f7bf0]/20 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-[0.06]" />

      <div className="mx-auto max-w-[1320px] px-4 pb-12 pt-12 sm:px-6 md:pb-16 md:pt-16 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 md:text-sm">
            {crumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-white/40" /> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="underline-offset-4 hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-white" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-current" />
            {eyebrow}
          </span>
          <h1 className="mt-3 max-w-4xl text-balance font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            {description}
          </p>
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
