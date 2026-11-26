"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Network,
  Phone,
  Shield,
  Zap,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [identifier, setIdentifier] = useState("superadmin@ngi.edu.in");
  const [otp, setOtp] = useState(["5", "8", "2", "9", "4", "1"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your registered email address or mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setError("Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Redirect to Update Password page
      router.push(`/update-password?verified=true&account=${encodeURIComponent(identifier)}`);
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
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
                    ACCOUNT RECOVERY &bull; SECURITY
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
              <span>CONFIDENTIAL CREDENTIAL RECOVERY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              Recover Access to Your <br />
              <span className="text-[#ea2e2e]">Portal Account</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8">
              We protect institutional access with encrypted verification. Enter your registered email or phone to receive a single-use passcode and set a new password.
            </p>

            <div className="space-y-3 max-w-xl">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d]">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Instant OTP Verification</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    A secure 6-digit verification code is instantly dispatched to your verified communication channel.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#121826] border border-[#1d273d]">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Session Protection</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    All previous active sessions are automatically invalidated upon password reset to ensure account safety.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-xs text-slate-500">
            Helpline: +91 95713 45444 &bull; IT Support: support@ngi.edu.in
          </div>
        </div>

        {/* Right Side: Clean White Floating Form Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-[#070b14] relative">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-slate-800 border border-slate-100">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Forgot password?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {step === 1
                  ? "Enter your registered email or mobile to receive a reset code"
                  : "Enter the 6-digit OTP code sent to your account"}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address or Registered Mobile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="superadmin@ngi.edu.in"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#ea2e2e] focus:ring-2 focus:ring-[#ea2e2e]/10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#ea2e2e] hover:bg-[#d42525] text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending OTP...
                    </span>
                  ) : (
                    <>
                      <span>Send OTP Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="text-center">
                  <span className="text-xs text-slate-500">
                    OTP sent to <strong className="text-slate-800">{identifier}</strong>
                  </span>
                  <div className="mt-1 text-[11px] text-[#ea2e2e] font-bold">
                    (Auto-filled test code: 582941)
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-10 h-12 text-center text-lg font-black text-slate-900 border-2 border-slate-200 focus:border-[#ea2e2e] rounded-xl outline-none transition bg-slate-50 focus:bg-white"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#ea2e2e] hover:bg-[#d42525] text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <>
                      <span>Verify OTP &amp; Set New Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-xs text-slate-500">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-bold text-[#ea2e2e] hover:text-red-700 hover:underline"
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
