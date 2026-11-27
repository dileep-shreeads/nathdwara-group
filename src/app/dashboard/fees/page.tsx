"use client";

import { useState } from "react";
import { AlertTriangle, Download, HandCoins, IndianRupee, Receipt, Wallet } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import ReceiptModal from "@/components/dashboard/Receipt";
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
  PageHeader,
  SearchBox,
  Select,
  StatTile,
  toast,
  useOpenParam,
  type Column,
} from "@/components/dashboard/ui";
import { CAN } from "@/lib/demo/permissions";
import { downloadFile, formatDate, formatDateTime, inr, inrCompact, invoiceTotals, lookups, scoped, toCsv, type InvoiceStatus } from "@/lib/demo/selectors";
import type { Invoice, Payment, PaymentMode } from "@/lib/demo/types";
import { recordPayment, setScholarship } from "@/lib/services";

const MODES: PaymentMode[] = ["UPI", "Cash", "Bank transfer", "Demand draft"];

export default function FeesPage() {
  const { user, state } = useDashboard();
  const { college, student } = lookups(state);
  const [view, setView] = useState<"invoices" | "payments">("invoices");
  const [status, setStatus] = useState<InvoiceStatus | "All">("All");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ invoiceId: string; paymentId: string } | null>(null);
  useOpenParam((id: string) => {
    setView("invoices");
    setOpenId(id);
  });

  const invoices = scoped(state.invoices, user).map((inv) => ({ ...inv, totals: invoiceTotals(inv) }));
  const kpis = (() => {
    const sum = (f: (t: (typeof invoices)[number]["totals"]) => number) => invoices.reduce((s, i) => s + f(i.totals), 0);
    return {
      billed: sum((t) => t.payable),
      collected: sum((t) => t.paid),
      outstanding: sum((t) => t.balance),
      scholarship: invoices.reduce((s, i) => s + i.scholarship, 0),
      overdue: invoices.filter((i) => i.totals.status === "Overdue"),
    };
  })();

  const matches = (inv: Invoice) => {
    const q = query.trim().toLowerCase();
    const s = student(inv.studentId);
    return (!collegeFilter || inv.collegeId === collegeFilter) && (!q || [s?.name, s?.rollNo, inv.id].some((f) => f?.toLowerCase().includes(q)));
  };
  const filteredInvoices = invoices.filter((inv) => (status === "All" || inv.totals.status === status) && matches(inv));
  const payments = invoices
    .filter(matches)
    .flatMap((inv) => inv.payments.map((p) => ({ ...p, id: p.id, invoiceId: inv.id, studentId: inv.studentId, collegeId: inv.collegeId })))
    .sort((a, b) => b.paidAt.localeCompare(a.paidAt));

  const invoiceColumns: Column<(typeof invoices)[number]>[] = [
    {
      key: "student",
      header: "Student",
      render: (inv) => (
        <span>
          <span className="block font-semibold text-primary">{student(inv.studentId)?.name}</span>
          <span className="block text-xs text-slate-500">
            {student(inv.studentId)?.rollNo} · {college(inv.collegeId)?.shortName}
          </span>
        </span>
      ),
    },
    { key: "title", header: "Invoice", hideOnMobile: true, render: (inv) => <span className="text-slate-700">{inv.title}</span> },
    { key: "payable", header: "Payable", hideOnMobile: true, className: "text-right", render: (inv) => <span className="tabular-nums">{inr(inv.totals.payable)}</span> },
    { key: "paid", header: "Paid", hideOnMobile: true, className: "text-right", render: (inv) => <span className="tabular-nums text-slate-600">{inr(inv.totals.paid)}</span> },
    { key: "balance", header: "Balance", className: "text-right", render: (inv) => <span className="font-semibold tabular-nums">{inr(inv.totals.balance)}</span> },
    { key: "due", header: "Due", hideOnMobile: true, render: (inv) => <span className="whitespace-nowrap text-slate-600">{formatDate(inv.dueDate)}</span> },
    { key: "status", header: "Status", render: (inv) => <Badge>{inv.totals.status}</Badge> },
  ];

  const paymentColumns: Column<(typeof payments)[number]>[] = [
    { key: "receipt", header: "Receipt", render: (p) => <span className="font-mono text-xs font-semibold text-primary">{p.receiptNo}</span> },
    { key: "student", header: "Student", render: (p) => <span className="text-slate-700">{student(p.studentId)?.name}</span> },
    { key: "amount", header: "Amount", className: "text-right", render: (p) => <span className="font-semibold tabular-nums">{inr(p.amount)}</span> },
    { key: "mode", header: "Mode", hideOnMobile: true, render: (p) => <span className="text-slate-600">{p.mode}</span> },
    { key: "date", header: "Date", hideOnMobile: true, render: (p) => <span className="whitespace-nowrap text-slate-600">{formatDateTime(p.paidAt)}</span> },
    { key: "by", header: "Recorded by", hideOnMobile: true, render: (p) => <span className="text-slate-500">{p.recordedBy}</span> },
  ];

  const exportCsv = () => {
    const date = new Date().toISOString().slice(0, 10);
    if (view === "payments") {
      downloadFile(
        `ngi-receipts-${date}.csv`,
        toCsv(payments.map((p) => ({ "Receipt no.": p.receiptNo, Student: student(p.studentId)?.name, "Roll no.": student(p.studentId)?.rollNo, College: college(p.collegeId)?.shortName, Amount: p.amount, Mode: p.mode, Reference: p.reference, Date: formatDateTime(p.paidAt), "Recorded by": p.recordedBy }))),
      );
    } else {
      downloadFile(
        `ngi-fee-invoices-${date}.csv`,
        toCsv(filteredInvoices.map((inv) => ({ Invoice: inv.id, Student: student(inv.studentId)?.name, "Roll no.": student(inv.studentId)?.rollNo, College: college(inv.collegeId)?.shortName, Title: inv.title, Amount: inv.amount, Scholarship: inv.scholarship, Paid: inv.totals.paid, Balance: inv.totals.balance, Due: inv.dueDate, Status: inv.totals.status }))),
      );
    }
  };

  const active = state.invoices.find((i) => i.id === openId);
  const receiptInvoice = receipt ? state.invoices.find((i) => i.id === receipt.invoiceId) : undefined;
  const receiptPayment = receiptInvoice?.payments.find((p) => p.id === receipt?.paymentId);

  return (
    <>
      <PageHeader
        title="Fees & receipts"
        description="Session 2026-27 tuition invoices, collections, scholarships and receipts."
        actions={
          <>
            <FilterTabs value={view} onChange={setView} options={[{ value: "invoices", label: "Invoices" }, { value: "payments", label: "Receipts" }]} />
            <Button variant="secondary" onClick={exportCsv}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Billed (after scholarship)" value={inrCompact(kpis.billed)} hint={`${inrCompact(kpis.scholarship)} scholarships`} icon={Receipt} />
        <StatTile label="Collected" value={inrCompact(kpis.collected)} hint={`${kpis.billed ? Math.round((kpis.collected / kpis.billed) * 100) : 0}% of billed`} icon={Wallet} tone="green" />
        <StatTile label="Outstanding" value={inrCompact(kpis.outstanding)} hint={`${invoices.filter((i) => i.totals.balance > 0).length} students with a balance`} icon={IndianRupee} tone="gold" />
        <StatTile label="Overdue" value={String(kpis.overdue.length)} hint={inrCompact(kpis.overdue.reduce((s, i) => s + i.totals.balance, 0)) + " past due date"} icon={AlertTriangle} tone="red" />
      </div>

      <Card padded={false}>
        <div className="flex flex-col gap-3 border-b border-line p-4">
          {view === "invoices" ? (
            <FilterTabs
              value={status}
              onChange={setStatus}
              options={[{ value: "All" as const, label: "All", count: invoices.length }, ...(["Overdue", "Due", "Partially paid", "Paid"] as InvoiceStatus[]).map((s) => ({ value: s, label: s, count: invoices.filter((i) => i.totals.status === s).length }))]}
            />
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchBox value={query} onChange={setQuery} placeholder="Search student, roll no., invoice…" />
            {!user.collegeId ? (
              <Select aria-label="College" value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} placeholder="All colleges" options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))} className="sm:max-w-44" />
            ) : null}
          </div>
        </div>
        {view === "invoices" ? (
          <DataTable key={`i-${status}-${collegeFilter}-${query}`} rows={filteredInvoices} columns={invoiceColumns} onRowClick={(inv) => setOpenId(inv.id)} />
        ) : (
          <DataTable key={`p-${collegeFilter}-${query}`} rows={payments} columns={paymentColumns} onRowClick={(p) => setReceipt({ invoiceId: p.invoiceId, paymentId: p.id })} />
        )}
      </Card>

      {active ? <InvoiceDrawer key={active.id} invoice={active} onClose={() => setOpenId(null)} onReceipt={(p) => setReceipt({ invoiceId: active.id, paymentId: p.id })} /> : null}
      {receiptInvoice && receiptPayment ? <ReceiptModal state={state} invoice={receiptInvoice} payment={receiptPayment} onClose={() => setReceipt(null)} /> : null}
    </>
  );
}

