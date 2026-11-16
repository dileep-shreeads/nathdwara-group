import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="bg-[#102c52] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 text-[11px] sm:px-6 sm:text-xs lg:px-8">
        <p className="font-medium text-slate-200">
          Applications are open for the 2026–27 academic year
          <Link className="ml-2 font-bold text-amber-300 underline underline-offset-2" href="/admissions">
            Explore admissions
          </Link>
        </p>
        <div className="flex items-center gap-4 text-slate-200">
          <a className="inline-flex items-center gap-1.5 transition hover:text-amber-300" href="tel:+919571345444">
            <Phone className="h-3.5 w-3.5 text-amber-300" />
            <span>+91 95713 45444</span>
          </a>
          <a className="hidden items-center gap-1.5 transition hover:text-amber-300 sm:inline-flex" href="mailto:info@ngi.edu.in">
            <Mail className="h-3.5 w-3.5 text-amber-300" />
            <span>info@ngi.edu.in</span>
          </a>
          <span className="hidden items-center gap-1.5 text-slate-300 xl:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-amber-300" />
            Nathdwara, Rajasthan
          </span>
        </div>
      </div>
    </div>
  );
}
