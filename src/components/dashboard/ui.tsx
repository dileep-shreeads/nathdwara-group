"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Inbox, Loader2, Search, X } from "lucide-react";

// ============================================================ Buttons

type ButtonVariant = "primary" | "secondary" | "accent" | "danger" | "ghost";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light",
  accent: "bg-accent text-primary hover:bg-accent-dark",
  secondary: "border border-line bg-white text-primary hover:border-primary/40 hover:bg-soft",
  danger: "border border-rose-200 bg-white text-rose-700 hover:bg-rose-50",
  ghost: "text-slate-600 hover:bg-soft hover:text-primary",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: "sm" | "md"; loading?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
      } ${BUTTON_STYLES[variant]} ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

// ============================================================ Badges

const TONES = {
  blue: "bg-blue-50 text-blue-800 ring-blue-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  green: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  red: "bg-rose-50 text-rose-800 ring-rose-200",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  violet: "bg-violet-50 text-violet-800 ring-violet-200",
  navy: "bg-primary text-white ring-primary",
} as const;

export type Tone = keyof typeof TONES;

const STATUS_TONE: Record<string, Tone> = {
  New: "blue",
  Contacted: "violet",
  "Follow-up": "amber",
  Converted: "green",
  Closed: "slate",
  Submitted: "blue",
  "Documents Verified": "violet",
  "Provisionally Admitted": "amber",
  Enrolled: "green",
  Rejected: "red",
  Paid: "green",
  "Partially paid": "amber",
  Due: "blue",
  Overdue: "red",
  Active: "green",
  Inactive: "slate",
  "On Leave": "amber",
  "Passed Out": "slate",
};

export function Badge({ children, tone }: { children: React.ReactNode; tone?: Tone }) {
  const resolved = tone ?? (typeof children === "string" ? STATUS_TONE[children] : undefined) ?? "slate";
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${TONES[resolved]}`}>
      {children}
    </span>
  );
}

// ============================================================ Layout

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-primary md:text-[28px]">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Card({ title, description, actions, children, className = "", padded = true }: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={`rounded-xl border border-line bg-white ${className}`}>
      {title ? (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-[15px] font-bold text-primary">{title}</h2>
            {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
          </div>
          {actions}
        </header>
      ) : null}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function StatTile({ label, value, hint, icon: Icon, tone = "navy" }: {
  label: string;
  value: string;
  hint?: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "navy" | "gold" | "green" | "red";
}) {
  const iconTone = { navy: "bg-primary/5 text-primary", gold: "bg-accent/15 text-accent-dark", green: "bg-emerald-50 text-emerald-700", red: "bg-rose-50 text-rose-700" }[tone];
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconTone}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tracking-tight text-primary">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-soft">
        <Inbox className="h-5 w-5 text-slate-400" />
      </span>
      <p className="mt-3 font-semibold text-primary">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function KeyValue({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-xs font-medium text-slate-500">{item.label}</dt>
          <dd className="mt-0.5 break-words text-sm font-semibold text-slate-800">{item.value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

// ============================================================ Forms

const CONTROL = "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-soft";

export function Field({ label, hint, error, children, required }: { label: string; hint?: string; error?: string; children: (id: string) => React.ReactNode; required?: boolean }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </label>
      {children(id)}
      {error ? <p className="mt-1 text-xs font-medium text-rose-700">{error}</p> : hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${CONTROL} ${props.className ?? ""}`} />;
}