function InvoiceDrawer({ invoice, onClose, onReceipt }: { invoice: Invoice; onClose: () => void; onReceipt: (payment: Payment) => void }) {
  const { user, state } = useDashboard();
  const { college, programme, student: findStudent } = lookups(state);
  const student = findStudent(invoice.studentId)!;
  const totals = invoiceTotals(invoice);
  const canRecord = CAN.recordPayments(user.role);
  const [amount, setAmount] = useState(String(totals.balance));
  const [mode, setMode] = useState<PaymentMode>("UPI");
  const [reference, setReference] = useState("");
  const [scholarship, setScholarshipValue] = useState(String(invoice.scholarship));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setBusy("pay");
    const result = await recordPayment(invoice.id, { amount: Number(amount), mode, reference });
    setBusy(null);
    if (!result.ok) return setError(result.error);
    toast(`Payment recorded · ${result.data.receiptNo}`);
    setReference("");
    const fresh = state.invoices.find((i) => i.id === invoice.id);
    const remaining = fresh ? invoiceTotals(fresh).balance - Number(amount) : 0;
    setAmount(String(Math.max(remaining, 0)));
  };

  const saveScholarship = async () => {
    setError(null);
    setBusy("sch");
    const result = await setScholarship(invoice.id, Number(scholarship));
    setBusy(null);
    if (!result.ok) return setError(result.error);
    toast("Scholarship updated");
  };

  return (
    <Drawer
      open
      onClose={onClose}
      title={student.name}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          {invoice.id} · {student.rollNo} <Badge>{totals.status}</Badge>
        </span>
      }
    >
      <KeyValue
        items={[
          { label: "Invoice", value: invoice.title },
          { label: "Programme", value: `${programme(student.programmeId)?.name} · ${college(invoice.collegeId)?.shortName}` },
          { label: "Fee", value: inr(invoice.amount) },
          { label: "Scholarship", value: inr(invoice.scholarship) },
          { label: "Paid", value: inr(totals.paid) },
          { label: "Balance", value: <span className={totals.balance ? "text-rose-700" : "text-emerald-700"}>{inr(totals.balance)}</span> },
          { label: "Due date", value: formatDate(invoice.dueDate) },
          { label: "Session", value: invoice.session },
        ]}
      />

      {canRecord && totals.balance > 0 ? (
        <div className="mt-6 rounded-xl border border-line p-4">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold text-primary">
            <HandCoins className="h-4 w-4 text-accent-dark" /> Record a payment
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field label="Amount (₹)" required>
              {(id) => <Input id={id} type="number" min={1} max={totals.balance} value={amount} onChange={(e) => setAmount(e.target.value)} />}
            </Field>
            <Field label="Mode" required>
              {(id) => <Select id={id} value={mode} onChange={(e) => setMode(e.target.value as PaymentMode)} options={MODES.map((m) => ({ value: m, label: m }))} />}
            </Field>
            <div className="sm:col-span-2">
              <Field label={mode === "Demand draft" ? "DD number" : "UTR / transaction ID"} required={mode !== "Cash"} hint={mode === "Cash" ? "Optional for cash." : undefined}>
                {(id) => <Input id={id} value={reference} onChange={(e) => setReference(e.target.value)} />}
              </Field>
            </div>
          </div>
          <Button className="mt-3" onClick={submit} loading={busy === "pay"}>
            Record payment & generate receipt
          </Button>
        </div>
      ) : null}

      {canRecord ? (
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-line p-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Field label="Scholarship / concession (₹)" hint="e.g. SJE post-matric, merit or girl-child concession">
              {(id) => <Input id={id} type="number" min={0} value={scholarship} onChange={(e) => setScholarshipValue(e.target.value)} />}
            </Field>
          </div>
          <Button variant="secondary" onClick={saveScholarship} loading={busy === "sch"} disabled={Number(scholarship) === invoice.scholarship}>
            Apply
          </Button>
        </div>
      ) : null}
      <div className="mt-3">
        <FormError message={error} />
      </div>

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Payments</h3>
      {invoice.payments.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">No payments yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
          {[...invoice.payments].reverse().map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <span>
                <span className="block text-sm font-semibold tabular-nums text-primary">{inr(p.amount)}</span>
                <span className="text-xs text-slate-500">
                  {p.mode} · {formatDateTime(p.paidAt)} · {p.receiptNo}
                </span>
              </span>
              <Button size="sm" variant="secondary" onClick={() => onReceipt(p)}>
                Receipt
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
