import Link from "next/link";
import { ArrowLeft, BarChart3, ClipboardCheck, IndianRupee, ShieldCheck } from "lucide-react";

const POINTS = [
  { icon: ClipboardCheck, title: "Admissions in one place", text: "Enquiries, applications, document checks and seat allotment." },
  { icon: IndianRupee, title: "Fees & receipts", text: "Instalments, scholarships and printable receipts." },
  { icon: BarChart3, title: "Live overview", text: "Leads, conversions and collections across all six colleges." },
  { icon: ShieldCheck, title: "Role-based access", text: "Staff see only the modules and college they manage." },
];

/** Graduation photo (Unsplash licence); replace public/auth/auth-bg.jpg with an NGI campus photo when available. */
const BACKGROUND = "/auth/auth-bg.jpg";

export default function AuthLayout({ title, subtitle, children, wide }: { title: string; subtitle: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <aside className="relative isolate hidden overflow-hidden bg-primary-dark p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <img
          src={BACKGROUND}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-dark/95 via-primary-dark/75 to-primary-dark/30" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-primary-dark/80 to-transparent" />
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="rounded-lg bg-white p-1.5">
              <img src="/ngi-logo.png" alt="" className="h-11 w-auto" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold">Nathdwara Group of Institutions</span>
              <span className="block text-xs text-white/60">Admissions & Campus Portal</span>
            </span>
          </Link>
          <h2 className="mt-14 max-w-md font-display text-4xl font-bold leading-tight tracking-tight">
            One portal for <span className="text-accent">six colleges</span>.
          </h2>
          <ul className="mt-10 max-w-md space-y-5">
            {POINTS.map(({ icon: Icon, title: t, text }) => (
              <li key={t} className="flex gap-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="block text-sm text-white/65">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-white/50">© 2026 Nathdwara Group of Institutions · Upali Odan, Nathdwara</p>
      </aside>

      <div className="flex flex-col bg-white px-5 py-8 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-slate-500 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>
        <div className={`mx-auto my-auto w-full py-10 ${wide ? "max-w-2xl" : "max-w-md"}`}>
          <Link href="/" className="mb-8 inline-flex items-center gap-3 lg:hidden">
            <img src="/ngi-logo.png" alt="" className="h-10 w-auto" />
            <span className="font-display text-base font-bold text-primary">Nathdwara Group</span>
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-tight text-primary">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
