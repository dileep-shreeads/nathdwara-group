"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/components/dashboard/AuthLayout";
import { Button, Field, FormError, Input } from "@/components/dashboard/ui";
import { passwordProblem, resetPasswordWithOtp } from "@/lib/services";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!/^\d{6}$/.test(otp)) return setError("Enter the 6-digit code.");
    const problem = passwordProblem(password);
    if (problem) return setError(problem);
    if (password !== confirm) return setError("Passwords don't match.");
    setLoading(true);
    const result = await resetPasswordWithOtp(otp, password);
    setLoading(false);
    if (!result.ok) return setError(result.error);
    router.replace("/login?reset=1");
  };

  return (
    <AuthLayout title="Choose a new password" subtitle="Enter the code you received and your new password.">
      <form noValidate onSubmit={submit} className="space-y-4">
        <Field label="6-digit code" required>
          {(id) => (
            <Input id={id} inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="font-mono text-lg tracking-[0.4em]" />
          )}
        </Field>
        <Field label="New password" required hint="8+ characters with upper- and lower-case letters and a number.">
          {(id) => <Input id={id} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        </Field>
        <Field label="Confirm new password" required>
          {(id) => <Input id={id} type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />}
        </Field>
        <FormError message={error} />
        <Button type="submit" className="w-full" loading={loading}>
          Update password
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Didn&apos;t get a code?{" "}
        <Link href="/forgot-password" className="font-semibold text-primary hover:text-accent-dark">
          Request a new one
        </Link>
      </p>
    </AuthLayout>
  );
}
