"use client";

/**
 * Service layer for the portal. Screens call only these functions.
 *
 * DATA SOURCE: browser demo store (src/lib/demo/store.ts).
 * To go live, keep these signatures and replace each body with a call to the
 * matching API route backed by Postgres. Validation here must then also run on
 * the server — the browser can't be trusted to enforce it.
 */

import { bump, getSessionUserId, getState, resetDemoData, setSessionUserId, setState } from "@/lib/demo/store";
import { documentChecklist, SESSION_LABEL } from "@/lib/demo/seed";
import { invoiceTotals } from "@/lib/demo/selectors";
import type {
  Application,
  ApplicationStage,
  DemoState,
  Enquiry,
  EnquiryStatus,
  Notice,
  PaymentMode,
  Role,
  Student,
  User,
} from "@/lib/demo/types";

export type Result<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const latency = () => new Promise((resolve) => setTimeout(resolve, 250));
const now = () => new Date().toISOString();
const fail = (error: string): Result<never> => ({ ok: false, error });

function log(draft: DemoState, by: string, text: string, href?: string) {
  draft.activity.unshift({ id: `A-${bump(draft, "activity")}`, at: now(), by, text, href });
  draft.activity = draft.activity.slice(0, 60);
}

function findUser(state: DemoState, identifier: string) {
  const id = identifier.trim().toLowerCase();
  const digits = id.replace(/\D/g, "");
  return state.users.find(
    (u) => u.email.toLowerCase() === id || (digits.length >= 10 && u.phone.replace(/\D/g, "").endsWith(digits.slice(-10))),
  );
}

export function currentUser(state: DemoState = getState()): User | undefined {
  const id = getSessionUserId();
  return id ? state.users.find((u) => u.id === id && u.status === "Active") : undefined;
}

function actorName() {
  return currentUser()?.name ?? "Website";
}

// ============================================================ AUTH

export async function signIn(identifier: string, password: string): Promise<Result<User>> {
  await latency();
  const user = findUser(getState(), identifier);
  if (!user || user.password !== password) return fail("Email/mobile or password is incorrect.");
  if (user.status !== "Active") return fail("This account is deactivated. Contact the administrator.");
  setState((draft) => {
    const u = draft.users.find((x) => x.id === user.id)!;
    u.lastLoginAt = now();
    return draft;
  });
  setSessionUserId(user.id);
  return { ok: true, data: user };
}

export function signOut() {
  setSessionUserId(null);
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: Student["gender"];
  category: Application["category"];
  town: string;
  collegeId: string;
  programmeId: string;
  qualifyingMarks: number;
  dob: string;
}

export async function registerApplicant(input: RegisterInput): Promise<Result<Application>> {
  await latency();
  const state = getState();
  if (findUser(state, input.email) || findUser(state, input.phone)) {
    return fail("An account with this email or mobile number already exists. Sign in instead.");
  }
  let application!: Application;
  setState((draft) => {
    const appNo = bump(draft, "application");
    application = {
      id: `APP-26-${String(appNo).padStart(4, "0")}`,
      candidateName: input.name,
      gender: input.gender,
      dob: input.dob,
      phone: input.phone,
      email: input.email.toLowerCase(),
      town: input.town,
      category: input.category,
      collegeId: input.collegeId,
      programmeId: input.programmeId,
      qualifyingMarks: input.qualifyingMarks,
      stage: "Submitted",
      documents: documentChecklist(input.category),
      notes: [],
      createdAt: now(),
      updatedAt: now(),
    };
    draft.applications.unshift(application);
    draft.users.push({
      id: `U-${String(bump(draft, "user")).padStart(2, "0")}`,
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      role: "student",
      applicationId: application.id,
      status: "Active",
      password: input.password,
      createdAt: now(),
      lastLoginAt: now(),
    });
    log(draft, input.name, `Online application ${application.id} submitted`, `/dashboard/applications?open=${application.id}`);
    return draft;
  });
  const created = getState().users.find((u) => u.applicationId === application.id)!;
  setSessionUserId(created.id);
  return { ok: true, data: application };
}

const OTP_KEY = "ngi-demo-otp";

export async function requestPasswordReset(identifier: string): Promise<Result<{ otp: string; email: string }>> {
  await latency();
  const user = findUser(getState(), identifier);
  if (!user) return fail("No account found with this email or mobile number.");
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  try {
    window.sessionStorage.setItem(OTP_KEY, JSON.stringify({ userId: user.id, otp, at: Date.now() }));
  } catch {
    /* storage blocked */
  }
  return { ok: true, data: { otp, email: user.email } };
}

