"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/dashboard/AuthLayout";
import { Button, Field, FormError, Input, Select } from "@/components/dashboard/ui";
import { useDemoState } from "@/lib/demo/store";
import { inr } from "@/lib/demo/selectors";
import { passwordProblem, registerApplicant, type RegisterInput } from "@/lib/services";

const EMPTY: RegisterInput = {
  name: "",
  email: "",
  phone: "",
  password: "",
  gender: "Male",
  category: "General",
  town: "",
  collegeId: "",
  programmeId: "",
  qualifyingMarks: 0,
  dob: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const state = useDemoState();
  const [form, setForm] = useState(EMPTY);
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput | "confirm", string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof RegisterInput>(key: K, value: RegisterInput[K]) => setForm((f) => ({ ...f, [key]: value }));
  const programmes = state?.programmes.filter((p) => p.collegeId === form.collegeId) ?? [];
  const chosen = state?.programmes.find((p) => p.id === form.programmeId);

  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 3) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit mobile number.";
    if (!form.dob) e.dob = "Enter your date of birth.";
    if (!form.town.trim()) e.town = "Enter your town or city.";
    if (!form.collegeId) e.collegeId = "Choose a college.";
    if (!form.programmeId) e.programmeId = "Choose a programme.";
    if (!form.qualifyingMarks || form.qualifyingMarks < 33 || form.qualifyingMarks > 100) e.qualifyingMarks = "Enter your percentage (33–100).";
    const pw = passwordProblem(form.password);
    if (pw) e.password = pw;
    if (confirm !== form.password) e.confirm = "Passwords don't match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setLoading(true);
    const result = await registerApplicant({ ...form, phone: form.phone.trim() });
    setLoading(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    router.replace("/dashboard/my-application");
  };

  return (
    <AuthLayout title="Apply online — 2026-27" subtitle="Create your applicant account to track your application, document verification and fees from the portal." wide>
      <form noValidate onSubmit={submit} className="space-y-6">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Personal details</legend>
          <div className="sm:col-span-2">
            <Field label="Full name (as on mark sheet)" required error={errors.name}>
              {(id) => <Input id={id} autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} />}
            </Field>
          </div>
          <Field label="Email" required error={errors.email}>
            {(id) => <Input id={id} type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />}
          </Field>
          <Field label="Mobile number" required error={errors.phone}>
            {(id) => <Input id={id} type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98xxx xxxxx" />}
          </Field>
          <Field label="Date of birth" required error={errors.dob}>
            {(id) => <Input id={id} type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />}
          </Field>
          <Field label="Town / city" required error={errors.town}>
            {(id) => <Input id={id} value={form.town} onChange={(e) => set("town", e.target.value)} placeholder="e.g. Rajsamand" />}
          </Field>
          <Field label="Gender">
            {(id) => <Select id={id} value={form.gender} onChange={(e) => set("gender", e.target.value as RegisterInput["gender"])} options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} />}
          </Field>
          <Field label="Category" hint="Reserved categories upload a caste certificate.">
            {(id) => <Select id={id} value={form.category} onChange={(e) => set("category", e.target.value as RegisterInput["category"])} options={["General", "OBC", "SC", "ST", "EWS"].map((c) => ({ value: c, label: c }))} />}
          </Field>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Programme</legend>
          <Field label="College" required error={errors.collegeId}>
            {(id) => (
              <Select
                id={id}
                value={form.collegeId}
                onChange={(e) => setForm((f) => ({ ...f, collegeId: e.target.value, programmeId: "" }))}
                placeholder="Select college"
                options={(state?.colleges ?? []).map((c) => ({ value: c.id, label: `${c.shortName} — ${c.name}` }))}
              />
            )}
          </Field>
          <Field label="Programme" required error={errors.programmeId} hint={chosen ? `${chosen.duration} · ${chosen.seats} seats · ${chosen.annualFee ? `${inr(chosen.annualFee)} per year` : "fee on enquiry"}` : undefined}>
            {(id) => (
              <Select
                id={id}
                value={form.programmeId}
                disabled={!form.collegeId}
                onChange={(e) => set("programmeId", e.target.value)}
                placeholder={form.collegeId ? "Select programme" : "Choose a college first"}
                options={programmes.map((p) => ({ value: p.id, label: p.name }))}
              />
            )}
          </Field>
          <Field label="Qualifying exam percentage" required error={errors.qualifyingMarks}>
            {(id) => <Input id={id} type="number" inputMode="decimal" min={33} max={100} value={form.qualifyingMarks || ""} onChange={(e) => set("qualifyingMarks", Number(e.target.value))} />}
          </Field>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Account</legend>
          <Field label="Password" required error={errors.password} hint="8+ characters with upper- and lower-case letters and a number.">
            {(id) => <Input id={id} type="password" autoComplete="new-password" value={form.password} onChange={(e) => set("password", e.target.value)} />}
          </Field>
          <Field label="Confirm password" required error={errors.confirm}>
            {(id) => <Input id={id} type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />}
          </Field>
        </fieldset>

        <FormError message={formError} />
        <Button type="submit" className="w-full sm:w-auto" loading={loading}>
          Submit application <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-sm text-slate-500">
          Already applied?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-accent-dark">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
