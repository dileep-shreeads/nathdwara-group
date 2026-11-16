import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock3, GraduationCap } from "lucide-react";
import { FEATURED_COURSES } from "@/data/ngiData";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Courses & Programs | Nathdwara Group of Institutions",
  description:
    "Compare undergraduate, postgraduate, diploma and integrated courses offered by Nathdwara Group of Institutions.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs at NGI"
        title="Choose a course that moves you forward."
        description="From engineering and computer applications to pharmacy, science, management and education, find a program that matches your interests."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Explore programs</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52] sm:text-4xl">
            Find your next step.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Compare the study areas and course durations below. Contact our
            admissions team to confirm current availability and eligibility.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FEATURED_COURSES.map((course) => (
            <article
              key={course.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf3f9] text-[#174879]">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-800">
                  {course.level}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-[#102c52]">{course.name}</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">{course.stream}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock3 className="h-4 w-4 text-amber-700" />
                {course.duration}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Institution</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">{course.institution}</p>
              </div>
              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Eligibility</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{course.eligibility}</p>
              </div>
              <Link
                href="/admissions"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#174879] transition hover:text-amber-700"
              >
                Ask about this course <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl bg-[#102c52] px-6 py-8 text-white sm:px-9 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <GraduationCap className="mt-1 h-7 w-7 shrink-0 text-amber-300" />
            <div>
              <h2 className="text-xl font-bold">Need help choosing a course?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Our admissions team can help you compare options and understand the next steps.
              </p>
            </div>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 md:self-auto">
            Contact admissions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
