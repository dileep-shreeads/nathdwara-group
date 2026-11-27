import type {
  Activity,
  Application,
  ApplicationStage,
  College,
  DemoState,
  DocumentItem,
  Enquiry,
  EnquirySource,
  EnquiryStatus,
  Invoice,
  Notice,
  Payment,
  PaymentMode,
  Programme,
  Student,
  User,
} from "./types";

export const DEMO_VERSION = 1;
export const SESSION_LABEL = "2026-27";

/** Programmes whose seats and fees come from the college's official site. */
export const OFFICIAL_FEE_COLLEGES = new Set(["nibm"]);

const COLLEGES: College[] = [
  {
    id: "nibm",
    name: "Nathdwara Institute of Biotechnology & Management",
    shortName: "NIBM",
    affiliation: "MLSU Udaipur · NCTE recognised",
    category: "Science, Computer Applications & Teacher Education",
    principal: "Dr. Ranjana Sharma",
    phone: "+91 98292 34138",
  },
  {
    id: "niet",
    name: "Nathdwara Institute of Engineering and Technology",
    shortName: "NIET",
    affiliation: "RTU Kota · AICTE",
    category: "Engineering & Technology",
    principal: "To be updated",
    phone: "+91 95713 45444",
  },
  {
    id: "nlc",
    name: "Nathdwara Law College",
    shortName: "NLC",
    affiliation: "Dr. B. R. Ambedkar Law University, Jaipur · BCI",
    category: "Law",
    principal: "To be updated",
    phone: "+91 95713 45444",
  },
  {
    id: "npiti",
    name: "Nathdwara Private Industrial Training Institute",
    shortName: "NPITI",
    affiliation: "NCVT · DTE Rajasthan",
    category: "Industrial Training",
    principal: "To be updated",
    phone: "+91 95713 45444",
  },
  {
    id: "vdsms",
    name: "Vallabh Darshan Society for Medical Science",
    shortName: "VDSMS",
    affiliation: "PMKVY & RSLDC skill programmes",
    category: "Medical Science",
    principal: "Dr. Pankaj Rathi (Manager)",
    phone: "+91 96368 15142",
  },
  {
    id: "ayurved-nursing",
    name: "Nathdwara College of B.Sc. Ayurveda Nursing",
    shortName: "NCAN",
    affiliation: "Dr. S. R. Rajasthan Ayurved University, Jodhpur",
    category: "Ayurveda Nursing",
    principal: "To be updated",
    phone: "+91 95713 45444",
  },
];

