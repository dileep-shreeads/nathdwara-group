import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, ClipboardList, GraduationCap, Headset } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Admissions 2026–27 | Nathdwara Group of Institutions",
  description:
    "Explore the admission steps at Nathdwara Group of Institutions and contact the admissions team for course eligibility and guidance.",
};

const steps = [
  {
    icon: ClipboardList,
    title: "Explore programs",
    description: "Choose a course and institution that align with your interests and previous studies.",
  },
  {
    icon: Headset,
    title: "Speak with admissions",
    description: "Contact our team to confirm current eligibility, availability and the application process.",
  },
  {
    icon: GraduationCap,
    title: "Complete your application",
    description: "Prepare your academic documents and follow the instructions provided by the admissions office.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions · 2026–27"
        title="Your next chapter starts here."
        description="Take the first step towards studying at Nathdwara Group of Institutions. Explore your options and connect with our admissions team for guidance."
        image="/institutions/niet-card.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">How to get started</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52] sm:text-4xl">
            Three steps to move ahead.
          </h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <p className="text-xs font-black uppercase tracking-widest text-amber-700">Step 0{index + 1}</p>
              <span className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3f9] text-[#174879]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-[#102c52]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.85fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Before you apply</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52] sm:text-4xl">
              Get the details you need.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Requirements can vary by course and institution. Please confirm
              the latest admission criteria directly with the NGI admissions
              office before submitting an application.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Check the eligibility criteria for your chosen course.",
                "Keep your academic records and identity documents ready.",
                "Ask the admissions office about fees, scholarships and important dates.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-3xl bg-[#102c52] p-6 text-white sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-300">
              <Headset className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-2xl font-bold">Talk to our admissions team</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Get help with course selection and the application process.
            </p>
            <a href="tel:+919571345444" className="mt-6 block text-lg font-bold text-amber-300 hover:text-amber-200">
              +91 95713 45444
            </a>
            <a href="mailto:info@ngi.edu.in" className="mt-2 inline-block text-sm text-slate-200 hover:text-white">
              info@ngi.edu.in
            </a>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
