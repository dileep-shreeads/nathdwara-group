import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Compass,
  Heart,
  Home,
  Music,
  Trophy,
  Utensils,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import InfrastructureSection from "@/components/InfrastructureSection";

export const metadata: Metadata = {
  title: "Campus Life & Amenities | Nathdwara Group of Institutions (NGI)",
  description:
    "Experience student life at NGI's 30-acre Aravali campus in Upali Oden, Nathdwara. Modern 11+ labs, sports arena, boys and girls hostels, annual Navratri Garba fest, cafeteria, and bus transport.",
  keywords: [
    "Campus life NGI Nathdwara",
    "Nathdwara Group hostel facilities",
    "Sports ground Nathdwara college",
    "College cultural fest Nathdwara",
    "Navratri Garba NGI",
    "College bus transport Udaipur Nathdwara",
  ],
};

const CAMPUS_PILLARS = [
  {
    icon: Home,
    title: "Residential Living & Hostels",
    desc: "Separate high-security boys and girls hostels with furnished rooms, 24/7 security, high-speed Wi-Fi, laundry facilities, and common recreational lounges.",
    badge: "On-Campus Living",
  },
  {
    icon: Trophy,
    title: "State-of-the-Art Sports Arena",
    desc: "Full-sized floodlit cricket ground, football arena, basketball court, volleyball courts, indoor badminton hall, table tennis, and modern gym.",
    badge: "Athletics & Fitness",
  },
  {
    icon: Music,
    title: "Cultural Fests & Garba Nights",
    desc: "Grand multi-night Navratri Garba celebrations, annual cultural extravaganza 'Tarang', celebrity musical nights, drama society, and youth festivals.",
    badge: "Tradition & Energy",
  },
  {
    icon: Utensils,
    title: "Hygienic Multi-Cuisine Cafeteria",
    desc: "FSSAI compliant pure vegetarian dining hall serving wholesome breakfast, regional thalis, evening snacks, and fresh refreshments prepared with utmost hygiene.",
    badge: "Nutrition & Taste",
  },
  {
    icon: Bus,
    title: "Extensive Bus Transport Fleet",
    desc: "25+ GPS-tracked college buses covering daily routes between Udaipur, Nathdwara, Rajsamand, Mavli, Kankroli, Fatehnagar, and surrounding towns.",
    badge: "Daily Connectivity",
  },
  {
    icon: Heart,
    title: "Health Dispensary & Student Care",
    desc: "On-campus primary healthcare center with qualified nurses, regular visiting doctors, first-aid support, and emergency tie-up with local multi-specialty hospitals.",
    badge: "Safety & Wellness",
  },
];

const STUDENT_CLUBS = [
  {
    title: "Techno-Robotics & Coding Guild",
    desc: "Student chapters of CSI and IEEE conducting annual 24-hour hackathons, robotics obstacle leagues, AI coding bootcamps, and web-dev challenges.",
    lead: "NIET & NIBM Engineering Wings",
    tag: "Technical Innovation",
  },
  {
    title: "Moot Court Society & Legal Aid Clinic",
    desc: "Organized by Nathdwara Law College (NLC), students practice mock trials, draft legal briefs, and conduct free legal awareness clinics in rural panchayats.",
    lead: "Nathdwara Law College (NLC)",
    tag: "Social Justice",
  },
  {
    title: "National Service Scheme (NSS)",
    desc: "Active community volunteerism, annual 7-day rural immersion camps, blood donation drives, tree plantation initiatives, and Swachh Bharat cleanliness drives.",
    lead: "Central NSS Chapter",
    tag: "Community Outreach",
  },
  {
    title: "Cultural & Literary Arts Circle",
    desc: "Nurturing oratory, debate, classical Mewari music, poetry recitations, stage dramatics, fine arts, photography exhibitions, and university youth fest delegations.",
    lead: "Student Welfare Board",
    tag: "Arts & Culture",
  },
];

