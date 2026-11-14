"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Award,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";

interface HeroSlide {
  id: number;
  badge: string;
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
}

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "PREMIER EDUCATIONAL GROUP • NATHDWARA, RAJASTHAN",
    badgeIcon: <Award className="w-4 h-4 text-amber-400" />,
    heading: "Empowering Futures with Quality Technical &",
    highlightText: "Professional Education",
    description:
      "Nathdwara Group of Institutions (NGI) in Upali Oden, Nathdwara (near Udaipur) offers career-driven programs in Engineering, Computer Applications, Sciences, Pharmacy, and Education affiliated with RTU Kota and MLSU Udaipur.",
    primaryCta: "Explore Admissions 2026",
    secondaryCta: "Campus Tour & Amenities",
    primaryLink: "#apply-section",
    secondaryLink: "#campus-facilities",
    bgGradient: "from-blue-950/95 via-blue-900/85 to-indigo-950/90",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    badge: "RTU KOTA & AICTE APPROVED ENGINEERING",
    badgeIcon: <Cpu className="w-4 h-4 text-sky-400" />,
    heading: "Nathdwara Institute of Engineering & Technology",
    highlightText: "(NIET)",
    description:
      "Modern technical education in B.Tech Computer Science, Civil, Mechanical, and Electrical Engineering with modern labs, robotics workstations, and practical engineering workshops.",
    primaryCta: "Engineering Courses",
    secondaryCta: "Workshops & Labs",
    primaryLink: "#courses",
    secondaryLink: "#campus-facilities",
    bgGradient: "from-slate-950/95 via-blue-950/85 to-cyan-950/90",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    badge: "MLSU UDAIPUR AFFILIATED • NIBM",
    badgeIcon: <BookOpen className="w-4 h-4 text-rose-400" />,
    heading: "Biotechnology, Computer Applications &",
    highlightText: "Science Programs",
    description:
      "Offering BCA, B.Sc. (Biotechnology, PCM, CBZ), BBA, and M.Sc. degrees at NIBM with dedicated molecular biology laboratories and 500+ computer workstation labs.",
    primaryCta: "BCA & Science Courses",
    secondaryCta: "Biotech Infrastructure",
    primaryLink: "#courses",
    secondaryLink: "#institutions",
    bgGradient: "from-blue-950/95 via-teal-950/85 to-slate-950/90",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    badge: "CAMPUS PLACEMENT EXCELLENCE",
    badgeIcon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
    heading: "Active Corporate Linkages & High",
    highlightText: "Industrial Employability",
    description:
      "T&P cell regularly hosts recruitment drives with Wonder Cement, Secure Meters, Pyrotech, TCS, Infosys, Ambuja, and leading core industries across Rajasthan and NCR.",
    primaryCta: "View Placement Records",
    secondaryCta: "Recruiter List",
    primaryLink: "#placements",
    secondaryLink: "#placements",
    bgGradient: "from-slate-950/95 via-indigo-950/85 to-blue-950/90",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
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
    category: "General",
  });

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
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
    }, 900);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden min-h-[620px] lg:min-h-[680px] flex items-center">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* Dark Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} backdrop-blur-[2px]`} />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide text-amber-300">
              {slide.badgeIcon}
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {slide.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                {slide.highlightText}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200/95 max-w-2xl leading-relaxed">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={slide.primaryLink}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all"
              >
                {slide.primaryCta} &rarr;
              </a>
              <a
                href={slide.secondaryLink}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all"
              >
                {slide.secondaryCta}
              </a>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">16+</div>
                <div className="text-xs text-slate-300">Years of Growth</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">6+</div>
                <div className="text-xs text-slate-300">Colleges &amp; Wings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">8,500+</div>
                <div className="text-xs text-slate-300">Students &amp; Alumni</div>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Box */}
          <div className="lg:col-span-5" id="apply-section">
            <div className="bg-white/95 text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/40 backdrop-blur-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Admissions Open 2026-27
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950 mt-1">
                    Direct Admission Enquiry
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    RTU / MLSU Approved
                  </span>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Enquiry Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you, <span className="font-semibold">{formData.name}</span>! Our Nathdwara admission office will call you at <span className="font-semibold">{formData.phone}</span> shortly with seat availability, fees &amp; scholarship schemes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-blue-700 underline mt-2"
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
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder-slate-400"
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
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder-slate-400"
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
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Program Interested In *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 bg-white"
                    >
                      <option>B.Tech Computer Science &amp; Engg</option>
                      <option>B.Tech Civil Engineering</option>
                      <option>B.Tech Mechanical / Electrical</option>
                      <option>BCA (Computer Applications)</option>
                      <option>B.Sc (Biotechnology / Science)</option>
                      <option>B.Pharm (Bachelor of Pharmacy)</option>
                      <option>D.Pharm (Diploma in Pharmacy)</option>
                      <option>B.Sc.-B.Ed. (4-Year Integrated)</option>
                      <option>BA-B.Ed. (4-Year Integrated)</option>
                      <option>Diploma in Engineering (Polytechnic)</option>
                      <option>MBA (Dual Specialization)</option>
                      <option>ITI Electrician / Fitter</option>
                    </select>
                  </div>

                  <p className="text-[10px] text-slate-500">
                    By submitting, you agree to receive official admission counseling, fee structure, and scholarship eligibility from NGI Nathdwara.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-900 to-indigo-950 text-white hover:from-blue-800 hover:to-indigo-900 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Connecting with Counselor...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Request Admission Call</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Slider Navigation Buttons */}
        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-2 transition-all rounded-full ${
                  currentSlide === index ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Accreditations Strip along Bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 border-t border-white/10 py-2.5 backdrop-blur-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-[11px] text-slate-300 overflow-x-auto gap-4">
          <span className="font-bold text-amber-400 uppercase tracking-wider whitespace-nowrap">
            Key Approvals &amp; Affiliations:
          </span>
          <span className="whitespace-nowrap font-medium">&bull; Rajasthan Technical University (RTU), Kota</span>
          <span className="whitespace-nowrap font-medium">&bull; Mohanlal Sukhadia University (MLSU), Udaipur</span>
          <span className="whitespace-nowrap font-medium">&bull; AICTE, New Delhi Approved</span>
          <span className="whitespace-nowrap font-medium">&bull; NCTE Approved Teacher Education</span>
          <span className="whitespace-nowrap font-medium">&bull; Pharmacy Council of India (PCI)</span>
          <span className="whitespace-nowrap font-medium">&bull; Board of Technical Education Rajasthan (BTER)</span>
          <span className="whitespace-nowrap font-medium">&bull; NCVT / DGT Govt. of India</span>
        </div>
      </div>
    </div>
  );
}
