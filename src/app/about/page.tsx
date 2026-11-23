import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  GraduationCap,
  Lightbulb,
  Quote,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import StatsCounter from "@/components/StatsCounter";

export const metadata: Metadata = {
  title: "About Us | Nathdwara Group of Institutions (NGI)",
  description:
    "Learn about Nathdwara Group of Institutions (NGI), established in Upali Oden near Udaipur. Discover our leadership vision, affiliations with RTU Kota and MLSU Udaipur, 30-acre campus, and educational legacy.",
  keywords: [
    "About NGI Nathdwara",
    "Nathdwara Group history",
    "Deepesh Parikh NGI",
    "RTU affiliated college Nathdwara",
    "MLSU college Nathdwara",
    "Engineering and Law College Mewar",
  ],
};

const ACCREDITATIONS = [
  {
    name: "AICTE New Delhi",
    role: "Technical Approval",
    desc: "All B.Tech and Polytechnic programs are approved by the All India Council for Technical Education.",
  },
  {
    name: "RTU Kota",
    role: "University Affiliation",
    desc: "Engineering degrees are awarded by Rajasthan Technical University, Kota following state technical curricula.",
  },
  {
    name: "MLSU Udaipur",
    role: "University Affiliation",
    desc: "Degree programs in Computer Applications, Science, Management and Law are affiliated with Mohanlal Sukhadia University.",
  },
  {
    name: "Bar Council of India (BCI)",
    role: "Statutory Legal Body",
    desc: "Nathdwara Law College is recognized by BCI, qualifying graduates for enrollment as advocates in High Courts and District Courts.",
  },
  {
    name: "NCVT / DGT Govt. of India",
    role: "Vocational Certification",
    desc: "Industrial training trades in Electrician and Fitter are certified by the National Council for Vocational Training.",
  },
  {
    name: "Ayush & Paramedical Bodies",
    role: "Healthcare Recognitions",
    desc: "Nursing and medical diagnostic courses follow state and national regulatory standards for healthcare practitioners.",
  },
];

const TIMELINE = [
  {
    year: "2010",
    title: "Foundation of NIET",
    desc: "Establishment of Nathdwara Institute of Engineering & Technology (NIET) on a 30-acre scenic campus in Upali Oden, bringing modern technical education to Rajsamand.",
  },
  {
    year: "2013",
    title: "Expansion into Biotechnology & IT",
    desc: "Establishment of Nathdwara Institute of Biotechnology & Management (NIBM) affiliated with MLSU Udaipur, offering BCA, B.Sc Biotech, and M.Sc.",
  },
  {
    year: "2015",
    title: "Nathdwara Law College Established",
    desc: "Launch of NLC with approval from Bar Council of India, creating the premier legal education center in the Mewar region with active Moot Court facilities.",
  },
  {
    year: "2018",
    title: "Healthcare & Skill Development Wings",
    desc: "Inception of Nathdwara College of B.Sc. Ayurveda Nursing and Vallabh Darshan Society for Medical Science (VDSMS), integrating healthcare diagnostics and nursing.",
  },
  {
    year: "2021",
    title: "Integrated Teacher Education (ITEP)",
    desc: "Introduction of 4-Year Integrated B.Sc.-B.Ed. and BA-B.Ed. programs, saving students a full academic year while qualifying them for state and central school teaching roles.",
  },
  {
    year: "2026",
    title: "A Vibrant Multi-Faculty Campus",
    desc: "Over 8,500+ successful alumni, 120+ corporate recruiters, 500+ computing labs, and a fleet of buses connecting the entire southern Rajasthan region.",
  },
];

