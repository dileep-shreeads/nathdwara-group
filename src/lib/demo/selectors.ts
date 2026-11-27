import type { DemoState, Invoice, User } from "./types";

export const inr = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

export const inrCompact = (value: number) => {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(2)} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(2)} L`;
  return inr(value);
};

export const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

export const formatDateTime = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })
    : "—";

export function timeAgo(iso: string) {
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} d ago`;
  return formatDate(iso);
}

export function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Er\.)\s*/, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export type InvoiceStatus = "Paid" | "Partially paid" | "Due" | "Overdue";

export function invoiceTotals(invoice: Invoice) {
  const payable = Math.max(invoice.amount - invoice.scholarship, 0);
  const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = Math.max(payable - paid, 0);
  let status: InvoiceStatus;
  if (balance === 0) status = "Paid";
  else if (paid > 0) status = "Partially paid";
  else status = Date.parse(invoice.dueDate) < Date.now() ? "Overdue" : "Due";
  if (balance > 0 && paid > 0 && Date.parse(invoice.dueDate) < Date.now()) status = "Overdue";
  return { payable, paid, balance, status };
}

/** College admins only see their own college; everyone else sees all. */
export function scoped<T extends { collegeId: string }>(items: T[], user: User) {
  return user.role === "college_admin" && user.collegeId
    ? items.filter((item) => item.collegeId === user.collegeId)
    : items;
}

export function lookups(state: DemoState) {
  const college = (id?: string) => state.colleges.find((c) => c.id === id);
  const programme = (id?: string) => state.programmes.find((p) => p.id === id);
  const user = (id?: string) => state.users.find((u) => u.id === id);
  const student = (id?: string) => state.students.find((s) => s.id === id);
  return { college, programme, user, student };
}

export function toCsv(rows: Record<string, string | number | undefined>[]) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: string | number | undefined) => {
    const text = value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((h) => escape(row[h])).join(","))].join("\n");
}

export function downloadFile(filename: string, contents: string, type = "text/csv") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
