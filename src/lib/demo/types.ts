/**
 * Data contracts for the NGI admin/student portal.
 * These mirror what the database tables will hold once Postgres is connected,
 * so screens built against them keep working when the data source changes.
 */

export type Role = "super_admin" | "college_admin" | "counsellor" | "accounts" | "student";

export interface College {
  id: string;
  name: string;
  shortName: string;
  affiliation: string;
  category: string;
  principal: string;
  phone: string;
}

export interface Programme {
  id: string;
  collegeId: string;
  name: string;
  level: "UG" | "PG" | "Integrated" | "Diploma" | "Vocational";
  duration: string;
  seats: number;
  annualFee: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  /** College-level staff only see their own college's records */
  collegeId?: string;
  /** Set for student logins */
  studentId?: string;
  applicationId?: string;
  status: "Active" | "Inactive";
  /** Demo only — the real backend must store a salted hash, never the password */
  password: string;
  lastLoginAt?: string;
  createdAt: string;
}

export type EnquiryStatus = "New" | "Contacted" | "Follow-up" | "Converted" | "Closed";
export type EnquirySource =
  | "Website form"
  | "Walk-in"
  | "Phone call"
  | "Social media"
  | "Referral"
  | "Education fair";

export interface Note {
  at: string;
  by: string;
  text: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  town: string;
  collegeId: string;
  programmeId?: string;
  courseLabel?: string;
  source: EnquirySource;
  status: EnquiryStatus;
  assignedTo?: string;
  followUpAt?: string;
  notes: Note[];
  createdAt: string;
}

export type ApplicationStage =
  | "Submitted"
  | "Documents Verified"
  | "Provisionally Admitted"
  | "Enrolled"
  | "Rejected";

export interface DocumentItem {
  name: string;
  required: boolean;
  verified: boolean;
}

export interface Application {
  id: string;
  candidateName: string;
  gender: "Male" | "Female";
  dob: string;
  phone: string;
  email: string;
  town: string;
  category: "General" | "OBC" | "SC" | "ST" | "EWS";
  collegeId: string;
  programmeId: string;
  qualifyingMarks: number;
  stage: ApplicationStage;
  documents: DocumentItem[];
  enquiryId?: string;
  studentId?: string;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  guardianName: string;
  town: string;
  category: Application["category"];
  collegeId: string;
  programmeId: string;
  year: number;
  admissionDate: string;
  attendance: number;
  status: "Active" | "On Leave" | "Passed Out";
  applicationId?: string;
}

export type PaymentMode = "UPI" | "Cash" | "Bank transfer" | "Demand draft";

export interface Payment {
  id: string;
  receiptNo: string;
  amount: number;
  mode: PaymentMode;
  reference?: string;
  paidAt: string;
  recordedBy: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  collegeId: string;
  title: string;
  session: string;
  amount: number;
  scholarship: number;
  dueDate: string;
  payments: Payment[];
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  audience: "Everyone" | "Students" | "Staff";
  collegeId?: string;
  pinned: boolean;
  publishedAt: string;
  publishedBy: string;
}

export interface Activity {
  id: string;
  at: string;
  by: string;
  text: string;
  href?: string;
}

export interface DemoState {
  version: number;
  seededAt: string;
  colleges: College[];
  programmes: Programme[];
  users: User[];
  enquiries: Enquiry[];
  applications: Application[];
  students: Student[];
  invoices: Invoice[];
  notices: Notice[];
  activity: Activity[];
  counters: Record<string, number>;
}
