import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#102c52] bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(10, 30, 56, .94), rgba(16, 44, 82, .78) 58%, rgba(16, 44, 82, .48)), url("${image}")`,
      }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102c52]/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-sm">
            <span className="h-px w-8 bg-amber-300" />
            {eyebrow}
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Explore admissions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
