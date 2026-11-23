import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { NGI_INSTITUTIONS } from "@/data/ngiData";

export default function Footer() {
  return (
    <footer className="bg-[#071328] text-slate-300 border-t border-slate-800">
      {/* Top Banner / Accreditation Strip */}
      <div className="border-b border-white/10 bg-[#0B1B3D]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Statutory Approvals &amp; Recognitions:
            </span>
            <span className="text-slate-300">
              AICTE New Delhi &bull; Bar Council of India (BCI) &bull; NCTE Jaipur &bull; Pharmacy Council of India (PCI) &bull; DGT / NCVT
            </span>
          </div>
          <div className="flex items-center gap-4 text-amber-300 font-semibold shrink-0">
            <span>Affiliations: RTU Kota &bull; MLSU Udaipur</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Identity & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-md">
                <img src="/ngi-logo.png" alt="NGI Logo" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block font-black text-xl tracking-tight text-white">
                  NATHDWARA <span className="text-amber-400">GROUP</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-[0.16em] text-slate-400">
                  Group of Institutions &bull; Rajasthan
                </span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Established in 2010, Nathdwara Group of Institutions (NGI) is a premier 30-acre academic campus in Upali Oden, Nathdwara (near Udaipur), Rajasthan. Offering 45+ degree, diploma, and technical programs across six specialized constituent colleges.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admissions Open for Academic Session 2026-27</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Anti-Ragging Helpline: 1800-180-5522 (Toll Free)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Constituent Colleges (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-400 pl-2.5">
              Constituent Colleges
            </h3>
            <ul className="space-y-2 pt-2 text-xs">
              {NGI_INSTITUTIONS.map((inst) => (
                <li key={inst.id}>
                  <Link
                    href={`/${inst.id}`}
                    className="text-slate-400 hover:text-amber-300 transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span className="font-medium group-hover:translate-x-1 transition-transform">
                      {inst.shortName} - {inst.name.split(" ").slice(1, 3).join(" ")}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links & Stat Cells (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-400 pl-2.5">
              Portals &amp; Links
            </h3>
            <ul className="space-y-2 pt-2 text-xs text-slate-400">
              <li>
                <Link href="/admissions" className="hover:text-amber-300 transition-colors">
                  Admissions Portal 2026
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-amber-300 transition-colors">
                  All Courses &amp; Syllabi
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="hover:text-amber-300 transition-colors">
                  Campus Directory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact &amp; Route Map
                </Link>
              </li>
              <li>
                <Link href="/admissions#eligibility" className="hover:text-amber-300 transition-colors">
                  Scholarships Scheme
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-400 pl-2.5">
              Campus &amp; Admissions Office
            </h3>
            <ul className="space-y-3 pt-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Bhansol Gadwada Road, Upali Oden, Nathdwara, Dist. Rajsamand, Rajasthan &ndash; 313301 (Near Udaipur)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919571345444" className="hover:text-amber-300 font-semibold text-white">
                  +91 95713 45444 / +91 94141 72123
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@ngi.edu.in" className="hover:text-amber-300 text-white">
                  info@ngi.edu.in / admissions@ngi.edu.in
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#071328] font-bold text-xs shadow-md transition-all"
              >
                <span>Apply for Admissions 2026-27</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Mandatory University Legal */}
      <div className="border-t border-white/10 bg-[#050e1d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            &copy; 2026 Nathdwara Group of Institutions. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/about" className="hover:text-amber-400">Mandatory Disclosures</Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-amber-400">Grievance Redressal</Link>
            <span>&bull;</span>
            <Link href="/about" className="hover:text-amber-400">Anti-Ragging Policy</Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-amber-400">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
