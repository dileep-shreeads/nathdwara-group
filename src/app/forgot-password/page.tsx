"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import AuthLayout from "@/components/dashboard/AuthLayout";
import { Button, Field, FormError, Input } from "@/components/dashboard/ui";
import { requestPasswordReset } from "@/lib/services";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<{ otp: string; email: string } | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!identifier.trim()) {
      setError("Enter the email or mobile number on your account.");
      return;
    }
    setLoading(true);
    const result = await requestPasswordReset(identifier);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(result.data);
  };

  return (
    <AuthLayout title="Reset your password" subtitle="We'll send a 6-digit code to the email and mobile number on your account.">
      {sent ? (
        <div className="space-y-5">
          <p className="text-sm text-slate-600">
            A verification code was sent to <strong className="text-primary">{sent.email}</strong>. It is valid for 10 minutes.
          </p>
          <div className="flex gap-3 rounded-xl border border-dashed border-accent-dark/40 bg-accent/5 p-4 text-sm text-slate-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
            <p>
              Demo mode — no SMS or email is sent. Your code is <strong className="font-mono text-base tracking-widest text-primary">{sent.otp}</strong>
            </p>
          </div>
          <Button className="w-full" onClick={() => router.push("/update-password")}>
            Enter code <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={submit} className="space-y-4">
          <Field label="Email or mobile number" required>
            {(id) => <Input id={id} autoComplete="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />}
          </Field>
          <FormError message={error} />
          <Button type="submit" className="w-full" loading={loading}>
            Send code
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-slate-500">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-primary hover:text-accent-dark">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
