"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightLeft, Download, MessageCircle, Phone, Plus } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardShell";
import {
  Badge,
  Button,
  Card,
  DataTable,
  Drawer,
  Field,
  FilterTabs,
  FormError,
  Input,
  KeyValue,
  Modal,
  PageHeader,
  SearchBox,
  Select,
  Textarea,
  toast,
  useOpenParam,
  type Column,
} from "@/components/dashboard/ui";
import { CAN } from "@/lib/demo/permissions";
import { downloadFile, formatDate, formatDateTime, lookups, scoped, timeAgo, toCsv } from "@/lib/demo/selectors";
import type { Enquiry, EnquirySource, EnquiryStatus } from "@/lib/demo/types";
import { addEnquiryNote, convertEnquiry, createEnquiry, updateEnquiry } from "@/lib/services";

const STATUSES: EnquiryStatus[] = ["New", "Contacted", "Follow-up", "Converted", "Closed"];
const SOURCES: EnquirySource[] = ["Website form", "Walk-in", "Phone call", "Social media", "Referral", "Education fair"];

export default function EnquiriesPage() {
  const { user, state } = useDashboard();
  const { college, programme, user: findUser } = lookups(state);
  const [status, setStatus] = useState<EnquiryStatus | "All">("All");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [source, setSource] = useState("");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  useOpenParam((id: string) => setOpenId(id));

  const all = useMemo(() => scoped(state.enquiries, user), [state.enquiries, user]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(
      (e) =>
        (status === "All" || e.status === status) &&
        (!collegeFilter || e.collegeId === collegeFilter) &&
        (!source || e.source === source) &&
        (!q || [e.name, e.phone, e.id, e.email, e.town].some((f) => f?.toLowerCase().includes(q))),
    );
  }, [all, status, collegeFilter, source, query]);

  const columns: Column<Enquiry>[] = [
    {
      key: "name",
      header: "Lead",
      render: (e) => (
        <span>
          <span className="block font-semibold text-primary">{e.name}</span>
          <span className="block text-xs text-slate-500">
            {e.phone} · {e.town}
          </span>
        </span>
      ),
    },
    {
      key: "programme",
      header: "Interested in",
      render: (e) => (
        <span>
          <span className="block text-slate-700">{programme(e.programmeId)?.name ?? e.courseLabel ?? "Not chosen"}</span>
          <span className="block text-xs text-slate-500">{college(e.collegeId)?.shortName}</span>
        </span>
      ),
    },
    { key: "source", header: "Source", hideOnMobile: true, render: (e) => <span className="text-slate-600">{e.source}</span> },
    { key: "status", header: "Status", render: (e) => <Badge>{e.status}</Badge> },
    { key: "owner", header: "Counsellor", hideOnMobile: true, render: (e) => <span className="text-slate-600">{findUser(e.assignedTo)?.name ?? <span className="text-slate-400">Unassigned</span>}</span> },
    {
      key: "follow",
      header: "Follow-up",
      hideOnMobile: true,
      render: (e) =>
        e.followUpAt ? (
          <span className={Date.parse(e.followUpAt) < Date.now() && e.status === "Follow-up" ? "font-semibold text-rose-700" : "text-slate-600"}>{formatDateTime(e.followUpAt)}</span>
        ) : (
          <span className="text-slate-400">—</span>
        ),
    },
    { key: "received", header: "Received", hideOnMobile: true, render: (e) => <span className="whitespace-nowrap text-slate-500">{timeAgo(e.createdAt)}</span> },
  ];

  const exportCsv = () => {
    downloadFile(
      `ngi-enquiries-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(
        filtered.map((e) => ({
          ID: e.id,
          Name: e.name,
          Phone: e.phone,
          Email: e.email,
          Town: e.town,
          College: college(e.collegeId)?.shortName,
          Programme: programme(e.programmeId)?.name ?? e.courseLabel,
          Source: e.source,
          Status: e.status,
          Counsellor: findUser(e.assignedTo)?.name,
          "Follow-up": e.followUpAt ? formatDateTime(e.followUpAt) : "",
          Received: formatDate(e.createdAt),
        })),
      ),
    );
  };

  const active = state.enquiries.find((e) => e.id === openId);

  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Every lead from the website, walk-ins, calls and fairs. Assign, follow up and convert to an application."
        actions={
          <>
            <Button variant="secondary" onClick={exportCsv}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            {CAN.editEnquiries(user.role) ? (
              <Button onClick={() => setAdding(true)}>
                <Plus className="h-4 w-4" /> Add enquiry
              </Button>
            ) : null}
          </>
        }
      />

      <Card padded={false}>
        <div className="flex flex-col gap-3 border-b border-line p-4">
          <FilterTabs
            value={status}
            onChange={setStatus}
            options={[{ value: "All" as const, label: "All", count: all.length }, ...STATUSES.map((s) => ({ value: s, label: s, count: all.filter((e) => e.status === s).length }))]}
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchBox value={query} onChange={setQuery} placeholder="Search name, phone, ID…" />
            {!user.collegeId ? (
              <Select aria-label="College" value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} placeholder="All colleges" options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))} className="sm:max-w-44" />
            ) : null}
            <Select aria-label="Source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="All sources" options={SOURCES.map((s) => ({ value: s, label: s }))} className="sm:max-w-44" />
          </div>
        </div>
        <DataTable key={`${status}-${collegeFilter}-${source}-${query}`} rows={filtered} columns={columns} onRowClick={(e) => setOpenId(e.id)} />
      </Card>

      {active ? <EnquiryDrawer key={active.id} enquiry={active} onClose={() => setOpenId(null)} /> : null}
      <AddEnquiryModal open={adding} onClose={() => setAdding(false)} onCreated={(id) => setOpenId(id)} />
    </>
  );
}

function EnquiryDrawer({ enquiry, onClose }: { enquiry: Enquiry; onClose: () => void }) {
  const { user, state } = useDashboard();
  const { college, programme } = lookups(state);
  const editable = CAN.editEnquiries(user.role);
  const [draft, setDraft] = useState({
    status: enquiry.status,
    assignedTo: enquiry.assignedTo ?? "",
    followUpAt: enquiry.followUpAt ? toLocalInput(enquiry.followUpAt) : "",
    programmeId: enquiry.programmeId ?? "",
  });
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const application = state.applications.find((a) => a.enquiryId === enquiry.id);
  const staff = state.users.filter((u) => (u.role === "counsellor" || u.role === "super_admin" || (u.role === "college_admin" && u.collegeId === enquiry.collegeId)) && u.status === "Active");
  const dirty =
    draft.status !== enquiry.status ||
    draft.assignedTo !== (enquiry.assignedTo ?? "") ||
    draft.followUpAt !== (enquiry.followUpAt ? toLocalInput(enquiry.followUpAt) : "") ||
    draft.programmeId !== (enquiry.programmeId ?? "");

  const save = async () => {
    setError(null);
    if (draft.status === "Follow-up" && !draft.followUpAt) return setError("Set a follow-up date and time.");
    setBusy("save");
    await updateEnquiry(enquiry.id, {
      status: draft.status,
      assignedTo: draft.assignedTo || undefined,
      followUpAt: draft.followUpAt ? new Date(draft.followUpAt).toISOString() : undefined,
      programmeId: draft.programmeId || undefined,
    });
    setBusy(null);
    toast("Enquiry updated");
  };

  const addNote = async () => {
    if (!note.trim()) return;
    setBusy("note");
    await addEnquiryNote(enquiry.id, note.trim());
    setBusy(null);
    setNote("");
  };

  const convert = async () => {
    setError(null);
    if (dirty) await save();
    setBusy("convert");
    const result = await convertEnquiry(enquiry.id);
    setBusy(null);
    if (!result.ok) return setError(result.error);
    setDraft((d) => ({ ...d, status: "Converted" }));
    toast(`Application ${result.data.id} created`);
  };

  const digits = enquiry.phone.replace(/\D/g, "");

  return (
    <Drawer
      open
      onClose={onClose}
      title={enquiry.name}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          {enquiry.id} <Badge>{enquiry.status}</Badge>
        </span>
      }
      footer={
        editable ? (
          <>
            <Button onClick={save} disabled={!dirty} loading={busy === "save"}>
              Save changes
            </Button>
            {application ? (
              <Link href={`/dashboard/applications?open=${application.id}`} className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:bg-soft">
                View application {application.id}
              </Link>
            ) : (
              <Button variant="accent" onClick={convert} loading={busy === "convert"}>
                <ArrowRightLeft className="h-4 w-4" /> Convert to application
              </Button>
            )}
          </>
        ) : undefined
      }
    >
      <div className="flex flex-wrap gap-2">
        <a href={`tel:+${digits}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-light">
          <Phone className="h-4 w-4" /> {enquiry.phone}
        </a>
        <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-primary hover:bg-soft">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>

      <div className="mt-5">
        <KeyValue
          items={[
            { label: "Email", value: enquiry.email },
            { label: "Town", value: enquiry.town },
            { label: "College", value: college(enquiry.collegeId)?.name },
            { label: "Source", value: enquiry.source },
            { label: "Received", value: formatDateTime(enquiry.createdAt) },
            { label: "Course asked about", value: programme(enquiry.programmeId)?.name ?? enquiry.courseLabel },
          ]}
        />
      </div>

      {editable ? (
        <div className="mt-6 grid gap-4 rounded-xl border border-line p-4 sm:grid-cols-2">
          <Field label="Status">
            {(id) => <Select id={id} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as EnquiryStatus })} options={STATUSES.map((s) => ({ value: s, label: s }))} />}
          </Field>
          <Field label="Counsellor">
            {(id) => <Select id={id} value={draft.assignedTo} onChange={(e) => setDraft({ ...draft, assignedTo: e.target.value })} placeholder="Unassigned" options={staff.map((u) => ({ value: u.id, label: u.name }))} />}
          </Field>
          <Field label="Programme">
            {(id) => (
              <Select
                id={id}
                value={draft.programmeId}
                onChange={(e) => setDraft({ ...draft, programmeId: e.target.value })}
                placeholder="Not chosen"
                options={state.programmes.filter((p) => p.collegeId === enquiry.collegeId).map((p) => ({ value: p.id, label: p.name }))}
              />
            )}
          </Field>
          <Field label="Next follow-up">
            {(id) => <Input id={id} type="datetime-local" value={draft.followUpAt} onChange={(e) => setDraft({ ...draft, followUpAt: e.target.value })} />}
          </Field>
        </div>
      ) : null}
      <div className="mt-3">
        <FormError message={error} />
      </div>

      <h3 className="mt-6 font-display text-sm font-bold text-primary">Notes & history</h3>
      {editable ? (
        <div className="mt-3 flex flex-col gap-2">
          <Textarea aria-label="Add a note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What did the candidate say?" />
          <Button size="sm" variant="secondary" onClick={addNote} loading={busy === "note"} disabled={!note.trim()} className="self-end">
            Add note
          </Button>
        </div>
      ) : null}
      {enquiry.notes.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No notes yet.</p>
      ) : (
        <ol className="mt-4 space-y-4 border-l-2 border-line pl-4">
          {enquiry.notes.map((n, i) => (
            <li key={`${n.at}-${i}`} className="relative">
              <span className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent-dark" />
              <p className="text-sm text-slate-700">{n.text}</p>
              <p className="text-xs text-slate-400">
                {n.by} · {formatDateTime(n.at)}
              </p>
            </li>
          ))}
        </ol>
      )}
    </Drawer>
  );
}

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function AddEnquiryModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: (id: string) => void }) {
  const { user, state } = useDashboard();
  const blank = { name: "", phone: "", email: "", town: "", collegeId: user.collegeId ?? "", programmeId: "", source: "Walk-in" as EnquirySource, note: "" };
  const [form, setForm] = useState(blank);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const close = () => {
    setForm(blank);
    setError(null);
    onClose();
  };

  const submit = async () => {
    setError(null);
    if (form.name.trim().length < 2) return setError("Enter the candidate's name.");
    if (form.phone.replace(/\D/g, "").length < 10) return setError("Enter a 10-digit mobile number.");
    if (!form.collegeId) return setError("Choose a college.");
    setBusy(true);
    const result = await createEnquiry({ ...form, programmeId: form.programmeId || undefined, note: form.note || undefined });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    toast("Enquiry added");
    close();
    onCreated(result.data.id);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Add enquiry"
      description="For walk-ins, phone calls and fair registrations."
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit} loading={busy}>
            Add enquiry
          </Button>
        </>
      }
    >
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Field label="Candidate name" required>
          {(id) => <Input id={id} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        </Field>
        <Field label="Mobile" required>
          {(id) => <Input id={id} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />}
        </Field>
        <Field label="Email">
          {(id) => <Input id={id} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />}
        </Field>
        <Field label="Town">
          {(id) => <Input id={id} value={form.town} onChange={(e) => setForm({ ...form, town: e.target.value })} />}
        </Field>
        <Field label="College" required>
          {(id) => (
            <Select
              id={id}
              value={form.collegeId}
              disabled={Boolean(user.collegeId)}
              onChange={(e) => setForm({ ...form, collegeId: e.target.value, programmeId: "" })}
              placeholder="Select college"
              options={state.colleges.map((c) => ({ value: c.id, label: c.shortName }))}
            />
          )}
        </Field>
        <Field label="Programme">
          {(id) => (
            <Select id={id} value={form.programmeId} onChange={(e) => setForm({ ...form, programmeId: e.target.value })} placeholder="Not decided" options={state.programmes.filter((p) => p.collegeId === form.collegeId).map((p) => ({ value: p.id, label: p.name }))} />
          )}
        </Field>
        <Field label="Source">
          {(id) => <Select id={id} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as EnquirySource })} options={SOURCES.map((s) => ({ value: s, label: s }))} />}
        </Field>
        <div className="sm:col-span-2">
          <Field label="Note">
            {(id) => <Textarea id={id} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />}
          </Field>
        </div>
        <div className="sm:col-span-2">
          <FormError message={error} />
        </div>
        <button type="submit" hidden />
      </form>
    </Modal>
  );
}
