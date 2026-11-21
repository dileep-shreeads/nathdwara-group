"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Clock,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Building2,
  ChevronRight,
  Filter,
  Sparkles,
  PhoneCall,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { FEATURED_COURSES } from "@/data/ngiData";
import EnquiryModal from "@/components/EnquiryModal";

const STREAMS = [
  "All",
  "Engineering",
  "Computer Applications",
  "Law",
  "Ayurveda Nursing",
  "Medical Sciences",
  "Pharmacy",
  "Life Sciences",
  "Management",
  "Teacher Education",
  "Basic Sciences",
  "Technical Trades",
];

const LEVELS = ["All", "UG", "PG", "Diploma", "Integrated", "Vocational"] as const;

const PROGRAM_FAQS = [
  {
    q: "Are the engineering programs approved by AICTE and RTU Kota?",
    a: "Yes. All B.Tech and Polytechnic programs at Nathdwara Institute of Engineering & Technology (NIET) are approved by AICTE, New Delhi and affiliated with Rajasthan Technical University (RTU), Kota.",
  },
  {
    q: "Can I take lateral entry into the 2nd year of B.Tech or Polytechnic?",
    a: "Yes, candidates who have completed a 3-year Diploma in Engineering or B.Sc. with Mathematics are eligible for direct lateral entry into the 2nd year (3rd semester) of B.Tech. ITI or 12th Science pass candidates can also take lateral entry into 2nd year Polytechnic.",
  },
  {
    q: "Are the law degrees approved by the Bar Council of India (BCI)?",
    a: "Yes. Nathdwara Law College (NLC) programs are recognized by the Bar Council of India (BCI) and affiliated with Mohanlal Sukhadia University (MLSU), Udaipur.",
  },
  {
    q: "How does the 4-Year Integrated B.Sc.-B.Ed. / BA-B.Ed. save a year?",
    a: "Traditionally, Graduation (3 years) + B.Ed. (2 years) takes 5 years. The Integrated ITEP course combines both degrees into a 4-year curriculum, saving one full academic year while qualifying graduates for school teacher examinations (REET / 2nd Grade / KVS).",
  },
  {
    q: "Are hostel and transportation facilities available for all course students?",
    a: "Yes. The NGI campus provides separate, fully secured boys' and girls' hostels with Wi-Fi, hygienic mess, and 24/7 wardens. Additionally, a fleet of college buses connects Udaipur, Nathdwara, Rajsamand, Kankroli, Mavli, and Fatehnagar.",
  },
];

export default function CourseDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredCourses = useMemo(() => {
    return FEATURED_COURSES.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.careerProspects.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.eligibility.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStream =
        selectedStream === "All" || course.stream === selectedStream;

      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesStream && matchesLevel;
    });
  }, [searchTerm, selectedStream, selectedLevel]);

  const handleApplyCourse = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search and Filters Strip */}
      <section className="bg-white border-b border-slate-200 sticky top-[76px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses, eligibility, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#102c52] focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Level Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 mr-1 hidden lg:inline-flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Level:
              </span>
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedLevel === lvl
                      ? "bg-[#102c52] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Stream Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
            {STREAMS.map((str) => (
              <button
                key={str}
                onClick={() => setSelectedStream(str)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStream === str
                    ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {str}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Count Bar */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              Showing {filteredCourses.length} Programs
            </span>
            {(selectedStream !== "All" || selectedLevel !== "All" || searchTerm) && (
              <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium border border-amber-200">
                Filtered
              </span>
            )}
          </div>
          {(selectedStream !== "All" || selectedLevel !== "All" || searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStream("All");
                setSelectedLevel("All");
              }}
              className="text-xs font-bold text-blue-900 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <article
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="p-6">
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#102c52] border border-blue-200">
                      {c.stream}
                    </span>
                    {c.badge && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-sm">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-bold text-[#102c52] group-hover:text-blue-700 transition-colors leading-snug">
                    {c.name}
                  </h3>

                  {/* Duration and Level */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-2.5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {c.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      {c.level} Degree
                    </span>
                  </div>

                  {/* Institution info */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-700 leading-tight">
                      {c.institution}
                    </span>
                  </div>

                  {/* Eligibility & Career Prospects */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Eligibility:</strong>{" "}
                        {c.eligibility}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <Briefcase className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Career Scope:</strong>{" "}
                        {c.careerProspects}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={handleApplyCourse}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/admissions?course=${encodeURIComponent(c.name)}`}
                    className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#102c52] font-semibold text-xs transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">No programs match your search</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Try adjusting your search keywords, clearing stream filters, or browse all courses.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStream("All");
                setSelectedLevel("All");
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-[#102c52] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Counselling & Assistance Banner */}
      <section className="bg-gradient-to-r from-[#102c52] to-[#1e4878] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Free Admission Guidance
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Unsure which program fits your career aspirations?
            </h3>
            <p className="text-sm text-slate-200 max-w-2xl">
              Talk directly with an experienced NGI academic counsellor to evaluate course eligibility, fee structures, scholarship schemes, and hostel accommodations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+919571345444"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 95713 45444</span>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              Request Call Back
            </button>
          </div>
        </div>
      </section>

      {/* Program FAQs Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-4 h-4" /> Academic Queries
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#102c52]">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Answers to common questions regarding affiliations, lateral entry, degrees, and hostel amenities.
          </p>
        </div>

        <div className="space-y-3">
          {PROGRAM_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#102c52] hover:text-blue-700"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}