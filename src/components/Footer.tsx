import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const links = [
  { href: "/about", label: "About NGI" },
  { href: "/institutions", label: "Our institutions" },
  { href: "/programs", label: "Courses & programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d2341] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="md:col-span-2 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#fbf8dc]">
              <img src="/ngi-logo.png" alt="" className="h-full w-full object-contain" />
            </span>
            <span>
              <span className="block font-extrabold tracking-tight text-white">
                NATHDWARA <span className="text-amber-300">GROUP</span>
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-slate-400">
                Group of Institutions
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            A community of institutions in Nathdwara, Rajasthan, spanning medical
            sciences, Ayurveda nursing, biotechnology and management, industrial
            training, law, and engineering.
          </p>
          <Link
            href="/admissions"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-300 transition hover:text-amber-200"
          >
            Find your program <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Explore NGI</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-amber-300" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Get in touch</h2>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
              Bhansol Gadwada Road, Upali Oden, Nathdwara, Rajasthan 313301
            </li>
            <li>
              <a className="inline-flex items-center gap-3 transition hover:text-amber-300" href="tel:+919571345444">
                <Phone className="h-4 w-4 text-amber-300" /> +91 95713 45444
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3 transition hover:text-amber-300" href="mailto:info@ngi.edu.in">
                <Mail className="h-4 w-4 text-amber-300" /> info@ngi.edu.in
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Nathdwara Group of Institutions. All rights reserved.</p>
          <p>Affiliated with RTU Kota and MLSU Udaipur.</p>
        </div>
      </div>
    </footer>
  );
}
