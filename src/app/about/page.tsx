import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, Compass, Lightbulb, UsersRound } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About | Nathdwara Group of Institutions",
  description:
    "Learn about Nathdwara Group of Institutions, our colleges, student-first approach and campus in Nathdwara, Rajasthan.",
};

const principles = [
  {
    icon: BookOpenCheck,
    title: "Learning with purpose",
    description:
      "Build a strong academic foundation while connecting classroom learning to the world beyond it.",
  },
  {
    icon: Lightbulb,
    title: "Skills for what's next",
    description:
      "Explore practical projects, modern facilities and career-focused learning across disciplines.",
  },
  {
    icon: UsersRound,
    title: "A welcoming community",
    description:
      "Learn alongside students and mentors who bring different experiences and ambitions to campus.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nathdwara Group of Institutions"
        title="A place to learn, grow and find your direction."
        description="NGI brings diverse academic pathways together in Nathdwara, Rajasthan — supporting students as they turn curiosity into skills and ambition into opportunity."
        image="/institutions/nibm-card.jpg"
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Our story</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#102c52] sm:text-4xl">
            Education rooted in Mewar, built for a changing world.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Located in Nathdwara, Rajsamand, the Nathdwara Group brings together
            six specialist institutions: Vallabh Darshan Society for Medical
            Science, Nathdwara College of B.Sc. Ayurveda Nursing, Nathdwara
            Institute of Biotechnology &amp; Management, Nathdwara Private
            Industrial Training Institute, Nathdwara Law College, and Nathdwara
            Institute of Engineering and Technology.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Our aim is to make higher education practical and personal: strong
            academic foundations, dedicated spaces to explore ideas, and
            guidance that helps students take their next step with confidence.
          </p>
          <Link
            href="/institutions"
            className="mt-7 inline-flex items-center gap-2 font-bold text-[#174879] transition hover:text-amber-700"
          >
            Discover our institutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl sm:min-h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
            alt="University campus surrounded by greenery"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102c52]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
            <p className="text-sm font-semibold text-amber-300">Nathdwara · Rajasthan</p>
            <p className="mt-2 text-2xl font-bold">One campus. Many possibilities.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">What guides us</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c52] sm:text-4xl">
              A student-first approach to education.
            </h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#102c52]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-2xl font-black tracking-tight text-[#102c52]">Ready to find your path?</p>
          <p className="mt-2 text-slate-600">Explore the programs and colleges at NGI.</p>
        </div>
        <Link href="/programs" className="inline-flex items-center gap-2 self-start rounded-full bg-[#102c52] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4b7f] md:self-auto">
          Browse programs <Compass className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
