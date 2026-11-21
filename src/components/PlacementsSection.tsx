"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  Building,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";
import { PLACEMENT_PARTNERS } from "@/data/ngiData";

export default function PlacementsSection() {
  return (
    <section id="placements" className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-blue-700" />
            <span>Training &amp; Placement Cell &bull; NGI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Industry Placements &amp; Corporate Success
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            The active Training &amp; Placement Cell at Nathdwara Group of Institutions conducts extensive pre-placement training, technical grooming, and campus recruitment drives.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md text-center group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950">₹14.5 LPA</div>
            <div className="text-xs font-bold text-slate-700 uppercase mt-1">Highest Package</div>
            <div className="text-[11px] text-slate-500 mt-1">Tech &amp; Core Industries</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md text-center group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950">120+</div>
            <div className="text-xs font-bold text-slate-700 uppercase mt-1">Recruiting Partners</div>
            <div className="text-[11px] text-slate-500 mt-1">MNCs &amp; Industrial Giants</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md text-center group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950">88.4%</div>
            <div className="text-xs font-bold text-slate-700 uppercase mt-1">Placement Rate</div>
            <div className="text-[11px] text-slate-500 mt-1">Registered &amp; Eligible Candidates</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md text-center group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950">30+ MoUs</div>
            <div className="text-xs font-bold text-slate-700 uppercase mt-1">Industry Alliances</div>
            <div className="text-[11px] text-slate-500 mt-1">Internships &amp; Practical Training</div>
          </div>
        </div>

        {/* Corporate Recruiters Grid */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                PROMINENT RECRUITERS
              </span>
              <h3 className="text-xl font-bold text-blue-950">
                Top Companies Hiring From NGI Nathdwara
              </h3>
            </div>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors shrink-0"
            >
              <span>Placement Assistance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pt-6">
            {PLACEMENT_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/60 hover:border-blue-200 text-center transition-all duration-200 flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-950 font-black text-xs group-hover:scale-110 transition-transform mb-2 border border-slate-100">
                  {partner.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-blue-950">
                  {partner.name}
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
