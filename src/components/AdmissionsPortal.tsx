"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  Headset,
  PhoneCall,
  Send,
  ShieldCheck,
  Calculator,
  Sparkles,
  Clock,
} from "lucide-react";
import { FEATURED_COURSES } from "@/data/ngiData";

const QUALIFICATIONS = [
  { id: "10th", label: "10th Standard (Matriculation)" },
  { id: "12th-pcm", label: "12th Standard Science (PCM - Math)" },
  { id: "12th-pcb", label: "12th Standard Science (PCB - Biology)" },
  { id: "12th-other", label: "12th Standard (Arts / Commerce / Agriculture)" },
  { id: "grad", label: "Graduation (B.A. / B.Sc. / B.Com / Other)" },
];

const ADMISSION_DATES = [
  { event: "Online Registration & Fast-Track Application", date: "Open for 2026–27", status: "Active Now" },
  { event: "REAP Rajasthan B.Tech Counselling Registration", date: "June – July 2026", status: "Upcoming" },
  { event: "PTET Rajasthan 4-Year B.Ed Counselling", date: "June – August 2026", status: "Upcoming" },
  { event: "Direct Institutional Merit Round (Phase 1)", date: "Ongoing Admissions", status: "Filling Fast" },
  { event: "Rajasthan SJE Scholarship Application Portal", date: "August – October 2026", status: "Upcoming" },
  { event: "Orientation & Academic Session Commencement", date: "August 2026", status: "Upcoming" },
];

const DOCUMENTS_REQUIRED = [
  "10th Class Marksheet & Passing Certificate (Original + 3 Photocopies)",
  "12th Class Marksheet / Intermediate Certificate (Original + 3 Photocopies)",
  "Graduation Marksheet (All semesters/years for PG/Law candidates)",
  "Transfer Certificate (T.C.) & Character Certificate from previous school/college",
  "Migration Certificate (for non-RBSE / other university students)",
  "Aadhaar Card (Candidate & Parents)",
  "Recent Passport Size Color Photographs (6 copies)",
  "Domicile / Bonafide Certificate of Rajasthan (if applicable for scholarship)",
  "Caste / Category Certificate (SC/ST/OBC/EWS - valid certificate)",
  "Income Certificate (for SJE government scholarship applicants)",
];

