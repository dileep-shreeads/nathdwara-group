"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import {
  Badge,
  Button,
  Card,
  DataTable,
  Drawer,
  Field,
  Input,
  KeyValue,
  PageHeader,
  SearchBox,
  Select,
  toast,
  useOpenParam,
  type Column,
} from "@/components/dashboard/ui";
import { downloadFile, formatDate, inr, invoiceTotals, lookups, scoped, toCsv, type InvoiceStatus } from "@/lib/demo/selectors";
import type { Student } from "@/lib/demo/types";
import { updateStudent } from "@/lib/services";

export default function StudentsPage() {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const [query, setQuery] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [year, setYear] = useState("");
  const [fee, setFee] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  useOpenParam((id: string) => setOpenId(id));

  const feeStatus = new Map<string, InvoiceStatus>();
  state.invoices.forEach((inv) => feeStatus.set(inv.studentId, invoiceTotals(inv).status));

  const all = useMemo(() => scoped(state.students, user), [state.students, user]);
  const q = query.trim().toLowerCase();
  const filtered = all.filter(
      (s) =>
        (!collegeFilter || s.collegeId === collegeFilter) &&
        (!year || s.year === Number(year)) &&
        (!fee || feeStatus.get(s.id) === fee) &&
        (!q || [s.name, s.rollNo, s.phone, s.email, s.town].some((f) => f.toLowerCase().includes(q))),
  );

  const columns: Column<Student>[] = [
    {
      key: "name",
      header: "Student",
      render: (s) => (
        <span>
          <span className="block font-semibold text-primary">{s.name}</span>
          <span className="block text-xs text-slate-500">{s.rollNo}</span>
        </span>
      ),
    },
    {
      key: "programme",
      header: "Programme",
      render: (s) => (
        <span>
          <span className="block text-slate-700">{programme(s.programmeId)?.name}</span>
          <span className="block text-xs text-slate-500">
            {college(s.collegeId)?.shortName} · Year {s.year}
          </span>
        </span>
      ),
    },
    { key: "phone", header: "Mobile", hideOnMobile: true, render: (s) => <span className="whitespace-nowrap text-slate-600">{s.phone}</span> },
    {
      key: "attendance",
      header: "Attendance",
      hideOnMobile: true,
      render: (s) => <span className={`tabular-nums ${s.attendance < 75 ? "font-semibold text-rose-700" : "text-slate-700"}`}>{s.attendance}%</span>,
    },
    { key: "fee", header: "Fees", render: (s) => (feeStatus.get(s.id) ? <Badge>{feeStatus.get(s.id)!}</Badge> : <span className="text-slate-400">—</span>) },
    { key: "status", header: "Status", hideOnMobile: true, render: (s) => <Badge>{s.status}</Badge> },
  ];

  const exportCsv = () =>
    downloadFile(
      `ngi-students-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(
        filtered.map((s) => ({
          "Roll no.": s.rollNo,
          Name: s.name,
          Gender: s.gender,
          Category: s.category,
          College: college(s.collegeId)?.shortName,
          Programme: programme(s.programmeId)?.name,
          Year: s.year,
          Mobile: s.phone,
          Email: s.email,
          Guardian: s.guardianName,
          Town: s.town,
          "Attendance %": s.attendance,
          "Fee status": feeStatus.get(s.id) ?? "",
          Status: s.status,
        })),
      ),
    );

  const active = state.students.find((s) => s.id === openId);
  const lowAttendance = all.filter((s) => s.attendance < 75).length;

  return (
    <>
      <PageHeader
        title="Students"
        description={`${all.length} students${user.collegeId ? ` in ${college(user.collegeId)?.shortName}` : " across all colleges"} · ${lowAttendance} below 75% attendance.`}
        actions={
          <Button variant="secondary" onClick={exportCsv}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />
      <Card padded={false}>
        <div className="flex flex-col gap-2 border-b border-line p-4 lg:flex-row">
          <SearchBox value={query} onChange={setQuery} placeholder="Search name, roll no., mobile…" />
          {!user.collegeId ? (
            <Select aria-label="College" value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} placeholder="All colleges" options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))} className="lg:max-w-40" />
          ) : null}
          <Select aria-label="Year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="All years" options={[1, 2, 3, 4].map((y) => ({ value: String(y), label: `Year ${y}` }))} className="lg:max-w-36" />
          <Select aria-label="Fee status" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Any fee status" options={["Paid", "Partially paid", "Due", "Overdue"].map((s) => ({ value: s, label: s }))} className="lg:max-w-44" />
        </div>
        <DataTable key={`${collegeFilter}-${year}-${fee}-${query}`} rows={filtered} columns={columns} onRowClick={(s) => setOpenId(s.id)} />
      </Card>
      {active ? <StudentDrawer key={active.id} student={active} onClose={() => setOpenId(null)} /> : null}
    </>
  );
}

function StudentDrawer({ student, onClose }: { student: Student; onClose: () => void }) {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const editable = user.role === "super_admin" || user.role === "college_admin";
  const [form, setForm] = useState({ phone: student.phone, email: student.email, guardianName: student.guardianName, town: student.town, status: student.status });
  const [busy, setBusy] = useState(false);
  const invoices = state.invoices.filter((i) => i.studentId === student.id);
  const dirty = JSON.stringify(form) !== JSON.stringify({ phone: student.phone, email: student.email, guardianName: student.guardianName, town: student.town, status: student.status });

  return (
    <Drawer
      open
      onClose={onClose}
      title={student.name}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          {student.rollNo} <Badge>{student.status}</Badge>
        </span>
      }
      footer={
        editable ? (
          <Button
            disabled={!dirty}
            loading={busy}
            onClick={async () => {
              setBusy(true);
              await updateStudent(student.id, form);
              setBusy(false);
              toast("Student record updated");
            }}
          >
            Save changes
          </Button>
        ) : undefined
      }
    >
      <KeyValue
        items={[
          { label: "Programme", value: `${programme(student.programmeId)?.name} · Year ${student.year}` },
          { label: "College", value: college(student.collegeId)?.name },
          { label: "Admission date", value: formatDate(student.admissionDate) },
          { label: "Category", value: student.category },
          { label: "Gender", value: student.gender },
          { label: "Attendance", value: <span className={student.attendance < 75 ? "text-rose-700" : ""}>{student.attendance}%{student.attendance < 75 ? " — below 75%" : ""}</span> },
        ]}
      />

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Contact</h3>
      {editable ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Mobile">{(id) => <Input id={id} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />}</Field>
          <Field label="Email">{(id) => <Input id={id} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />}</Field>
          <Field label="Guardian">{(id) => <Input id={id} value={form.guardianName} onChange={(e) => setForm({ ...form, guardianName: e.target.value })} />}</Field>
          <Field label="Town">{(id) => <Input id={id} value={form.town} onChange={(e) => setForm({ ...form, town: e.target.value })} />}</Field>
          <Field label="Status">
            {(id) => <Select id={id} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Student["status"] })} options={["Active", "On Leave", "Passed Out"].map((s) => ({ value: s, label: s }))} />}
          </Field>
        </div>
      ) : (
        <div className="mt-3">
          <KeyValue items={[{ label: "Mobile", value: student.phone }, { label: "Email", value: student.email }, { label: "Guardian", value: student.guardianName }, { label: "Town", value: student.town }]} />
        </div>
      )}

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Fees</h3>
      <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
        {invoices.length === 0 ? <li className="px-4 py-3 text-sm text-slate-500">No invoices.</li> : null}
        {invoices.map((inv) => {
          const t = invoiceTotals(inv);
          return (
            <li key={inv.id}>
              <Link href={`/dashboard/fees?open=${inv.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-soft">
                <span>
                  <span className="block text-sm font-semibold text-primary">{inv.title}</span>
                  <span className="text-xs text-slate-500">
                    Paid {inr(t.paid)} of {inr(t.payable)} · balance {inr(t.balance)}
                  </span>
                </span>
                <Badge>{t.status}</Badge>
              </Link>
            </li>
          );
        })}
      </ul>
      {student.applicationId ? (
        <p className="mt-4 text-xs text-slate-500">
          Admitted through application{" "}
          <Link href={`/dashboard/applications?open=${student.applicationId}`} className="font-semibold text-primary hover:underline">
            {student.applicationId}
          </Link>
        </p>
      ) : null}
    </Drawer>
  );
}
