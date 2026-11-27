import prisma from "./prisma";

// Default Initial Data (used if DB connection is initializing or offline)
export const initialUsers = [
  {
    id: "USR-101",
    name: "Er. Rahul Joshi",
    email: "rahul.joshi@ngi.edu.in",
    phone: "+91 95713 45444",
    role: "Super Admin",
    college: "Central Administration",
    status: "Active",
    avatarBg: "bg-brand-navy",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "USR-102",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98290 12345",
    role: "Student",
    college: "NIET — Engineering & Technology",
    status: "Active",
    avatarBg: "bg-blue-600",
    createdAt: new Date("2026-05-15"),
  },
  {
    id: "USR-103",
    name: "Priya Rathore",
    email: "priya.rathore@ngi.edu.in",
    phone: "+91 94141 88921",
    role: "Counselor",
    college: "Admissions Directorate",
    status: "Active",
    avatarBg: "bg-amber-600",
    createdAt: new Date("2025-02-05"),
  },
  {
    id: "USR-104",
    name: "Dr. Vikram Singh Rawat",
    email: "dr.vikram@ngi.edu.in",
    phone: "+91 98292 34138",
    role: "Faculty",
    college: "NIBM — Biotechnology & Management",
    status: "Active",
    avatarBg: "bg-emerald-600",
    createdAt: new Date("2023-08-18"),
  },
  {
    id: "USR-105",
    name: "Karan Mewara",
    email: "karan.mewara2026@outlook.com",
    phone: "+91 91160 54321",
    role: "Applicant",
    college: "NLC — Nathdwara Law College",
    status: "Pending",
    avatarBg: "bg-purple-600",
    createdAt: new Date("2026-05-22"),
  },
];

export const initialColleges = [
  {
    id: "niet",
    name: "Nathdwara Institute of Engineering & Technology",
    shortName: "NIET",
    code: "ENG-01",
    affiliation: "RTU Kota • AICTE Approved",
    category: "Engineering & Technology",
    establishedYear: 2010,
    coursesCount: 8,
    intakeSeats: 480,
    principal: "Dr. K. S. Sharma",
    status: "Active",
  },
  {
    id: "nibm",
    name: "Nathdwara Institute of Biotechnology & Management",
    shortName: "NIBM",
    code: "BIO-02",
    affiliation: "MLSU Udaipur • NCTE Jaipur",
    category: "Biotechnology & Management",
    establishedYear: 2012,
    coursesCount: 10,
    intakeSeats: 360,
    principal: "Dr. Vikram Rawat",
    status: "Active",
  },
  {
    id: "nlc",
    name: "Nathdwara Law College",
    shortName: "NLC",
    code: "LAW-03",
    affiliation: "MLSU Udaipur • BCI Approved",
    category: "Law & Legal Studies",
    establishedYear: 2014,
    coursesCount: 3,
    intakeSeats: 180,
    principal: "Adv. Rajesh Porwal",
    status: "Active",
  },
  {
    id: "ncan",
    name: "Nathdwara College of Ayurved Nursing",
    shortName: "NCAN",
    code: "AYU-04",
    affiliation: "DSRRAU Jodhpur & Govt of Rajasthan",
    category: "Ayurveda Nursing",
    establishedYear: 2015,
    coursesCount: 2,
    intakeSeats: 120,
    principal: "Prof. S. N. Trivedi",
    status: "Active",
  },
  {
    id: "vdsms",
    name: "Vallabh Darshan Society for Medical Science",
    shortName: "VDSMS",
    code: "MED-05",
    affiliation: "RPM Council Rajasthan",
    category: "Medical Sciences & Paramedical",
    establishedYear: 2016,
    coursesCount: 4,
    intakeSeats: 150,
    principal: "Dr. Meenakshi Dave",
    status: "Active",
  },
  {
    id: "npiti",
    name: "Nathdwara Private Industrial Training Institute",
    shortName: "NPITI",
    code: "ITI-06",
    affiliation: "NCVT New Delhi & DGT",
    category: "Industrial Vocational Training",
    establishedYear: 2011,
    coursesCount: 3,
    intakeSeats: 210,
    principal: "Er. Ramesh Soni",
    status: "Active",
  },
];

