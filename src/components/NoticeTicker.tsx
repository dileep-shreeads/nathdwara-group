"use client";

import React from "react";
import Link from "next/link";
import { Bell, Flame, ChevronRight, ArrowUpRight } from "lucide-react";
import { LATEST_NEWS } from "@/data/ngiData";

export default function NoticeTicker() {
  return (
    <div className="bg-[#0B1B3D] text-white border-y border-[#182e5c] overflow-hidden py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-amber-400 text-[#071328] font-black text-[11px] sm:text-xs whitespace-nowrap shadow-sm shrink-0">
          <Flame className="w-3.5 h-3.5 text-[#071328] fill-current animate-bounce" />
          <span className="tracking-wide hidden sm:inline">LATEST NOTICES &amp; HAPPENINGS</span>
          <span className="tracking-wide sm:hidden">UPDATES</span>
        </div>

        {/* Marquee Ticker */}
        <div className="relative flex-1 overflow-hidden whitespace-nowrap text-xs sm:text-sm">
          <div className="inline-flex items-center gap-8 animate-marquee">
            {LATEST_NEWS.concat(LATEST_NEWS).map((item, idx) => (
              <Link
                key={idx}
                href="/admissions"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors"
              >
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-amber-300 border border-white/10">
                  {item.category}
                </span>
                <span>{item.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Circulars Link */}
        <Link
          href="/admissions"
          className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap shrink-0 transition"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notice Board</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
