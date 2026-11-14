"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md border-2 border-amber-400">
                <span className="font-extrabold text-lg text-amber-300">NGI</span>
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">NATHDWARA </span>
                <span className="font-bold text-xl text-amber-400 tracking-tight">GROUP</span>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  OF INSTITUTIONS &bull; RAJASTHAN
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Nathdwara Group of Institutions (NGI) is a leading educational hub in Mewar, Rajasthan offering RTU Kota and MLSU Udaipur affiliated degree programs in Engineering, Biotechnology, Computer Applications, Teacher Education, Pharmacy, and Management.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-amber-300">
              Affiliated to RTU Kota &amp; MLSU Udaipur &bull; Approved by AICTE, NCTE &amp; PCI
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#about-section" className="hover:text-amber-400 transition-colors">
                  About NGI &amp; Vision
                </a>
              </li>
              <li>
                <a href="#institutions" className="hover:text-amber-400 transition-colors">
                  Constituent Institutes
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  Courses &amp; Eligibility
                </a>
              </li>
              <li>
                <a href="#placements" className="hover:text-amber-400 transition-colors">
                  Training &amp; Placements
                </a>
              </li>
              <li>
                <a href="#campus-facilities" className="hover:text-amber-400 transition-colors">
                  Campus Facilities &amp; Labs
                </a>
              </li>
              <li>
                <a href="#scholarships" className="hover:text-amber-400 transition-colors">
                  Govt. Scholarships
                </a>
              </li>
              <li>
                <a href="#apply-section" className="hover:text-amber-400 transition-colors">
                  Admissions 2026-27
                </a>
              </li>
            </ul>
          </div>

          {/* Constituent Institutions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Our Institutes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>&bull; Nathdwara Institute of Engg &amp; Tech (NIET)</li>
              <li>&bull; Nathdwara Institute of Biotech &amp; Mgmt (NIBM)</li>
              <li>&bull; Shrinathji Institute of Tech &amp; Engg (SITE)</li>
              <li>&bull; Nathdwara College of Education (B.Ed)</li>
              <li>&bull; Nathdwara Institute of Pharmacy (NIP)</li>
              <li>&bull; Shrinathji Institute of Mgmt Studies (SIMS)</li>
              <li>&bull; NGI Industrial Training Institute (ITI)</li>
            </ul>
          </div>

          {/* Campus Location & Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Campus Contact</span>
            </h4>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-300">
                Main Campus Address:
              </p>
              <p>
                Bhansol Gadwada Road, Upali Oden, Nathdwara, Dist. Rajsamand, Rajasthan &ndash; 313301, India (Near Udaipur).
              </p>
              <div className="pt-1 space-y-1.5">
                <a
                  href="tel:+919571345444"
                  className="flex items-center gap-1.5 text-amber-400 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 95713 45444 / 02953-230077</span>
                </a>
                <a
                  href="mailto:info@ngi.edu.in"
                  className="flex items-center gap-1.5 text-amber-400 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>info@ngi.edu.in</span>
                </a>
                <p className="text-[11px] text-slate-500">
                  Official Portal: <span className="text-slate-300">ngi.edu.in</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 Nathdwara Group of Institutions (NGI). All Rights Reserved. Built with Next.js 16 &amp; TypeScript.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Mandatory Disclosure
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Anti-Ragging Cell
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:text-amber-400 transition-colors">
              RTU Affiliation
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
