"use client";

import React from "react";
import {
  Award,
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  Trees,
} from "lucide-react";
import { NGI_STATS } from "@/data/ngiData";

export default function StatsCounter() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-6 h-6 text-amber-500" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-indigo-600" />;
      case "Users":
        return <Users className="w-6 h-6 text-emerald-600" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6 text-amber-600" />;
      case "TreePine":
        return <Trees className="w-6 h-6 text-emerald-500" />;
      default:
        return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {NGI_STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center p-3 group transition-transform hover:-translate-y-1 ${
                idx > 0 ? "pt-5 lg:pt-0" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                {getIcon(stat.iconName)}
              </div>
              <div className="text-3xl lg:text-4xl font-black text-blue-950 tracking-tight">
                {stat.number}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
