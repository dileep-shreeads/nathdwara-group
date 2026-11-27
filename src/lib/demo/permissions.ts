import type { Role } from "./types";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  college_admin: "College Admin",
  counsellor: "Admission Counsellor",
  accounts: "Accounts Officer",
  student: "Student",
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  super_admin: "Full access to every college and module, including staff accounts.",
  college_admin: "Sees only their own college: enquiries, applications, students, fees and notices.",
  counsellor: "Works the admission pipeline: enquiries, follow-ups and applications.",
  accounts: "Manages fee invoices, payments and receipts.",
  student: "Own application status, fees, receipts and notices.",
};

export type ModuleKey =
  | "overview"
  | "enquiries"
  | "applications"
  | "students"
  | "fees"
  | "colleges"
  | "users"
  | "notices"
  | "settings"
  | "my-application"
  | "my-fees";

export interface ModuleDef {
  key: ModuleKey;
  label: string;
  href: string;
  roles: Role[];
  group: "Main" | "Admissions" | "Academics" | "Administration" | "My portal";
}

const STAFF: Role[] = ["super_admin", "college_admin", "counsellor", "accounts"];

export const MODULES: ModuleDef[] = [
  { key: "overview", label: "Overview", href: "/dashboard", roles: [...STAFF, "student"], group: "Main" },
  { key: "my-application", label: "My Application", href: "/dashboard/my-application", roles: ["student"], group: "My portal" },
  { key: "my-fees", label: "Fees & Receipts", href: "/dashboard/my-fees", roles: ["student"], group: "My portal" },
  { key: "enquiries", label: "Enquiries", href: "/dashboard/enquiries", roles: ["super_admin", "college_admin", "counsellor"], group: "Admissions" },
  { key: "applications", label: "Applications", href: "/dashboard/applications", roles: ["super_admin", "college_admin", "counsellor"], group: "Admissions" },
  { key: "students", label: "Students", href: "/dashboard/students", roles: ["super_admin", "college_admin", "accounts"], group: "Academics" },
  { key: "fees", label: "Fees & Receipts", href: "/dashboard/fees", roles: ["super_admin", "college_admin", "accounts"], group: "Academics" },
  { key: "notices", label: "Notices", href: "/dashboard/notices", roles: [...STAFF, "student"], group: "Academics" },
  { key: "colleges", label: "Colleges & Programmes", href: "/dashboard/colleges", roles: ["super_admin", "college_admin"], group: "Administration" },
  { key: "users", label: "Staff & Roles", href: "/dashboard/users", roles: ["super_admin"], group: "Administration" },
  { key: "settings", label: "Settings", href: "/dashboard/settings", roles: [...STAFF, "student"], group: "Administration" },
];

export function moduleForPath(pathname: string): ModuleDef | undefined {
  return [...MODULES]
    .sort((a, b) => b.href.length - a.href.length)
    .find((m) => pathname === m.href || pathname.startsWith(`${m.href}/`));
}

export function canAccess(role: Role, pathname: string) {
  const mod = moduleForPath(pathname);
  return mod ? mod.roles.includes(role) : false;
}

export function modulesFor(role: Role) {
  return MODULES.filter((m) => m.roles.includes(role));
}

/** Who may change what, beyond seeing the page. */
export const CAN = {
  editEnquiries: (r: Role) => r === "super_admin" || r === "college_admin" || r === "counsellor",
  moveApplications: (r: Role) => r === "super_admin" || r === "college_admin" || r === "counsellor",
  recordPayments: (r: Role) => r === "super_admin" || r === "accounts",
  editProgrammes: (r: Role) => r === "super_admin",
  publishNotices: (r: Role) => r !== "student",
};
