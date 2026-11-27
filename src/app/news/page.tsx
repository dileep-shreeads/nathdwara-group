import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CtaBand, Section, SectionHeading } from "@/components/ui";
import { NEWS_ITEMS, type NewsItem } from "@/data/campusContent";

export const metadata: Metadata = {
  title: "News & Events | Nathdwara Group of Institutions",
  description:
    "Academic notices, recognitions and campus events from the colleges of the Nathdwara Group of Institutions.",
};

const CATEGORY_STYLE: Record<NewsItem["category"], string> = {
  Academic: "bg-primary text-white",
  Notice: "bg-rose-100 text-rose-800",
  Event: "bg-accent/25 text-primary",
};

export default function NewsPage() {
  const items = [...NEWS_ITEMS].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  const [featured, ...rest] = items;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News & events"
        description="Academic notices, new recognitions and campus activities from across the NGI colleges."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />

      <Section>
        <SectionHeading eyebrow="Latest" title="What's happening at NGI" />

        {featured ? (
          <article className="mb-8 grid gap-6 rounded-2xl bg-brand-gradient p-6 text-white md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
              <CalendarDays className="h-7 w-7 text-accent" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {featured.institution} · {featured.date}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">{featured.title}</h3>
              <p className="mt-2 text-sm text-white/75">{featured.summary}</p>
            </div>
            {featured.href ? (
              <a
                href={featured.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-primary hover:bg-accent-dark md:self-center"
              >
                Open <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </article>
        ) : null}

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => {
            const body = (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`rounded px-2 py-0.5 font-semibold ${CATEGORY_STYLE[item.category]}`}>{item.category}</span>
                  <span className="font-semibold text-slate-500">{item.institution}</span>
                </div>
                <time dateTime={item.isoDate} className="mt-4 block text-xs font-semibold uppercase tracking-wide text-accent-dark">
                  {item.date}
                </time>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                {item.href ? (
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
                    Read more <ArrowUpRight className="h-4 w-4" />
                  </span>
                ) : null}
              </>
            );
            return (
              <li key={`${item.isoDate}-${item.title}`}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col rounded-xl border border-line bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex h-full flex-col rounded-xl border border-line bg-white p-5">{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