export const initialEnquiries = [
  {
    id: "ENQ-8901",
    name: "Rahul Prajapat",
    phone: "+91 98291 88472",
    email: "rahul.prajapat@gmail.com",
    college: "NIET",
    course: "B.Tech Computer Science & Engineering",
    state: "Rajasthan (Udaipur)",
    status: "New",
    date: "Nov 26, 2026",
    time: "10:14 PM",
    source: "Website Header Enquiry Modal",
    notes: "Enquired about 1st semester fees and hostel AC rooms.",
  },
  {
    id: "ENQ-8902",
    name: "Ananya Choudhary",
    phone: "+91 94142 33419",
    email: "ananya.choudhary@yahoo.com",
    college: "NCAN",
    course: "B.Sc Ayurveda Nursing (4-Year)",
    state: "Rajasthan (Rajsamand)",
    status: "New",
    date: "Nov 26, 2026",
    time: "08:45 PM",
    source: "Campus Life Page Form",
    notes: "Interested in state scholarship quota eligibility.",
  },
  {
    id: "ENQ-8898",
    name: "Devendra Singh Rathore",
    phone: "+91 97843 99012",
    email: "devendra.singh@gmail.com",
    college: "NLC",
    course: "LL.B 3-Year Degree Programme",
    state: "Rajasthan (Bhilwara)",
    status: "Contacted",
    date: "Nov 25, 2026",
    time: "03:30 PM",
    source: "Contact Page Form",
    notes: "Counselling scheduled on Friday with Principal.",
  },
];

// Fallback in-memory stores if DB connection is unavailable
let memoryUsers = [...initialUsers];
let memoryColleges = [...initialColleges];
let memoryEnquiries = [...initialEnquiries];

// =========================================================================
// USERS REPOSITORY
// =========================================================================
export async function dbGetUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return memoryUsers;
  }
}

export async function dbCreateUser(data: {
  name: string;
  email: string;
  phone?: string;
  role: string;
  college?: string;
  password?: string;
  status?: string;
}) {
  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        college: data.college || "NIET — Engineering & Technology",
        password: data.password || "Password@123",
        status: data.status || "Active",
      },
    });
  } catch (error) {
    const newUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "+91 95713 45444",
      role: data.role,
      college: data.college || "NIET — Engineering & Technology",
      status: data.status || "Active",
      avatarBg: "bg-brand-navy",
      createdAt: new Date(),
    };
    memoryUsers = [newUser, ...memoryUsers];
    return newUser;
  }
}

export async function dbUpdateUser(
  id: string,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
    role: string;
    college: string;
    status: string;
  }>
) {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    memoryUsers = memoryUsers.map((u) => (u.id === id ? { ...u, ...data } : u));
    return memoryUsers.find((u) => u.id === id);
  }
}

export async function dbDeleteUser(id: string) {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    memoryUsers = memoryUsers.filter((u) => u.id !== id);
    return { success: true, id };
  }
}

// =========================================================================
// COLLEGES REPOSITORY
// =========================================================================
export async function dbGetColleges() {
  try {
    return await prisma.college.findMany({
      orderBy: { establishedYear: "asc" },
    });
  } catch (error) {
    return memoryColleges;
  }
}

