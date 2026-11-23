"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building,
  CheckCircle2,
  Compass,
  GraduationCap,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Target,
    title: "Our Vision",
    description:
      "To be an internationally acclaimed educational group in southern Rajasthan fostering ethical values, technical competence, and scientific temper.",
    badge: "Core Vision",
  },
  {
    icon: Sparkles,
    title: "Our Mission",
    description:
      "Empowering students from rural and urban backgrounds through affordable, high-quality professional education, state-of-the-art laboratories, and industry partnerships.",
    badge: "Core Mission",
  },
  {
    icon: ShieldCheck,
    title: "University Affiliations",
    description:
      "All degree courses strictly affiliated with Rajasthan Technical University (RTU Kota) and Mohanlal Sukhadia University (MLSU Udaipur) with approved CBCS grading.",
    badge: "RTU & MLSU",
  },
  {
    icon: Award,
    title: "Statutory Approvals",
    description:
      "Approved and recognized by AICTE New Delhi, Bar Council of India (BCI), National Council for Teacher Education (NCTE), and Pharmacy Council of India (PCI).",
    badge: "Govt. Accredited",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-24 border-b border-slate-200"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Campus Image Showcase & Stat Pill */}
          <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-[#0B1B3D]">
            <img
              src="/institutions/niet-card.jpg"
              alt="Nathdwara Group of Institutions Campus"
              className="absolute inset-0 h-full w-full object-cover object-center brightness-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/95 via-[#0B1B3D]/30 to-transparent" />
            
            {/* Top Badge */}
            <div className="absolute top-5 left-5 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-lg border border-white/60">
              <span className="text-2xl font-black text-[#0B1B3D] leading-none block">
                16+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-0.5 block">
                Years of Legacy
              </span>
            </div>

            {/* Bottom Caption Card */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
              <span className="inline-flex rounded-md bg-amber-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#071328]">
                Nathdwara · Rajasthan
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-black leading-snug">
                One Campus. Six Colleges. Endless Possibilities.
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                A 30-acre academic township in Upali Oden, Nathdwara (near Udaipur), offering modern engineering, sciences, law, pharmacy, and management.
              </p>
            </div>
          </div>

          {/* Right Column: About Content matching KNU's Legacy presentation */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100/80 border border-blue-200/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B1B3D]">
              <Compass className="h-3.5 w-3.5 text-amber-500" />
              <span>ABOUT NATHDWARA GROUP OF INSTITUTIONS</span>
            </div>
            
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#0B1B3D] sm:text-4xl lg:text-5xl">
              Rooted in Mewar’s Heritage, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Committed to Future Excellence.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              Established in 2010 under the visionary aegis of the governing trust, Nathdwara Group of Institutions (NGI) has evolved into one of southern Rajasthan&apos;s most respected educational clusters. Situated in Upali Oden, Nathdwara, the group hosts six constituent colleges imparting education to over 2,500 active students.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              With degrees awarded by RTU Kota and MLSU Udaipur, curriculum aligned with the National Education Policy (NEP 2020), and approvals from apex regulatory bodies (AICTE, BCI, NCTE, PCI), students gain nationally recognized qualifications coupled with extensive laboratory practice and corporate exposure.
            </p>

            {/* Highlights Grid */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, description, badge }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon className="h-4.5 w-4.5 text-[#0B1B3D]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0B1B3D] mt-1">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>

            {/* CTA action */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B1B3D] hover:bg-[#122858] text-white px-6 py-3 text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Read Full Institutional Profile &amp; Governance</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/contact"
                className="text-xs font-bold text-slate-700 hover:text-[#0B1B3D] underline"
              >
                Locate Campus in Nathdwara &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
