"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";

interface HeroSlide {
  id: number;
  eyebrow: string;
  badgeIcon: React.ReactNode;
  heading: string;
  highlightText: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  primaryLink: string;
  secondaryLink: string;
  bgGradient: string;
  image: string;
  tag: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "WHERE EDUCATION MEETS INNOVATION",
    badgeIcon: <Award className="w-4 h-4 text-amber-400" />,
    heading: "Ancient Wisdom. Modern Technical Ingenuity.",
    highlightText: "One Campus.",
    description:
      "A 30-acre academic destination in Upali Oden, Nathdwara near Udaipur. Home to 6 premier constituent colleges offering 45+ AICTE, BCI, NCTE approved programs affiliated with RTU Kota and MLSU Udaipur.",
    primaryCta: "Explore Programmes",
    secondaryCta: "Constituent Colleges",
    primaryLink: "/programs",
    secondaryLink: "#colleges",
    bgGradient: "from-[#081329]/95 via-[#0b1b3d]/90 to-[#102a5c]/85",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=80",
    tag: "Estd. 2010 • 16+ Years Legacy",
  },
  {
    id: 2,
    eyebrow: "RTU KOTA & AICTE APPROVED ENGINEERING",
    badgeIcon: <Sparkles className="w-4 h-4 text-amber-400" />,
    heading: "Nathdwara Institute of Engineering & Technology",
    highlightText: "(NIET)",
    description:
      "Industry-focused B.Tech in Computer Science, Civil, Mechanical, and Electrical Engineering with modern computing labs, IoT and robotics workstations, and active corporate recruitment.",
    primaryCta: "Engineering Degrees",
    secondaryCta: "Advanced Labs",
    primaryLink: "/programs",
    secondaryLink: "/niet",
    bgGradient: "from-[#061024]/95 via-[#0b1f44]/90 to-[#0e2a5e]/85",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80",
    tag: "High Corporate Employability",
  },
  {
    id: 3,
    eyebrow: "MLSU UDAIPUR AFFILIATED • NIBM",
    badgeIcon: <BookOpen className="w-4 h-4 text-amber-400" />,
    heading: "Biotechnology, Computer Applications &",
    highlightText: "Science Programs",
    description:
      "Offering BCA, B.Sc. (Biotechnology, PCM, CBZ), BBA, and M.Sc. degrees at NIBM with 11+ dedicated molecular biology laboratories, CBCS curriculum, and 500+ computer workstations.",
    primaryCta: "BCA & Science Programmes",
    secondaryCta: "NIBM Profile",
    primaryLink: "/programs",
    secondaryLink: "/nibm",
    bgGradient: "from-[#07152b]/95 via-[#0b2447]/90 to-[#0d3468]/85",
    image: "/institutions/nibm-card.jpg",
    tag: "11+ Dedicated Labs & Smart Classes",
  },
  {
    id: 4,
    eyebrow: "CAREER PLACEMENTS & CORPORATE LINKAGES",
    badgeIcon: <TrendingUp className="w-4 h-4 text-amber-400" />,
    heading: "88.4% Placement Rate with Leading",
    highlightText: "National Recruiters",
    description:
      "Highest package ₹14.5 LPA. Regular on-campus drives with Wonder Cement, Secure Meters, TCS, Ambuja, Pyrotech, and top MNCs across Rajasthan and NCR.",
    primaryCta: "Admissions Open 2026",
    secondaryCta: "Placement Highlights",
    primaryLink: "/admissions",
    secondaryLink: "#placements",
    bgGradient: "from-[#081329]/95 via-[#0f2347]/90 to-[#0b1b3d]/85",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
    tag: "₹14.5 LPA Highest Package",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "B.Tech Computer Science & Engg",
  });

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-[#071328] text-white overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* Dark Navy / Indigo Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} backdrop-blur-[1px]`} />

      {/* Subtle Pattern Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column (KNU Style) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-amber-400/30 backdrop-blur-md shadow-sm">
              {slide.badgeIcon}
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-300">
                {slide.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.15] tracking-tight">
              {slide.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                {slide.highlightText}
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-200/95 max-w-2xl leading-relaxed">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={slide.primaryLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-[#071328] shadow-lg shadow-amber-500/25 transform hover:-translate-y-0.5 transition-all"
              >
                <span>{slide.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.secondaryLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all"
              >
                <span>{slide.secondaryCta}</span>
              </Link>
            </div>

            {/* Quick Stats Strip (KNU Key Facts) */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">16+</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Years Academic Legacy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">6</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Constituent Colleges</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">45+</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Approved Programmes</div>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">30+</div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Acres Green Campus</div>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Box (KNU University Application Style) */}
          <div className="lg:col-span-5" id="admissions-card">
            <div className="bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/50 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div>
                  <span className="inline-block text-[11px] font-extrabold tracking-wider uppercase text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md">
                    Admissions Open 2026-27
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1B3D] mt-1.5">
                    Fast-Track Admission Enquiry
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Govt. Approved
                  </span>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Enquiry Received!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our central admissions counselor will call you at <span className="font-semibold text-slate-900">{formData.phone}</span> shortly with seat status, fee concession and document requirements.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-[#0B1B3D] hover:text-amber-600 underline mt-2"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="mt-4 space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent text-slate-900 placeholder-slate-400 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent text-slate-900 placeholder-slate-400 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent text-slate-900 placeholder-slate-400 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Programme of Interest *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B1B3D] text-slate-900 bg-white"
                    >
                      <option>B.Tech Computer Science &amp; Engg (NIET)</option>
                      <option>B.Tech Civil Engineering (NIET)</option>
                      <option>B.Tech Mechanical / Electrical (NIET)</option>
                      <option>BCA - Computer Applications (NIBM)</option>
                      <option>B.Sc. Biotechnology (NIBM)</option>
                      <option>B.Sc. PCM / CBZ (NIBM)</option>
                      <option>M.Sc. Chemistry / Botany / Zoology (NIBM)</option>
                      <option>LL.B 3-Year Professional (NLC)</option>
                      <option>B.A. LL.B 5-Year Integrated (NLC)</option>
                      <option>D.Pharm Diploma in Pharmacy (VDSMS)</option>
                      <option>B.Sc. Nursing / GNM (NCAN)</option>
                      <option>B.Sc.-B.Ed. 4-Year Integrated (NIBM)</option>
                      <option>ITI Trades (Electrician / Fitter - NPITI)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-[#0B1B3D] hover:bg-[#122858] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Admission Enquiry"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
                  </button>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      100% Confidential
                    </span>
                    <Link
                      href="/admissions"
                      className="text-amber-600 hover:text-amber-700 font-semibold"
                    >
                      View Eligibility &rarr;
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Slide Indicators and Navigation Controls */}
        <div className="flex items-center justify-between pt-10 border-t border-white/10 mt-8">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? "w-8 h-2.5 bg-amber-400"
                    : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