const LIFE_GALLERY = [
  {
    title: "Grand Navratri Garba Celebrations",
    desc: "Traditional Mewari Raas-Garba attended by thousands of students and faculty members.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    tag: "Cultural Fest",
  },
  {
    title: "Inter-College Cricket Championships",
    desc: "Shrinathji Memorial Cricket Cup matches held under floodlights on campus grounds.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    tag: "Sports Arena",
  },
  {
    title: "High-Performance Computer Workstations",
    desc: "500+ interconnected systems with software development IDEs, IoT kits, and gigabit internet.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    tag: "Tech Labs",
  },
  {
    title: "Molecular Biology & Biotech Laboratories",
    desc: "State-of-the-art wet laboratories with laminar flow hoods, PCR machines, and autoclaves.",
    image: "/institutions/nibm-card.jpg",
    tag: "Sciences",
  },
  {
    title: "Central Digital Library & E-Resource Hub",
    desc: "Over 35,000+ volumes, DELNET subscription, quiet study cubicles, and national e-journals.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    tag: "Library",
  },
  {
    title: "Green 30-Acre Campus Township",
    desc: "Scenic landscaping set against the rolling Aravali hills in Upali Oden, Nathdwara.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    tag: "Campus Living",
  },
];

export default function CampusLifePage() {
  return (
    <>
      <PageHero
        eyebrow="LIFE AT NATHDWARA GROUP • 30-ACRE ARAVALI CAMPUS"
        title="Where Ancient Heritage Meets Modern Campus Energy."
        description="Experience a vibrant, connected academic township in Upali Oden, Nathdwara. Advanced laboratories, sports complexes, grand cultural fests, modern hostels, and lifelong friendships."
        image="/institutions/niet-card.jpg"
      />

      {/* Highlights Strip */}
      <section className="bg-[#0B1B3D] text-white py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400">30+</div>
              <div className="text-xs uppercase font-bold text-slate-300 mt-1">Acres Green Campus</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400">11+</div>
              <div className="text-xs uppercase font-bold text-slate-300 mt-1">Specialized Labs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400">25+</div>
              <div className="text-xs uppercase font-bold text-slate-300 mt-1">Daily Bus Fleet</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400">100%</div>
              <div className="text-xs uppercase font-bold text-slate-300 mt-1">Wi-Fi &amp; CCTV Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Living & Pillars */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Campus Facilities &bull; Upali Oden
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight">
              A Complete Academic &amp; Residential Township
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Designed to nurture mind, body, and character. Every student finds the resources and community they need to thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {CAMPUS_PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/90 hover:bg-white hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#0B1B3D] group-hover:scale-110 group-hover:bg-amber-50 transition-all">
                        <Icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1B3D] group-hover:text-amber-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#0B1B3D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>24/7 Monitored Campus</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Infrastructure Section */}
      <InfrastructureSection />

      {/* Student Clubs & Communities */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3D] bg-blue-100 px-3 py-1 rounded-full inline-block mb-3">
              Student Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight">
              Active Student Clubs &amp; Leadership Societies
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Explore your passions beyond the curriculum. Lead student teams, organize fests, and build lifelong networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {STUDENT_CLUBS.map((club, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
                      {club.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {club.lead}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">
                    {club.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {club.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600">
                    Open to All Students
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-[#0B1B3D] hover:underline flex items-center gap-1"
                  >
                    <span>Join Club</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Campus Life Gallery Grid */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Moments That Matter
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight">
              Life at Nathdwara Group in Pictures
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From intense lab experiments and court simulations to high-voltage garba nights and sports championships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIFE_GALLERY.map((g, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md aspect-[4/3]"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/95 via-[#0B1B3D]/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                    {g.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {g.title}
                  </h4>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-1">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule a Visit CTA Banner */}
      <section className="bg-gradient-to-r from-[#061024] via-[#0B1B3D] to-[#122858] text-white py-16 sm:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Experience It In Person</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Visit Our 30-Acre Campus in Nathdwara
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Take a personalized campus tour, visit our modern laboratories, explore hostel accommodations, and meet departmental heads. Just 40 minutes from Udaipur on Bhansol Gadwada Road, Upali Oden.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
            >
              Get Campus Directions &amp; Route Map &rarr;
            </Link>
            <Link
              href="/admissions"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all"
            >
              Apply for 2026 Admissions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