export default function AdmissionsPortal() {
  const [selectedQual, setSelectedQual] = useState("12th-pcm");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appRef, setAppRef] = useState("NGI-2026-882194");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "Rajasthan (Nathdwara / Udaipur / Rajsamand)",
    qualification: "12th Standard Science (PCM)",
    percentage: "",
    course: "B.Tech Computer Science & Engineering",
    hostel: "No",
    transport: "No",
  });

  // Filter courses based on user qualification in the Eligibility Checker
  const matchedCourses = React.useMemo(() => {
    switch (selectedQual) {
      case "10th":
        return FEATURED_COURSES.filter(
          (c) => c.level === "Diploma" || c.level === "Vocational"
        );
      case "12th-pcm":
        return FEATURED_COURSES.filter(
          (c) =>
            c.stream === "Engineering" ||
            c.stream === "Computer Applications" ||
            c.stream === "Teacher Education" ||
            c.stream === "Pharmacy" ||
            c.stream === "Basic Sciences" ||
            c.level === "Diploma"
        );
      case "12th-pcb":
        return FEATURED_COURSES.filter(
          (c) =>
            c.stream === "Ayurveda Nursing" ||
            c.stream === "Medical Sciences" ||
            c.stream === "Pharmacy" ||
            c.stream === "Life Sciences" ||
            c.stream === "Computer Applications" ||
            c.stream === "Teacher Education"
        );
      case "12th-other":
        return FEATURED_COURSES.filter(
          (c) =>
            c.id === "c-bca" ||
            c.id === "c-ba-bed" ||
            c.id === "c-ba-llb" ||
            c.stream === "Vocational" ||
            c.stream === "Management"
        );
      case "grad":
        return FEATURED_COURSES.filter(
          (c) => c.level === "PG" || c.id === "c-llb"
        );
      default:
        return FEATURED_COURSES.slice(0, 6);
    }
  }, [selectedQual]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomCode = "NGI-2026-" + Math.floor(100000 + Math.random() * 900000);
    setAppRef(randomCode);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80">
            <span className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
              <ClipboardCheck className="w-6 h-6" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Phase 1 Open
            </span>
            <h3 className="text-xl font-bold text-[#102c52] mt-2">
              Direct Spot Admissions
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Merit-based direct seat allotment is open for 2026–27 session across B.Tech, BCA, Law, Nursing, Pharmacy, Integrated B.Ed, and Polytechnic.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80">
            <span className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Govt &amp; NGI Aid
            </span>
            <h3 className="text-xl font-bold text-[#102c52] mt-2">
              Scholarships &amp; Waivers
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Up to 100% tuition assistance under Rajasthan SJE Post-Matric scheme, plus Beti Padhao girl child concessions and board merit awards.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80">
            <span className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Headset className="w-6 h-6" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Helpline Desk
            </span>
            <h3 className="text-xl font-bold text-[#102c52] mt-2">
              Counseling Assistance
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Our central admission team helps students verify eligibility, compare streams, check fee structures, and plan campus visits.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Key Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Fast Track Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-slate-200" id="apply">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  Official Application Portal
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#102c52] mt-2">
                  Fast-Track Admission Enquiry 2026–27
                </h2>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#102c52]">Application Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your enquiry for <strong className="text-slate-900">{formData.course}</strong> has been logged. An official admission officer will contact you at <strong className="text-slate-900">{formData.phone}</strong> with seat eligibility, fees, and scholarship details.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-1.5">
                  <div><strong>Application Ref:</strong> {appRef}</div>
                  <div><strong>Selected Course:</strong> {formData.course}</div>
                  <div><strong>Location:</strong> Upali Oden, Nathdwara Campus</div>
                  <div><strong>Helpline:</strong> +91 95713 45444</div>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 px-6 py-2.5 rounded-xl bg-[#102c52] text-white font-bold text-xs hover:bg-[#1d4b7f]"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter candidate name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Candidate State / Region
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    >
                      <option>Rajasthan (Nathdwara / Udaipur / Rajsamand)</option>
                      <option>Rajasthan (Jaipur / Jodhpur / Kota / Other)</option>
                      <option>Gujarat (Ahmedabad / Surat / Himatnagar / Other)</option>
                      <option>Madhya Pradesh</option>
                      <option>Delhi / NCR / Northern States</option>
                      <option>Other State</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      10th / 12th / Grad Score (%)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 78% or CGPA 8.2"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Program Interested In *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                  >
                    {FEATURED_COURSES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.level} - {c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Need Hostel Accommodation?
                    </label>
                    <div className="flex gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="hostel"
                          value="Yes"
                          checked={formData.hostel === "Yes"}
                          onChange={() => setFormData({ ...formData, hostel: "Yes" })}
                          className="accent-[#102c52]"
                        />
                        Yes, need hostel
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="hostel"
                          value="No"
                          checked={formData.hostel === "No"}
                          onChange={() => setFormData({ ...formData, hostel: "No" })}
                          className="accent-[#102c52]"
                        />
                        No (Day Scholar)
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Need College Bus Transport?
                    </label>
                    <div className="flex gap-4 text-xs font-semibold text-slate-700 pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="transport"
                          value="Yes"
                          checked={formData.transport === "Yes"}
                          onChange={() => setFormData({ ...formData, transport: "Yes" })}
                          className="accent-[#102c52]"
                        />
                        Yes (Udaipur/Mavli routes)
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="transport"
                          value="No"
                          checked={formData.transport === "No"}
                          onChange={() => setFormData({ ...formData, transport: "No" })}
                          className="accent-[#102c52]"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>No registration fee is charged for this preliminary counselling and eligibility verification.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Fast-Track Application</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Deadlines and Admission Counseling Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* Admissions Helpline Box */}
            <div className="bg-[#102c52] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                <Headset className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-bold">Admissions Helpdesk</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with our admissions counsellors in Nathdwara for instant guidance on eligibility, fees, bus routes, and hostel bookings.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="tel:+919571345444"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl text-white transition-colors text-sm font-semibold"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>+91 95713 45444 (Direct Desk)</span>
                </a>
                <a
                  href="tel:+919829234138"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl text-white transition-colors text-sm font-semibold"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>+91 98292 34138 (Secretary Office)</span>
                </a>
                <a
                  href="mailto:info@ngi.edu.in"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl text-white transition-colors text-sm font-semibold"
                >
                  <span className="w-4 h-4 text-amber-300">@</span>
                  <span>info@ngi.edu.in</span>
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 text-xs text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Office Hours: Monday – Saturday (9:00 AM – 5:00 PM)</span>
              </div>
            </div>

            {/* Key Dates Schedule */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
                <Calendar className="w-4 h-4" />
                <span>Admission Timeline · 2026–27</span>
              </div>
              <h3 className="text-lg font-bold text-[#102c52] mb-4">
                Important Dates &amp; Rounds
              </h3>
              <div className="space-y-3">
                {ADMISSION_DATES.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">{item.event}</div>
                      <div className="text-slate-500 mt-0.5">{item.date}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 shrink-0 ml-2">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Eligibility Checker */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Instant Course Matcher</span>
            </div>
            <h2 className="text-3xl font-black text-[#102c52]">
              Check Your Eligibility in 1 Click
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your highest educational qualification below to discover every degree and diploma course you can enrol in at Nathdwara Group.
            </p>
          </div>

          {/* Qualification Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {QUALIFICATIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelectedQual(q.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedQual === q.id
                    ? "bg-[#102c52] text-amber-300 shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Matched Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                    <span className="text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                      {course.stream}
                    </span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    <strong>Eligibility:</strong> {course.eligibility}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[160px]">
                    {course.institution}
                  </span>
                  <a
                    href="#apply"
                    onClick={() => setFormData({ ...formData, course: course.name })}
                    className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1"
                  >
                    <span>Apply</span> &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Admissions Procedure Flowchart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block mb-2">
            Clear &amp; Transparent
          </div>
          <h2 className="text-3xl font-black text-[#102c52]">
            Step-by-Step Admission Procedure
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            How to secure your seat at Nathdwara Group of Institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
              Step 01
            </span>
            <h3 className="text-lg font-bold text-[#102c52] mt-4">Program Selection</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Explore our 25+ degree programs and verify eligibility requirements for your preferred discipline with an admission counselor.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
              Step 02
            </span>
            <h3 className="text-lg font-bold text-[#102c52] mt-4">Form Submission</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Submit the online fast-track form on this website or obtain an application prospectus directly from the campus admission office.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
              Step 03
            </span>
            <h3 className="text-lg font-bold text-[#102c52] mt-4">Document Verification</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Submit your academic transcripts, Aadhaar card, certificates, and photographs for academic verification and scholarship sanction.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              Step 04
            </span>
            <h3 className="text-lg font-bold text-[#102c52] mt-4">Seat Confirmation</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Pay the provisional admission fee, confirm hostel/bus slot if needed, receive your enrollment kit and attend the induction ceremony!
            </p>
          </div>
        </div>
      </section>

      {/* Documents Required Checklist */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Checklist for Applicants
              </span>
              <h2 className="text-3xl font-black text-white leading-tight">
                Documents Required for Admission Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Please keep original and attested photocopies ready at the time of counseling and enrollment. Scanned copies can be emailed to the admission office for pre-verification.
              </p>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-xs text-slate-300">
                <span className="text-amber-400 font-bold block mb-1">Scholarship Applicants Note:</span>
                Students applying for Rajasthan State SJE Post-Matric scholarship must provide a valid Income Certificate and original Caste Certificate.
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOCUMENTS_REQUIRED.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}