"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Building,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  CreditCard,
  Download,
  Edit,
  Eye,
  FileCheck,
  FileDown,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  Laptop,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MoreVertical,
  Palette,
  Phone,
  PhoneCall,
  Plus,
  Printer,
  RefreshCw,
  School,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  User,
  UserCheck,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";

// =========================================================================
// TYPES & DATA CONTRACTS
// =========================================================================

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Student" | "Applicant" | "Faculty" | "Counselor" | "Super Admin";
  college: string;
  createdAt: string;
  status: "Active" | "Inactive" | "Pending";
  avatarBg: string;
}

export interface CollegeRecord {
  id: string;
  name: string;
  shortName: string;
  code: string;
  affiliation: string;
  category: string;
  establishedYear: number;
  coursesCount: number;
  intakeSeats: number;
  principal: string;
  status: "Active" | "Under Review";
}

export interface EnquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  college: string;
  course: string;
  state: string;
  status: "New" | "Contacted" | "Follow Up" | "Admitted" | "Closed";
  date: string;
  time: string;
  source: string;
  notes: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // Active Main View Section
  const [activeSection, setActiveSection] = useState<
    "overview" | "users" | "colleges" | "inquiries" | "admissions" | "fees" | "settings"
  >("overview");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Filter & Search states
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("All");

  const [collegeSearch, setCollegeSearch] = useState("");
  const [collegeCategoryFilter, setCollegeCategoryFilter] = useState("All");

  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("All");

  // Timeframe for Bar Chart
  const [chartTimeframe, setChartTimeframe] = useState<"months" | "week" | "year">("months");

  // =========================================================================
  // STATE: USER MANAGEMENT (CRUD)
  // =========================================================================
  const defaultUsers: UserRecord[] = [
    {
      id: "USR-101",
      name: "Er. Rahul Joshi",
      email: "rahul.joshi@ngi.edu.in",
      phone: "+91 95713 45444",
      role: "Super Admin",
      college: "Central Administration",
      createdAt: "12 Jan 2024",
      status: "Active",
      avatarBg: "bg-brand-navy",
    },
    {
      id: "USR-102",
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
      phone: "+91 98290 12345",
      role: "Student",
      college: "NIET — Engineering & Technology",
      createdAt: "15 May 2026",
      status: "Active",
      avatarBg: "bg-blue-600",
    },
    {
      id: "USR-103",
      name: "Priya Rathore",
      email: "priya.rathore@ngi.edu.in",
      phone: "+91 94141 88921",
      role: "Counselor",
      college: "Admissions Directorate",
      createdAt: "05 Feb 2025",
      status: "Active",
      avatarBg: "bg-amber-600",
    },
    {
      id: "USR-104",
      name: "Dr. Vikram Singh Rawat",
      email: "dr.vikram@ngi.edu.in",
      phone: "+91 98292 34138",
      role: "Faculty",
      college: "NIBM — Biotechnology & Management",
      createdAt: "18 Aug 2023",
      status: "Active",
      avatarBg: "bg-emerald-600",
    },
    {
      id: "USR-105",
      name: "Karan Mewara",
      email: "karan.mewara2026@outlook.com",
      phone: "+91 91160 54321",
      role: "Applicant",
      college: "NLC — Nathdwara Law College",
      createdAt: "22 May 2026",
      status: "Pending",
      avatarBg: "bg-purple-600",
    },
    {
      id: "USR-106",
      name: "Sunita Kumawat",
      email: "sunita.k@gmail.com",
      phone: "+91 97845 11223",
      role: "Applicant",
      college: "NCAN — Ayurveda Nursing",
      createdAt: "24 Nov 2026",
      status: "Active",
      avatarBg: "bg-rose-600",
    },
  ];

  const [users, setUsers] = useState<UserRecord[]>(defaultUsers);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [userModalMode, setUserModalMode] = useState<"view" | "create" | "edit" | null>(null);
  const [userFormData, setUserFormData] = useState<Partial<UserRecord>>({
    name: "",
    email: "",
    phone: "",
    role: "Student",
    college: "NIET — Engineering & Technology",
    status: "Active",
  });

  // =========================================================================
  // STATE: COLLEGE MANAGEMENT (CRUD)
  // =========================================================================
  const defaultColleges: CollegeRecord[] = [
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

  const [colleges, setColleges] = useState<CollegeRecord[]>(defaultColleges);
  const [selectedCollege, setSelectedCollege] = useState<CollegeRecord | null>(null);
  const [collegeModalMode, setCollegeModalMode] = useState<"view" | "create" | "edit" | null>(null);
  const [collegeFormData, setCollegeFormData] = useState<Partial<CollegeRecord>>({
    name: "",
    shortName: "",
    code: "",
    affiliation: "",
    category: "Engineering & Technology",
    establishedYear: 2026,
    coursesCount: 4,
    intakeSeats: 120,
    principal: "",
    status: "Active",
  });

  // =========================================================================
  // STATE: INQUIRIES & LEADS MANAGEMENT (Default Status: New)
  // =========================================================================
  const defaultEnquiries: EnquiryRecord[] = [
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
    {
      id: "ENQ-8895",
      name: "Pooja Vaishnav",
      phone: "+91 96361 77241",
      email: "pooja.v@outlook.com",
      college: "NIBM",
      course: "BCA (Bachelor of Computer Applications)",
      state: "Gujarat (Ahmedabad)",
      status: "Follow Up",
      date: "Nov 24, 2026",
      time: "11:20 AM",
      source: "Student Portal Online Registration",
      notes: "Hostel facility inspection requested by parents.",
    },
    {
      id: "ENQ-8889",
      name: "Gaurav Soni",
      phone: "+91 70148 66120",
      email: "gaurav.soni2026@gmail.com",
      college: "NIET",
      course: "B.Tech Artificial Intelligence & Data Science",
      state: "Madhya Pradesh (Neemuch)",
      status: "Admitted",
      date: "Nov 22, 2026",
      time: "04:10 PM",
      source: "Admissions 2026 Fast-Track",
      notes: "Paid token fee ₹15,000 via Razorpay gateway.",
    },
  ];

  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(defaultEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Read saved storage on client mount
  useEffect(() => {
    try {
      // Load enquiries (incorporating any live frontend submissions!)
      const savedEnq = localStorage.getItem("ngi_enquiries_list");
      if (savedEnq) {
        const parsed = JSON.parse(savedEnq);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge unique entries
          const merged = [...parsed];
          defaultEnquiries.forEach((item) => {
            if (!merged.find((m) => m.id === item.id)) {
              merged.push(item);
            }
          });
          setEnquiries(merged);
        }
      } else {
        localStorage.setItem("ngi_enquiries_list", JSON.stringify(defaultEnquiries));
      }

      // Load colleges
      const savedColleges = localStorage.getItem("ngi_colleges_list");
      if (savedColleges) {
        const parsed = JSON.parse(savedColleges);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setColleges(parsed);
        }
      }

      // Load users
      const savedUsers = localStorage.getItem("ngi_users_list");
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed);
        }
      }
    } catch (e) {}

    // Live Clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("ngi_student_session");
    } catch (e) {}
    router.push("/login");
  };

  // =========================================================================
  // USER CRUD HANDLERS
  // =========================================================================
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email) return;

    let updatedUsers = [...users];

    if (userModalMode === "create") {
      const newUser: UserRecord = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: userFormData.name || "New User",
        email: userFormData.email || "",
        phone: userFormData.phone || "+91 95713 45444",
        role: userFormData.role as UserRecord["role"] || "Student",
        college: userFormData.college || "NIET — Engineering & Technology",
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: userFormData.status as UserRecord["status"] || "Active",
        avatarBg: "bg-brand-navy",
      };
      updatedUsers = [newUser, ...updatedUsers];
    } else if (userModalMode === "edit" && selectedUser) {
      updatedUsers = updatedUsers.map((u) =>
        u.id === selectedUser.id ? { ...u, ...userFormData } as UserRecord : u
      );
    }

    setUsers(updatedUsers);
    try {
      localStorage.setItem("ngi_users_list", JSON.stringify(updatedUsers));
    } catch (e) {}

    setUserModalMode(null);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to remove this user from NGI ERP?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      try {
        localStorage.setItem("ngi_users_list", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // =========================================================================
  // COLLEGE CRUD HANDLERS
  // =========================================================================
  const handleSaveCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeFormData.name || !collegeFormData.shortName) return;

    let updatedColleges = [...colleges];

    if (collegeModalMode === "create") {
      const newCollege: CollegeRecord = {
        id: collegeFormData.shortName?.toLowerCase() || `coll-${Date.now()}`,
        name: collegeFormData.name || "",
        shortName: collegeFormData.shortName || "",
        code: collegeFormData.code || `INST-${Math.floor(10 + Math.random() * 90)}`,
        affiliation: collegeFormData.affiliation || "Affiliated to State University",
        category: collegeFormData.category || "Higher Education",
        establishedYear: Number(collegeFormData.establishedYear) || 2026,
        coursesCount: Number(collegeFormData.coursesCount) || 4,
        intakeSeats: Number(collegeFormData.intakeSeats) || 120,
        principal: collegeFormData.principal || "Prof. In-Charge",
        status: (collegeFormData.status as CollegeRecord["status"]) || "Active",
      };
      updatedColleges = [...updatedColleges, newCollege];
    } else if (collegeModalMode === "edit" && selectedCollege) {
      updatedColleges = updatedColleges.map((c) =>
        c.id === selectedCollege.id ? { ...c, ...collegeFormData } as CollegeRecord : c
      );
    }

    setColleges(updatedColleges);
    try {
      localStorage.setItem("ngi_colleges_list", JSON.stringify(updatedColleges));
    } catch (e) {}

    setCollegeModalMode(null);
    setSelectedCollege(null);
  };

  const handleDeleteCollege = (id: string) => {
    if (confirm("Are you sure you want to remove this college from the institutional registry?")) {
      const updated = colleges.filter((c) => c.id !== id);
      setColleges(updated);
      try {
        localStorage.setItem("ngi_colleges_list", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // =========================================================================
  // ENQUIRIES STATUS & ACTIONS
  // =========================================================================
  const handleUpdateEnquiryStatus = (id: string, newStatus: EnquiryRecord["status"]) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    try {
      localStorage.setItem("ngi_enquiries_list", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDeleteEnquiry = (id: string) => {
    if (confirm("Delete this admission enquiry record?")) {
      const updated = enquiries.filter((e) => e.id !== id);
      setEnquiries(updated);
      try {
        localStorage.setItem("ngi_enquiries_list", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Filtered Lists
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.college.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === "All" || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredColleges = colleges.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      c.shortName.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      c.affiliation.toLowerCase().includes(collegeSearch.toLowerCase());
    const matchesCat = collegeCategoryFilter === "All" || c.category === collegeCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.phone.includes(enquirySearch) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.course.toLowerCase().includes(enquirySearch.toLowerCase());
    const matchesStatus = enquiryStatusFilter === "All" || e.status === enquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-300 selection:text-[#0B1B3D]">
      {/* =========================================================================
          TOP NAV BAR: Brand Navy `#0B1B3D` with Gold Accents
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#0B1B3D] text-white border-b border-blue-900/60 shadow-md px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center rounded-xl bg-white p-1 shadow-sm transition group-hover:scale-105">
              <img
                src="/ngi-logo.png"
                alt="NGI Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <div>
              <span className="block font-black text-base sm:text-lg text-white tracking-tight leading-none">
                NATHDWARA <span className="text-amber-400">GROUP</span>
              </span>
              <span className="block text-[8.5px] font-bold uppercase tracking-widest text-amber-200/80">
                CAMPUS ERP &bull; ADMIN PORTAL
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search students, colleges, leads, applications..."
              value={
                activeSection === "users"
                  ? userSearch
                  : activeSection === "colleges"
                  ? collegeSearch
                  : activeSection === "inquiries"
                  ? enquirySearch
                  : ""
              }
              onChange={(e) => {
                if (activeSection === "users") setUserSearch(e.target.value);
                else if (activeSection === "colleges") setCollegeSearch(e.target.value);
                else if (activeSection === "inquiries") setEnquirySearch(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition"
            />
          </div>
        </div>

        {/* Right Actions: Clock, Inquiries Badge, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Live Date & Time */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-300 font-medium text-[11px] whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentTime || "Academic Session 2026–27"}</span>
          </div>

          {/* New Enquiries Counter Badge */}
          <button
            type="button"
            onClick={() => setActiveSection("inquiries")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-400 text-[#0B1B3D] font-bold transition hover:bg-amber-300 cursor-pointer shadow-xs"
            title="View Live Inquiries"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>
              {enquiries.filter((e) => e.status === "New").length} New Leads
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer border border-white/15"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-[#0B1B3D] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                AD
              </div>
              <span className="hidden sm:inline font-bold text-white text-xs">
                Admin Officer
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-300" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white text-slate-800 border border-slate-200 p-2 text-xs shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <span className="block font-bold text-[#0B1B3D]">Er. Rahul Joshi</span>
                  <span className="block text-[11px] text-slate-500">Super Administrator</span>
                  <span className="inline-block mt-1 px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    Full CRUD Access
                  </span>
                </div>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 mt-1 font-semibold"
                >
                  Visit Public Website &rarr;
                </Link>
                <Link
                  href="/update-password"
                  className="block px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"
                >
                  Update Admin Password
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold transition flex items-center gap-2 mt-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTAINER: SIDEBAR + CONTENT VIEW
      ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Frontend Navy Theme) */}
        <aside
          className={`fixed lg:static top-0 bottom-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 shadow-sm ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="overflow-y-auto py-5 px-3.5 space-y-6">
            {/* Mobile Header in Drawer */}
            <div className="flex items-center justify-between lg:hidden px-2 mb-2 pb-2 border-b border-slate-100">
              <span className="font-black text-[#0B1B3D] text-base">Portal Navigation</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                ADMINISTRATION &amp; ERP
              </div>

              {/* Navigation Menu Links */}
              <nav className="space-y-1 text-xs">
                {/* 1. Overview */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("overview");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "overview"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Overview &amp; Analytics</span>
                </button>

                {/* 2. User Management (CRUD) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("users");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "users"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>User Management</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-[#0B1B3D] font-bold">
                    {users.length}
                  </span>
                </button>

                {/* 3. College Management (CRUD) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("colleges");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "colleges"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <School className="w-4 h-4 shrink-0" />
                    <span>Constituent Colleges</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                    {colleges.length}
                  </span>
                </button>

                {/* 4. Inquiries & Leads */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("inquiries");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "inquiries"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Inquiries &amp; Leads</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                    {enquiries.length}
                  </span>
                </button>

                {/* 5. Admissions & Seats */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("admissions");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "admissions"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Admissions &amp; Seats</span>
                </button>

                {/* 6. Fees & Invoices */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("fees");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "fees"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>Fees &amp; Receipts</span>
                </button>

                {/* 7. Global Theme & Settings */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("settings");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                    activeSection === "settings"
                      ? "bg-[#0B1B3D] text-amber-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D]"
                  }`}
                >
                  <Palette className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Theme &amp; Global CSS</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer Link */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <Link
              href="/"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#0B1B3D] text-xs font-bold transition shadow-xs"
            >
              <span>Back to Campus Home</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
            </Link>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* =========================================================================
            MAIN VIEWPORT CONTENT AREA
        ========================================================================= */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* =====================================================================
              SECTION 1: OVERVIEW & ANALYTICS
          ===================================================================== */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] tracking-tight">
                    Institutional ERP Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Live operational metrics across all 6 constituent colleges at Upali Oden, Nathdwara.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSection("inquiries")}
                    className="py-2.5 px-4 rounded-xl bg-[#0B1B3D] hover:bg-[#142e66] text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>View All Inquiries</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserModalMode("create");
                      setUserFormData({
                        name: "",
                        email: "",
                        phone: "",
                        role: "Student",
                        college: "NIET — Engineering & Technology",
                        status: "Active",
                      });
                    }}
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0B1B3D] text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>

              {/* 4 Stat Cards (Frontend Theme) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Active Colleges
                    </span>
                    <Building2 className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-[#0B1B3D]">
                    {colleges.length} Institutes
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    ✓ All statutory approvals intact
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Admission Inquiries
                    </span>
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-[#0B1B3D]">
                    {enquiries.length} Leads
                  </div>
                  <div className="text-xs text-amber-600 font-semibold mt-1">
                    {enquiries.filter((e) => e.status === "New").length} New Pending Action
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Portal Users
                    </span>
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-black text-[#0B1B3D]">
                    {users.length} Registered
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Students, Faculty &amp; Admins
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Annual Seats
                    </span>
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-[#0B1B3D]">
                    {colleges.reduce((sum, c) => sum + (c.intakeSeats || 0), 0)} Seats
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Across 45+ UG/PG Courses
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Monthly Admission Activity & Recent Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Monthly Admission Trend Chart (7 Cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
                    <div>
                      <h2 className="text-base font-bold text-[#0B1B3D]">
                        Admission Inquiries &amp; Enrollment Trends
                      </h2>
                      <p className="text-xs text-slate-500">
                        Monthly candidate activity across all six constituent wings
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setChartTimeframe("week")}
                        className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                          chartTimeframe === "week"
                            ? "bg-[#0B1B3D] text-amber-300"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Week
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartTimeframe("months")}
                        className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                          chartTimeframe === "months"
                            ? "bg-[#0B1B3D] text-amber-300"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Months
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartTimeframe("year")}
                        className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                          chartTimeframe === "year"
                            ? "bg-[#0B1B3D] text-amber-300"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Year
                      </button>
                    </div>
                  </div>

                  {/* Bar Chart Representation */}
                  <div className="pt-4 pb-2">
                    <div className="grid grid-cols-12 gap-1.5 sm:gap-2.5 items-end h-48 pl-2 pr-2">
                      {[
                        { month: "Jan", apps: 42, admits: 15 },
                        { month: "Feb", apps: 38, admits: 18 },
                        { month: "Mar", apps: 52, admits: 25 },
                        { month: "Apr", apps: 48, admits: 22 },
                        { month: "May", apps: 72, admits: 45 },
                        { month: "Jun", apps: 91, admits: 62 },
                        { month: "Jul", apps: 85, admits: 54 },
                        { month: "Aug", apps: 64, admits: 38 },
                        { month: "Sep", apps: 24, admits: 12 },
                        { month: "Oct", apps: 18, admits: 8 },
                        { month: "Nov", apps: 40, admits: 26 },
                        { month: "Dec", apps: 15, admits: 6 },
                      ].map((item) => (
                        <div key={item.month} className="flex flex-col items-center h-full justify-end group">
                          <div className="w-full flex items-end justify-center gap-1 h-38">
                            <div
                              style={{ height: `${(item.apps / 100) * 100}%` }}
                              className="w-2 sm:w-2.5 bg-[#0B1B3D] rounded-t-xs transition-all group-hover:bg-blue-900"
                              title={`${item.month} Inquiries: ${item.apps}`}
                            />
                            <div
                              style={{ height: `${(item.admits / 100) * 100}%` }}
                              className="w-2 sm:w-2.5 bg-amber-500 rounded-t-xs transition-all group-hover:bg-amber-600"
                              title={`${item.month} Confirmed Admissions: ${item.admits}`}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 font-semibold mt-2">
                            {item.month}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-3 h-3 rounded-sm bg-[#0B1B3D]" />
                        <span>Inquiries Received</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-3 h-3 rounded-sm bg-amber-500" />
                        <span>Admissions Confirmed</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Inquiries List Ticker (5 Cols) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div>
                      <h2 className="text-base font-bold text-[#0B1B3D]">
                        Recent Frontend Leads
                      </h2>
                      <p className="text-xs text-slate-500">Live website submissions</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection("inquiries")}
                      className="text-xs font-bold text-amber-600 hover:underline cursor-pointer"
                    >
                      View All ({enquiries.length}) &rarr;
                    </button>
                  </div>

                  <div className="space-y-3">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq.id}
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setEnquiryModalOpen(true);
                        }}
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 transition cursor-pointer space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#0B1B3D]">{enq.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              enq.status === "New"
                                ? "bg-amber-100 text-amber-800"
                                : enq.status === "Contacted"
                                ? "bg-blue-100 text-blue-800"
                                : enq.status === "Admitted"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 flex items-center justify-between">
                          <span className="truncate max-w-[180px]">{enq.course}</span>
                          <span className="font-mono text-slate-400">{enq.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 2: USER MANAGEMENT CRUD
          ===================================================================== */}
          {activeSection === "users" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              {/* Header & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D] tracking-tight">
                      User Management
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage students, applicants, counselors, faculty, and administrative staff. Full CRUD actions with instant updates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUserModalMode("create");
                    setUserFormData({
                      name: "",
                      email: "",
                      phone: "",
                      role: "Student",
                      college: "NIET — Engineering & Technology",
                      status: "Active",
                    });
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#0B1B3D] hover:bg-[#142e66] text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <span>Create New User</span>
                </button>
              </div>

              {/* Filters & Search Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or college..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0B1B3D]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Role:</span>
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="All">All Roles ({users.length})</option>
                    <option value="Student">Students</option>
                    <option value="Applicant">Applicants</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Counselor">Counselors</option>
                    <option value="Super Admin">Super Admins</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">User Details</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Affiliation / College</th>
                      <th className="p-3">Creation Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-xl text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${user.avatarBg} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}
                            >
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-[#0B1B3D] text-sm">{user.name}</div>
                              <div className="text-[11px] text-slate-500">{user.email} &bull; {user.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              user.role === "Super Admin"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : user.role === "Faculty"
                                ? "bg-purple-100 text-purple-900"
                                : user.role === "Counselor"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-blue-100 text-blue-900"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">
                          {user.college}
                        </td>
                        <td className="p-3 text-slate-500 font-mono text-[11px]">
                          {user.createdAt}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              user.status === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : user.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUser(user);
                                setUserModalMode("view");
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-[#0B1B3D] transition cursor-pointer"
                              title="View User Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUser(user);
                                setUserFormData(user);
                                setUserModalMode("edit");
                              }}
                              className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition cursor-pointer"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 3: COLLEGE MANAGEMENT CRUD
          ===================================================================== */}
          {activeSection === "colleges" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <School className="w-5 h-5 text-amber-600" />
                    <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D] tracking-tight">
                      Constituent Colleges Management
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, edit, remove, and manage constituent institutes, affiliation approvals, seat capacities, and principal offices.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCollegeModalMode("create");
                    setCollegeFormData({
                      name: "",
                      shortName: "",
                      code: "",
                      affiliation: "RTU Kota • AICTE",
                      category: "Engineering & Technology",
                      establishedYear: 2026,
                      coursesCount: 4,
                      intakeSeats: 120,
                      principal: "",
                      status: "Active",
                    });
                  }}
                  className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0B1B3D] text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Constituent College</span>
                </button>
              </div>

              {/* College Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredColleges.map((col) => (
                  <div
                    key={col.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-amber-400/80 bg-slate-50/50 hover:bg-white transition shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0B1B3D] text-amber-300 font-mono text-[10px] font-bold">
                          {col.code} &bull; {col.shortName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {col.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0B1B3D] leading-tight">
                        {col.name}
                      </h3>
                      <div className="text-[11px] text-amber-700 font-semibold mt-1">
                        {col.affiliation}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                          <span className="font-semibold text-slate-800 text-[11px] truncate block">{col.category}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Approved Intake</span>
                          <span className="font-bold text-emerald-700">{col.intakeSeats} Seats</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Courses</span>
                          <span className="font-semibold text-slate-800">{col.coursesCount} Degrees</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Established</span>
                          <span className="font-semibold text-slate-800">{col.establishedYear}</span>
                        </div>
                      </div>

                      {col.principal && (
                        <div className="mt-2 text-[11px] text-slate-500">
                          Head: <strong className="text-slate-700">{col.principal}</strong>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCollege(col);
                          setCollegeModalMode("view");
                        }}
                        className="text-xs font-bold text-[#0B1B3D] hover:text-amber-600 transition cursor-pointer"
                      >
                        View Profile &rarr;
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCollege(col);
                            setCollegeFormData(col);
                            setCollegeModalMode("edit");
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition cursor-pointer"
                          title="Edit College"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCollege(col.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition cursor-pointer"
                          title="Delete College"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 4: INQUIRIES & LEADS MANAGEMENT (Default Status: New)
          ===================================================================== */}
          {activeSection === "inquiries" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                    <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D] tracking-tight">
                      Frontend Admissions Inquiries
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time list of candidate queries submitted via website Header Enquiry, Contact form, and Admissions portal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    Default Status: <strong className="text-amber-600">New</strong>
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search inquiries by candidate name, phone, course..."
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0B1B3D]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Status Filter:</span>
                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="All">All Statuses ({enquiries.length})</option>
                    <option value="New">New ({enquiries.filter((e) => e.status === "New").length})</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Inquiries List / Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Lead ID</th>
                      <th className="p-3">Candidate Particulars</th>
                      <th className="p-3">College &amp; Preferred Course</th>
                      <th className="p-3">Received On</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-xl text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-mono font-bold text-[#0B1B3D]">
                          {enq.id}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#0B1B3D] text-sm">{enq.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <a href={`tel:${enq.phone}`} className="hover:underline font-semibold text-slate-700">
                              {enq.phone}
                            </a>
                            <span>&bull;</span>
                            <span>{enq.email}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">{enq.state}</div>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-[#0B1B3D] block text-xs">{enq.course}</span>
                          <span className="text-[10px] text-amber-700 font-semibold">{enq.college}</span>
                        </td>
                        <td className="p-3 text-slate-500 text-[11px]">
                          <div>{enq.date}</div>
                          <div className="text-[10px] text-slate-400">{enq.time} &bull; {enq.source}</div>
                        </td>
                        <td className="p-3">
                          {/* Status changer dropdown right on table row! */}
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              handleUpdateEnquiryStatus(enq.id, e.target.value as EnquiryRecord["status"])
                            }
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold outline-none border cursor-pointer ${
                              enq.status === "New"
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : enq.status === "Contacted"
                                ? "bg-blue-100 text-blue-900 border-blue-300"
                                : enq.status === "Follow Up"
                                ? "bg-purple-100 text-purple-900 border-purple-300"
                                : enq.status === "Admitted"
                                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            <option value="New">● New</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Follow Up">● Follow Up</option>
                            <option value="Admitted">● Admitted</option>
                            <option value="Closed">● Closed</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                setEnquiryModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-200 text-[#0B1B3D] transition cursor-pointer"
                              title="View Full Lead Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <a
                              href={`tel:${enq.phone}`}
                              className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition"
                              title="Call Candidate"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 5: ADMISSIONS & SEAT ALLOTMENT
          ===================================================================== */}
          {activeSection === "admissions" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D]">
                  Admissions 2026–27 Merit &amp; Quota Tracking
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  REAP Rajasthan Technical University, MLSU Law Entrance &amp; Direct Quota seat matrix.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800 uppercase block mb-1">
                    Direct Quota Applications
                  </span>
                  <span className="text-2xl font-black text-[#0B1B3D]">1,420</span>
                  <span className="text-xs text-slate-500 block mt-1">Class 12th Merit Verified</span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <span className="text-xs font-bold text-blue-800 uppercase block mb-1">
                    REAP State Quota
                  </span>
                  <span className="text-2xl font-black text-[#0B1B3D]">840</span>
                  <span className="text-xs text-slate-500 block mt-1">JEE / 12th Central Merit</span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">
                    Seats Confirmed
                  </span>
                  <span className="text-2xl font-black text-emerald-700">1,120</span>
                  <span className="text-xs text-slate-500 block mt-1">Token Fees Deposited</span>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 6: FEES & RECEIPTS
          ===================================================================== */}
          {activeSection === "fees" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D]">
                  Fee Ledger &amp; Digital Receipts
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accounts verification, Razorpay transaction reconciliations, and GST receipts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Total Fee Billed</span>
                  <span className="text-2xl font-black text-[#0B1B3D]">₹ 4,82,40,000</span>
                  <span className="text-xs text-slate-500 block mt-1">Session 2026-27</span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Collections Cleared</span>
                  <span className="text-2xl font-black text-emerald-700">₹ 3,94,80,000</span>
                  <span className="text-xs text-slate-500 block mt-1">Online &amp; DD Payments</span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800 uppercase block mb-1">Scholarship Disbursed</span>
                  <span className="text-2xl font-black text-amber-800">₹ 48,50,000</span>
                  <span className="text-xs text-slate-500 block mt-1">State Govt SJE Schemes</span>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 7: GLOBAL THEME & COLOR SETTINGS
          ===================================================================== */}
          {activeSection === "settings" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B1B3D]">
                    Global CSS Theme Architecture
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Color control is centralized in <code>src/app/globals.css</code>. Changing the root CSS variable updates the entire website and dashboard at once!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="h-10 rounded-xl bg-[#0B1B3D] flex items-center justify-center text-white font-mono text-xs font-bold">
                    --brand-navy: #0B1B3D
                  </div>
                  <span className="font-bold text-xs text-[#0B1B3D] block">Primary Brand Navy</span>
                  <p className="text-[11px] text-slate-500">
                    Used for headers, main buttons, table titles, and royal institution branding.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="h-10 rounded-xl bg-amber-500 flex items-center justify-center text-[#0B1B3D] font-mono text-xs font-bold">
                    --brand-amber: #d97706
                  </div>
                  <span className="font-bold text-xs text-[#0B1B3D] block">Accent Gold / Amber</span>
                  <p className="text-[11px] text-slate-500">
                    Used for CTA badges, active indicators, lead highlights, and borders.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="h-10 rounded-xl bg-[#f8fafc] border border-slate-300 flex items-center justify-center text-slate-800 font-mono text-xs font-bold">
                    --brand-surface: #ffffff
                  </div>
                  <span className="font-bold text-xs text-[#0B1B3D] block">Surface / Light Cards</span>
                  <p className="text-[11px] text-slate-500">
                    Used for clean card elevations, data tables, and modal backgrounds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MODAL: USER CRUD (CREATE / EDIT / VIEW)
      ========================================================================= */}
      {userModalMode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setUserModalMode(null);
                setSelectedUser(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {userModalMode === "view" && selectedUser ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B1B3D] text-amber-300 font-black text-lg flex items-center justify-center shrink-0">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-[#0B1B3D]">{selectedUser.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">User ID</span>
                    <strong className="text-[#0B1B3D] font-mono">{selectedUser.id}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Status</span>
                    <strong className="text-emerald-700">{selectedUser.status}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Email</span>
                    <strong className="text-slate-800 truncate block">{selectedUser.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Phone</span>
                    <strong className="text-slate-800">{selectedUser.phone}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block font-medium">Associated College</span>
                    <strong className="text-[#0B1B3D]">{selectedUser.college}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block font-medium">Account Created</span>
                    <strong className="text-slate-700">{selectedUser.createdAt}</strong>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setUserModalMode(null)}
                    className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveUser} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-[#0B1B3D]">
                    {userModalMode === "create" ? "Add New System User" : "Update User Profile"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Specify role, contact details, and institutional wing.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userFormData.name || ""}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={userFormData.email || ""}
                      onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                      placeholder="user@ngi.edu.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={userFormData.phone || ""}
                      onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                      placeholder="+91 95713 45444"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      User Role
                    </label>
                    <select
                      value={userFormData.role || "Student"}
                      onChange={(e) =>
                        setUserFormData({ ...userFormData, role: e.target.value as UserRecord["role"] })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                    >
                      <option value="Student">Student</option>
                      <option value="Applicant">Applicant</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Counselor">Counselor</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Account Status
                    </label>
                    <select
                      value={userFormData.status || "Active"}
                      onChange={(e) =>
                        setUserFormData({ ...userFormData, status: e.target.value as UserRecord["status"] })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Associated College / Department
                  </label>
                  <select
                    value={userFormData.college || "NIET — Engineering & Technology"}
                    onChange={(e) => setUserFormData({ ...userFormData, college: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="NIET — Engineering & Technology">NIET — Engineering &amp; Technology</option>
                    <option value="NIBM — Biotechnology & Management">NIBM — Biotechnology &amp; Management</option>
                    <option value="NLC — Nathdwara Law College">NLC — Nathdwara Law College</option>
                    <option value="NCAN — Ayurveda Nursing">NCAN — Ayurveda Nursing</option>
                    <option value="VDSMS — Medical Science">VDSMS — Medical Science</option>
                    <option value="NPITI — Industrial Training">NPITI — Industrial Training</option>
                    <option value="Central Administration">Central Administration</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setUserModalMode(null);
                      setSelectedUser(null);
                    }}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-[#0B1B3D] hover:bg-[#142e66] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>{userModalMode === "create" ? "Create User" : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: COLLEGE CRUD (CREATE / EDIT / VIEW)
      ========================================================================= */}
      {collegeModalMode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setCollegeModalMode(null);
                setSelectedCollege(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {collegeModalMode === "view" && selectedCollege ? (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
                    {selectedCollege.code}
                  </span>
                  <h3 className="font-black text-lg text-[#0B1B3D] mt-1">{selectedCollege.name}</h3>
                  <div className="text-xs text-amber-700 font-semibold">{selectedCollege.affiliation}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">Category</span>
                    <strong className="text-slate-800">{selectedCollege.category}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Annual Seat Intake</span>
                    <strong className="text-emerald-700">{selectedCollege.intakeSeats} Seats</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Total Courses</span>
                    <strong className="text-slate-800">{selectedCollege.coursesCount} Approved</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Established Year</span>
                    <strong className="text-slate-800">{selectedCollege.establishedYear}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block font-medium">Principal / Dean</span>
                    <strong className="text-[#0B1B3D]">{selectedCollege.principal || "Prof. In-Charge"}</strong>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setCollegeModalMode(null)}
                    className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveCollege} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-[#0B1B3D]">
                    {collegeModalMode === "create" ? "Add Constituent College" : "Update College Profile"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter institutional name, affiliations, and seat capacity.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeFormData.name || ""}
                    onChange={(e) => setCollegeFormData({ ...collegeFormData, name: e.target.value })}
                    placeholder="e.g. Nathdwara College of Pharmacy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Name / Acronym *
                    </label>
                    <input
                      type="text"
                      required
                      value={collegeFormData.shortName || ""}
                      onChange={(e) => setCollegeFormData({ ...collegeFormData, shortName: e.target.value })}
                      placeholder="e.g. NCP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-bold outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      College Code
                    </label>
                    <input
                      type="text"
                      value={collegeFormData.code || ""}
                      onChange={(e) => setCollegeFormData({ ...collegeFormData, code: e.target.value })}
                      placeholder="e.g. PHARM-07"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Affiliations &amp; Approvals
                  </label>
                  <input
                    type="text"
                    value={collegeFormData.affiliation || ""}
                    onChange={(e) => setCollegeFormData({ ...collegeFormData, affiliation: e.target.value })}
                    placeholder="e.g. RUHS Jaipur &bull; PCI Approved"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Approved Seats
                    </label>
                    <input
                      type="number"
                      value={collegeFormData.intakeSeats || 120}
                      onChange={(e) =>
                        setCollegeFormData({ ...collegeFormData, intakeSeats: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Courses
                    </label>
                    <input
                      type="number"
                      value={collegeFormData.coursesCount || 4}
                      onChange={(e) =>
                        setCollegeFormData({ ...collegeFormData, coursesCount: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estd. Year
                    </label>
                    <input
                      type="number"
                      value={collegeFormData.establishedYear || 2026}
                      onChange={(e) =>
                        setCollegeFormData({ ...collegeFormData, establishedYear: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Principal / Dean Name
                  </label>
                  <input
                    type="text"
                    value={collegeFormData.principal || ""}
                    onChange={(e) => setCollegeFormData({ ...collegeFormData, principal: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Joshi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1B3D] text-xs font-medium outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setCollegeModalMode(null);
                      setSelectedCollege(null);
                    }}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0B1B3D] text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{collegeModalMode === "create" ? "Add College" : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: VIEW FULL INQUIRY DETAILS
      ========================================================================= */}
      {enquiryModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 space-y-4">
            <button
              type="button"
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-3">
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                {selectedEnquiry.id}
              </span>
              <h3 className="font-black text-xl text-[#0B1B3D] mt-1">{selectedEnquiry.name}</h3>
              <div className="text-xs text-slate-500">
                Received: {selectedEnquiry.date} at {selectedEnquiry.time} &bull; Source: {selectedEnquiry.source}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Candidate Phone:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-[#0B1B3D] hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email Address:</span>
                <span className="font-medium text-slate-800">{selectedEnquiry.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Interested Course:</span>
                <strong className="text-[#0B1B3D]">{selectedEnquiry.course}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">College Wing:</span>
                <strong className="text-amber-800">{selectedEnquiry.college}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location / Domicile:</span>
                <span className="text-slate-800">{selectedEnquiry.state}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Candidate Inquiry Notes / Message:
              </span>
              <p className="text-xs text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                {selectedEnquiry.notes || "No additional message provided."}
              </p>
            </div>

            {/* Quick Status Update inside modal */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-600">Update Lead Status:</span>
              <select
                value={selectedEnquiry.status}
                onChange={(e) => {
                  const s = e.target.value as EnquiryRecord["status"];
                  handleUpdateEnquiryStatus(selectedEnquiry.id, s);
                  setSelectedEnquiry({ ...selectedEnquiry, status: s });
                }}
                className="py-1.5 px-3 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              >
                <option value="New">● New</option>
                <option value="Contacted">● Contacted</option>
                <option value="Follow Up">● Follow Up</option>
                <option value="Admitted">● Admitted</option>
                <option value="Closed">● Closed</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
