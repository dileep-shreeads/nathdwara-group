"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ClipboardList, GraduationCap, IndianRupee, MessageSquare, PhoneCall } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import { BarList, ColumnChart, SplitBars } from "@/components/dashboard/charts";
import { Badge, Card, EmptyState, PageHeader, StatTile } from "@/components/dashboard/ui";
import StudentHome from "@/components/dashboard/StudentHome";
import { canAccess } from "@/lib/demo/permissions";
import { formatDateTime, inrCompact, invoiceTotals, lookups, scoped, timeAgo } from "@/lib/demo/selectors";

export default function OverviewPage() {
  const { user } = useDashboard();
  return user.role === "student" ? <StudentHome /> : <StaffOverview />;
}

function StaffOverview() {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const seeEnquiries = canAccess(user.role, "/dashboard/enquiries");
  const seeFees = canAccess(user.role, "/dashboard/fees");
  const seeApplications = canAccess(user.role, "/dashboard/applications");
  const [now] = useState(Date.now);

  const data = useMemo(() => {
    const enquiries = scoped(state.enquiries, user);
    const applications = scoped(state.applications, user);
    const students = scoped(state.students, user);
    const invoices = scoped(state.invoices, user);
    const monthAgo = now - 30 * 86_400_000;

    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now);
      d.setDate(1);
      d.setMonth(d.getMonth() - (11 - i));
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString("en-IN", { month: "short" }), year: d.getFullYear() };
    });
    const perMonth = months.map((m) => ({
      label: m.label,
      value: enquiries.filter((e) => {
        const d = new Date(e.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}` === m.key;
      }).length,
      detail: String(m.year),
    }));

    const totals = invoices.map(invoiceTotals);
    const collected = totals.reduce((s, t) => s + t.paid, 0);
    const outstanding = totals.reduce((s, t) => s + t.balance, 0);
    const overdue = totals.filter((t) => t.status === "Overdue").length;

    const intakeSeats = scoped(state.programmes, user).reduce((s, p) => s + p.seats, 0);
    const firstYear = students.filter((s) => s.year === 1).length;

    const funnel = [
      { label: "Enquiries", value: enquiries.length },
      { label: "Applications", value: applications.length },
      { label: "Documents verified", value: applications.filter((a) => ["Documents Verified", "Provisionally Admitted", "Enrolled"].includes(a.stage)).length },
      { label: "Admitted", value: applications.filter((a) => ["Provisionally Admitted", "Enrolled"].includes(a.stage)).length },
      { label: "Enrolled", value: applications.filter((a) => a.stage === "Enrolled").length },
    ];

    const sourceCounts = new Map<string, number>();
    enquiries.forEach((e) => sourceCounts.set(e.source, (sourceCounts.get(e.source) ?? 0) + 1));
    const sources = [...sourceCounts.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);

    const feeByCollege = state.colleges
      .filter((c) => invoices.some((i) => i.collegeId === c.id))
      .map((c) => {
        const t = invoices.filter((i) => i.collegeId === c.id).map(invoiceTotals);
        return { label: c.shortName, a: t.reduce((s, x) => s + x.paid, 0), b: t.reduce((s, x) => s + x.balance, 0) };
      })
      .sort((a, b) => b.a + b.b - (a.a + a.b));

    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);
    const followUps = enquiries
      .filter((e) => e.status === "Follow-up" && e.followUpAt && Date.parse(e.followUpAt) <= endOfToday.getTime())
      .sort((a, b) => a.followUpAt!.localeCompare(b.followUpAt!));
    const fresh = enquiries.filter((e) => e.status === "New");

    return {
      newEnquiries: enquiries.filter((e) => Date.parse(e.createdAt) >= monthAgo).length,
      fresh,
      pipeline: applications.filter((a) => ["Submitted", "Documents Verified", "Provisionally Admitted"].includes(a.stage)).length,
      toReview: applications.filter((a) => a.stage === "Submitted").length,
      firstYear,
      intakeSeats,
      collected,
      outstanding,
      overdue,
      perMonth,
      funnel,
      sources,
      feeByCollege,
      followUps,
    };
  }, [state, user, now]);

  const scopeLabel = user.collegeId ? college(user.collegeId)?.name : "all six colleges";
  const activity = state.activity
    .filter((a) => !a.href || canAccess(user.role, a.href.split("?")[0]))
    .slice(0, 8);

  return (
    <>
      <PageHeader
        title={`Good ${new Date(now).getHours() < 12 ? "morning" : new Date(now).getHours() < 17 ? "afternoon" : "evening"}, ${user.name.split(" ")[0]}`}
        description={`Admissions and campus snapshot for ${scopeLabel} · session 2026-27.`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {seeEnquiries ? <StatTile label="Enquiries · 30 days" value={String(data.newEnquiries)} hint={`${data.fresh.length} awaiting first call`} icon={MessageSquare} /> : null}
        {seeApplications ? <StatTile label="Applications in progress" value={String(data.pipeline)} hint={`${data.toReview} new to review`} icon={ClipboardList} tone="gold" /> : null}
        <StatTile label="First-year students" value={String(data.firstYear)} hint={`of ${data.intakeSeats} approved seats`} icon={GraduationCap} tone="green" />
        {seeFees ? <StatTile label="Fees collected" value={inrCompact(data.collected)} hint={`${inrCompact(data.outstanding)} outstanding · ${data.overdue} overdue`} icon={IndianRupee} tone="green" /> : null}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {seeEnquiries ? (
          <Card title="Enquiries per month" description="New leads received, last 12 months">
            <ColumnChart data={data.perMonth} valueLabel="enquiries" />
          </Card>
        ) : null}
        {seeApplications ? (
          <Card title="Admission funnel" description="This session, from first enquiry to enrolment">
            <BarList data={data.funnel} />
          </Card>
        ) : null}
        {seeFees ? (
          <Card title="Fee collection by college" description="Session 2026-27 invoices" className={seeEnquiries ? "" : "xl:col-span-2"}>
            <SplitBars data={data.feeByCollege} labels={["Collected", "Outstanding"]} format={inrCompact} />
          </Card>
        ) : null}
        {seeEnquiries ? (
          <Card title="Where leads come from" description="All enquiries by source">
            <BarList data={data.sources} />
          </Card>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {seeEnquiries ? (
          <Card
            title="Follow-ups due"
            description="Today and overdue"
            padded={false}
            actions={
              <Link href="/dashboard/enquiries" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent-dark">
                All enquiries <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          >
            {data.followUps.length === 0 ? (
              <EmptyState title="No follow-ups due" description="Leads scheduled for today will appear here." />
            ) : (
              <ul className="divide-y divide-line">
                {data.followUps.slice(0, 6).map((e) => (
                  <li key={e.id}>
                    <Link href={`/dashboard/enquiries?open=${e.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-soft">
                      <PhoneCall className="h-4 w-4 shrink-0 text-accent-dark" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-primary">{e.name}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {programme(e.programmeId)?.name ?? e.courseLabel ?? "Programme not chosen"} · {e.phone}
                        </span>
                      </span>
                      <span className={`shrink-0 text-xs font-semibold ${Date.parse(e.followUpAt!) < new Date(now).setHours(0, 0, 0, 0) ? "text-rose-700" : "text-slate-500"}`}>
                        {formatDateTime(e.followUpAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ) : null}

        <Card title="Recent activity" padded={false} className={seeEnquiries ? "" : "xl:col-span-2"}>
          {activity.length === 0 ? (
            <EmptyState title="No activity yet" />
          ) : (
            <ul className="divide-y divide-line">
              {activity.map((a) => {
                const body = (
                  <>
                    <span className="min-w-0 flex-1 text-sm text-slate-700">{a.text}</span>
                    <span className="shrink-0 text-xs text-slate-400">{timeAgo(a.at)}</span>
                  </>
                );
                return (
                  <li key={a.id}>
                    {a.href ? (
                      <Link href={a.href} className="flex items-start gap-3 px-5 py-3 hover:bg-soft">
                        {body}
                      </Link>
                    ) : (
                      <div className="flex items-start gap-3 px-5 py-3">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      {seeEnquiries && data.fresh.length > 0 ? (
        <Card title="New enquiries waiting for a call" className="mt-6" padded={false}>
          <ul className="divide-y divide-line">
            {data.fresh.slice(0, 5).map((e) => (
              <li key={e.id}>
                <Link href={`/dashboard/enquiries?open=${e.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 hover:bg-soft">
                  <span className="min-w-40 flex-1 text-sm font-semibold text-primary">{e.name}</span>
                  <span className="text-sm text-slate-600">{programme(e.programmeId)?.name ?? e.courseLabel ?? "—"}</span>
                  <span className="text-xs text-slate-500">{college(e.collegeId)?.shortName}</span>
                  <Badge>{e.source}</Badge>
                  <span className="text-xs text-slate-400">{timeAgo(e.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </>
  );
}