const PILLARS = [
  {
    icon: BookOpenCheck,
    title: "Academic Rigor & Purpose",
    description:
      "Deep theoretical foundations integrated with practical problem-solving that prepares students for university examinations and competitive tests.",
  },
  {
    icon: Lightbulb,
    title: "Hands-on Technical Mastery",
    description:
      "500+ computer systems, advanced machine shop, robotics, surveying, molecular biology, and clinical nursing labs ensure students learn by doing.",
  },
  {
    icon: UsersRound,
    title: "Inclusive & Value-Based Campus",
    description:
      "A welcoming community with generous scholarships, Beti Padhao girl-child incentives, and students from Rajasthan, Gujarat, MP, and northern states.",
  },
  {
    icon: GraduationCap,
    title: "High Industrial Employability",
    description:
      "Active Training & Placement Cell offering aptitude grooming, technical mock interviews, and direct campus recruitment with 120+ industrial leaders.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nathdwara Group of Institutions"
        title="A legacy of educational excellence in Mewar."
        description="NGI brings six premier institutions together in Upali Oden, Nathdwara — empowering over 8,500+ students and alumni across engineering, biotechnology, law, nursing, and vocational trades."
        image="/institutions/nibm-card.jpg"
      />

      <StatsCounter />

      {/* Group Story & Campus Vision */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            Our Journey &bull; Mewar, Rajasthan
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#102c52] sm:text-4xl">
            Education rooted in cultural values, engineered for tomorrow.
          </h2>
          <p className="mt-5 text-sm sm:text-base leading-7 text-slate-600">
            Located amidst the scenic Aravali hills in Upali Oden, Nathdwara (just 40 minutes from Udaipur), the Nathdwara Group of Institutions (NGI) has grown into one of southern Rajasthan&apos;s most respected educational clusters.
          </p>
          <p className="mt-4 text-sm sm:text-base leading-7 text-slate-600">
            Our campus brings together six specialist institutions: <strong>Nathdwara Institute of Engineering and Technology (NIET)</strong>, <strong>Nathdwara Institute of Biotechnology &amp; Management (NIBM)</strong>, <strong>Nathdwara Law College (NLC)</strong>, <strong>Nathdwara College of B.Sc. Ayurveda Nursing (NCAN)</strong>, <strong>Vallabh Darshan Society for Medical Science (VDSMS)</strong>, and <strong>Nathdwara Private ITI (NPITI)</strong>.
          </p>
          <p className="mt-4 text-sm sm:text-base leading-7 text-slate-600">
            With over 16+ years of academic service, our mission remains steadfast: providing accessible, high-quality, and career-oriented education that empowers students from all economic backgrounds to build purposeful lives.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/institutions"
              className="inline-flex items-center gap-2 rounded-xl bg-[#102c52] px-5 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-[#1d4b7f]"
            >
              Explore Constituent Colleges <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-100"
            >
              Admissions 2026–27
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-slate-900 shadow-2xl sm:min-h-[460px] border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
            alt="Nathdwara Group 30-acre campus surrounded by green hills"
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102c52] via-[#102c52]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              30+ Acre Aravali Campus
            </span>
            <p className="text-2xl font-bold">Upali Oden, Nathdwara</p>
            <p className="text-xs text-slate-200 max-w-sm">
              Wi-Fi enabled hi-tech campus, central library, boys&apos; &amp; girls&apos; hostels, cricket grounds, and daily bus fleet.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
              Visionary Leadership
            </span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              From the Leadership Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Guided by a commitment to societal upliftment, character building, and academic excellence.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Chairman's Message */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-xl">
              <div>
                <Quote className="w-10 h-10 text-amber-400 mb-4 opacity-75" />
                <p className="text-lg font-bold text-amber-300 italic mb-4">
                  &ldquo;The power of the future is the power of the mind.&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                  If mass production characterized the industrial revolution, individual creativity and brilliance marks the youth&apos;s revolution of this century. Development is no longer symbolized by imposing plants and machinery; instead knowledge is now universally recognized as the true strength of a nation.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                  It is important to be led by a set of agreed shared beliefs. At Nathdwara Group, we endeavor to shape graduates who carry technical knowledge and deep-rooted moral values to serve humanity.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-700">
                <div className="font-black text-white text-base">Chairman</div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Nathdwara Group of Institutions
                </div>
              </div>
            </div>

            {/* MD's Message */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-xl">
              <div>
                <Quote className="w-10 h-10 text-amber-400 mb-4 opacity-75" />
                <p className="text-lg font-bold text-amber-300 italic mb-4">
                  &ldquo;Education gives direction, purpose and values to life.&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Education is not limited to bookish knowledge but it is a tool that gives direction, purpose and values to life. Our institutions are committed to imparting quality, ethical, and professional education keeping this core principle in mind.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                  Our aim is to equip students with a positive attitude, professional skills and social responsibility so that they can not only build successful careers but also contribute to the development of our nation as responsible citizens. Let us join together and take this sacred endeavor of education to new heights.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-700">
                <div className="font-black text-white text-base">Mr. Deepesh Parikh</div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Managing Director &bull; Nathdwara Group of Institutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Approvals Showcase */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3 py-1 rounded-full inline-block mb-2">
              Recognitions &amp; University Ties
            </span>
            <h2 className="text-3xl font-black text-[#102c52] sm:text-4xl">
              Accreditations &amp; Statutory Approvals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every course at NGI is approved by relevant statutory regulatory councils and affiliated with premier government universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACCREDITATIONS.map((acc, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                    {acc.role}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#102c52] mt-2">{acc.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block mb-2">
              Key Milestones
            </span>
            <h2 className="text-3xl font-black text-[#102c52] sm:text-4xl">
              16+ Years of Growth &amp; Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From an initial engineering college to an integrated educational township in Nathdwara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-amber-400 hover:shadow-md transition-all"
              >
                <div className="text-2xl font-black text-amber-600 mb-1">{item.year}</div>
                <h3 className="text-base font-bold text-[#102c52]">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Institutional Pillars */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3 py-1 rounded-full inline-block mb-2">
              Our Core Values
            </span>
            <h2 className="text-3xl font-black text-[#102c52] sm:text-4xl">
              What Sets Nathdwara Group Apart
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800 mb-4">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Pillar 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-[#102c52]">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 border-t border-slate-200">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#102c52]">
            Ready to become a part of Nathdwara Group?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Admissions are actively open for the 2026–27 academic year.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 transition hover:bg-amber-300 shadow-sm"
          >
            Apply for Admission <Compass className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-100"
          >
            Contact Campus
          </Link>
        </div>
      </section>
    </>
  );
}