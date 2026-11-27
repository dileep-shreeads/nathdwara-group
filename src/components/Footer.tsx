import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { NGI_INSTITUTIONS } from "@/data/ngiData";
import { SITE_CONTACT, telHref } from "@/data/siteConfig";

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About NGI", href: "/about" },
      { label: "All Programmes", href: "/programs" },
      { label: "Facilities", href: "/facilities" },
      { label: "Campus Life", href: "/campus-life" },
      { label: "Placements", href: "/placements" },
      { label: "News & Events", href: "/news" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Admission Process", href: "/admissions" },
      { label: "Eligibility", href: "/admissions#eligibility" },
      { label: "Scholarships", href: "/admissions#scholarships" },
      { label: "NIBM Fee & Seats", href: "/nibm#fees" },
      { label: "Register Online", href: "/register" },
      { label: "Student Portal", href: "/login" },
    ],
  },
  {
    title: "Key Documents",
    links: [
      { label: "Mandatory Disclosures", href: "/disclosures" },
      { label: "Committees & Cells", href: "/committees" },
      { label: "Anti-Ragging", href: "/committees#anti-ragging" },
      { label: "Grievance Redressal", href: "/committees#grievance" },
      {
        label: "Academic Calendar 2026-27",
        href: "https://www.nibmedu.com/wp-content/uploads/2026/08/Tentative-Calendar-of-session-2026-2027.pdf",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/75">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-4 text-xs sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            <span className="font-semibold text-accent">Affiliations &amp; recognitions:</span> MLSU Udaipur · Dr. B. R. Ambedkar Law
            University, Jaipur · Dr. S. R. Rajasthan Ayurved University, Jodhpur · RTU Kota · AICTE · NCTE · BCI · NCVT
          </p>
          <p className="flex items-center gap-1.5 font-medium text-rose-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            Anti-Ragging Helpline {SITE_CONTACT.antiRaggingHelpline}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="rounded-lg bg-white p-1.5">
              <img src="/ngi-logo.png" alt="" className="h-11 w-auto object-contain" />
            </span>
            <span className="font-display text-lg font-bold leading-tight text-white">
              Nathdwara Group
              <span className="block text-sm font-medium text-white/60">of Institutions</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Six colleges on one campus at Upali Odan, Nathdwara — science and teacher education, law, engineering,
            medical science, Ayurveda nursing and industrial training.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={SITE_CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {SITE_CONTACT.address}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                <a href={telHref(SITE_CONTACT.admissionPhone)} className="font-semibold text-white hover:text-accent">
                  {SITE_CONTACT.admissionPhone}
                </a>
                <span className="text-white/40"> · </span>
                <a href={telHref(SITE_CONTACT.officePhone)} className="font-semibold text-white hover:text-accent">
                  {SITE_CONTACT.officePhone}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${SITE_CONTACT.email}`} className="break-all hover:text-white">
                {SITE_CONTACT.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`https://wa.me/${SITE_CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp the admission desk
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Colleges</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NGI_INSTITUTIONS.map((institution) => (
              <li key={institution.id}>
                <Link href={`/${institution.id}`} className="hover:text-accent">
                  {institution.shortName}
                  <span className="block text-xs text-white/45">{institution.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                      {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-accent">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; 2026 Nathdwara Group of Institutions. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/disclosures" className="hover:text-white">Mandatory Disclosures</Link>
            <Link href="/committees#grievance" className="hover:text-white">Grievance Redressal</Link>
            <Link href="/committees#anti-ragging" className="hover:text-white">Anti-Ragging</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
