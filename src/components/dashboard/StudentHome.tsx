"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleAlert, IndianRupee, Megaphone } from "lucide-react";
import { useDashboard } from "./DashboardShell";
import { Badge, Card, EmptyState, KeyValue, PageHeader, StatTile } from "./ui";
import { formatDate, inr, invoiceTotals, lookups } from "@/lib/demo/selectors";
import { STAGE_FLOW } from "@/lib/services";
import type { Application } from "@/lib/demo/types";

const STAGE_HELP: Record<string, string> = {
  Submitted: "The admissions team will check your documents.",
  "Documents Verified": "Your documents are verified. Seat allotment is next.",
  "Provisionally Admitted": "A seat is reserved for you. Visit the college to complete enrolment.",
  Enrolled: "You're enrolled. Your fee invoice is in Fees & Receipts.",
  Rejected: "Your application was not accepted. Contact the admission desk for details.",
};

const STAFF_HELP: Record<string, string> = {
  Submitted: "Check the documents and candidate details, then mark them verified.",
  "Documents Verified": "Documents are verified. Allot a seat when the candidate confirms.",
  "Provisionally Admitted": "Seat reserved. Enrol the student to raise the fee invoice.",
  Enrolled: "Student record and fee invoice have been created.",
  Rejected: "This application was rejected. The candidate sees this status in their portal.",
};

export function ApplicationTracker({ application, staff = false }: { application: Application; staff?: boolean }) {
  const rejected = application.stage === "Rejected";
  const index = STAGE_FLOW.indexOf(application.stage);
  return (
    <div>
      <ol className="grid gap-3 sm:grid-cols-4">
        {STAGE_FLOW.map((stage, i) => {
          const done = !rejected && i < index;
          const current = !rejected && i === index;
          return (
            <li key={stage} className={`rounded-xl border p-3 ${current ? "border-primary bg-primary/[0.03]" : "border-line"}`}>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  done ? "bg-emerald-600 text-white" : current ? "bg-primary text-accent" : "bg-soft text-slate-400"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <p className={`mt-2 text-sm font-semibold ${current || done ? "text-primary" : "text-slate-400"}`}>{stage}</p>
              <p className="text-xs text-slate-500">{done ? "Completed" : current ? "Current step" : "Pending"}</p>
            </li>
          );
        })}
      </ol>
      <p className={`mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm ${rejected ? "bg-rose-50 text-rose-800" : "bg-soft text-slate-700"}`}>
        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
        {(staff ? STAFF_HELP : STAGE_HELP)[application.stage]}
      </p>
    </div>
  );
}

export default function StudentHome() {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const application = state.applications.find((a) => a.id === user.applicationId);
  const student = state.students.find((s) => s.id === user.studentId);
  const invoices = state.invoices.filter((i) => i.studentId === user.studentId);
  const totals = invoices.map(invoiceTotals);
  const balance = totals.reduce((s, t) => s + t.balance, 0);
  const nextDue = invoices.filter((i) => invoiceTotals(i).balance > 0).sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
  const collegeId = student?.collegeId ?? application?.collegeId;
  const notices = state.notices
    .filter((n) => n.audience !== "Staff" && (!n.collegeId || n.collegeId === collegeId))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);
  const pendingDocs = application?.documents.filter((d) => d.required && !d.verified) ?? [];

  return (
    <>
      <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} description={student ? `${student.rollNo} · ${programme(student.programmeId)?.name}, ${college(student.collegeId)?.shortName}` : "Track your admission for session 2026-27."} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Application" value={application?.stage ?? "Not started"} hint={application?.id} icon={ArrowRight} />
        <StatTile label="Fee balance" value={student ? inr(balance) : "—"} hint={nextDue ? `Due ${formatDate(nextDue.dueDate)}` : student ? "All fees paid" : "Invoice raised on enrolment"} icon={IndianRupee} tone={balance > 0 ? "gold" : "green"} />
        <StatTile label="Attendance" value={student ? `${student.attendance}%` : "—"} hint={student ? (student.attendance < 75 ? "Below the 75% requirement" : "Meets the 75% requirement") : "After enrolment"} icon={Check} tone={student && student.attendance < 75 ? "red" : "green"} />
      </div>

      {application ? (
        <Card
          title="Admission progress"
          description={`${programme(application.programmeId)?.name} · ${college(application.collegeId)?.name}`}
          className="mt-6"
          actions={
            <Link href="/dashboard/my-application" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent-dark">
              Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <ApplicationTracker application={application} />
          {pendingDocs.length ? (
            <p className="mt-3 text-sm text-slate-600">
              <strong className="text-primary">Pending documents:</strong> {pendingDocs.map((d) => d.name).join(", ")}
            </p>
          ) : null}
        </Card>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Fees" padded={!student} actions={student ? <Link href="/dashboard/my-fees" className="text-xs font-semibold text-primary hover:text-accent-dark">Fees & receipts →</Link> : undefined}>
          {student ? (
            invoices.length ? (
              <ul className="divide-y divide-line">
                {invoices.map((inv) => {
                  const t = invoiceTotals(inv);
                  return (
                    <li key={inv.id} className="flex items-center justify-between gap-3 px-5 py-3">
                      <span>
                        <span className="block text-sm font-semibold text-primary">{inv.title}</span>
                        <span className="text-xs text-slate-500">
                          Paid {inr(t.paid)} of {inr(t.payable)} · due {formatDate(inv.dueDate)}
                        </span>
                      </span>
                      <Badge>{t.status}</Badge>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState title="No invoices yet" />
            )
          ) : (
            <p className="text-sm text-slate-600">Your fee invoice is created when you&apos;re enrolled.</p>
          )}
        </Card>

        <Card title="Notices" padded={false} actions={<Link href="/dashboard/notices" className="text-xs font-semibold text-primary hover:text-accent-dark">All notices →</Link>}>
          <ul className="divide-y divide-line">
            {notices.map((n) => (
              <li key={n.id} className="px-5 py-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Megaphone className="h-4 w-4 shrink-0 text-accent-dark" />
                  {n.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{n.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {student ? (
        <Card title="My profile" className="mt-6">
          <KeyValue
            items={[
              { label: "Roll number", value: student.rollNo },
              { label: "Programme", value: `${programme(student.programmeId)?.name} · Year ${student.year}` },
              { label: "College", value: college(student.collegeId)?.name },
              { label: "Admission date", value: formatDate(student.admissionDate) },
              { label: "Mobile", value: student.phone },
              { label: "Email", value: student.email },
            ]}
          />
        </Card>
      ) : null}
    </>
  );
}
