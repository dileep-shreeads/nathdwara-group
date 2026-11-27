"use client";

import { useMemo, useState } from "react";
import { Check, KeyRound, Minus, Plus, UserCog } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import { Badge, Button, Card, DataTable, Field, FilterTabs, FormError, Input, Modal, PageHeader, SearchBox, Select, toast, type Column } from "@/components/dashboard/ui";
import { MODULES, ROLE_DESCRIPTIONS, ROLE_LABELS } from "@/lib/demo/permissions";
import { formatDate, initials, lookups, timeAgo } from "@/lib/demo/selectors";
import type { Role, User } from "@/lib/demo/types";
import { resetUserPassword, saveUser, setUserStatus } from "@/lib/services";

type StaffRole = Exclude<Role, "student">;
const STAFF_ROLES: StaffRole[] = ["super_admin", "college_admin", "counsellor", "accounts"];

export default function UsersPage() {
  const { user: me, state } = useDashboard();
  const { college } = lookups(state);
  const [tab, setTab] = useState<"staff" | "students" | "roles">("staff");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<User | "new" | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.users
      .filter((u) => (tab === "students" ? u.role === "student" : u.role !== "student"))
      .filter((u) => !q || [u.name, u.email, u.phone].some((f) => f.toLowerCase().includes(q)));
  }, [state.users, tab, query]);

  const toggleStatus = async (u: User) => {
    setBusy(u.id);
    const result = await setUserStatus(u.id, u.status === "Active" ? "Inactive" : "Active");
    setBusy(null);
    if (!result.ok) return toast(result.error, "error");
    toast(`${u.name} ${u.status === "Active" ? "deactivated" : "reactivated"}`);
  };

  const resetPw = async (u: User) => {
    setBusy(`pw-${u.id}`);
    const result = await resetUserPassword(u.id);
    setBusy(null);
    if (result.ok) toast(`Password for ${u.name} reset to ${result.data.tempPassword}`);
  };

  const columns: Column<User>[] = [
    {
      key: "name",
      header: "User",
      render: (u) => (
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-accent">{initials(u.name)}</span>
          <span>
            <span className="block font-semibold text-primary">
              {u.name}
              {u.id === me.id ? <span className="ml-1.5 text-xs font-normal text-slate-400">(you)</span> : null}
            </span>
            <span className="block text-xs text-slate-500">{u.email}</span>
          </span>
        </span>
      ),
    },
    { key: "role", header: "Role", render: (u) => <Badge tone={u.role === "super_admin" ? "navy" : "slate"}>{ROLE_LABELS[u.role]}</Badge> },
    { key: "scope", header: "Scope", hideOnMobile: true, render: (u) => <span className="text-slate-600">{u.collegeId ? college(u.collegeId)?.shortName : u.role === "student" ? u.applicationId : "All colleges"}</span> },
    { key: "login", header: "Last sign-in", hideOnMobile: true, render: (u) => <span className="text-slate-500">{u.lastLoginAt ? timeAgo(u.lastLoginAt) : "Never"}</span> },
    { key: "status", header: "Status", render: (u) => <Badge>{u.status}</Badge> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (u) => (
        <span className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          {u.role !== "student" ? (
            <Button size="sm" variant="ghost" onClick={() => setEditing(u)} aria-label={`Edit ${u.name}`}>
              <UserCog className="h-4 w-4" />
            </Button>
          ) : null}
          <Button size="sm" variant="ghost" onClick={() => resetPw(u)} loading={busy === `pw-${u.id}`} aria-label={`Reset password for ${u.name}`}>
            <KeyRound className="h-4 w-4" />
          </Button>
          <Button size="sm" variant={u.status === "Active" ? "danger" : "secondary"} onClick={() => toggleStatus(u)} loading={busy === u.id} disabled={u.id === me.id}>
            {u.status === "Active" ? "Deactivate" : "Activate"}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Staff & roles"
        description="Who can sign in, what they can see, and which college they manage."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus className="h-4 w-4" /> Add staff member
          </Button>
        }
      />
      <div className="mb-4">
        <FilterTabs
          value={tab}
          onChange={setTab}
          options={[
            { value: "staff", label: "Staff", count: state.users.filter((u) => u.role !== "student").length },
            { value: "students", label: "Student logins", count: state.users.filter((u) => u.role === "student").length },
            { value: "roles", label: "Role permissions" },
          ]}
        />
      </div>

      {tab === "roles" ? (
        <RoleMatrix />
      ) : (
        <Card padded={false}>
          <div className="border-b border-line p-4">
            <SearchBox value={query} onChange={setQuery} placeholder="Search name, email, mobile…" />
          </div>
          <DataTable key={`${tab}-${query}`} rows={rows} columns={columns} />
        </Card>
      )}

      {editing ? <UserModal key={editing === "new" ? "new" : editing.id} user={editing === "new" ? null : editing} onClose={() => setEditing(null)} /> : null}
    </>
  );
}

function RoleMatrix() {
  const roles: Role[] = ["super_admin", "college_admin", "counsellor", "accounts", "student"];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <Card key={r}>
            <p className="font-display text-sm font-bold text-primary">{ROLE_LABELS[r]}</p>
            <p className="mt-1 text-sm text-slate-600">{ROLE_DESCRIPTIONS[r]}</p>
          </Card>
        ))}
      </div>
      <Card title="Module access" padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line bg-soft/70 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Module</th>
                {roles.map((r) => (
                  <th key={r} className="px-4 py-3 text-center font-semibold">{ROLE_LABELS[r]}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {MODULES.map((m) => (
                <tr key={m.key}>
                  <td className="px-4 py-2.5 font-medium text-slate-700">{m.label}</td>
                  {roles.map((r) => (
                    <td key={r} className="px-4 py-2.5 text-center">
                      {m.roles.includes(r) ? <Check className="mx-auto h-4 w-4 text-emerald-600" aria-label="Allowed" /> : <Minus className="mx-auto h-4 w-4 text-slate-300" aria-label="No access" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function UserModal({ user, onClose }: { user: User | null; onClose: () => void }) {
  const { state } = useDashboard();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    role: (user?.role as StaffRole) ?? "counsellor",
    collegeId: user?.collegeId ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setError(null);
    if (form.name.trim().length < 2) return setError("Enter a name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email.");
    setBusy(true);
    const result = await saveUser({ id: user?.id, ...form, collegeId: form.collegeId || undefined });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    toast(result.data.tempPassword ? `${form.name} added · temporary password ${result.data.tempPassword}` : "Staff member updated");
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={user ? `Edit ${user.name}` : "Add staff member"}
      description={user ? `Joined ${formatDate(user.createdAt)}` : "They'll get a temporary password to change on first sign-in."}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} loading={busy}>
            {user ? "Save" : "Add staff member"}
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required>
          {(id) => <Input id={id} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        </Field>
        <Field label="Mobile">
          {(id) => <Input id={id} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />}
        </Field>
        <div className="sm:col-span-2">
          <Field label="Email (sign-in ID)" required>
            {(id) => <Input id={id} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />}
          </Field>
        </div>
        <Field label="Role" required hint={ROLE_DESCRIPTIONS[form.role]}>
          {(id) => <Select id={id} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as StaffRole })} options={STAFF_ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }))} />}
        </Field>
        {form.role === "college_admin" ? (
          <Field label="College" required>
            {(id) => <Select id={id} value={form.collegeId} onChange={(e) => setForm({ ...form, collegeId: e.target.value })} placeholder="Select college" options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))} />}
          </Field>
        ) : null}
      </div>
      <div className="mt-3">
        <FormError message={error} />
      </div>
    </Modal>
  );
}
