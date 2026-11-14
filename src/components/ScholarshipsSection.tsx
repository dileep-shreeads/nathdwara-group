"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import { SCHOLARSHIPS } from "@/data/ngiData";

export default function ScholarshipsSection() {
  const [percentage, setPercentage] = useState<number>(85);
  const [stream, setStream] = useState<string>("engineering");

  // Approximate scholarship calculator logic
  const calculateEstimate = () => {
    if (percentage >= 90) return { waiver: "100%", scheme: "Rajasthan SJE / Super-Merit 100% Tuition Fee Exemption" };
    if (percentage >= 80) return { waiver: "50%", scheme: "NGI Board Merit Academic Scholarship" };
    if (percentage >= 70) return { waiver: "30%", scheme: "Shrinathji Need-Based / Early Bird Concession" };
    if (percentage >= 60) return { waiver: "20%", scheme: "Beti Padhao / Mewar Youth Incentive Award" };
    return { waiver: "15%", scheme: "General Academic Aid Scheme" };
  };

  const estimate = calculateEstimate();

  return (
    <section id="scholarships" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Financial Aid &bull; Govt. &amp; Merit Scholarships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Scholarships &amp; Fee Concessions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Committed to accessible higher education in Rajasthan. Benefit from Rajasthan State Government SJE schemes, board merit awards, and special girl child concessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scholarship Cards */}
          <div className="lg:col-span-7 space-y-4">
            {SCHOLARSHIPS.map((sch, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/40 rounded-2xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-900/80 text-blue-200">
                      {sch.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {sch.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                    {sch.criteria}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 bg-slate-900/60 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                  <div className="text-lg font-black text-amber-400">
                    {sch.waiver}
                  </div>
                  <span className="text-[10px] text-slate-400">As per Govt. / NGI norms</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Scholarship Calculator */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-slate-800 to-indigo-950 p-6 sm:p-7 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Fee Waiver Estimator
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Check Your Scholarship Eligibility
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Estimate your tuition fee concession based on 10th / 12th Board / Graduation marks.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <span>Qualifying Exam Score (RBSE/CBSE):</span>
                  <span className="text-amber-400 font-black text-base">{percentage}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50%</span>
                  <span>70%</span>
                  <span>85%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Target Degree / Program:
                </label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="engineering">B.Tech / Polytechnic Engineering</option>
                  <option value="bca">BCA / Computer Applications</option>
                  <option value="science">B.Sc / M.Sc Science Programs</option>
                  <option value="pharmacy">B.Pharm / D.Pharm Pharmacy</option>
                  <option value="bed">Integrated BA-B.Ed / B.Sc-B.Ed</option>
                  <option value="management">MBA (Management)</option>
                </select>
              </div>

              {/* Estimate Result Box */}
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-amber-400/30 text-center space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Estimated Eligible Concession:
                </div>
                <div className="text-3xl font-black text-amber-400">
                  {estimate.waiver} Tuition Waiver
                </div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{estimate.scheme}</span>
                </div>
              </div>

              <a
                href="#apply-section"
                className="w-full block text-center py-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg transition-colors"
              >
                Claim This Scholarship via Admission Desk &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
