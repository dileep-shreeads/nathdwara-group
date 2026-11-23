"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Monitor,
  BookOpen,
  Wrench,
  FlaskConical,
  Home,
  Bus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CAMPUS_FACILITIES } from "@/data/ngiData";

export default function InfrastructureSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case "Monitor":
        return <Monitor className="w-5 h-5 text-blue-500" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-indigo-500" />;
      case "FlaskConical":
        return <FlaskConical className="w-5 h-5 text-rose-500" />;
      case "Home":
        return <Home className="w-5 h-5 text-emerald-500" />;
      case "Bus":
        return <Bus className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  const activeFacility = CAMPUS_FACILITIES[selectedIdx];

  return (
    <section id="campus-facilities" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Campus Infrastructure &bull; Upali Oden, Nathdwara</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            State-of-the-Art Learning &amp; Living Amenities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Set in the picturesque Aravali hills near Udaipur, NGI offers modern infrastructure to nurture technical ingenuity and personal development.
          </p>
        </div>

        {/* Interactive Facilities Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Facility Selection List */}
          <div className="lg:col-span-5 space-y-3">
            {CAMPUS_FACILITIES.map((facility, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex items-start gap-4 ${
                  selectedIdx === idx
                    ? "bg-white border-blue-600 shadow-xl scale-[1.02]"
                    : "bg-white/70 hover:bg-white border-slate-200/80 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedIdx === idx ? "bg-blue-50 shadow-inner" : "bg-slate-100"
                  }`}
                >
                  {getFacilityIcon(facility.iconName)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                      {facility.tagline}
                    </span>
                    {selectedIdx === idx && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    {facility.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Facility Detailed Preview Banner */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border-4 border-white group">
              <img
                src={activeFacility.image}
                alt={activeFacility.title}
                className="w-full h-[450px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Tag overlay */}
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                  {activeFacility.tagline}
                </span>
              </div>

              {/* Text content at bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeFacility.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed max-w-xl">
                  {activeFacility.description}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-colors"
                  >
                    <span>Visit Our Campus</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/institutions"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white underline"
                  >
                    <span>Explore Constituent Institutes</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
