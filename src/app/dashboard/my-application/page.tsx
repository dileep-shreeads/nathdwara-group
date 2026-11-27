"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import { ApplicationTracker } from "@/components/dashboard/StudentHome";
import { Badge, Card, EmptyState, KeyValue, PageHeader } from "@/components/dashboard/ui";
import { formatDate, formatDateTime, inr, lookups } from "@/lib/demo/selectors";

export default function MyApplicationPage() {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const application = state.applications.find((a) => a.id === user.applicationId);

  if (!application) {
    return (
      <Card>
        <EmptyState title="No application on this account" description="Apply online to start your admission." action={<Link href="/register" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Apply online</Link>} />
      </Card>
    );
  }

  const p = programme(application.programmeId);
  const updates = application.notes.filter((n) => !/^Created from enquiry/.test(n.text));

  return (
    <>
      <PageHeader title="My application" description={`${application.id} · applied ${formatDate(application.createdAt)}`} actions={<Badge>{application.stage}</Badge>} />

      <Card title="Progress">
        <ApplicationTracker application={application} />
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Programme">
          <KeyValue
            items={[
              { label: "Programme", value: p?.name },
              { label: "College", value: college(application.collegeId)?.name },
              { label: "Duration", value: p?.duration },
              { label: "Annual fee", value: p?.annualFee ? inr(p.annualFee) : "No fee" },
              { label: "Qualifying marks", value: application.qualifyingMarks ? `${application.qualifyingMarks}%` : "—" },
              { label: "Category", value: application.category },
            ]}
          />
        </Card>

        <Card title="Documents" description="Bring originals to the admission office for verification." padded={false}>
          <ul className="divide-y divide-line">
            {application.documents
              .filter((d) => d.required)
              .map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                  <span className="text-slate-700">{d.name}</span>
                  {d.verified ? (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700">
                      <Clock className="h-4 w-4" /> Pending
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <Card title="Updates from the admissions team" className="mt-6">
        {updates.length === 0 ? (
          <p className="text-sm text-slate-500">No updates yet. We&apos;ll post here as your application moves forward.</p>
        ) : (
          <ol className="space-y-3">
            {updates.map((n, i) => (
              <li key={`${n.at}-${i}`} className="rounded-lg bg-soft px-4 py-3">
                <p className="text-sm text-slate-700">{n.text}</p>
                <p className="text-xs text-slate-400">{formatDateTime(n.at)}</p>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </>
  );
}
