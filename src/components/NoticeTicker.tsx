"use client";

import React from "react";
import { Bell, Flame, ChevronRight } from "lucide-react";
import { LATEST_NEWS } from "@/data/ngiData";

export default function NoticeTicker() {
  return (
    <div className="bg-blue-950 text-white border-y border-blue-900/60 overflow-hidden py-2.5">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-xs whitespace-nowrap shadow-sm">
          <Flame className="w-4 h-4 text-slate-950 fill-current animate-bounce" />
          <span>LATEST UPDATES</span>
        </div>

        {/* Marquee Ticker */}
        <div className="relative flex-1 overflow-hidden whitespace-nowrap text-xs sm:text-sm">
          <div className="inline-flex items-center gap-8 animate-marquee">
            {LATEST_NEWS.concat(LATEST_NEWS).map((item, idx) => (
              <a
                key={idx}
                href="#courses"
                className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-amber-300 border border-white/10">
                  {item.category}
                </span>
                <span className="text-slate-200">{item.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Circulars Link */}
        <a
          href="#admissions"
          className="hidden md:flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold whitespace-nowrap underline"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>All Circulars</span>
        </a>
      </div>
    </div>
  );
}
