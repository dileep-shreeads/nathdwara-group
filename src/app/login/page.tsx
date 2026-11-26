"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  GitBranch,
  GraduationCap,
  Lock,
  Mail,
  Network,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("superadmin@ngi.edu.in");
  const [password, setPassword] = useState("Admin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogoutToast, setShowLogoutToast] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your registered email address or Application ID.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(
          "ngi_student_session",
          JSON.stringify({
            name: email.includes("admin") ? "Er. Rahul Joshi (Admin)" : "Aarav Sharma",
            identifier: email,
            role: email.includes("admin") ? "admin" : "applicant",
            appId: "NGI-2026-8492",
            college: "NIET — Nathdwara Institute of Engineering & Technology",
            course: "B.Tech Computer Science & Engineering",
            year: "Session 2026–27",
          })
        );
      } catch (err) {}
      router.push("/dashboard");
    }, 600);
  };

  const handleQuickDemo = (type: "admin" | "student") => {
    if (type === "admin") {
      setEmail("superadmin@ngi.edu.in");
      setPassword("Admin@2026");
    } else {
      setEmail("aarav.sharma@ngi.edu.in");
      setPassword("Student@2026");
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(
          "ngi_student_session",
          JSON.stringify({
            name: type === "admin" ? "Er. Rahul Joshi (Admin)" : "Aarav Sharma",
            identifier: type === "admin" ? "superadmin@ngi.edu.in" : "aarav.sharma@ngi.edu.in",
            role: type,
            appId: "NGI-2026-8492",
            college: "NIET — Nathdwara Institute of Engineering & Technology",
            course: "B.Tech Computer Science & Engineering",
            year: "Session 2026–27",
          })
        );
      } catch (err) {}
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Top Floating Toast Notification (Matching reference screenshot) */}
      {showLogoutToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Logged out successfully! Ready to sign in.</span>
          <button
            type="button"
            onClick={() => setShowLogoutToast(false)}
            className="ml-2 text-emerald-600 hover:text-emerald-900 text-xs font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Split-Screen Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-40px)]">
        {/* Left Side: Dark Hero with Red Accent & 4 Feature Cards (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10 bg-[#0B0F19] border-r border-[#151c2c]">
          <div>
            {/* Top Brand Logo */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="flex items-center justify-center rounded-xl bg-white/5 p-1 border border-white/10 group-hover:border-red-500/50 transition">
                  <img
                    src="/ngi-logo.png"
                    alt="NGI Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="block font-black text-lg sm:text-xl text-white tracking-tight">
                    NATHDWARA <span className="text-[#ea2e2e]">GROUP</span>
                  </span>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    ERP &bull; ADMISSION PORTAL
                  </span>
                </div>
              </Link>

              <Link
                href="/"
                className="text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1"
              >
                <span>&larr; Campus Home</span>
              </Link>
            </div>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181f33] border border-red-500/20 text-[#ea2e2e] text-[11px] font-black uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ea2e2e] animate-pulse" />
              <span>INTELLIGENT CAMPUS ERP PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              Transform Your <br />
              <span className="text-[#ea2e2e]">Academic Operations</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8">
              Streamline admissions, course assignments, digital document verification, and operations management. Built for students, faculty, and administration to work efficiently together.
            </p>

            {/* 4 Feature Stacked Cards (Matching reference screenshot) */}
            <div className="space-y-3 max-w-xl">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d] hover:border-red-500/30 transition">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Real-time Quoting &amp; Admissions</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Get instant merit ranking, fee estimates, and seat allocation with our AI-powered counseling engine.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d] hover:border-red-500/30 transition">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Student &amp; Job Management</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Manage applicant profiles, faculty advisors, exam schedules, and operations teams seamlessly.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d] hover:border-red-500/30 transition">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Analytics Dashboard</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Track enrollment performance, fee collection efficiency, and academic metrics in real-time.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d] hover:border-red-500/30 transition">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Secure Platform</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Enterprise-grade 256-bit SSL encryption with multi-factor authentication and role-based access control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 text-xs text-slate-500">
            &copy; 2026 Nathdwara Group of Institutions (NGI). All rights reserved.
          </div>
        </div>

        {/* Right Side: Clean White Floating Form Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-[#070b14] relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial from-red-600/5 via-transparent to-transparent pointer-events-none" />

          {/* White Floating Card (Exact match to reference screenshot) */}
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-slate-800 border border-slate-100">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Sign in to your NGI account to manage your operations
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="superadmin@ngi.edu.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#ea2e2e] focus:ring-2 focus:ring-[#ea2e2e]/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-[#ea2e2e] hover:text-red-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-[#ea2e2e] focus:ring-2 focus:ring-[#ea2e2e]/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Bold Red CTA Button (Matching screenshot) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#ea2e2e] hover:bg-[#d42525] text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
                Quick 1-Click Demo Login
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("admin")}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:border-[#ea2e2e] hover:bg-red-50/50 text-xs font-bold text-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ea2e2e]" />
                  <span>Admin Role</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("student")}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:border-[#ea2e2e] hover:bg-red-50/50 text-xs font-bold text-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#ea2e2e]" />
                  <span>Student Role</span>
                </button>
              </div>
            </div>

            {/* Register Prompt */}
            <div className="mt-5 text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#ea2e2e] hover:text-red-700 hover:underline"
              >
                Register for Admissions &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
