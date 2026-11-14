"use client";

import React from "react";
import {
  Compass,
  ShieldCheck,
  Building,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about-section" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background soft blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Campus Vision Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                alt="Nathdwara Group Campus Architecture"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-black/40 px-2.5 py-1 rounded backdrop-blur-sm">
                  LUSH GREEN MEWAR CAMPUS
                </span>
                <h4 className="text-xl font-bold mt-2 text-white">
                  Nathdwara Group of Institutions (NGI)
                </h4>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Upali Oden, Nathdwara, Rajsamand (Near Udaipur), Rajasthan.
                </p>
              </div>
            </div>

            {/* Overlapping Badge Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-xl">
                  16+
                </div>
                <div>
                  <div className="text-sm font-extrabold text-blue-950">
                    Years of Trust
                  </div>
                  <div className="text-xs text-slate-500">
                    Empowering 8,500+ Students &amp; Alumni
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-blue-700" />
                <span>About Nathdwara Group of Institutions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-950 leading-tight">
                Pioneering Professional &amp; Technical Education in{" "}
                <span className="text-blue-700">Mewar &amp; Rajasthan</span>
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              **Nathdwara Group of Institutions (NGI)** is located in the sacred holy town of Nathdwara (Upali Oden, Rajsamand), just 40 km from Udaipur, Rajasthan. Established with the visionary objective of providing career-oriented, high-quality technical and professional education, NGI has emerged as a premier educational conglomerate comprising **NIET**, **NIBM**, **SITE**, **Nathdwara College of Education**, **Nathdwara Institute of Pharmacy**, and **NGI ITI**.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Affiliated with **Rajasthan Technical University (RTU), Kota** for Engineering, **Mohanlal Sukhadia University (MLSU), Udaipur** for Computer Applications, Sciences and Commerce, and approved by **AICTE**, **NCTE**, and **PCI**, NGI blends academic rigor with industry-led practical training.
            </p>

            {/* Vision & Mission Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-slate-200/80">
                <Target className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Our Vision</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Value-based education leading to the all-round development of youth through career-driven, ethical learning.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-slate-200/80">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Our Mission</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Fostering essential technical skills and modern software proficiencies to maximize student employability.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-slate-200/80">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">University Affiliations</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    RTU Kota, MLSU Udaipur, BTER Jodhpur, Approved by AICTE, NCTE, and Pharmacy Council of India.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-slate-200/80">
                <Building className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Modern Aravali Campus</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Sprawling scenic campus with 500+ computer labs, DELNET library, engineering workshops &amp; bus facility.
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-3">
              <a
                href="#institutions"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Explore Constituent Colleges</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </a>
              <a
                href="#campus-facilities"
                className="text-xs font-bold text-blue-900 hover:text-blue-700 underline"
              >
                View Campus Facilities &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
