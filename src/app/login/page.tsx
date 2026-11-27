"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, LogIn } from "lucide-react";
import AuthLayout from "@/components/dashboard/AuthLayout";
import { Button, Field, FormError, Input } from "@/components/dashboard/ui";
import { ROLE_LABELS } from "@/lib/demo/permissions";
import { useDemoState, useSessionUserId } from "@/lib/demo/store";
import { signIn, signOut } from "@/lib/services";

const DEMO_ACCOUNTS = [
  { email: "admin@ngi.demo", password: "Admin@123", note: "Everything, all colleges" },
  { email: "nibm.admin@ngi.demo", password: "Demo@123", note: "NIBM only" },
  { email: "counsellor@ngi.demo", password: "Demo@123", note: "Enquiries & applications" },
  { email: "accounts@ngi.demo", password: "Demo@123", note: "Fees & receipts" },
  { email: "student@ngi.demo", password: "Student@123", note: "Enrolled student" },
  { email: "applicant@ngi.demo", password: "Student@123", note: "Application in progress" },
];

function safeNext() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/dashboard") ? next : "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();
  const state = useDemoState();
  const sessionId = useSessionUserId();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("signedOut")
      ? "You have been signed out."
      : params.get("reset")
        ? "Password updated. Sign in with your new password."
        : null;
    if (message) {
      const timer = setTimeout(() => setNotice(message), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const current = state && sessionId ? state.users.find((u) => u.id === sessionId) : undefined;

  const submit = async (id: string, pw: string, key: string) => {
    setError(null);
    if (!id.trim() || !pw) {
      setError("Enter your email or mobile number and password.");
      return;
    }
    setLoading(key);
    const result = await signIn(id, pw);
    setLoading(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace(safeNext());
  };

  return (
    <AuthLayout title="Sign in" subtitle="Staff and students of the Nathdwara Group of Institutions.">
      {notice ? <p className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">{notice}</p> : null}

      {current ? (
        <div className="mb-6 rounded-xl border border-line bg-soft p-4">
          <p className="text-sm text-slate-600">
            You&apos;re signed in as <strong className="text-primary">{current.name}</strong> ({ROLE_LABELS[current.role]}).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => router.push("/dashboard")}>
              Continue to portal <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" onClick={() => signOut()}>
              Use another account
            </Button>
          </div>
        </div>
      ) : null}

      <form
        noValidate
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit(identifier, password, "form");
        }}
      >
        <Field label="Email or mobile number" required>
          {(id) => <Input id={id} autoComplete="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="name@example.com" />}
        </Field>
        <Field label="Password" required>
          {(id) => (
            <div className="relative">
              <Input id={id} type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-11" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-primary">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}
        </Field>
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-semibold text-accent-dark hover:text-primary">
            Forgot password?
          </Link>
        </div>
        <FormError message={error} />
        <Button type="submit" className="w-full" loading={loading === "form"}>
          <LogIn className="h-4 w-4" /> Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New applicant?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-accent-dark">
          Apply online
        </Link>
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-accent-dark/40 bg-accent/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">Demo accounts · one click</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {DEMO_ACCOUNTS.map((account) => {
            const user = state?.users.find((u) => u.email === account.email);
            return (
              <li key={account.email}>
                <button
                  type="button"
                  disabled={loading !== null}
                  onClick={() => {
                    setIdentifier(account.email);
                    setPassword(account.password);
                    submit(account.email, account.password, account.email);
                  }}
                  className="flex w-full flex-col rounded-lg border border-line bg-white px-3 py-2 text-left transition-colors hover:border-primary disabled:opacity-60"
                >
                  <span className="text-sm font-semibold text-primary">
                    {user ? ROLE_LABELS[user.role] : "—"}
                    {loading === account.email ? "…" : ""}
                  </span>
                  <span className="text-xs text-slate-500">{account.note}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Passwords: <code>Admin@123</code> for admin, <code>Demo@123</code> for staff, <code>Student@123</code> for students.
        </p>
      </div>
    </AuthLayout>
  );
}
