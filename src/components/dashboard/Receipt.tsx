"use client";

import { Printer } from "lucide-react";
import { Button, Modal } from "./ui";
import { formatDateTime, inr, invoiceTotals, lookups } from "@/lib/demo/selectors";
import type { DemoState, Invoice, Payment } from "@/lib/demo/types";

function amountInWords(value: number) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (n: number) => (n < 20 ? ones[n] : `${tens[Math.floor(n / 10)]}${n % 10 ? ` ${ones[n % 10]}` : ""}`);
  const three = (n: number) => `${n >= 100 ? `${ones[Math.floor(n / 100)]} Hundred${n % 100 ? " " : ""}` : ""}${n % 100 ? two(n % 100) : ""}`;
  let n = Math.round(value);
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 10_000_000);
  n %= 10_000_000;
  const lakh = Math.floor(n / 100_000);
  n %= 100_000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  if (crore) parts.push(`${two(crore)} Crore`);
  if (lakh) parts.push(`${two(lakh)} Lakh`);
  if (thousand) parts.push(`${two(thousand)} Thousand`);
  if (n) parts.push(three(n));
  return parts.join(" ");
}

export default function ReceiptModal({ state, invoice, payment, onClose }: { state: DemoState; invoice: Invoice; payment: Payment; onClose: () => void }) {
  const { college, programme, student: findStudent } = lookups(state);
  const student = findStudent(invoice.studentId)!;
  const c = college(invoice.collegeId)!;
  const paidUpTo = invoice.payments.filter((p) => p.paidAt <= payment.paidAt).reduce((s, p) => s + p.amount, 0);
  const balanceAfter = Math.max(invoiceTotals(invoice).payable - paidUpTo, 0);

  return (
    <Modal
      open
      onClose={onClose}
      title={`Receipt ${payment.receiptNo}`}
      wide
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </Button>
        </>
      }
    >
      <div className="print-area rounded-xl border border-line p-6 text-sm text-slate-800">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <img src="/ngi-logo.png" alt="" className="h-12 w-auto" />
            <div>
              <p className="font-display text-base font-bold text-primary">{c.name}</p>
              <p className="text-xs text-slate-500">Nathdwara Group of Institutions · Upali Odan, Nathdwara, Rajsamand 313301</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">Fee receipt</p>
            <p className="font-mono text-sm font-semibold">{payment.receiptNo}</p>
            <p className="text-xs text-slate-500">{formatDateTime(payment.paidAt)}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 py-4">
          <div><dt className="text-xs text-slate-500">Received from</dt><dd className="font-semibold">{student.name}</dd></div>
          <div><dt className="text-xs text-slate-500">Roll no.</dt><dd className="font-semibold">{student.rollNo}</dd></div>
          <div><dt className="text-xs text-slate-500">Programme</dt><dd className="font-semibold">{programme(student.programmeId)?.name} · Year {student.year}</dd></div>
          <div><dt className="text-xs text-slate-500">Session</dt><dd className="font-semibold">{invoice.session}</dd></div>
        </dl>

        <table className="w-full border-y border-line text-left">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-2 font-semibold">Particulars</th><th className="py-2 text-right font-semibold">Amount</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-line"><td className="py-2">{invoice.title}</td><td className="py-2 text-right tabular-nums">{inr(payment.amount)}</td></tr>
          </tbody>
          <tfoot>
            <tr className="border-t border-line font-bold"><td className="py-2">Total received</td><td className="py-2 text-right tabular-nums">{inr(payment.amount)}</td></tr>
          </tfoot>
        </table>

        <p className="mt-3 text-xs text-slate-600">
          <strong>In words:</strong> Rupees {amountInWords(payment.amount)} only
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-600 sm:grid-cols-4">
          <p><span className="block text-slate-400">Mode</span>{payment.mode}</p>
          <p><span className="block text-slate-400">Reference</span>{payment.reference ?? "—"}</p>
          <p><span className="block text-slate-400">Invoice total (after scholarship)</span>{inr(invoiceTotals(invoice).payable)}</p>
          <p><span className="block text-slate-400">Balance after this payment</span>{inr(balanceAfter)}</p>
        </div>
        <div className="mt-8 flex items-end justify-between text-xs text-slate-500">
          <p>Recorded by {payment.recordedBy}</p>
          <p className="border-t border-slate-300 pt-1">Authorised signatory</p>
        </div>
        <p className="mt-6 text-center text-[11px] text-slate-400">Demo receipt — computer generated, not valid for payment.</p>
      </div>
    </Modal>
  );
}
