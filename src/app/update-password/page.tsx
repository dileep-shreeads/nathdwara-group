"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Shield,
  ShieldCheck,
} from "lucide-react";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || password.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 1400);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Side: Dark Hero with Red Accent (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10 bg-[#0B0F19] border-r border-[#151c2c]">
          <div>
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
                    PASSWORD RECOVERY &bull; SECURITY
                  </span>
                </div>
              </Link>

              <Link
                href="/login"
                className="text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181f33] border border-red-500/20 text-[#ea2e2e] text-[11px] font-black uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ea2e2e] animate-pulse" />
              <span>AUTHENTICATION CREDENTIAL UPDATE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              Set Your New <br />
              <span className="text-[#ea2e2e]">Portal Password</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8">
              Please choose a strong, unique password to protect your student records, fees, and academic evaluations.
            </p>

            <div className="space-y-3 max-w-xl">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d]">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Minimum Security Criteria</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    At least 6 characters with a combination of letters, numbers, and symbols.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d]">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Immediate Activation</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Your new credentials will be active across all NGI mobile and web portal touchpoints immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-xs text-slate-500">
            &copy; 2026 Nathdwara Group of Institutions. All rights reserved.
          </div>
        </div>

        {/* Right Side: Clean White Floating Form Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-[#070b14] relative">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-slate-800 border border-slate-100">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Update Password
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your new confidential password to regain portal access
              </p>
            </div>

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password updated successfully! Redirecting to Sign In...</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-[#ea2e2e] focus:ring-2 focus:ring-[#ea2e2e]/10 text-sm font-medium text-slate-900 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#ea2e2e] focus:ring-2 focus:ring-[#ea2e2e]/10 text-sm font-medium text-slate-900 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#ea2e2e] hover:bg-[#d42525] text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Password...
                  </span>
                ) : (
                  <>
                    <span>Update Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              <Link
                href="/login"
                className="font-bold text-[#ea2e2e] hover:text-red-700 hover:underline"
              >
                &larr; Return to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
