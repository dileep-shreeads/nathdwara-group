"use client";

import { useMemo, useState } from "react";
import { Megaphone, Pencil, Pin, PinOff, Plus, Trash2 } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import { Badge, Button, Card, EmptyState, Field, FilterTabs, FormError, Input, Modal, PageHeader, Select, Textarea, toast } from "@/components/dashboard/ui";
import { CAN } from "@/lib/demo/permissions";
import { formatDate, lookups } from "@/lib/demo/selectors";
import type { Notice } from "@/lib/demo/types";
import { deleteNotice, saveNotice } from "@/lib/services";

type Audience = Notice["audience"];

export default function NoticesPage() {
  const { user, state } = useDashboard();
  const { college } = lookups(state);
  const canPublish = CAN.publishNotices(user.role);
  const [audience, setAudience] = useState<Audience | "All">("All");
  const [editing, setEditing] = useState<Notice | "new" | null>(null);
  const [confirming, setConfirming] = useState<Notice | null>(null);

  const studentCollege = user.role === "student" ? state.students.find((s) => s.id === user.studentId)?.collegeId ?? state.applications.find((a) => a.id === user.applicationId)?.collegeId : undefined;

  const visible = useMemo(
    () =>
      state.notices
        .filter((n) => {
          if (user.role === "student") return n.audience !== "Staff" && (!n.collegeId || n.collegeId === studentCollege);
          if (user.collegeId) return !n.collegeId || n.collegeId === user.collegeId;
          return true;
        })
        .filter((n) => audience === "All" || n.audience === audience)
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.publishedAt.localeCompare(a.publishedAt)),
    [state.notices, user, audience, studentCollege],
  );

  const togglePin = async (n: Notice) => {
    await saveNotice({ ...n, pinned: !n.pinned });
    toast(n.pinned ? "Unpinned" : "Pinned to top");
  };

  return (
    <>
      <PageHeader
        title="Notices"
        description={canPublish ? "Publish announcements to students, staff or everyone — for all colleges or one." : "Announcements from your college and the group."}
        actions={
          canPublish ? (
            <Button onClick={() => setEditing("new")}>
              <Plus className="h-4 w-4" /> New notice
            </Button>
          ) : undefined
        }
      />
      {canPublish ? (
        <div className="mb-4">
          <FilterTabs value={audience} onChange={setAudience} options={(["All", "Everyone", "Students", "Staff"] as const).map((a) => ({ value: a, label: a }))} />
        </div>
      ) : null}

      {visible.length === 0 ? (
        <Card>
          <EmptyState title="No notices" description="New announcements will appear here." />
        </Card>
      ) : (
        <ul className="space-y-3">
          {visible.map((n) => {
            const editable = canPublish && (user.role === "super_admin" || n.collegeId === user.collegeId || (!user.collegeId && user.role !== "college_admin"));
            return (
              <li key={n.id}>
                <article className={`rounded-xl border bg-white p-5 ${n.pinned ? "border-accent-dark/40" : "border-line"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="flex items-center gap-2 font-display text-base font-bold text-primary">
                        {n.pinned ? <Pin className="h-4 w-4 shrink-0 text-accent-dark" aria-label="Pinned" /> : <Megaphone className="h-4 w-4 shrink-0 text-slate-400" />}
                        {n.title}
                      </h2>
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {formatDate(n.publishedAt)} · {n.publishedBy}
                        <Badge tone="slate">{n.audience}</Badge>
                        {n.collegeId ? <Badge tone="blue">{college(n.collegeId)?.shortName}</Badge> : <Badge tone="blue">All colleges</Badge>}
                      </p>
                    </div>
                    {editable ? (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => togglePin(n)} aria-label={n.pinned ? "Unpin" : "Pin"}>
                          {n.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditing(n)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setConfirming(n)} aria-label="Delete">
                          <Trash2 className="h-4 w-4 text-rose-600" />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{n.body}</p>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {editing ? <NoticeModal key={editing === "new" ? "new" : editing.id} notice={editing === "new" ? null : editing} onClose={() => setEditing(null)} /> : null}
      <Modal
        open={confirming !== null}
        onClose={() => setConfirming(null)}
        title="Delete notice?"
        description={confirming?.title}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirming(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                if (!confirming) return;
                await deleteNotice(confirming.id);
                setConfirming(null);
                toast("Notice deleted");
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">Students and staff will no longer see it.</p>
      </Modal>
    </>
  );
}

function NoticeModal({ notice, onClose }: { notice: Notice | null; onClose: () => void }) {
  const { user, state } = useDashboard();
  const [form, setForm] = useState({
    title: notice?.title ?? "",
    body: notice?.body ?? "",
    audience: notice?.audience ?? ("Everyone" as Audience),
    collegeId: notice?.collegeId ?? user.collegeId ?? "",
    pinned: notice?.pinned ?? false,
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    const result = await saveNotice({ id: notice?.id, ...form, collegeId: form.collegeId || undefined });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    toast(notice ? "Notice updated" : "Notice published");
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={notice ? "Edit notice" : "New notice"}
      wide
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} loading={busy}>
            {notice ? "Save" : "Publish"}
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Title" required>
            {(id) => <Input id={id} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />}
          </Field>
        </div>
        <Field label="Audience">
          {(id) => <Select id={id} value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value as Audience })} options={["Everyone", "Students", "Staff"].map((a) => ({ value: a, label: a }))} />}
        </Field>
        <Field label="College">
          {(id) => (
            <Select
              id={id}
              value={form.collegeId}
              disabled={Boolean(user.collegeId)}
              onChange={(e) => setForm({ ...form, collegeId: e.target.value })}
              placeholder="All colleges"
              options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))}
            />
          )}
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notice" required>
            {(id) => <Textarea id={id} rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />}
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
          <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="h-4 w-4 rounded border-line accent-primary" />
          Pin to the top
        </label>
      </div>
      <div className="mt-3">
        <FormError message={error} />
      </div>
    </Modal>
  );
}