export async function dbCreateCollege(data: {
  id?: string;
  name: string;
  shortName: string;
  code: string;
  affiliation: string;
  category: string;
  establishedYear?: number;
  coursesCount?: number;
  intakeSeats?: number;
  principal?: string;
  status?: string;
}) {
  const collegeId = data.id || data.shortName.toLowerCase();
  try {
    return await prisma.college.create({
      data: {
        id: collegeId,
        name: data.name,
        shortName: data.shortName,
        code: data.code,
        affiliation: data.affiliation,
        category: data.category,
        establishedYear: data.establishedYear || 2026,
        coursesCount: data.coursesCount || 4,
        intakeSeats: data.intakeSeats || 120,
        principal: data.principal,
        status: data.status || "Active",
      },
    });
  } catch (error) {
    const newCollege = {
      id: collegeId,
      name: data.name,
      shortName: data.shortName,
      code: data.code,
      affiliation: data.affiliation,
      category: data.category,
      establishedYear: data.establishedYear || 2026,
      coursesCount: data.coursesCount || 4,
      intakeSeats: data.intakeSeats || 120,
      principal: data.principal || "Prof. In-Charge",
      status: data.status || "Active",
    };
    memoryColleges = [...memoryColleges, newCollege];
    return newCollege;
  }
}

export async function dbUpdateCollege(
  id: string,
  data: Partial<{
    name: string;
    shortName: string;
    code: string;
    affiliation: string;
    category: string;
    establishedYear: number;
    coursesCount: number;
    intakeSeats: number;
    principal: string;
    status: string;
  }>
) {
  try {
    return await prisma.college.update({
      where: { id },
      data,
    });
  } catch (error) {
    memoryColleges = memoryColleges.map((c) => (c.id === id ? { ...c, ...data } : c));
    return memoryColleges.find((c) => c.id === id);
  }
}

export async function dbDeleteCollege(id: string) {
  try {
    return await prisma.college.delete({ where: { id } });
  } catch (error) {
    memoryColleges = memoryColleges.filter((c) => c.id !== id);
    return { success: true, id };
  }
}

// =========================================================================
// ENQUIRIES / LEADS REPOSITORY (Default status: New)
// =========================================================================
export async function dbGetEnquiries() {
  try {
    return await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return memoryEnquiries;
  }
}

export async function dbCreateEnquiry(data: {
  name: string;
  phone: string;
  email?: string;
  college: string;
  course: string;
  state?: string;
  status?: string;
  source?: string;
  notes?: string;
}) {
  const enquiryStatus = data.status || "New"; // Default is always "New"
  try {
    return await prisma.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        college: data.college,
        course: data.course,
        state: data.state || "Rajasthan",
        status: enquiryStatus,
        source: data.source || "Website Enquiry Form",
        notes: data.notes || "Pending initial counselor call",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
      },
    });
  } catch (error) {
    const newEnq = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      college: data.college,
      course: data.course,
      state: data.state || "Rajasthan",
      status: enquiryStatus,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
      source: data.source || "Website Enquiry Form",
      notes: data.notes || "Pending initial counselor call",
    };
    memoryEnquiries = [newEnq, ...memoryEnquiries];
    return newEnq;
  }
}

export async function dbUpdateEnquiryStatus(id: string, status: string) {
  try {
    return await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    memoryEnquiries = memoryEnquiries.map((e) => (e.id === id ? { ...e, status } : e));
    return memoryEnquiries.find((e) => e.id === id);
  }
}

export async function dbDeleteEnquiry(id: string) {
  try {
    return await prisma.enquiry.delete({ where: { id } });
  } catch (error) {
    memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);
    return { success: true, id };
  }
}

// =========================================================================
// AUTHENTICATION & PASSWORD RECOVERY HELPERS
// =========================================================================
export async function dbGetUserByEmail(email: string) {
  try {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone: email }],
      },
    });
  } catch (error) {
    return memoryUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        (u.phone && u.phone.includes(email))
    );
  }
}

export async function dbUpdateUserPassword(email: string, newPassword: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone: email }],
      },
    });
    if (user) {
      return await prisma.user.update({
        where: { id: user.id },
        data: { password: newPassword },
      });
    }
    return null;
  } catch (error) {
    const idx = memoryUsers.findIndex(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        (u.phone && u.phone.includes(email))
    );
    if (idx !== -1) {
      (memoryUsers[idx] as any).password = newPassword;
      return memoryUsers[idx];
    }
    return null;
  }
}