export function Select({ options, placeholder, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <select {...props} className={`${CONTROL} ${props.className ?? ""}`}>
      {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={`${CONTROL} ${props.className ?? ""}`} />;
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-800">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`${CONTROL} pl-9`}
      />
    </div>
  );
}

export function FilterTabs<T extends string>({ value, onChange, options }: { value: T; onChange: (value: T) => void; options: { value: T; label: string; count?: number }[] }) {
  return (
    <div role="tablist" className="flex gap-1 overflow-x-auto rounded-lg bg-soft p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === option.value ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
          }`}
        >
          {option.label}
          {option.count !== undefined ? <span className="ml-1.5 text-slate-400">{option.count}</span> : null}
        </button>
      ))}
    </div>
  );
}

// ============================================================ Overlays

const dialogStack: symbol[] = [];

function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });
  useEffect(() => {
    if (!open) return;
    const token = Symbol("dialog");
    dialogStack.push(token);
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialogStack[dialogStack.length - 1] === token) close.current();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const focusable = ref.current?.querySelector<HTMLElement>("input, select, textarea, button:not([data-close])");
    (focusable ?? ref.current)?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      dialogStack.splice(dialogStack.indexOf(token), 1);
      if (dialogStack.length === 0) document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);
  return ref;
}

export function Modal({ open, onClose, title, description, children, footer, wide }: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useDialog(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-primary-dark/50 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className={`flex max-h-[92dvh] w-full flex-col rounded-t-2xl bg-white shadow-2xl outline-none sm:rounded-2xl ${wide ? "sm:max-w-3xl" : "sm:max-w-lg"}`}>
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-primary">{title}</h2>
            {description ? <p className="mt-0.5 text-sm text-slate-500">{description}</p> : null}
          </div>
          <button type="button" data-close onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-slate-400 hover:bg-soft hover:text-primary">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
        {footer ? <footer className="flex flex-wrap justify-end gap-2 border-t border-line bg-soft/60 px-5 py-3.5">{footer}</footer> : null}
      </div>
    </div>
  );
}

export function Drawer({ open, onClose, title, subtitle, children, footer }: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useDialog(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-primary-dark/40" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl outline-none">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-bold text-primary">{title}</h2>
            {subtitle ? <div className="mt-1 text-sm text-slate-500">{subtitle}</div> : null}
          </div>
          <button type="button" data-close onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-slate-400 hover:bg-soft hover:text-primary">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer ? <footer className="flex flex-wrap gap-2 border-t border-line bg-soft/60 px-5 py-3.5">{footer}</footer> : null}
      </div>
    </div>
  );
}

// ============================================================ Toasts

type Toast = { id: number; message: string; tone: "success" | "error" };
let toasts: Toast[] = [];
const toastListeners = new Set<() => void>();
const emitToasts = () => toastListeners.forEach((l) => l());

export function toast(message: string, tone: Toast["tone"] = "success") {
  const id = Date.now() + Math.random();
  toasts = [...toasts, { id, message, tone }];
  emitToasts();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emitToasts();
  }, 3800);
}

export function Toaster() {
  const list = useSyncExternalStore(
    (l) => {
      toastListeners.add(l);
      return () => toastListeners.delete(l);
    },
    () => toasts,
    () => toasts,
  );
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {list.map((t) => (
        <div key={t.id} className={`pointer-events-auto flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${t.tone === "success" ? "bg-primary text-white" : "bg-rose-700 text-white"}`}>
          {t.tone === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ============================================================ Table

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
  /** Hide on small screens */
  hideOnMobile?: boolean;
}

export function DataTable<T extends { id: string }>({ rows, columns, onRowClick, pageSize = 12, empty }: {
  rows: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  pageSize?: number;
  empty?: React.ReactNode;
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages - 1);
  const visible = rows.slice(current * pageSize, current * pageSize + pageSize);

  if (rows.length === 0) return <>{empty ?? <EmptyState title="Nothing to show" description="Try a different search or filter." />}</>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-soft/70 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className={`whitespace-nowrap px-4 py-3 font-semibold ${column.hideOnMobile ? "hidden md:table-cell" : ""} ${column.className ?? ""}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={onRowClick ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onRowClick(row)) : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                className={onRowClick ? "cursor-pointer transition-colors hover:bg-soft/70 focus:bg-soft focus:outline-none" : ""}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-3 align-middle ${column.hideOnMobile ? "hidden md:table-cell" : ""} ${column.className ?? ""}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-slate-500">
        <span>
          {current * pageSize + 1}–{Math.min((current + 1) * pageSize, rows.length)} of {rows.length}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)} className="rounded-md p-1.5 hover:bg-soft disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-1 font-medium">
            {current + 1} / {pages}
          </span>
          <button type="button" aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)} className="rounded-md p-1.5 hover:bg-soft disabled:opacity-40">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Reads `?open=ID` once on mount so links from search/activity open a record. */
export function useOpenParam(onOpen: (id: string) => void) {
  const handler = useRef(onOpen);
  useEffect(() => {
    handler.current = onOpen;
  });
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("open");
    if (id) handler.current(id);
    const onEvent = (event: Event) => handler.current((event as CustomEvent<string>).detail);
    window.addEventListener("ngi:open", onEvent);
    return () => window.removeEventListener("ngi:open", onEvent);
  }, []);
}

/** Open a record on the current page (pairs with useOpenParam). */
export function openRecord(id: string) {
  window.dispatchEvent(new CustomEvent("ngi:open", { detail: id }));
}
