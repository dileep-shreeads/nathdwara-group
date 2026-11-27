import Link from "next/link";
import type { Metadata } from "next";
import {
  Award,
  Briefcase,
  Building,
  CheckCircle2,
  Globe,
  GraduationCap,
  Mail,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import PlacementsSection from "@/components/PlacementsSection";
import { PLACEMENT_PARTNERS, TESTIMONIALS } from "@/data/ngiData";

export const metadata: Metadata = {
  title: "Training & Placements | Nathdwara Group of Institutions (NGI)",
  description:
    "Explore placement records, top corporate recruiters, and career grooming at NGI Nathdwara. ₹14.5 LPA highest package, 120+ recruiting partners, and 88.4% placement rate.",
  keywords: [
    "NGI Nathdwara placements",
    "NIET placement packages",
    "Highest package engineering Nathdwara",
    "Wonder Cement campus drive NGI",
    "TCS placement Nathdwara",
    "Training and Placement Cell Rajasthan",
  ],
};

const PLACEMENT_METRICS = [
  {
    number: "₹14.5 LPA",
    label: "Highest Package",
    subtext: "Engineering & IT Sector",
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    number: "₹4.8 LPA",
    label: "Average Package",
    subtext: "Across Technical Streams",
    icon: Award,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    number: "120+",
    label: "Recruiting Partners",
    subtext: "MNCs & Core Industries",
    icon: Building,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    number: "88.4%",
    label: "Placement Rate",
    subtext: "Registered & Eligible Students",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    number: "30+",
    label: "Corporate MoUs",
    subtext: "Industrial Live Projects",
    icon: Globe,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    number: "500+",
    label: "Annual Internships",
    subtext: "Stipend & Pre-Placement Offers",
    icon: GraduationCap,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

const TRAINING_STAGES = [
  {
    stage: "Stage 01",
    title: "Foundational Soft Skills & Business Communication",
    desc: "English language proficiency, business etiquette, professional email correspondence, resume building, and public speaking workshops starting from the 2nd year.",
    points: [
      "Accent neutralization & spoken English lab sessions",
      "One-on-one resume critique & portfolio development",
      "Executive body language and boardroom etiquette",
    ],
  },
  {
    stage: "Stage 02",
    title: "Quantitative Aptitude & Logical Reasoning",
    desc: "Rigorous daily aptitude modules covering numerical ability, logical deduction, data interpretation, and verbal comprehension tested in industry recruitment patterns.",
    points: [
      "Company-specific aptitude test question banks (TCS, Infosys, Ambuja)",
      "Speed math & analytical shortcuts training",
      "Weekly computer-based mock aptitude assessments",
    ],
  },
  {
    stage: "Stage 03",
    title: "Technical Mastery & Hands-On Coding Camps",
    desc: "Domain-specific deep dives into data structures, algorithms, full-stack web, CAD/CAM, surveying, robotics, drafting, and industry-standard frameworks.",
    points: [
      "Live coding bootcamps for CS and IT candidates",
      "Practical workshops on Total Station, CNC machines & PCB design",
      "Hackathons judged by corporate technical leads",
    ],
  },
  {
    stage: "Stage 04",
    title: "Mock Interviews & On-Campus Recruitment Drives",
    desc: "Simulated technical interviews and HR rounds conducted by corporate HR veterans, followed by on-campus pool placement drives and virtual hiring rounds.",
    points: [
      "Video-recorded mock interviews with personalized feedback",
      "Stress management & group discussion (GD) simulations",
      "Dedicated hospitality & interview suites for visiting recruiters",
    ],
  },
];

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        eyebrow="TRAINING & PLACEMENT CELL (T&P) • NGI NATHDWARA"
        title="Empowering Careers with Industry-Ready Skills & National Placements."
        description="The active Training & Placement Cell at Nathdwara Group bridges classroom education with corporate leadership. Over 8,500+ successful alumni placed across core engineering, IT, legal, and healthcare industries."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Metrics Banner */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PLACEMENT_METRICS.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 text-center hover:shadow-md hover:bg-white transition-all flex flex-col items-center justify-between"
                >
                  <div className={`w-11 h-11 rounded-xl ${m.bg} ${m.color} flex items-center justify-center mb-3 shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#0B1B3D]">
                      {m.number}
                    </div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mt-1">
                      {m.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {m.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded Comprehensive Placements Section */}
      <PlacementsSection />

      {/* 4-Stage Placement Training Architecture */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3D] bg-blue-100 px-3.5 py-1 rounded-full inline-block mb-3">
              Corporate Grooming
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight">
              Our 4-Stage Career Preparation Framework
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              We start preparing students for their dream careers right from their early semesters through a systematic, multi-tiered grooming curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRAINING_STAGES.map((stage, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-2xl font-black text-amber-500">
                      {stage.stage}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                      NGI T&amp;P Module
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1B3D] mt-4">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {stage.desc}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {stage.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter Network Directory */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Corporate Associations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight">
              120+ Corporate Recruiters Trust NGI Graduates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Our students are actively hired by leading multinational corporations, core manufacturing plants, healthcare networks, and software companies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {PLACEMENT_PARTNERS.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-amber-50/60 p-4 rounded-2xl border border-slate-200/80 hover:border-amber-300 text-center transition-all duration-200 flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-xs font-black text-[#0B1B3D] mb-2 group-hover:scale-110 transition-transform">
                  {p.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-[#0B1B3D] line-clamp-1">
                  {p.name}
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Testimonials */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
              Career Trajectories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D]">
              Alumni Making Their Mark Nationally
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Hear directly from our graduates excelling across major software firms, infrastructure giants, and educational institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-xs"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0B1B3D]">{t.name}</div>
                    <div className="text-xs font-semibold text-amber-600">{t.role}</div>
                    <div className="text-[11px] text-slate-400">{t.institution} ({t.batch})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter Invitation & T&P Cell Contact Banner */}
      <section className="bg-gradient-to-r from-[#061024] via-[#0B1B3D] to-[#122858] text-white py-16 sm:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>INVITING CORPORATE RECRUITERS</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Partner with Nathdwara Group for Campus Hiring
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                We warmly invite corporate organizations, tech firms, core industries, and legal institutions to conduct on-campus or virtual recruitment drives. Our campus offers auditorium facilities, computer testing labs, and interview suites.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pool Campus Hosting Facilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>500+ Computer Lab for Online Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Dedicated Hospitality &amp; Guest House</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl p-7 rounded-3xl border border-white/20 shadow-2xl text-white space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <span>Contact Placement Cell</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our Training &amp; Placement Office to request the placement brochure, student demographics, or to schedule a recruitment drive date.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="tel:+919571345444" className="font-bold text-white hover:text-amber-300 transition">
                    +91 95713 45444 / +91 98292 34138
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="mailto:md@nathdwarainstitute.com" className="font-bold text-white hover:text-amber-300 transition">
                    md@nathdwarainstitute.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="w-full text-center py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md transition-all"
                >
                  Send Corporate Placement Enquiry &rarr;
                </Link>
                <Link
                  href="/admissions"
                  className="w-full text-center py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  Student Admissions Portal 2026
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
