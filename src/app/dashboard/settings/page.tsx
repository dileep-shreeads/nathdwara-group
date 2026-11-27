"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Database, Download, RotateCcw } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import { Button, Card, Field, FormError, Input, KeyValue, Modal, PageHeader, toast } from "@/components/dashboard/ui";
import { ROLE_LABELS } from "@/lib/demo/permissions";
import { downloadFile, formatDateTime, lookups } from "@/lib/demo/selectors";
import { changePassword, passwordProblem, resetDemo, updateProfile } from "@/lib/services";

export default function SettingsPage() {
  const { user, state } = useDashboard();
  const router = useRouter();
  const { college } = lookups(state);
  const [profile, setProfile] = useState({ name: user.name, phone: user.phone });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const saveProfile = async () => {
    if (profile.name.trim().length < 2) return toast("Enter your name.", "error");
    setBusy("profile");
    await updateProfile({ name: profile.name.trim(), phone: profile.phone.trim() });
    setBusy(null);
    toast("Profile saved");
  };

  const savePassword = async () => {
    setPwError(null);
    const problem = passwordProblem(pw.next);
    if (problem) return setPwError(problem);
    if (pw.next !== pw.confirm) return setPwError("New passwords don't match.");
    setBusy("pw");
    const result = await changePassword(pw.current, pw.next);
    setBusy(null);
    if (!result.ok) return setPwError(result.error);
    setPw({ current: "", next: "", confirm: "" });
    toast("Password changed");
  };

  const counts = [
    { label: "Enquiries", value: state.enquiries.length },
    { label: "Applications", value: state.applications.length },
    { label: "Students", value: state.students.length },
    { label: "Invoices", value: state.invoices.length },
    { label: "Receipts", value: state.invoices.reduce((s, i) => s + i.payments.length, 0) },
    { label: "User accounts", value: state.users.length },
  ];

  return (
    <>
      <PageHeader title="Settings" description="Your profile, password and demo data." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile">
          <KeyValue
            items={[
              { label: "Email (sign-in ID)", value: user.email },
              { label: "Role", value: `${ROLE_LABELS[user.role]}${user.collegeId ? ` · ${college(user.collegeId)?.shortName}` : ""}` },
              { label: "Last sign-in", value: formatDateTime(user.lastLoginAt) },
            ]}
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Full name">{(id) => <Input id={id} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />}</Field>
            <Field label="Mobile">{(id) => <Input id={id} type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />}</Field>
          </div>
          <Button className="mt-4" onClick={saveProfile} loading={busy === "profile"} disabled={profile.name === user.name && profile.phone === user.phone}>
            Save profile
          </Button>
        </Card>

        <Card title="Change password">
          <div className="grid gap-3">
            <Field label="Current password">{(id) => <Input id={id} type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />}</Field>
            <Field label="New password" hint="8+ characters with upper- and lower-case letters and a number.">
              {(id) => <Input id={id} type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />}
            </Field>
            <Field label="Confirm new password">{(id) => <Input id={id} type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />}</Field>
          </div>
          <div className="mt-3">
            <FormError message={pwError} />
          </div>
          <Button className="mt-4" onClick={savePassword} loading={busy === "pw"} disabled={!pw.current || !pw.next}>
            Update password
          </Button>
        </Card>

        {user.role !== "student" ? (
          <Card title="Demo data" description="Everything in this portal is sample data stored in this browser." className="lg:col-span-2">
            <div className="flex items-start gap-3 rounded-lg bg-soft p-4 text-sm text-slate-600">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p>
                Data source: <strong className="text-primary">browser demo store</strong>, created {formatDateTime(state.seededAt)}. Changes stay on this device until you reset. When the database is connected, the same screens will read and write live records.
              </p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {counts.map((c) => (
                <div key={c.label} className="rounded-lg border border-line p-3">
                  <dt className="text-xs text-slate-500">{c.label}</dt>
                  <dd className="font-display text-xl font-bold text-primary">{c.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => downloadFile(`ngi-demo-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(state, null, 2), "application/json")}>
                <Download className="h-4 w-4" /> Download data (JSON)
              </Button>
              <Button variant="danger" onClick={() => setConfirmReset(true)}>
                <RotateCcw className="h-4 w-4" /> Reset demo data
              </Button>
            </div>
          </Card>
        ) : null}
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset demo data?"
        description="All enquiries, applications, payments and accounts go back to the original sample data. Accounts created during the demo are removed."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                resetDemo();
                setConfirmReset(false);
                toast("Demo data reset");
                router.push("/dashboard");
              }}
            >
              Reset data
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">Use this before each client demo to start from a clean state.</p>
      </Modal>
    </>
  );
}
