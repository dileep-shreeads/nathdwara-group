import { notFound, redirect } from "next/navigation";
import { NGI_INSTITUTIONS } from "@/data/ngiData";

interface InstitutionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NGI_INSTITUTIONS.map((institution) => ({ slug: institution.id }));
}

/** Each institution now has a full website at /<slug>; keep old links working. */
export default async function InstitutionPage({ params }: InstitutionPageProps) {
  const { slug } = await params;
  const institution = NGI_INSTITUTIONS.find((item) => item.id === slug);

  if (!institution) {
    notFound();
  }

  redirect(`/${institution.id}`);
}
