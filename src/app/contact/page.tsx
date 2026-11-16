import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact | Nathdwara Group of Institutions",
  description:
    "Contact Nathdwara Group of Institutions for course, campus and admission information, or get directions to the NGI campus.",
};

const contacts = [
  {
    icon: Phone,
    title: "Call our team",
    detail: "+91 95713 45444",
    href: "tel:+919571345444",
    action: "Call now",
  },
  {
    icon: Mail,
    title: "Email us",
    detail: "info@ngi.edu.in",
    href: "mailto:info@ngi.edu.in",
    action: "Send an email",
  },
  {
    icon: MapPin,
    title: "Visit the campus",
    detail: "Upali Oden, Nathdwara, Rajasthan 313301",
    href: "https://maps.google.com/?q=Nathdwara+Group+of+Institutions",
    action: "Get directions",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact NGI"
        title="We’re here to help you take the next step."
        description="Reach out to Nathdwara Group of Institutions for information about programs, admissions or visiting our campus."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Get in touch</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52] sm:text-4xl">
            How can we help?
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Choose the contact method that works best for you. Our team can
            guide you to the right information.
          </p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {contacts.map(({ icon: Icon, title, detail, href, action }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3f9] text-[#174879]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#102c52]">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{detail}</p>
              <a
                href={href}
                target={href.startsWith("https://") ? "_blank" : undefined}
                rel={href.startsWith("https://") ? "noreferrer" : undefined}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#174879] transition hover:text-amber-700"
              >
                {action} <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2">
          <div className="p-6 sm:p-9 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Find us</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52]">
              Nathdwara, Rajasthan
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Nathdwara Group of Institutions, Bhansol Gadwada Road, Upali Oden,
              Nathdwara, District Rajsamand, Rajasthan 313301, India.
            </p>
            <a
              href="https://maps.google.com/?q=Nathdwara+Group+of+Institutions"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#102c52] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4b7f]"
            >
              Open in maps <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative min-h-64 bg-[linear-gradient(135deg,#dce8f1,#f7f2e7)] p-6 sm:min-h-80 sm:p-9 lg:min-h-full">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(0deg,transparent_24%,#6b8295_25%,#6b8295_26%,transparent_27%,transparent_74%,#6b8295_75%,#6b8295_76%,transparent_77%),linear-gradient(90deg,transparent_24%,#6b8295_25%,#6b8295_26%,transparent_27%,transparent_74%,#6b8295_75%,#6b8295_76%,transparent_77%)] [background-size:64px_64px]" />
            <div className="relative flex h-full min-h-52 items-center justify-center">
              <div className="max-w-xs rounded-2xl border border-white/80 bg-white/90 p-5 text-center shadow-lg backdrop-blur">
                <MapPin className="mx-auto h-7 w-7 text-amber-700" />
                <p className="mt-3 font-bold text-[#102c52]">NGI Campus</p>
                <p className="mt-1 text-sm text-slate-600">Upali Oden, Nathdwara</p>
                <a
                  href="https://maps.google.com/?q=Nathdwara+Group+of+Institutions"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#174879]"
                >
                  View directions <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Still choosing a course? Browse the options at NGI.</p>
          <Link href="/programs" className="inline-flex items-center gap-2 font-bold text-[#174879] hover:text-amber-700">
            View programs <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
