import Link from "next/link";
import {
  ArrowRight,
  Building,
  Compass,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Our vision",
    description:
      "Provide inclusive, value-based education that helps students grow with confidence and purpose.",
    color: "text-amber-600",
  },
  {
    icon: Sparkles,
    title: "Our mission",
    description:
      "Connect academic learning with practical skills, personal development and career preparation.",
    color: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Academic affiliations",
    description:
      "Our institutions are affiliated with relevant universities and statutory bodies for their programs.",
    color: "text-emerald-600",
  },
  {
    icon: Building,
    title: "A connected campus",
    description:
      "Study across a group of institutions offering engineering, health sciences, law and vocational education.",
    color: "text-rose-600",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute right-0 top-0 -z-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-0 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border-4 border-white bg-slate-200 shadow-xl sm:min-h-[440px] lg:min-h-[620px]">
            <img
              src="/institutions/niet-card.jpg"
              alt="Nathdwara Institute of Engineering and Technology campus"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f44]/90 via-[#0b1f44]/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
              <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-950">
                Nathdwara · Rajasthan
              </span>
              <h3 className="mt-3 text-xl font-bold sm:text-2xl">
                A community of institutions. Many paths to grow.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">
                Explore learning opportunities across the Nathdwara Group of
                Institutions.
              </p>
            </div>
            <div className="absolute right-4 top-4 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur sm:right-6 sm:top-6 sm:p-5">
              <p className="text-2xl font-black leading-none text-[#102c52] sm:text-3xl">
                6+
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 sm:text-xs">
                Institutions
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center py-2 lg:py-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-900 sm:text-xs">
              <Compass className="h-3.5 w-3.5 text-blue-700" />
              About Nathdwara Group of Institutions
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#102c52] sm:text-4xl">
              Education rooted in Mewar, with room to shape your future.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Nathdwara Group of Institutions (NGI), based in Upali Oden,
              Nathdwara, brings multiple specialist institutions together in
              one academic community. Students can explore pathways in
              engineering and technology, medical and health sciences, law,
              biotechnology and vocational training.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Each institution has its own academic focus. Course availability,
              eligibility and affiliations vary by program, so our admissions
              team can help you find the right information for your chosen
              course.
            </p>

            <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {highlights.map(({ icon: Icon, title, description, color }) => (
                <article
                  key={title}
                  className="flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-4"
                >
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/institutions"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-800"
              >
                Explore our institutions
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-blue-900 underline underline-offset-4 transition-colors hover:text-blue-700"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
