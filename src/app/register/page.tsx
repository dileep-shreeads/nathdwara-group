"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Network,
  Phone,
  School,
  Shield,
  User,
  Zap,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    college: "NIET",
    course: "B.Tech Computer Science & Engineering",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const coursesByCollege: Record<string, string[]> = {
    NIET: [
      "B.Tech Computer Science & Engineering",
      "B.Tech Artificial Intelligence & Data Science",
      "B.Tech Civil Engineering",
      "B.Tech Mechanical Engineering",
      "B.Tech Electrical Engineering",
      "Polytechnic Diploma in Mechanical",
      "Polytechnic Diploma in Civil",
    ],
    NIBM: [
      "BCA (Bachelor of Computer Applications)",
      "B.Sc. (PCM / BZC)",
      "ITEP B.Sc. B.Ed. (Secondary) — via NCET",
      "B.Sc. B.Ed. 4-Year Integrated — via PTET",
      "B.A. B.Ed. 4-Year Integrated — via PTET",
      "M.Sc. Mathematics (CBCS)",
      "M.Sc. Physics (CBCS)",
      "M.Sc. Chemistry (CBCS)",
      "M.Sc. Zoology (CBCS)",
    ],
    NLC: [
      "LL.B. 3-Year Degree (BCI Approved)",
    ],
    NCAN: [
      "B.Sc Ayurveda Nursing (4-Year)",
      "Diploma in Ayurvedic Pharmacy",
    ],
    VDSMS: [
      "DMLT (Diploma in Medical Lab Technology)",
      "Diploma in Radiation Technology",
    ],
    NPITI: [
      "NCVT Electrician Trade (2 Years)",
      "NCVT Fitter Trade (2 Years)",
    ],
  };

  const handleCollegeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const coll = e.target.value;
    setFormData((prev) => ({
      ...prev,
      college: coll,
      course: coursesByCollege[coll]?.[0] || "",
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full legal name.");
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const appId = `NGI-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      // Save user session
      try {
        localStorage.setItem(
          "ngi_student_session",
          JSON.stringify({
            name: formData.fullName,
            identifier: formData.email,
            role: "applicant",
            appId,
            college:
              formData.college === "NIET"
                ? "NIET — Engineering & Technology"
                : formData.college === "NIBM"
                ? "NIBM — Biotechnology & Management"
                : formData.college === "NLC"
                ? "NLC — Nathdwara Law College"
                : formData.college === "NCAN"
                ? "NCAN — Ayurveda Nursing"
                : formData.college === "VDSMS"
                ? "VDSMS — Medical Science"
                : "NPITI — Industrial Training",
            course: formData.course,
            year: "Session 2026–27",
            mobile: formData.mobile,
            email: formData.email,
          })
        );

        // Also add to inquiry list so it appears in dashboard inquiries
        const existingEnq = localStorage.getItem("ngi_enquiries_list");
        const list = existingEnq ? JSON.parse(existingEnq) : [];
        const newEnquiry = {
          id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
          name: formData.fullName,
          phone: formData.mobile,
          email: formData.email,
          course: formData.course,
          college: formData.college,
          state: "Rajasthan",
          status: "New",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
          source: "Student Portal Online Registration",
          notes: `App ID: ${appId} generated upon registration`,
        };
        localStorage.setItem("ngi_enquiries_list", JSON.stringify([newEnquiry, ...list]));
      } catch (err) {}

      setTimeout(() => {
        router.push("/dashboard?registered=true");
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Side: Frontend Navy Theme (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10 bg-brand-navy-dark border-r border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="flex items-center justify-center rounded-xl bg-white p-1 shadow-sm transition group-hover:scale-105">
                  <img
                    src="/ngi-logo.png"
                    alt="NGI Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="block font-black text-lg sm:text-xl text-white tracking-tight">
                    NATHDWARA <span className="text-amber-400">GROUP</span>
                  </span>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    ADMISSIONS 2026–27 REGISTRATION
                  </span>
                </div>
              </Link>

              <Link
                href="/"
                className="text-xs font-bold text-amber-300 hover:text-amber-200 transition flex items-center gap-1"
              >
                <span>&larr; Campus Home</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-[11px] font-black uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>ONLINE APPLICANT ONBOARDING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              Begin Your Journey with <br />
              <span className="text-amber-400">6 Premier Colleges</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
              Join 45+ degree &amp; technical programmes across engineering, management, biotechnology, law, and healthcare. Fast-track scholarship allocations and direct seat allotment for Session 2026–27.
            </p>

            <div className="space-y-3 max-w-xl">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Direct Quota &amp; REAP Allotment</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Automated application generation with instant confirmation for merit seats.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Centralized Student Dossier</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Track marksheet verifications, mentor assignments, and campus hostel booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">State &amp; National Scholarships</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Full assistance for Rajasthan Govt. post-matric scholarships &amp; merit fee concessions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-xs text-slate-400">
            &copy; 2026 Nathdwara Group of Institutions. Upali Oden, Nathdwara, Rajasthan.
          </div>
        </div>

        {/* Right Side: Clean White Floating Form Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-slate-900/90 relative">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-slate-800 border border-slate-100">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] tracking-tight">
                Create an account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Register for Academic Session 2026–27 at Nathdwara Group
              </p>
            </div>

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Account created successfully! Launching your dashboard...</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as per 10th marksheet)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="10-digit number"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* College & Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select College
                  </label>
                  <select
                    value={formData.college}
                    onChange={handleCollegeChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs font-bold text-slate-800 outline-none transition bg-white"
                  >
                    <option value="NIET">NIET (Engineering)</option>
                    <option value="NIBM">NIBM (Biotech &amp; IT)</option>
                    <option value="NLC">NLC (Law College)</option>
                    <option value="NCAN">NCAN (Ayurved Nursing)</option>
                    <option value="VDSMS">VDSMS (Medical Lab)</option>
                    <option value="NPITI">NPITI (ITI Trades)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Course
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs font-semibold text-slate-800 outline-none transition bg-white truncate"
                  >
                    {coursesByCollege[formData.college]?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs font-medium text-slate-900 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-xs font-medium text-slate-900 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Navy & Gold Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#0B1B3D] hover:bg-[#142e66] text-white font-bold text-sm shadow-lg shadow-blue-950/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <>
                    <span>Create Student Account</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-amber-600 hover:text-amber-700 hover:underline"
              >
                Sign In &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
