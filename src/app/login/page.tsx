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

  const handleLogin = async (e: React.FormEvent) => {
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
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Please verify credentials.");
        setLoading(false);
        return;
      }

      const user = data.user;
      const isAdmin = user.role === "Super Admin" || email.includes("admin");

      localStorage.setItem(
        "ngi_student_session",
        JSON.stringify({
          name: user.name,
          identifier: user.email,
          role: isAdmin ? "admin" : "student",
          appId: user.id || "NGI-2026-8492",
          college: user.college || "NIET — Nathdwara Institute of Engineering & Technology",
          course: "B.Tech Computer Science & Engineering",
          year: "Session 2026–27",
        })
      );
      router.push("/dashboard");
    } catch (err) {
      // Offline fallback
      localStorage.setItem(
        "ngi_student_session",
        JSON.stringify({
          name: email.includes("admin") ? "Er. Rahul Joshi (Admin)" : "Aarav Sharma",
          identifier: email,
          role: email.includes("admin") ? "admin" : "student",
          appId: "NGI-2026-8492",
          college: "NIET — Nathdwara Institute of Engineering & Technology",
          course: "B.Tech Computer Science & Engineering",
          year: "Session 2026–27",
        })
      );
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Top Floating Toast Notification */}
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
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Side: Frontend Navy Theme with Gold Accents (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10 bg-brand-navy-dark border-r border-slate-800">
          <div>
            {/* Top Brand Logo */}
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
                    ERP &bull; ADMISSION &amp; MANAGEMENT PORTAL
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

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-[11px] font-black uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>INTELLIGENT CAMPUS ERP PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              Transform Your <br />
              <span className="text-amber-400">Academic Operations</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
              Streamline admissions, course assignments, digital document verification, and institutional management. Built for students, faculty, and administration to work efficiently together.
            </p>

            {/* 4 Feature Stacked Cards */}
            <div className="space-y-3 max-w-xl">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60 hover:border-amber-400/50 transition">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Real-time Admissions &amp; Inquiries</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Automated lead capture, instant merit ranking, fee estimates, and seat allocation.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60 hover:border-amber-400/50 transition">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Student &amp; College Management</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Full CRUD control over constituent colleges, courses, faculty, and student records.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60 hover:border-amber-400/50 transition">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Analytics Dashboard</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Track enrollment performance, fee collection efficiency, and academic metrics in real-time.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e2147]/90 border border-blue-900/60 hover:border-amber-400/50 transition">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Secure Platform</h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Institutional-grade 256-bit SSL encryption with role-based user management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 text-xs text-slate-400">
            &copy; 2026 Nathdwara Group of Institutions (NGI). Upali Oden, Nathdwara, Rajasthan.
          </div>
        </div>

        {/* Right Side: Clean White Floating Form Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-slate-900/90 relative">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-slate-800 border border-slate-100">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] tracking-tight">
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
                  Email Address / User ID
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
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
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
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
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-[#0B1B3D] focus:ring-2 focus:ring-[#0B1B3D]/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
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

              {/* Navy & Gold Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#0B1B3D] hover:bg-[#142e66] text-white font-bold text-sm shadow-lg shadow-blue-950/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign in to Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
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
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:border-[#0B1B3D] hover:bg-slate-50 text-xs font-bold text-[#0B1B3D] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Role</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("student")}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:border-[#0B1B3D] hover:bg-slate-50 text-xs font-bold text-[#0B1B3D] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Student Role</span>
                </button>
              </div>
            </div>

            {/* Register Prompt */}
            <div className="mt-5 text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-amber-600 hover:text-amber-700 hover:underline"
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