const PROGRAMMES: Programme[] = [
  { id: "nibm-bca", collegeId: "nibm", name: "BCA", level: "UG", duration: "3 years", seats: 60, annualFee: 23000 },
  { id: "nibm-bsc", collegeId: "nibm", name: "B.Sc. (PCM / BZC)", level: "UG", duration: "3 years", seats: 70, annualFee: 22000 },
  { id: "nibm-itep", collegeId: "nibm", name: "ITEP B.Sc. B.Ed.", level: "Integrated", duration: "4 years", seats: 100, annualFee: 27000 },
  { id: "nibm-bsc-bed", collegeId: "nibm", name: "B.Sc. B.Ed.", level: "Integrated", duration: "4 years", seats: 50, annualFee: 27000 },
  { id: "nibm-ba-bed", collegeId: "nibm", name: "B.A. B.Ed.", level: "Integrated", duration: "4 years", seats: 50, annualFee: 27000 },
  { id: "nibm-msc-math", collegeId: "nibm", name: "M.Sc. Mathematics", level: "PG", duration: "2 years", seats: 40, annualFee: 20000 },
  { id: "nibm-msc-phy", collegeId: "nibm", name: "M.Sc. Physics", level: "PG", duration: "2 years", seats: 40, annualFee: 24000 },
  { id: "nibm-msc-chem", collegeId: "nibm", name: "M.Sc. Chemistry", level: "PG", duration: "2 years", seats: 40, annualFee: 22000 },
  { id: "nibm-msc-zoo", collegeId: "nibm", name: "M.Sc. Zoology", level: "PG", duration: "2 years", seats: 25, annualFee: 12000 },
  { id: "niet-cse", collegeId: "niet", name: "B.Tech Computer Science", level: "UG", duration: "4 years", seats: 60, annualFee: 65000 },
  { id: "niet-civil", collegeId: "niet", name: "B.Tech Civil", level: "UG", duration: "4 years", seats: 60, annualFee: 60000 },
  { id: "niet-poly", collegeId: "niet", name: "Polytechnic Diploma", level: "Diploma", duration: "3 years", seats: 60, annualFee: 35000 },
  { id: "nlc-llb", collegeId: "nlc", name: "LL.B.", level: "UG", duration: "3 years", seats: 60, annualFee: 30000 },
  { id: "npiti-elec", collegeId: "npiti", name: "ITI Electrician (NCVT)", level: "Vocational", duration: "2 years", seats: 48, annualFee: 18000 },
  { id: "npiti-fitter", collegeId: "npiti", name: "ITI Fitter (NCVT)", level: "Vocational", duration: "2 years", seats: 40, annualFee: 18000 },
  { id: "vdsms-dmlt", collegeId: "vdsms", name: "DMLT", level: "Diploma", duration: "2 years", seats: 40, annualFee: 30000 },
  { id: "vdsms-skill", collegeId: "vdsms", name: "Healthcare Skill Certificate (PMKVY)", level: "Vocational", duration: "6 months", seats: 30, annualFee: 0 },
  { id: "ncan-bsc", collegeId: "ayurved-nursing", name: "B.Sc. Ayurveda Nursing", level: "UG", duration: "4 years", seats: 40, annualFee: 55000 },
];

const FIRST_M = ["Aarav", "Vivaan", "Aditya", "Ishaan", "Kunal", "Rohit", "Mahesh", "Yash", "Devendra", "Lokesh", "Nikhil", "Harsh", "Manish", "Pradeep", "Gaurav", "Tarun", "Jitendra", "Abhishek"];
const FIRST_F = ["Priya", "Ananya", "Kavya", "Sneha", "Pooja", "Neha", "Ritu", "Khushi", "Komal", "Bhavna", "Jyoti", "Divya", "Monika", "Sakshi", "Tanvi", "Muskan", "Rekha", "Nisha"];
const LAST = ["Sharma", "Paliwal", "Joshi", "Rathore", "Chouhan", "Jain", "Purohit", "Mewara", "Kumawat", "Sanadhya", "Bhatt", "Meena", "Gurjar", "Sen", "Prajapat", "Dangi", "Shrimali", "Paneri", "Vyas", "Soni"];
const TOWNS = ["Nathdwara", "Rajsamand", "Kankroli", "Udaipur", "Mavli", "Fatehnagar", "Relmagra", "Rajnagar", "Khamnor", "Delwara", "Amet", "Bhilwara", "Chittorgarh", "Kumbhalgarh"];
const SOURCES: EnquirySource[] = ["Website form", "Website form", "Website form", "Walk-in", "Phone call", "Social media", "Referral", "Education fair"];
const CATEGORIES: Application["category"][] = ["General", "General", "OBC", "OBC", "OBC", "SC", "ST", "EWS"];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function documentChecklist(category: Application["category"]): DocumentItem[] {
  return [
    { name: "Class 10 mark sheet", required: true, verified: false },
    { name: "Class 12 / qualifying mark sheet", required: true, verified: false },
    { name: "Aadhaar card", required: true, verified: false },
    { name: "Passport photograph", required: true, verified: false },
    { name: "Transfer / migration certificate", required: true, verified: false },
    { name: "Caste certificate", required: category !== "General", verified: false },
  ];
}

