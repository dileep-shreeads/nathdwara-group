"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface LifeItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
}

const LIFE_ACTIVITIES: LifeItem[] = [
  {
    id: "cultural",
    tag: "FESTIVALS & CULTURAL NIGHTS",
    title: "Grand Navratri Garba Nights & Tarang Annual Fest",
    subtitle: "Celebrations rooted in Mewari tradition and youthful exuberance",
    description:
      "Every autumn, the 30-acre NGI campus lights up with traditional Mewari Raas-Garba, musical concerts, talent hunts, and inter-collegiate drama competitions attracting students from across Rajasthan.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Traditional multi-night Garba & Dandiya celebrations",
      "Celebrity musical performances & cultural choreography",
      "Inter-collegiate youth festival & fine arts competitions",
    ],
  },
  {
    id: "sports",
    tag: "SPORTS & ATHLETICS",
    title: "Inter-College Sports Championship & Modern Arena",
    subtitle: "Fostering teamwork, sportsmanship, and physical fitness",
    description:
      "Extensive outdoor and indoor sports facilities including full-size cricket and football grounds, volleyball courts, badminton indoor courts, table tennis, and annual RTU zonal athletics.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Annual Shrinathji Memorial Inter-College Cricket Cup",
      "Dedicated fitness gym and physical education instructors",
      "Active participation in University and State tournaments",
    ],
  },
  {
    id: "tech",
    tag: "INNOVATION & HACKATHONS",
    title: "Technical Symposiums, Codefests & Robotics Leagues",
    subtitle: "Where theoretical classroom learning transforms into real prototypes",
    description:
      "Organized by the student chapters of IEEE and CSI, our techno-management fests challenge students to build AI bots, solve algorithmic coding problems, design bridge structures, and pitch business plans.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "24-Hour hackathon with industry problem statements",
      "Robotics obstacle races & drone flight demonstrations",
      "Paper presentations judged by industry veterans",
    ],
  },
  {
    id: "community",
    tag: "COMMUNITY & STUDENT CLUBS",
    title: "Legal Aid, NSS Community Service & Green Drives",
    subtitle: "Empowering students with empathy, social responsibility and leadership",
    description:
      "From free legal aid camps organized by Nathdwara Law College in nearby rural panchayats to NSS tree plantation and health checkup camps in Upali Oden, student clubs actively serve the community.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Nathdwara Free Legal Aid Clinic by NLC students",
      "Regular blood donation & health awareness drives",
      "Eco-club initiatives maintaining a plastic-free green campus",
    ],
  },
];

export default function CampusLifeSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = LIFE_ACTIVITIES[activeTab];

  return (
    <section id="campus-life" className="py-20 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/60 text-[#0B1B3D] text-xs font-bold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>STUDENT EXPERIENCES &bull; LIFE BEYOND BOOKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1B3D] tracking-tight">
            Vibrant Campus, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Boundless Opportunities.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            Education at Nathdwara Group extends far beyond lecture halls. Experience festive traditions, competitive athletics, technical clubs, and lifelong friendships.
          </p>

          {/* Activity Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {LIFE_ACTIVITIES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#0B1B3D] text-white shadow-md shadow-blue-950/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.tag.split("&")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Showcase Grid */}
        <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200/90 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-md inline-block">
                {activeItem.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] mt-4 leading-snug">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-2">
                {activeItem.subtitle}
              </p>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                {activeItem.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3D] hover:text-amber-600 transition"
              >
                <span>Schedule a Campus Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400 font-semibold">
                30-Acre Wi-Fi Campus
              </span>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/70 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 shadow-lg lg:hidden">
              <span className="text-xs font-bold text-[#0B1B3D] block">
                {activeItem.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
