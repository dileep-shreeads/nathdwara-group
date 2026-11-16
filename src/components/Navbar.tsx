"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, PhoneCall, X } from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

const links = [
  { href: "/about", label: "About us" },
  { href: "/institutions", label: "Institutions" },
  { href: "/programs", label: "Programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={closeMenu}
          aria-label="Nathdwara Group of Institutions home"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-200 bg-[#fbf8dc] shadow-sm transition-transform group-hover:-rotate-3">
            <img
              src="/ngi-logo.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-extrabold leading-tight tracking-tight text-[#102c52] sm:text-lg">
              NATHDWARA <span className="text-amber-600">GROUP</span>
            </span>
            <span className="mt-1 block truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[10px]">
              Group of Institutions · Rajasthan
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#102c52] xl:px-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#102c52] transition-colors hover:bg-slate-100 xl:inline-flex"
          >
            <PhoneCall className="h-4 w-4" />
            Talk to us
          </button>
          <Link
            href="/admissions"
            className="hidden items-center gap-2 rounded-full bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-300 sm:inline-flex"
          >
            Apply now <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#102c52] transition hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#102c52]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950"
            >
              Explore admissions <ArrowUpRight className="h-4 w-4" />
            </Link>
            {onOpenEnquiry && (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onOpenEnquiry();
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-[#102c52]"
              >
                <PhoneCall className="h-4 w-4" /> Request a call
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
