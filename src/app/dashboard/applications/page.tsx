"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckSquare, Download, Square, XCircle } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import {
  Badge,
  Button,
  Card,
  DataTable,
  Drawer,
  Field,
  FilterTabs,
  FormError,
  Input,
  KeyValue,
  Modal,
  PageHeader,
  SearchBox,
  Select,
  Textarea,
  toast,
  useOpenParam,
  type Column,
} from "@/components/dashboard/ui";
import { ApplicationTracker } from "@/components/dashboard/StudentHome";
import { CAN } from "@/lib/demo/permissions";
import { downloadFile, formatDate, formatDateTime, inr, lookups, scoped, timeAgo, toCsv } from "@/lib/demo/selectors";
import type { Application, ApplicationStage } from "@/lib/demo/types";
import { addApplicationNote, seatsTaken, setApplicationStage, STAGE_FLOW, toggleDocument, updateApplication } from "@/lib/services";

const STAGES: ApplicationStage[] = [...STAGE_FLOW, "Rejected"];
const NEXT_LABEL: Partial<Record<ApplicationStage, string>> = {
  Submitted: "Mark documents verified",
  "Documents Verified": "Allot seat (provisional admission)",
  "Provisionally Admitted": "Enrol student & raise fee invoice",
};

export default function ApplicationsPage() {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const [view, setView] = useState<"list" | "seats">("list");
  const [stage, setStage] = useState<ApplicationStage | "All">("All");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useOpenParam((id: string) => {
    setView("list");
    setOpenId(id);
  });

  const all = useMemo(() => scoped(state.applications, user), [state.applications, user]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter(
        (a) =>
          (stage === "All" || a.stage === stage) &&
          (!collegeFilter || a.collegeId === collegeFilter) &&
          (!q || [a.candidateName, a.id, a.phone, a.email].some((f) => f?.toLowerCase().includes(q))),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [all, stage, collegeFilter, query]);

  const columns: Column<Application>[] = [
    {
      key: "candidate",
      header: "Candidate",
      render: (a) => (
        <span>
          <span className="block font-semibold text-primary">{a.candidateName}</span>
          <span className="block text-xs text-slate-500">
            {a.id} · {a.category}
          </span>
        </span>
      ),
    },
    {
      key: "programme",
      header: "Programme",
      render: (a) => (
        <span>
          <span className="block text-slate-700">{programme(a.programmeId)?.name}</span>
          <span className="block text-xs text-slate-500">{college(a.collegeId)?.shortName}</span>
        </span>
      ),
    },
    { key: "marks", header: "Marks", hideOnMobile: true, render: (a) => <span className="tabular-nums text-slate-700">{a.qualifyingMarks ? `${a.qualifyingMarks}%` : "—"}</span> },
    {
      key: "docs",
      header: "Documents",
      hideOnMobile: true,
      render: (a) => {
        const req = a.documents.filter((d) => d.required);
        const ok = req.filter((d) => d.verified).length;
        return <span className={ok === req.length ? "text-emerald-700" : "text-slate-600"}>{ok}/{req.length} verified</span>;
      },
    },
    { key: "stage", header: "Stage", render: (a) => <Badge>{a.stage}</Badge> },
    { key: "updated", header: "Updated", hideOnMobile: true, render: (a) => <span className="whitespace-nowrap text-slate-500">{timeAgo(a.updatedAt)}</span> },
  ];

  const exportCsv = () =>
    downloadFile(
      `ngi-applications-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(
        filtered.map((a) => ({
          "Application no.": a.id,
          Candidate: a.candidateName,
          Gender: a.gender,
          Category: a.category,
          Phone: a.phone,
          Email: a.email,
          College: college(a.collegeId)?.shortName,
          Programme: programme(a.programmeId)?.name,
          "Marks %": a.qualifyingMarks || "",
          Stage: a.stage,
          Applied: formatDate(a.createdAt),
        })),
      ),
    );

  const active = state.applications.find((a) => a.id === openId);

  return (
    <>
      <PageHeader
        title="Applications"
        description="Verify documents, allot seats and enrol students. Enrolling creates the student record and fee invoice."
        actions={
          <>
            <FilterTabs value={view} onChange={setView} options={[{ value: "list", label: "Applications" }, { value: "seats", label: "Seat matrix" }]} />
            <Button variant="secondary" onClick={exportCsv}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </>
        }
      />

      {view === "seats" ? (
        <SeatMatrix />
      ) : (
        <Card padded={false}>
          <div className="flex flex-col gap-3 border-b border-line p-4">
            <FilterTabs
              value={stage}
              onChange={setStage}
              options={[{ value: "All" as const, label: "All", count: all.length }, ...STAGES.map((s) => ({ value: s, label: s, count: all.filter((a) => a.stage === s).length }))]}
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <SearchBox value={query} onChange={setQuery} placeholder="Search name, application no., phone…" />
              {!user.collegeId ? (
                <Select aria-label="College" value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} placeholder="All colleges" options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))} className="sm:max-w-44" />
              ) : null}
            </div>
          </div>
          <DataTable key={`${stage}-${collegeFilter}-${query}`} rows={filtered} columns={columns} onRowClick={(a) => setOpenId(a.id)} />
        </Card>
      )}

      {active ? <ApplicationDrawer key={active.id} application={active} onClose={() => setOpenId(null)} /> : null}
    </>
  );
}

function SeatMatrix() {
  const { user, state } = useDashboard();
  const { college } = lookups(state);
  const programmes = scoped(state.programmes, user);
  return (
    <Card title="Seat matrix · 2026-27" description="Provisional and enrolled admissions against approved intake." padded={false}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-soft/70 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Seats</th>
              <th className="px-4 py-3 font-semibold">Filled</th>
              <th className="px-4 py-3 font-semibold">Available</th>
              <th className="w-[30%] px-4 py-3 font-semibold">Fill rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {programmes.map((p) => {
              const taken = seatsTaken(state, p.id);
              const pct = Math.round((taken / p.seats) * 100);
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <span className="block font-semibold text-primary">{p.name}</span>
                    <span className="block text-xs text-slate-500">
                      {college(p.collegeId)?.shortName} · {p.annualFee ? `${inr(p.annualFee)}/yr` : "No fee"}
                    </span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{p.seats}</td>
                  <td className="px-4 py-3 tabular-nums font-semibold">{taken}</td>
                  <td className="px-4 py-3 tabular-nums">{Math.max(p.seats - taken, 0)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-soft">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: "#2e4bb0" }} />
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums text-slate-600">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ApplicationDrawer({ application, onClose }: { application: Application; onClose: () => void }) {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const editable = CAN.moveApplications(user.role) && application.stage !== "Enrolled" && application.stage !== "Rejected";
  const [details, setDetails] = useState({ dob: application.dob, qualifyingMarks: application.qualifyingMarks, category: application.category, gender: application.gender });
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const next = STAGE_FLOW[STAGE_FLOW.indexOf(application.stage) + 1];
  const detailsDirty =
    details.dob !== application.dob || details.qualifyingMarks !== application.qualifyingMarks || details.category !== application.category || details.gender !== application.gender;

  const saveDetails = async () => {
    setBusy("details");
    await updateApplication(application.id, details);
    setBusy(null);
    toast("Candidate details saved");
  };

  const advance = async () => {
    if (!next) return;
    setError(null);
    if (detailsDirty) await updateApplication(application.id, details);
    setBusy("advance");
    const result = await setApplicationStage(application.id, next);
    setBusy(null);
    if (!result.ok) return setError(result.error);
    toast(next === "Enrolled" ? "Student enrolled and fee invoice raised" : `Moved to ${next}`);
  };

  const reject = async () => {
    if (!reason.trim()) return;
    setBusy("reject");
    const result = await setApplicationStage(application.id, "Rejected", reason.trim());
    setBusy(null);
    setRejecting(false);
    if (!result.ok) return setError(result.error);
    toast("Application rejected");
  };

  return (
    <Drawer
      open
      onClose={onClose}
      title={application.candidateName}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          {application.id} <Badge>{application.stage}</Badge>
        </span>
      }
      footer={
        editable ? (
          <>
            {next ? (
              <Button onClick={advance} loading={busy === "advance"}>
                {NEXT_LABEL[application.stage]} <ArrowRight className="h-4 w-4" />
              </Button>
            ) : null}
            <Button variant="danger" onClick={() => setRejecting(true)}>
              <XCircle className="h-4 w-4" /> Reject
            </Button>
          </>
        ) : application.studentId ? (
          <Link href={`/dashboard/students?open=${application.studentId}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">
            Open student record <ArrowRight className="h-4 w-4" />
          </Link>
        ) : undefined
      }
    >
      <ApplicationTracker application={application} staff />
      <div className="mt-3">
        <FormError message={error} />
      </div>

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Candidate</h3>
      <div className="mt-3">
        <KeyValue
          items={[
            { label: "Programme", value: programme(application.programmeId)?.name },
            { label: "College", value: college(application.collegeId)?.name },
            { label: "Mobile", value: application.phone },
            { label: "Email", value: application.email },
            { label: "Town", value: application.town },
            { label: "Applied", value: formatDateTime(application.createdAt) },
          ]}
        />
      </div>
      {editable ? (
        <div className="mt-4 grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-2">
          <Field label="Date of birth">
            {(id) => <Input id={id} type="date" value={details.dob} onChange={(e) => setDetails({ ...details, dob: e.target.value })} />}
          </Field>
          <Field label="Qualifying marks (%)">
            {(id) => <Input id={id} type="number" min={0} max={100} value={details.qualifyingMarks || ""} onChange={(e) => setDetails({ ...details, qualifyingMarks: Number(e.target.value) })} />}
          </Field>
          <Field label="Category">
            {(id) => <Select id={id} value={details.category} onChange={(e) => setDetails({ ...details, category: e.target.value as Application["category"] })} options={["General", "OBC", "SC", "ST", "EWS"].map((c) => ({ value: c, label: c }))} />}
          </Field>
          <Field label="Gender">
            {(id) => <Select id={id} value={details.gender} onChange={(e) => setDetails({ ...details, gender: e.target.value as Application["gender"] })} options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} />}
          </Field>
          <Button size="sm" variant="secondary" className="sm:col-span-2 sm:justify-self-end" disabled={!detailsDirty} loading={busy === "details"} onClick={saveDetails}>
            Save details
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <KeyValue
            items={[
              { label: "Date of birth", value: formatDate(application.dob) },
              { label: "Qualifying marks", value: application.qualifyingMarks ? `${application.qualifyingMarks}%` : "—" },
              { label: "Category", value: application.category },
              { label: "Gender", value: application.gender },
            ]}
          />
        </div>
      )}

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Document checklist</h3>
      <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
        {application.documents.map((doc) => (
          <li key={doc.name}>
            <button
              type="button"
              disabled={!editable}
              onClick={() => toggleDocument(application.id, doc.name)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-soft disabled:cursor-default disabled:hover:bg-transparent"
              aria-pressed={doc.verified}
            >
              {doc.verified ? <CheckSquare className="h-5 w-5 shrink-0 text-emerald-600" /> : <Square className="h-5 w-5 shrink-0 text-slate-300" />}
              <span className="flex-1 text-slate-700">{doc.name}</span>
              <span className="text-xs text-slate-400">{doc.required ? "Required" : "Optional"}</span>
            </button>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Notes</h3>
      {CAN.moveApplications(user.role) ? (
        <div className="mt-3 flex flex-col gap-2">
          <Textarea aria-label="Add a note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for the admissions team" />
          <Button
            size="sm"
            variant="secondary"
            className="self-end"
            disabled={!note.trim()}
            loading={busy === "note"}
            onClick={async () => {
              setBusy("note");
              await addApplicationNote(application.id, note.trim());
              setBusy(null);
              setNote("");
            }}
          >
            Add note
          </Button>
        </div>
      ) : null}
      {application.notes.length ? (
        <ol className="mt-4 space-y-3">
          {application.notes.map((n, i) => (
            <li key={`${n.at}-${i}`} className="rounded-lg bg-soft px-3 py-2">
              <p className="text-sm text-slate-700">{n.text}</p>
              <p className="text-xs text-slate-400">
                {n.by} · {formatDateTime(n.at)}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 text-sm text-slate-500">No notes yet.</p>
      )}
      {application.enquiryId ? (
        <p className="mt-4 text-xs text-slate-500">
          Came from enquiry{" "}
          <Link href={`/dashboard/enquiries?open=${application.enquiryId}`} className="font-semibold text-primary hover:underline">
            {application.enquiryId}
          </Link>
        </p>
      ) : null}

      <Modal
        open={rejecting}
        onClose={() => setRejecting(false)}
        title="Reject application"
        description="The candidate will see this status in their portal."
        footer={
          <>
            <Button variant="secondary" onClick={() => setRejecting(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={reject} disabled={!reason.trim()} loading={busy === "reject"}>
              Reject application
            </Button>
          </>
        }
      >
        <Field label="Reason" required>
          {(id) => <Textarea id={id} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Below minimum eligibility marks" />}
        </Field>
      </Modal>
    </Drawer>
  );
}
