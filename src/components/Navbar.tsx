"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  ShieldAlert,
  User,
  X,
} from "lucide-react";
import { NGI_INSTITUTIONS } from "@/data/ngiData";
import { NAV_GROUPS, SITE_CONTACT, telHref, type NavLink } from "@/data/siteConfig";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

const COLLEGE_SUMMARY: Record<string, string> = {
  niet: "Engineering & Technology",
  nibm: "BCA, B.Sc., M.Sc. & B.Ed. · MLSU",
  nlc: "LL.B. (3 Years) · BCI approved",
  "ayurved-nursing": "B.Sc. Ayurveda Nursing",
  vdsms: "Medical Science · PMKVY & RSLDC",
  npiti: "NCVT Electrician & Fitter",
};

const COLLEGE_PATHS = NGI_INSTITUTIONS.map((institution) => `/${institution.id}`);

function DropdownLink({ item, onNavigate }: { item: NavLink; onNavigate: () => void }) {
  const className =
    "group/item flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-soft focus-visible:bg-soft";
  const body = (
    <>
      <span>
        <span className="block text-sm font-semibold text-primary">{item.label}</span>
        {item.description ? (
          <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
        ) : null}
      </span>
      {item.external ? <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" /> : null}
    </>
  );

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {body}
    </Link>
  );
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMenuOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeAll = () => {
    setOpenGroup(null);
    setMenuOpen(false);
    setMobileGroup(null);
  };

  const isActive = (prefixes: string[]) =>
    prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  const topLinkClass = (active: boolean) =>
    `relative inline-flex items-center gap-1 rounded-md px-2.5 2xl:px-3 py-2 text-[13.5px] font-semibold transition-colors ${
      active ? "text-primary" : "text-slate-700 hover:text-primary"
    } after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform ${
      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  const groups = [
    NAV_GROUPS[0],
    {
      label: "Colleges",
      match: ["/institutions", ...COLLEGE_PATHS],
      items: [],
    },
    ...NAV_GROUPS.slice(1),
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Utility bar */}
        <div
          className={`hidden overflow-hidden border-b border-line bg-soft text-slate-600 transition-all duration-300 lg:block ${
            scrolled ? "max-h-0 border-transparent" : "max-h-10"
          }`}
        >
          <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
            <div className="flex items-center gap-5">
              <a href={telHref(SITE_CONTACT.admissionPhone)} className="inline-flex items-center gap-1.5 hover:text-primary">
                <Phone className="h-3.5 w-3.5 text-accent-dark" />
                {SITE_CONTACT.admissionPhone}
              </a>
              <a href={`mailto:${SITE_CONTACT.email}`} className="hidden items-center gap-1.5 hover:text-primary xl:inline-flex">
                <Mail className="h-3.5 w-3.5 text-accent-dark" />
                {SITE_CONTACT.email}
              </a>
              <span className="inline-flex items-center gap-1.5 font-medium text-rose-700">
                <ShieldAlert className="h-3.5 w-3.5" />
                Anti-Ragging Helpline {SITE_CONTACT.antiRaggingHelpline}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/disclosures" className="hover:text-primary">
                Mandatory Disclosures
              </Link>
              <Link href="/news" className="hover:text-primary">
                News &amp; Events
              </Link>
              <Link href="/committees" className="hidden hover:text-primary xl:inline">
                Grievance Redressal
              </Link>
              <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent-dark">
                <User className="h-3.5 w-3.5" />
                Student Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`border-b border-line bg-white transition-shadow duration-300 ${
            scrolled ? "shadow-[0_6px_24px_-12px_rgba(0,33,71,0.25)]" : ""
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
            <Link
              href="/"
              onClick={closeAll}
              className="flex min-w-0 shrink items-center gap-3"
              aria-label="Nathdwara Group of Institutions — home"
            >
              <img
                src="/ngi-logo.png"
                alt=""
                className="h-11 w-auto shrink-0 object-contain md:h-14"
                loading="eager"
              />
              <span className="min-w-0 leading-tight">
                <span className="block truncate font-display text-[15px] font-bold tracking-tight text-primary sm:text-lg">
                  Nathdwara Group
                  <span className="hidden sm:inline"> of Institutions</span>
                </span>
                <span className="block truncate text-[11px] font-medium text-slate-500 sm:text-xs">
                  <span className="hidden sm:inline">Upali Odan, </span>Nathdwara · Rajasthan
                </span>
              </span>
            </Link>

            <nav ref={navRef} aria-label="Main" className="hidden min-w-0 items-center xl:flex">
              <Link href="/" className={topLinkClass(pathname === "/")}>
                Home
              </Link>

              {groups.map((group) => {
                const id = `nav-${group.label.toLowerCase()}`;
                const open = openGroup === group.label;
                const isColleges = group.label === "Colleges";
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setOpenGroup(group.label)}
                    onMouseLeave={() => setOpenGroup((current) => (current === group.label ? null : current))}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setOpenGroup((current) => (current === group.label ? null : current));
                      }
                    }}
                  >
                    <button
                      type="button"
                      className={topLinkClass(isActive(group.match))}
                      aria-expanded={open}
                      aria-controls={id}
                      onClick={() => setOpenGroup(open ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    <div
                      id={id}
                      className={`absolute top-full pt-3 transition-all duration-150 ${
                        isColleges ? "-left-40 w-[560px]" : "left-0 w-72"
                      } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
                    >
                      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_48px_-16px_rgba(0,33,71,0.28)]">
                        <div className="h-1 bg-accent" />
                        {isColleges ? (
                          <div className="p-3">
                            <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                              Six constituent colleges · one campus
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                              {NGI_INSTITUTIONS.map((institution) => (
                                <Link
                                  key={institution.id}
                                  href={`/${institution.id}`}
                                  onClick={closeAll}
                                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-soft"
                                >
                                  <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-[9.5px] font-bold tracking-wide text-accent">
                                    {institution.shortName}
                                  </span>
                                  <span>
                                    <span className="block text-sm font-semibold leading-snug text-primary">
                                      {institution.shortName}
                                    </span>
                                    <span className="mt-0.5 block text-xs text-slate-500">
                                      {COLLEGE_SUMMARY[institution.id] ?? institution.name}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                            <Link
                              href="/institutions"
                              onClick={closeAll}
                              className="mt-2 flex items-center justify-between rounded-lg bg-soft px-3 py-2.5 text-sm font-semibold text-primary hover:bg-line"
                            >
                              Compare all colleges
                              <ArrowUpRight className="h-4 w-4 text-accent-dark" />
                            </Link>
                          </div>
                        ) : (
                          <div className="p-2">
                            {group.items.map((item) => (
                              <DropdownLink key={item.href} item={item} onNavigate={closeAll} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link href="/news" className={topLinkClass(isActive(["/news"]))}>
                News
              </Link>
              <Link href="/contact" className={topLinkClass(isActive(["/contact"]))}>
                Contact
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="hidden rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary 2xl:inline-flex"
              >
                Enquire
              </button>
              <Link
                href="/admissions"
                onClick={closeAll}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-bold text-primary shadow-sm transition-colors hover:bg-accent-dark sm:px-4 sm:text-sm"
              >
                <span className="sm:hidden">Apply</span>
                <span className="hidden sm:inline">Admission 2026-27</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-primary transition-colors hover:bg-soft xl:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / tablet drawer */}
        {menuOpen ? (
          <div
            id="mobile-menu"
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white shadow-2xl xl:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-[1440px] space-y-1 px-4 py-4 sm:px-6">
              <Link
                href="/"
                onClick={closeAll}
                className={`block rounded-lg px-3 py-3 text-[15px] font-semibold ${
                  pathname === "/" ? "bg-primary text-white" : "text-primary hover:bg-soft"
                }`}
              >
                Home
              </Link>

              {groups.map((group) => {
                const open = mobileGroup === group.label;
                const items: NavLink[] =
                  group.label === "Colleges"
                    ? [
                        ...NGI_INSTITUTIONS.map((institution) => ({
                          label: `${institution.shortName} — ${institution.name}`,
                          href: `/${institution.id}`,
                        })),
                        { label: "Compare all colleges", href: "/institutions" },
                      ]
                    : group.items;
                return (
                  <div key={group.label}>
                    <button
                      type="button"
                      onClick={() => setMobileGroup(open ? null : group.label)}
                      aria-expanded={open}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-semibold ${
                        isActive(group.match) ? "text-primary" : "text-slate-800"
                      } hover:bg-soft`}
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180 text-accent-dark" : ""}`} />
                    </button>
                    {open ? (
                      <div className="mb-2 ml-3 border-l-2 border-accent pl-3">
                        {items.map((item) =>
                          item.external ? (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeAll}
                              className="block rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-soft hover:text-primary"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeAll}
                              className="block rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-soft hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          ),
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {[
                { label: "News & Events", href: "/news" },
                { label: "Contact", href: "/contact" },
                { label: "Student Portal", href: "/login" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className={`block rounded-lg px-3 py-3 text-[15px] font-semibold ${
                    isActive([link.href]) ? "bg-primary text-white" : "text-slate-800 hover:bg-soft"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 space-y-2 border-t border-line pt-4 text-sm">
                <a href={telHref(SITE_CONTACT.admissionPhone)} className="flex items-center gap-2 font-semibold text-primary">
                  <Phone className="h-4 w-4 text-accent-dark" />
                  Admission helpline {SITE_CONTACT.admissionPhone}
                </a>
                <p className="flex items-center gap-2 font-medium text-rose-700">
                  <ShieldAlert className="h-4 w-4" />
                  Anti-Ragging Helpline {SITE_CONTACT.antiRaggingHelpline}
                </p>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 bg-primary-dark/40 xl:hidden" onClick={closeAll} aria-hidden="true" />
      ) : null}
    </>
  );
}