export function createSeed(now = Date.now()): DemoState {
  const rand = mulberry32(20260527);
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];
  const int = (min: number, max: number) => Math.floor(min + rand() * (max - min + 1));
  const iso = (daysAgo: number, hour = int(9, 17)) => {
    const d = new Date(now - daysAgo * 86_400_000);
    d.setHours(hour, int(0, 59), 0, 0);
    return d.toISOString();
  };
  const phone = () => `+91 9${int(3, 9)}${int(100, 999)} ${int(10000, 99999)}`;
  const person = () => {
    const female = rand() < 0.48;
    const first = pick(female ? FIRST_F : FIRST_M);
    const last = pick(LAST);
    return { name: `${first} ${last}`, gender: (female ? "Female" : "Male") as Student["gender"], email: `${first}.${last}${int(1, 99)}@example.com`.toLowerCase() };
  };
  const weightedProgramme = () => {
    const r = rand();
    if (r < 0.45) return pick(PROGRAMMES.filter((p) => p.collegeId === "nibm"));
    return pick(PROGRAMMES);
  };

  const users: User[] = [
    { id: "U-01", name: "Rahul Joshi", email: "admin@ngi.demo", phone: "+91 95713 45444", role: "super_admin", status: "Active", password: "Admin@123", createdAt: iso(700) },
    { id: "U-02", name: "Priya Rathore", email: "counsellor@ngi.demo", phone: "+91 94141 20011", role: "counsellor", status: "Active", password: "Demo@123", createdAt: iso(420) },
    { id: "U-03", name: "Mahesh Paliwal", email: "accounts@ngi.demo", phone: "+91 94141 20012", role: "accounts", status: "Active", password: "Demo@123", createdAt: iso(500) },
    { id: "U-04", name: "Dr. Sudha Mehta", email: "nibm.admin@ngi.demo", phone: "+91 94141 20013", role: "college_admin", collegeId: "nibm", status: "Active", password: "Demo@123", createdAt: iso(380) },
    { id: "U-05", name: "Kailash Purohit", email: "counsellor2@ngi.demo", phone: "+91 94141 20014", role: "counsellor", status: "Active", password: "Demo@123", createdAt: iso(200) },
    { id: "U-06", name: "Er. Vikas Sen", email: "niet.admin@ngi.demo", phone: "+91 94141 20015", role: "college_admin", collegeId: "niet", status: "Inactive", password: "Demo@123", createdAt: iso(600) },
  ];
  const counsellors = users.filter((u) => u.role === "counsellor").map((u) => u.id);

  // ---------- Enquiries ----------
  const enquiries: Enquiry[] = [];
  for (let i = 0; i < 72; i++) {
    const p = person();
    const programme = weightedProgramme();
    const age = Math.floor(Math.pow(rand(), 1.5) * 330);
    let status: EnquiryStatus;
    if (age < 4) status = rand() < 0.7 ? "New" : "Contacted";
    else if (age < 20) status = pick(["New", "Contacted", "Follow-up", "Follow-up", "Converted"]);
    else status = pick(["Contacted", "Follow-up", "Converted", "Converted", "Closed", "Closed"]);
    const createdAt = iso(age);
    const assigned = status === "New" && rand() < 0.5 ? undefined : pick(counsellors);
    const notes =
      status === "New"
        ? []
        : [
            { at: iso(Math.max(age - 1, 0)), by: assigned === "U-02" ? "Priya Rathore" : "Kailash Purohit", text: pick(["Called candidate, shared fee structure.", "Parents will visit campus this weekend.", "Asked about hostel and bus from " + pick(TOWNS) + ".", "Waiting for Class 12 result.", "Sent prospectus on WhatsApp."]) },
          ];
    enquiries.push({
      id: `ENQ-${1001 + i}`,
      name: p.name,
      phone: phone(),
      email: rand() < 0.7 ? p.email : undefined,
      town: pick(TOWNS),
      collegeId: programme.collegeId,
      programmeId: programme.id,
      source: pick(SOURCES),
      status,
      assignedTo: assigned,
      followUpAt: status === "Follow-up" ? iso(-int(0, 6), 11) : undefined,
      notes,
      createdAt,
    });
  }
  enquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // ---------- Applications ----------
  const applications: Application[] = [];
  const stagePlan: ApplicationStage[] = [
    ...Array(10).fill("Submitted"),
    ...Array(8).fill("Documents Verified"),
    ...Array(7).fill("Provisionally Admitted"),
    ...Array(12).fill("Enrolled"),
    ...Array(3).fill("Rejected"),
  ];
  const converted = enquiries.filter((e) => e.status === "Converted");
  stagePlan.forEach((stage, i) => {
    const source = converted[i];
    const p = source ? { name: source.name, gender: (FIRST_F.includes(source.name.split(" ")[0]) ? "Female" : "Male") as Student["gender"], email: source.email ?? person().email } : person();
    const programme = source?.programmeId ? PROGRAMMES.find((x) => x.id === source.programmeId)! : weightedProgramme();
    const category = pick(CATEGORIES);
    const age = source ? Math.max(Math.floor((now - Date.parse(source.createdAt)) / 86_400_000) - int(1, 5), 1) : int(3, 120);
    const docs = documentChecklist(category).map((d) => ({
      ...d,
      verified: stage === "Submitted" ? rand() < 0.3 && d.required : stage !== "Rejected",
    }));
    applications.push({
      id: `APP-26-${String(i + 1).padStart(4, "0")}`,
      candidateName: p.name,
      gender: p.gender,
      dob: new Date(Date.UTC(int(2005, 2008), int(0, 11), int(1, 28))).toISOString().slice(0, 10),
      phone: source?.phone ?? phone(),
      email: p.email,
      town: source?.town ?? pick(TOWNS),
      category,
      collegeId: programme.collegeId,
      programmeId: programme.id,
      qualifyingMarks: int(48, 94),
      stage,
      documents: docs,
      enquiryId: source?.id,
      notes: stage === "Rejected" ? [{ at: iso(age - 1), by: "Priya Rathore", text: "Does not meet minimum eligibility marks." }] : [],
      createdAt: iso(age),
      updatedAt: iso(Math.max(age - int(0, 3), 0)),
    });
  });

  // ---------- Students ----------
  const students: Student[] = [];
  const rollCounters: Record<string, number> = {};
  const nextRoll = (collegeId: string, year: number) => {
    const short = COLLEGES.find((c) => c.id === collegeId)!.shortName;
    const intakeYear = 26 - (year - 1);
    const key = `${short}-${intakeYear}`;
    rollCounters[key] = (rollCounters[key] ?? 0) + 1;
    return `NGI/${intakeYear}/${short}/${String(rollCounters[key]).padStart(3, "0")}`;
  };
  applications
    .filter((a) => a.stage === "Enrolled")
    .forEach((a, i) => {
      const id = `S-${String(i + 1).padStart(4, "0")}`;
      a.studentId = id;
      students.push({
        id,
        rollNo: nextRoll(a.collegeId, 1),
        name: a.candidateName,
        gender: a.gender,
        phone: a.phone,
        email: a.email,
        guardianName: `${pick(FIRST_M)} ${a.candidateName.split(" ")[1]}`,
        town: a.town,
        category: a.category,
        collegeId: a.collegeId,
        programmeId: a.programmeId,
        year: 1,
        admissionDate: a.updatedAt.slice(0, 10),
        attendance: int(72, 98),
        status: "Active",
        applicationId: a.id,
      });
    });
  for (let i = 0; i < 36; i++) {
    const p = person();
    const programme = weightedProgramme();
    const year = int(2, 3);
    const category = pick(CATEGORIES);
    students.push({
      id: `S-${String(students.length + 1).padStart(4, "0")}`,
      rollNo: nextRoll(programme.collegeId, year),
      name: p.name,
      gender: p.gender,
      phone: phone(),
      email: p.email,
      guardianName: `${pick(FIRST_M)} ${p.name.split(" ")[1]}`,
      town: pick(TOWNS),
      category,
      collegeId: programme.collegeId,
      programmeId: programme.id,
      year,
      admissionDate: iso(365 * (year - 1) + int(20, 80)).slice(0, 10),
      attendance: int(61, 97),
      status: rand() < 0.06 ? "On Leave" : "Active",
    });
  }

  // Named demo student + applicant, so a login shows a full journey.
  const demoApp: Application = {
    id: "APP-26-0099",
    candidateName: "Aarav Sharma",
    gender: "Male",
    dob: "2007-03-14",
    phone: "+91 98290 11223",
    email: "student@ngi.demo",
    town: "Nathdwara",
    category: "General",
    collegeId: "nibm",
    programmeId: "nibm-bca",
    qualifyingMarks: 82,
    stage: "Enrolled",
    documents: documentChecklist("General").map((d) => ({ ...d, verified: d.required })),
    notes: [],
    createdAt: iso(48),
    updatedAt: iso(30),
  };
  const demoStudent: Student = {
    id: "S-0999",
    rollNo: "NGI/26/NIBM/099",
    name: "Aarav Sharma",
    gender: "Male",
    phone: demoApp.phone,
    email: demoApp.email,
    guardianName: "Suresh Sharma",
    town: "Nathdwara",
    category: "General",
    collegeId: "nibm",
    programmeId: "nibm-bca",
    year: 1,
    admissionDate: iso(30).slice(0, 10),
    attendance: 91,
    status: "Active",
    applicationId: demoApp.id,
  };
  demoApp.studentId = demoStudent.id;
  const applicantApp: Application = {
    id: "APP-26-0098",
    candidateName: "Kavya Paliwal",
    gender: "Female",
    dob: "2008-01-22",
    phone: "+91 97830 44556",
    email: "applicant@ngi.demo",
    town: "Kankroli",
    category: "OBC",
    collegeId: "nibm",
    programmeId: "nibm-itep",
    qualifyingMarks: 77,
    stage: "Documents Verified",
    documents: documentChecklist("OBC").map((d) => ({ ...d, verified: d.name !== "Transfer / migration certificate" })),
    notes: [{ at: iso(2), by: "Priya Rathore", text: "Migration certificate pending — candidate will submit after result." }],
    createdAt: iso(9),
    updatedAt: iso(2),
  };
  applications.unshift(demoApp, applicantApp);
  students.unshift(demoStudent);
  users.push(
    { id: "U-07", name: "Aarav Sharma", email: "student@ngi.demo", phone: demoApp.phone, role: "student", studentId: demoStudent.id, applicationId: demoApp.id, status: "Active", password: "Student@123", createdAt: iso(48) },
    { id: "U-08", name: "Kavya Paliwal", email: "applicant@ngi.demo", phone: applicantApp.phone, role: "student", applicationId: applicantApp.id, status: "Active", password: "Student@123", createdAt: iso(9) },
  );

  // ---------- Invoices & payments ----------
  let receiptSeq = 0;
  const modes: PaymentMode[] = ["UPI", "UPI", "UPI", "Bank transfer", "Cash", "Demand draft"];
  const invoices: Invoice[] = students.map((s, i) => {
    const programme = PROGRAMMES.find((p) => p.id === s.programmeId)!;
    const scholarship = (s.category === "SC" || s.category === "ST") && rand() < 0.7 ? Math.round(programme.annualFee * 0.5) : 0;
    const payable = programme.annualFee - scholarship;
    const r = s.id === "S-0999" ? 0.6 : rand();
    const payments: Payment[] = [];
    const paidFraction = r < 0.5 ? 1 : r < 0.8 ? 0.5 : 0;
    // iso(n) is n days ago, so negative values are future due dates.
    const due = s.id === "S-0999" ? -18 : rand() < 0.8 ? int(-45, -3) : int(2, 20);
    if (paidFraction > 0 && payable > 0) {
      const parts = paidFraction === 1 && rand() < 0.4 ? 2 : 1;
      const total = Math.round(payable * paidFraction);
      for (let k = 0; k < parts; k++) {
        receiptSeq++;
        payments.push({
          id: `PAY-${receiptSeq}`,
          receiptNo: `RCPT/26/${String(receiptSeq).padStart(5, "0")}`,
          amount: parts === 2 ? (k === 0 ? Math.round(total / 2) : total - Math.round(total / 2)) : total,
          mode: pick(modes),
          reference: rand() < 0.7 ? `UTR${int(100000000, 999999999)}` : undefined,
          paidAt: iso(int(1, 60)),
          recordedBy: "Mahesh Paliwal",
        });
      }
    }
    return {
      id: `INV-${String(i + 1).padStart(4, "0")}`,
      studentId: s.id,
      collegeId: s.collegeId,
      title: `Tuition fee — Year ${s.year}`,
      session: SESSION_LABEL,
      amount: programme.annualFee,
      scholarship,
      dueDate: iso(due).slice(0, 10),
      payments: payments.sort((a, b) => a.paidAt.localeCompare(b.paidAt)),
      createdAt: iso(70),
    };
  });

  // ---------- Notices ----------
  const notices: Notice[] = [
    { id: "N-01", title: "Academic calendar 2026-27 published", body: "The tentative calendar for session 2026-27 is available in the Mandatory Disclosures section. Classes for first-year students begin as per the calendar.", audience: "Everyone", pinned: true, publishedAt: iso(3), publishedBy: "Rahul Joshi" },
    { id: "N-02", title: "Last date for first instalment of fees", body: "Students who have not paid the first instalment should clear dues at the accounts office or by UPI before the due date shown in the portal to avoid a late fee.", audience: "Students", pinned: true, publishedAt: iso(5), publishedBy: "Mahesh Paliwal" },
    { id: "N-03", title: "ITEP B.Sc. B.Ed. — NCTE recognition received", body: "NIBM's four-year Integrated Teacher Education Programme is recognised from the 2026-27 session with 100 seats. Admission is through NCET.", audience: "Everyone", collegeId: "nibm", pinned: false, publishedAt: iso(12), publishedBy: "Dr. Sudha Mehta" },
    { id: "N-04", title: "Anti-ragging undertaking for new students", body: "All first-year students must submit the online anti-ragging undertaking. National helpline: 1800-180-5522.", audience: "Students", pinned: false, publishedAt: iso(15), publishedBy: "Rahul Joshi" },
    { id: "N-05", title: "PMIS portal registration for ITI trainees", body: "All NPITI trainees must register on the PMIS portal. Photo attendance at the institute is mandatory.", audience: "Students", collegeId: "npiti", pinned: false, publishedAt: iso(21), publishedBy: "Rahul Joshi" },
    { id: "N-06", title: "Counselling team: weekly lead review", body: "Weekly lead review every Monday at 10:00 AM in the admissions office. Update follow-up dates in the portal before the meeting.", audience: "Staff", pinned: false, publishedAt: iso(6), publishedBy: "Rahul Joshi" },
    { id: "N-07", title: "College bus routes for the new session", body: "Bus routes from Udaipur, Nathdwara, Rajnagar, Kankroli, Fatehnagar, Mavli and Relmagra resume with the session. Contact the transport office for passes.", audience: "Everyone", pinned: false, publishedAt: iso(26), publishedBy: "Rahul Joshi" },
  ];

  // ---------- Activity ----------
  const activity: Activity[] = [];
  enquiries.slice(0, 6).forEach((e, i) =>
    activity.push({ id: `A-${i + 1}`, at: e.createdAt, by: "Website", text: `New enquiry from ${e.name} (${e.source.toLowerCase()})`, href: `/dashboard/enquiries?open=${e.id}` }),
  );
  invoices
    .flatMap((inv) => inv.payments.map((p) => ({ inv, p })))
    .sort((a, b) => b.p.paidAt.localeCompare(a.p.paidAt))
    .slice(0, 5)
    .forEach(({ inv, p }, i) => {
      const s = students.find((x) => x.id === inv.studentId)!;
      activity.push({ id: `A-${10 + i}`, at: p.paidAt, by: p.recordedBy, text: `Recorded ₹${p.amount.toLocaleString("en-IN")} from ${s.name} (${p.receiptNo})`, href: `/dashboard/fees?open=${inv.id}` });
    });
  activity.sort((a, b) => b.at.localeCompare(a.at));

  return {
    version: DEMO_VERSION,
    seededAt: new Date(now).toISOString(),
    colleges: COLLEGES,
    programmes: PROGRAMMES,
    users,
    enquiries,
    applications,
    students,
    invoices,
    notices,
    activity,
    counters: { enquiry: 1001 + 72, application: 100, receipt: receiptSeq, student: 1000, invoice: invoices.length, notice: 7, activity: 100, user: 8 },
  };
}
