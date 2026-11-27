"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Info, Pencil } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import { Badge, Button, Card, Field, FormError, Input, Modal, PageHeader, toast } from "@/components/dashboard/ui";
import { CAN } from "@/lib/demo/permissions";
import { OFFICIAL_FEE_COLLEGES } from "@/lib/demo/seed";
import { inr, inrCompact, invoiceTotals, scoped } from "@/lib/demo/selectors";
import type { Programme } from "@/lib/demo/types";
import { seatsTaken, updateProgramme } from "@/lib/services";

export default function CollegesPage() {
  const { user, state } = useDashboard();
  const [editing, setEditing] = useState<Programme | null>(null);
  const colleges = user.collegeId ? state.colleges.filter((c) => c.id === user.collegeId) : state.colleges;
  const canEdit = CAN.editProgrammes(user.role);

  return (
    <>
      <PageHeader title="Colleges & programmes" description="Constituent colleges, approved intake and annual tuition for session 2026-27." />

      <p className="mb-6 flex items-start gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm text-slate-600">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        NIBM seats and fees are the official published figures. Other colleges show illustrative demo values until the colleges confirm them.
      </p>

      <div className="space-y-6">
        {colleges.map((c) => {
          const programmes = scoped(state.programmes, user).filter((p) => p.collegeId === c.id);
          const students = state.students.filter((s) => s.collegeId === c.id).length;
          const enquiries = state.enquiries.filter((e) => e.collegeId === c.id).length;
          const collected = state.invoices.filter((i) => i.collegeId === c.id).reduce((s, i) => s + invoiceTotals(i).paid, 0);
          const official = OFFICIAL_FEE_COLLEGES.has(c.id);
          return (
            <Card
              key={c.id}
              padded={false}
              title={`${c.shortName} — ${c.name}`}
              description={`${c.category} · ${c.affiliation}`}
              actions={
                <div className="flex items-center gap-2">
                  <Badge tone={official ? "green" : "amber"}>{official ? "Official figures" : "Illustrative figures"}</Badge>
                  <Link href={`/${c.id}`} target="_blank" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent-dark">
                    Website <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              }
            >
              <dl className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-4">
                {[
                  { label: "Head", value: c.principal },
                  { label: "Students", value: String(students) },
                  { label: "Enquiries", value: String(enquiries) },
                  { label: "Fees collected", value: inrCompact(collected) },
                ].map((item) => (
                  <div key={item.label} className="bg-white px-5 py-3">
                    <dt className="text-xs text-slate-500">{item.label}</dt>
                    <dd className="truncate text-sm font-semibold text-primary">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr className="border-b border-line">
                      <th className="px-5 py-2.5 font-semibold">Programme</th>
                      <th className="px-5 py-2.5 font-semibold">Level</th>
                      <th className="px-5 py-2.5 font-semibold">Duration</th>
                      <th className="px-5 py-2.5 text-right font-semibold">Seats</th>
                      <th className="px-5 py-2.5 text-right font-semibold">Filled</th>
                      <th className="px-5 py-2.5 text-right font-semibold">Annual fee</th>
                      {canEdit ? <th className="px-5 py-2.5" /> : null}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {programmes.map((p) => (
                      <tr key={p.id}>
                        <td className="px-5 py-2.5 font-semibold text-primary">{p.name}</td>
                        <td className="px-5 py-2.5 text-slate-600">{p.level}</td>
                        <td className="px-5 py-2.5 text-slate-600">{p.duration}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums">{p.seats}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums">{seatsTaken(state, p.id)}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums">{p.annualFee ? inr(p.annualFee) : "Free"}</td>
                        {canEdit ? (
                          <td className="px-5 py-2.5 text-right">
                            <Button size="sm" variant="ghost" onClick={() => setEditing(p)} aria-label={`Edit ${p.name}`}>
                              <Pencil className="h-3.5 w-3.5" /> Edit
                            </Button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>

      {editing ? <ProgrammeModal key={editing.id} programme={editing} onClose={() => setEditing(null)} /> : null}
    </>
  );
}

function ProgrammeModal({ programme, onClose }: { programme: Programme; onClose: () => void }) {
  const [seats, setSeats] = useState(String(programme.seats));
  const [fee, setFee] = useState(String(programme.annualFee));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    const result = await updateProgramme(programme.id, { seats: Number(seats), annualFee: Number(fee) });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    toast(`${programme.name} updated`);
    onClose();
  };
  return (
    <Modal
      open
      onClose={onClose}
      title={`Edit ${programme.name}`}
      description="Changes apply to new invoices; existing invoices keep their amount."
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} loading={busy}>
            Save
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Approved seats" required>
          {(id) => <Input id={id} type="number" min={1} value={seats} onChange={(e) => setSeats(e.target.value)} />}
        </Field>
        <Field label="Annual fee (₹)" required>
          {(id) => <Input id={id} type="number" min={0} value={fee} onChange={(e) => setFee(e.target.value)} />}
        </Field>
      </div>
      <div className="mt-3">
        <FormError message={error} />
      </div>
    </Modal>
  );
}