export function verifyOtp(otp: string): Result<undefined> {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(OTP_KEY) ?? "null") as { otp: string; at: number } | null;
    if (!saved) return fail("Your code has expired. Request a new one.");
    if (Date.now() - saved.at > 10 * 60_000) return fail("Your code has expired. Request a new one.");
    if (saved.otp !== otp) return fail("That code is incorrect.");
    return { ok: true, data: undefined };
  } catch {
    return fail("Your code has expired. Request a new one.");
  }
}

export async function resetPasswordWithOtp(otp: string, newPassword: string): Promise<Result> {
  await latency();
  const check = verifyOtp(otp);
  if (!check.ok) return check;
  const saved = JSON.parse(window.sessionStorage.getItem(OTP_KEY)!) as { userId: string };
  setState((draft) => {
    draft.users.find((u) => u.id === saved.userId)!.password = newPassword;
    return draft;
  });
  window.sessionStorage.removeItem(OTP_KEY);
  return { ok: true, data: undefined };
}

export async function changePassword(current: string, next: string): Promise<Result> {
  await latency();
  const user = currentUser();
  if (!user) return fail("Please sign in again.");
  if (user.password !== current) return fail("Current password is incorrect.");
  setState((draft) => {
    draft.users.find((u) => u.id === user.id)!.password = next;
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function updateProfile(patch: { name: string; phone: string }): Promise<Result> {
  await latency();
  const user = currentUser();
  if (!user) return fail("Please sign in again.");
  setState((draft) => {
    Object.assign(draft.users.find((u) => u.id === user.id)!, patch);
    return draft;
  });
  return { ok: true, data: undefined };
}

export function passwordProblem(password: string) {
  if (password.length < 8) return "Use at least 8 characters.";
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    return "Include upper- and lower-case letters and a number.";
  }
  return null;
}

// ============================================================ ENQUIRIES

export interface EnquiryInput {
  name: string;
  phone: string;
  email?: string;
  town?: string;
  collegeId: string;
  programmeId?: string;
  courseLabel?: string;
  source?: Enquiry["source"];
  note?: string;
  /** Who to credit for the note/activity; defaults to the signed-in user */
  by?: string;
}

/** Used by the public website forms as well as staff. */
export async function createEnquiry(input: EnquiryInput): Promise<Result<Enquiry>> {
  await latency();
  let created!: Enquiry;
  const by = input.by ?? actorName();
  setState((draft) => {
    created = {
      id: `ENQ-${bump(draft, "enquiry")}`,
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || undefined,
      town: input.town?.trim() || "—",
      collegeId: input.collegeId,
      programmeId: input.programmeId,
      courseLabel: input.courseLabel,
      source: input.source ?? "Website form",
      status: "New",
      notes: input.note ? [{ at: now(), by, text: input.note }] : [],
      createdAt: now(),
    };
    draft.enquiries.unshift(created);
    log(draft, by, `New enquiry from ${created.name} (${created.source.toLowerCase()})`, `/dashboard/enquiries?open=${created.id}`);
    return draft;
  });
  return { ok: true, data: created };
}

/** Best guess at the college from free-text course names used on the website. */
export function collegeFromCourse(label = "") {
  const text = label.toLowerCase();
  if (/b\.?\s?tech|polytechnic|niet|engineer/.test(text)) return "niet";
  if (/ll\.?\s?b|law|nlc/.test(text)) return "nlc";
  if (/ayurved|nursing|ncan/.test(text)) return "ayurved-nursing";
  if (/iti|electrician|fitter|npiti/.test(text)) return "npiti";
  if (/dmlt|medical|vdsms|pmkvy/.test(text)) return "vdsms";
  return "nibm";
}

function programmeFromCourse(collegeId: string, label = "") {
  const text = label.toLowerCase();
  const options = getState().programmes.filter((p) => p.collegeId === collegeId);
  const exact = options.find((p) => text.includes(p.name.toLowerCase()));
  if (exact) return exact.id;
  const rules: [RegExp, string][] = [
    [/itep/, "nibm-itep"],
    [/b\.?a\.?[\s-]*b\.?\s?ed/, "nibm-ba-bed"],
    [/b\.?sc\.?[\s-]*b\.?\s?ed/, "nibm-bsc-bed"],
    [/bca|computer app/, "nibm-bca"],
    [/m\.?sc/, "nibm-msc-math"],
    [/b\.?sc/, "nibm-bsc"],
    [/computer science|cse/, "niet-cse"],
    [/civil/, "niet-civil"],
    [/polytechnic|diploma/, "niet-poly"],
    [/ll\.?\s?b/, "nlc-llb"],
    [/fitter/, "npiti-fitter"],
    [/electrician|iti/, "npiti-elec"],
    [/dmlt/, "vdsms-dmlt"],
    [/nursing/, "ncan-bsc"],
  ];
  const match = rules.find(([re, id]) => re.test(text) && options.some((p) => p.id === id));
  return match?.[1];
}

/** Called by the public website forms (header popup, contact page, hero form). */
export async function submitWebsiteEnquiry(input: { name: string; phone: string; email?: string; town?: string; courseLabel?: string; note?: string }) {
  const collegeId = collegeFromCourse(input.courseLabel);
  return createEnquiry({
    ...input,
    collegeId,
    programmeId: programmeFromCourse(collegeId, input.courseLabel),
    source: "Website form",
    by: "Website visitor",
  });
}

export async function updateEnquiry(
  id: string,
  patch: Partial<Pick<Enquiry, "status" | "assignedTo" | "followUpAt" | "collegeId" | "programmeId">>,
): Promise<Result> {
  await latency();
  const by = actorName();
  setState((draft) => {
    const enquiry = draft.enquiries.find((e) => e.id === id)!;
    if (patch.status && patch.status !== enquiry.status) {
      enquiry.notes.unshift({ at: now(), by, text: `Status changed from ${enquiry.status} to ${patch.status}.` });
    }
    Object.assign(enquiry, patch);
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function addEnquiryNote(id: string, text: string): Promise<Result> {
  await latency();
  const by = actorName();
  setState((draft) => {
    draft.enquiries.find((e) => e.id === id)!.notes.unshift({ at: now(), by, text });
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function convertEnquiry(id: string): Promise<Result<Application>> {
  await latency();
  const enquiry = getState().enquiries.find((e) => e.id === id);
  if (!enquiry) return fail("Enquiry not found.");
  if (!enquiry.programmeId) return fail("Choose a programme for this enquiry before converting it.");
  const existing = getState().applications.find((a) => a.enquiryId === id);
  if (existing) return fail(`Already converted to application ${existing.id}.`);
  let application!: Application;
  const by = actorName();
  setState((draft) => {
    application = {
      id: `APP-26-${String(bump(draft, "application")).padStart(4, "0")}`,
      candidateName: enquiry.name,
      gender: "Male",
      dob: "",
      phone: enquiry.phone,
      email: enquiry.email ?? "",
      town: enquiry.town,
      category: "General",
      collegeId: enquiry.collegeId,
      programmeId: enquiry.programmeId!,
      qualifyingMarks: 0,
      stage: "Submitted",
      documents: documentChecklist("General"),
      enquiryId: enquiry.id,
      notes: [{ at: now(), by, text: `Created from enquiry ${enquiry.id}.` }],
      createdAt: now(),
      updatedAt: now(),
    };
    draft.applications.unshift(application);
    const e = draft.enquiries.find((x) => x.id === id)!;
    e.notes.unshift({ at: now(), by, text: `Converted to application ${application.id}.` });
    e.status = "Converted";
    log(draft, by, `Converted ${enquiry.name} to application ${application.id}`, `/dashboard/applications?open=${application.id}`);
    return draft;
  });
  return { ok: true, data: application };
}

// ============================================================ APPLICATIONS

export async function toggleDocument(appId: string, docName: string): Promise<Result> {
  await latency();
  setState((draft) => {
    const doc = draft.applications.find((a) => a.id === appId)!.documents.find((d) => d.name === docName)!;
    doc.verified = !doc.verified;
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function updateApplication(
  appId: string,
  patch: Partial<Pick<Application, "category" | "gender" | "qualifyingMarks" | "programmeId" | "dob">>,
): Promise<Result> {
  await latency();
  setState((draft) => {
    const app = draft.applications.find((a) => a.id === appId)!;
    Object.assign(app, patch, { updatedAt: now() });
    if (patch.programmeId) app.collegeId = draft.programmes.find((p) => p.id === patch.programmeId)!.collegeId;
    if (patch.category) {
      const fresh = documentChecklist(patch.category);
      app.documents = fresh.map((d) => ({ ...d, verified: app.documents.find((x) => x.name === d.name)?.verified ?? false }));
    }
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function addApplicationNote(appId: string, text: string): Promise<Result> {
  await latency();
  const by = actorName();
  setState((draft) => {
    draft.applications.find((a) => a.id === appId)!.notes.unshift({ at: now(), by, text });
    return draft;
  });
  return { ok: true, data: undefined };
}

export const STAGE_FLOW: ApplicationStage[] = ["Submitted", "Documents Verified", "Provisionally Admitted", "Enrolled"];

export function seatsTaken(state: DemoState, programmeId: string) {
  return (
    state.applications.filter((a) => a.programmeId === programmeId && (a.stage === "Provisionally Admitted" || a.stage === "Enrolled") && !a.studentId).length +
    state.students.filter((s) => s.programmeId === programmeId && s.year === 1).length
  );
}

export async function setApplicationStage(appId: string, stage: ApplicationStage, reason?: string): Promise<Result<{ studentId?: string }>> {
  await latency();
  const state = getState();
  const app = state.applications.find((a) => a.id === appId);
  if (!app) return fail("Application not found.");
  if (stage !== "Rejected" && app.stage === "Rejected") return fail("Reopen is not allowed — create a new application instead.");
  if (stage === "Documents Verified" && app.documents.some((d) => d.required && !d.verified)) {
    return fail("Verify every required document first.");
  }
  if (stage === "Documents Verified" && (!app.dob || !app.qualifyingMarks)) {
    return fail("Add the candidate's date of birth and qualifying marks first.");
  }
  const programme = state.programmes.find((p) => p.id === app.programmeId)!;
  if (stage === "Provisionally Admitted" && seatsTaken(state, programme.id) >= programme.seats) {
    return fail(`All ${programme.seats} seats in ${programme.name} are filled.`);
  }

  let studentId: string | undefined;
  const by = actorName();
  setState((draft) => {
    const a = draft.applications.find((x) => x.id === appId)!;
    a.notes.unshift({ at: now(), by, text: reason ? `${stage}: ${reason}` : `Moved to ${stage}.` });
    a.stage = stage;
    a.updatedAt = now();
    if (stage === "Enrolled" && !a.studentId) {
      const college = draft.colleges.find((c) => c.id === a.collegeId)!;
      const seq = bump(draft, "student");
      studentId = `S-${seq}`;
      const intakeCount = draft.students.filter((s) => s.collegeId === a.collegeId && s.year === 1).length + 1;
      draft.students.unshift({
        id: studentId,
        rollNo: `NGI/26/${college.shortName}/${String(intakeCount + 100).padStart(3, "0")}`,
        name: a.candidateName,
        gender: a.gender,
        phone: a.phone,
        email: a.email,
        guardianName: "—",
        town: a.town,
        category: a.category,
        collegeId: a.collegeId,
        programmeId: a.programmeId,
        year: 1,
        admissionDate: now().slice(0, 10),
        attendance: 100,
        status: "Active",
        applicationId: a.id,
      });
      a.studentId = studentId;
      const due = new Date(Date.now() + 21 * 86_400_000).toISOString().slice(0, 10);
      draft.invoices.unshift({
        id: `INV-${String(bump(draft, "invoice")).padStart(4, "0")}`,
        studentId,
        collegeId: a.collegeId,
        title: "Tuition fee — Year 1",
        session: SESSION_LABEL,
        amount: programme.annualFee,
        scholarship: 0,
        dueDate: due,
        payments: [],
        createdAt: now(),
      });
      const login = draft.users.find((u) => u.applicationId === a.id);
      if (login) login.studentId = studentId;
      log(draft, by, `Enrolled ${a.candidateName} in ${programme.name}; fee invoice raised`, `/dashboard/students?open=${studentId}`);
    } else {
      log(draft, by, `${a.candidateName}'s application moved to ${stage}`, `/dashboard/applications?open=${a.id}`);
    }
    return draft;
  });
  return { ok: true, data: { studentId } };
}

// ============================================================ STUDENTS

export async function updateStudent(id: string, patch: Partial<Pick<Student, "phone" | "email" | "guardianName" | "town" | "status" | "attendance">>): Promise<Result> {
  await latency();
  setState((draft) => {
    Object.assign(draft.students.find((s) => s.id === id)!, patch);
    return draft;
  });
  return { ok: true, data: undefined };
}

// ============================================================ FEES

export async function recordPayment(
  invoiceId: string,
  input: { amount: number; mode: PaymentMode; reference?: string },
): Promise<Result<{ receiptNo: string }>> {
  await latency();
  const invoice = getState().invoices.find((i) => i.id === invoiceId);
  if (!invoice) return fail("Invoice not found.");
  const { balance } = invoiceTotals(invoice);
  if (!Number.isFinite(input.amount) || input.amount <= 0) return fail("Enter an amount greater than zero.");
  if (input.amount > balance) return fail(`Amount is more than the balance of ₹${balance.toLocaleString("en-IN")}.`);
  if (input.mode !== "Cash" && !input.reference?.trim()) return fail("Enter the UTR / transaction or DD number.");

  let receiptNo = "";
  const by = actorName();
  setState((draft) => {
    const seq = bump(draft, "receipt");
    receiptNo = `RCPT/26/${String(seq).padStart(5, "0")}`;
    const inv = draft.invoices.find((i) => i.id === invoiceId)!;
    inv.payments.push({ id: `PAY-${seq}`, receiptNo, amount: input.amount, mode: input.mode, reference: input.reference?.trim() || undefined, paidAt: now(), recordedBy: by });
    const student = draft.students.find((s) => s.id === inv.studentId)!;
    log(draft, by, `Recorded ₹${input.amount.toLocaleString("en-IN")} from ${student.name} (${receiptNo})`, `/dashboard/fees?open=${inv.id}`);
    return draft;
  });
  return { ok: true, data: { receiptNo } };
}

export async function setScholarship(invoiceId: string, amount: number): Promise<Result> {
  await latency();
  const invoice = getState().invoices.find((i) => i.id === invoiceId);
  if (!invoice) return fail("Invoice not found.");
  const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
  if (amount < 0 || amount > invoice.amount - paid) return fail("Scholarship can't exceed the unpaid amount.");
  setState((draft) => {
    draft.invoices.find((i) => i.id === invoiceId)!.scholarship = amount;
    return draft;
  });
  return { ok: true, data: undefined };
}

// ============================================================ COLLEGES

export async function updateProgramme(id: string, patch: { seats: number; annualFee: number }): Promise<Result> {
  await latency();
  if (patch.seats < 1 || patch.annualFee < 0) return fail("Seats must be at least 1 and fee can't be negative.");
  setState((draft) => {
    Object.assign(draft.programmes.find((p) => p.id === id)!, patch);
    return draft;
  });
  return { ok: true, data: undefined };
}

// ============================================================ USERS

export async function saveUser(input: { id?: string; name: string; email: string; phone: string; role: Exclude<Role, "student">; collegeId?: string }): Promise<Result<{ tempPassword?: string }>> {
  await latency();
  const clash = getState().users.find((u) => u.email.toLowerCase() === input.email.trim().toLowerCase() && u.id !== input.id);
  if (clash) return fail("Another account already uses this email.");
  if (input.role === "college_admin" && !input.collegeId) return fail("Choose the college this admin manages.");
  let tempPassword: string | undefined;
  const { id, ...fields } = input;
  setState((draft) => {
    const collegeId = fields.role === "college_admin" ? fields.collegeId : undefined;
    if (id) {
      Object.assign(draft.users.find((u) => u.id === id)!, { ...fields, email: fields.email.trim().toLowerCase(), collegeId });
    } else {
      tempPassword = "Welcome@123";
      draft.users.push({
        id: `U-${String(bump(draft, "user")).padStart(2, "0")}`,
        ...fields,
        email: fields.email.trim().toLowerCase(),
        collegeId,
        status: "Active",
        password: tempPassword,
        createdAt: now(),
      });
    }
    return draft;
  });
  return { ok: true, data: { tempPassword } };
}

export async function setUserStatus(id: string, status: User["status"]): Promise<Result> {
  await latency();
  if (id === getSessionUserId()) return fail("You can't deactivate your own account.");
  setState((draft) => {
    draft.users.find((u) => u.id === id)!.status = status;
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function resetUserPassword(id: string): Promise<Result<{ tempPassword: string }>> {
  await latency();
  setState((draft) => {
    draft.users.find((u) => u.id === id)!.password = "Welcome@123";
    return draft;
  });
  return { ok: true, data: { tempPassword: "Welcome@123" } };
}

// ============================================================ NOTICES

export async function saveNotice(input: Omit<Notice, "id" | "publishedAt" | "publishedBy"> & { id?: string }): Promise<Result> {
  await latency();
  if (!input.title.trim() || !input.body.trim()) return fail("Add a title and the notice text.");
  const by = actorName();
  setState((draft) => {
    if (input.id) {
      Object.assign(draft.notices.find((n) => n.id === input.id)!, input);
    } else {
      draft.notices.unshift({ ...input, id: `N-${String(bump(draft, "notice")).padStart(2, "0")}`, publishedAt: now(), publishedBy: by });
      log(draft, by, `Published notice: ${input.title}`, "/dashboard/notices");
    }
    return draft;
  });
  return { ok: true, data: undefined };
}

export async function deleteNotice(id: string): Promise<Result> {
  await latency();
  setState((draft) => {
    draft.notices = draft.notices.filter((n) => n.id !== id);
    return draft;
  });
  return { ok: true, data: undefined };
}

// ============================================================ DEMO

export function resetDemo() {
  resetDemoData();
}

export type { EnquiryStatus };
