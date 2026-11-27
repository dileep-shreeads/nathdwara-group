"use client";

import { useState } from "react";
import { Info, Smartphone } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import ReceiptModal from "@/components/dashboard/Receipt";
import { Badge, Button, Card, EmptyState, Field, FormError, Input, KeyValue, Modal, PageHeader, toast } from "@/components/dashboard/ui";
import { formatDate, formatDateTime, inr, invoiceTotals } from "@/lib/demo/selectors";
import { getState } from "@/lib/demo/store";
import type { Invoice } from "@/lib/demo/types";
import { recordPayment } from "@/lib/services";

export default function MyFeesPage() {
  const { user, state } = useDashboard();
  const invoices = state.invoices.filter((i) => i.studentId === user.studentId);
  const [paying, setPaying] = useState<Invoice | null>(null);
  const [receipt, setReceipt] = useState<{ invoiceId: string; paymentId: string } | null>(null);

  if (!user.studentId) {
    return (
      <>
        <PageHeader title="Fees & receipts" />
        <Card>
          <EmptyState title="No fees yet" description="Your fee invoice is created when your admission is confirmed and you're enrolled." />
        </Card>
      </>
    );
  }

  const receiptInvoice = receipt ? state.invoices.find((i) => i.id === receipt.invoiceId) : undefined;
  const receiptPayment = receiptInvoice?.payments.find((p) => p.id === receipt?.paymentId);

  return (
    <>
      <PageHeader title="Fees & receipts" description="Your tuition invoices, payments and downloadable receipts." />
      <div className="space-y-6">
        {invoices.map((inv) => {
          const t = invoiceTotals(inv);
          return (
            <Card
              key={inv.id}
              title={inv.title}
              description={`Session ${inv.session} · ${inv.id}`}
              actions={<Badge>{t.status}</Badge>}
            >
              <KeyValue
                items={[
                  { label: "Tuition fee", value: inr(inv.amount) },
                  { label: "Scholarship / concession", value: inv.scholarship ? `− ${inr(inv.scholarship)}` : "—" },
                  { label: "Payable", value: inr(t.payable) },
                  { label: "Paid", value: inr(t.paid) },
                  { label: "Balance", value: <span className={t.balance ? "text-rose-700" : "text-emerald-700"}>{inr(t.balance)}</span> },
                  { label: "Due date", value: formatDate(inv.dueDate) },
                ]}
              />
              {t.balance > 0 ? (
                <Button className="mt-5" variant="accent" onClick={() => setPaying(inv)}>
                  <Smartphone className="h-4 w-4" /> Pay {inr(t.balance)} online
                </Button>
              ) : null}

              <h3 className="mt-6 font-display text-sm font-bold text-primary">Payments</h3>
              {inv.payments.length === 0 ? (
                <p className="mt-2 text-sm text-slate-500">No payments yet.</p>
              ) : (
                <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
                  {[...inv.payments].reverse().map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <span>
                        <span className="block text-sm font-semibold tabular-nums text-primary">{inr(p.amount)}</span>
                        <span className="text-xs text-slate-500">
                          {p.mode} · {formatDateTime(p.paidAt)} · {p.receiptNo}
                        </span>
                      </span>
                      <Button size="sm" variant="secondary" onClick={() => setReceipt({ invoiceId: inv.id, paymentId: p.id })}>
                        Receipt
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>

      {paying ? (
        <PayModal
          key={paying.id}
          invoice={paying}
          onClose={() => setPaying(null)}
          onPaid={(paymentId) => {
            setPaying(null);
            setReceipt({ invoiceId: paying.id, paymentId });
          }}
        />
      ) : null}
      {receiptInvoice && receiptPayment ? <ReceiptModal state={state} invoice={receiptInvoice} payment={receiptPayment} onClose={() => setReceipt(null)} /> : null}
    </>
  );
}

function PayModal({ invoice, onClose, onPaid }: { invoice: Invoice; onClose: () => void; onPaid: (paymentId: string) => void }) {
  const balance = invoiceTotals(invoice).balance;
  const [amount, setAmount] = useState(String(balance));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pay = async () => {
    setError(null);
    setBusy(true);
    const result = await recordPayment(invoice.id, { amount: Number(amount), mode: "UPI", reference: `DEMO${Date.now().toString().slice(-9)}` });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    toast(`Payment successful · ${result.data.receiptNo}`);
    const paid = getState().invoices.find((i) => i.id === invoice.id)?.payments.find((p) => p.receiptNo === result.data.receiptNo);
    if (paid) onPaid(paid.id);
    else onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Pay fees online"
      description={`${invoice.title} · balance ${inr(balance)}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="accent" onClick={pay} loading={busy}>
            Pay with UPI
          </Button>
        </>
      }
    >
      <Field label="Amount (₹)" hint="You can pay in instalments.">
        {(id) => <Input id={id} type="number" min={1} max={balance} value={amount} onChange={(e) => setAmount(e.target.value)} />}
      </Field>
      <p className="mt-4 flex items-start gap-2 rounded-lg border border-dashed border-accent-dark/40 bg-accent/5 px-3 py-2.5 text-sm text-slate-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
        Demo mode — no money is charged. The live portal will open the payment gateway here.
      </p>
      <div className="mt-3">
        <FormError message={error} />
      </div>
    </Modal>
  );
}
