"use client";

import React from "react";
import { MessageSquareQuote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/ngiData";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-blue-700" />
            <span>Alumni Voices &bull; NGI Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Hear from Our Successful Alumni
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Over 8,500+ successful graduates making their mark in leading software companies, educational institutions, government services, and core engineering industries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-blue-950">{t.name}</h4>
                  <div className="text-xs font-semibold text-amber-600">{t.role}</div>
                  <div className="text-[11px] text-slate-400">{t.institution} ({t.batch})</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
