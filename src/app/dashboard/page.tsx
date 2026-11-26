"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Box,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Key,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Package,
  Phone,
  Radio,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Sun,
  Truck,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"months" | "week" | "12hours" | "year">("months");
  const [containerTab, setContainerTab] = useState<"scheduled" | "progress" | "delivered">("delivered");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("Wed, Nov 25, 2026, 10:50:07 PM");
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Live Clock matching the screenshot
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      setCurrentTime(now.toLocaleDateString("en-US", options));
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

  // Monthly Bar Chart Data (matching screenshot with red and dark blue bars)
  const monthlyData = [
    { month: "Jan", jobs: 42, revenue: 15 },
    { month: "Feb", jobs: 38, revenue: 18 },
    { month: "Mar", jobs: 52, revenue: 25 },
    { month: "Apr", jobs: 48, revenue: 22 },
    { month: "May", jobs: 62, revenue: 28 },
    { month: "Jun", jobs: 71, revenue: 32 },
    { month: "Jul", jobs: 58, revenue: 24 },
    { month: "Aug", jobs: 36, revenue: 19 },
    { month: "Sep", jobs: 0, revenue: 0 },
    { month: "Oct", jobs: 0, revenue: 0 },
    { month: "Nov", jobs: 0, revenue: 0 },
    { month: "Dec", jobs: 0, revenue: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#0c1017] text-slate-100 flex flex-col font-sans antialiased selection:bg-[#ea2e2e] selection:text-white">
      {/* =========================================================================
          TOP BAR (Matching Screenshot 1: dark header with search, clock, profile)
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#0F1422] border-b border-[#1b2337] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#171f33] text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center rounded-xl bg-white/5 p-1 border border-white/10 group-hover:border-red-500/50 transition">
              <img
                src="/ngi-logo.png"
                alt="NGI Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="font-black text-lg text-white tracking-tight flex items-center">
              ngi<span className="text-[#ea2e2e]">ERP</span>
            </span>
          </Link>
        </div>

        {/* Center: Search Bar (Matching screenshot) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search orders, routes, customers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#161d2f] border border-[#222c44] text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#ea2e2e] focus:ring-1 focus:ring-[#ea2e2e] transition"
            />
          </div>
        </div>

        {/* Right Actions: Clock, Language, Theme, Bell, User Profile (Matching screenshot) */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Dynamic Live Time */}
          <div className="hidden xl:block text-slate-400 font-medium text-[11px] whitespace-nowrap">
            {currentTime}
          </div>

          {/* Globe Icon */}
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-[#1a233a] text-slate-400 hover:text-white transition"
            title="Language: English"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Sun / Dark Mode Toggle */}
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-[#1a233a] text-slate-400 hover:text-white transition"
            title="Theme Mode: Dark"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl hover:bg-[#1a233a] text-slate-400 hover:text-white transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ea2e2e] ring-2 ring-[#0F1422]" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#141b2e] border border-[#232e49] p-3 text-xs shadow-2xl z-50">
                <div className="font-bold text-white mb-2 pb-1.5 border-b border-[#232e49] flex justify-between">
                  <span>Notifications</span>
                  <span className="text-[#ea2e2e]">3 New</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="p-2 rounded-xl bg-[#1a233a]">
                    <span className="font-bold text-white block">Seat Allotment Confirmed</span>
                    <span className="text-[11px] text-slate-400">APP-4760 allotted at NIET CSE</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#1a233a]">
                    <span className="font-bold text-white block">Fee Receipt Dispatched</span>
                    <span className="text-[11px] text-slate-400">Payment receipt #NGI-0481 verified</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill (Red Circle Avatar + Name + Dropdown v) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 py-1 px-2 rounded-xl hover:bg-[#1a233a] transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#ea2e2e] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                DA
              </div>
              <span className="hidden sm:inline font-bold text-slate-200 text-xs">
                Draygo App
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#141b2e] border border-[#232e49] p-2 text-xs shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-[#232e49] text-slate-400">
                  <span className="block font-bold text-white">Super Admin</span>
                  <span className="block text-[11px] truncate">superadmin@ngi.edu.in</span>
                </div>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-xl hover:bg-[#1a233a] text-slate-200 mt-1"
                >
                  Campus Public Website
                </Link>
                <Link
                  href="/update-password"
                  className="block px-3 py-2 rounded-xl hover:bg-[#1a233a] text-slate-200"
                >
                  Update Password
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-500/20 text-red-400 font-bold transition flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN LAYOUT: SIDEBAR + DASHBOARD CONTENT
      ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Matching Screenshot 1) */}
        <aside
          className={`fixed lg:static top-0 bottom-0 left-0 z-30 w-64 bg-[#0F1422] border-r border-[#1b2337] flex flex-col justify-between transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
            {/* Brand in mobile drawer */}
            <div className="flex items-center justify-between lg:hidden px-2 mb-2">
              <span className="font-black text-white text-base">ngiERP</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Header */}
            <div>
              <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                MENU
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-1 text-xs">
                {/* 1. Dashboard (ACTIVE - SOLID RED PILL) */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("dashboard")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#ea2e2e] text-white font-bold shadow-md shadow-red-500/20 text-left transition"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </button>

                {/* 2. Analytics */}
                <button
                  type="button"
                  onClick={() => setActiveMenu("analytics")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition font-semibold ${
                    activeMenu === "analytics"
                      ? "bg-[#182136] text-white"
                      : "text-slate-400 hover:text-white hover:bg-[#151c2f]"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>Analytics</span>
                </button>

                {/* 3. Quote Management */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Quote Management</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 4. User Management */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>User Management</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 5. Access Control */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Access Control</span>
                </button>

                {/* 6. Location Management */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Location Management</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 7. Terminal Management */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 shrink-0" />
                    <span>Terminal Management</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 8. Pricing & Rates */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 shrink-0" />
                    <span>Pricing &amp; Rates</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 9. Tracking Devices */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <Radio className="w-4 h-4 shrink-0" />
                    <span>Tracking Devices</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 10. Container Management */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition cursor-pointer font-semibold">
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 shrink-0" />
                    <span>Container Management</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </div>

                {/* 11. Truck List */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>Truck List</span>
                </button>

                {/* 12. Load Board */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Load Board</span>
                </button>

                {/* 13. Bids List */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>Bids List</span>
                </button>

                {/* 14. Platform Charges */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>Platform Charges</span>
                </button>

                {/* 15. Toll Management */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>Toll Management</span>
                </button>

                {/* 16. Currency */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>Currency</span>
                </button>

                {/* 17. Company */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <Building className="w-4 h-4 shrink-0" />
                  <span>Company</span>
                </button>

                {/* 18. Payment Details */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>Payment Details</span>
                </button>

                {/* 19. Language */}
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2f] transition font-semibold text-left"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Language</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer Link back to Website */}
          <div className="p-3 border-t border-[#1b2337]">
            <Link
              href="/"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#141b2e] hover:bg-[#19233b] text-slate-300 hover:text-white text-xs font-bold transition"
            >
              <span>Back to Campus Home</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ea2e2e]" />
            </Link>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* =========================================================================
            DASHBOARD MAIN VIEWPORT (Exact match to Screenshot 1)
        ========================================================================= */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Page Title & Subtitle (Matching screenshot) */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live job counts. Other panels show sample data until their analytics endpoints exist.
            </p>
          </div>

          {/* Top Two Main Cards Grid (Matching screenshot layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ---------------------------------------------------------------------
                CARD 1: User Summary (7 Cols) - Chart & Metrics
            --------------------------------------------------------------------- */}
            <div className="lg:col-span-7 bg-[#101524] rounded-3xl p-6 border border-[#1b2337] shadow-xl">
              {/* Card Header & Timeframe Tabs */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1b2337] pb-4 mb-5">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    User Summary
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Platform job activity across all accounts
                  </p>
                </div>

                {/* Filter Tabs (Months active with red underline) */}
                <div className="flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("12hours")}
                    className={`pb-1 font-semibold transition ${
                      activeTab === "12hours"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    12 Hours
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("week")}
                    className={`pb-1 font-semibold transition ${
                      activeTab === "week"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("months")}
                    className={`pb-1 font-bold transition ${
                      activeTab === "months"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Months
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("year")}
                    className={`pb-1 font-semibold transition ${
                      activeTab === "year"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>

              {/* 3 Metric Headers Row */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 mb-6">
                <div>
                  <span className="block text-xs font-bold text-slate-400">Total Jobs</span>
                  <span className="block text-sm font-black text-slate-500 tracking-widest mt-1">
                    ...
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400">Jobs Completed</span>
                  <span className="block text-sm font-black text-slate-500 tracking-widest mt-1">
                    ...
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400">Jobs In Progress</span>
                  <span className="block text-sm font-black text-slate-500 tracking-widest mt-1">
                    ...
                  </span>
                </div>
              </div>

              {/* Bar Chart Area (Matching screenshot bars in Red & Navy) */}
              <div className="relative pt-4 pb-2">
                {/* Y-Axis Guidelines */}
                <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none text-[10px] text-slate-600 font-mono">
                  <div className="border-b border-[#1b2337]/50 pb-0.5">80</div>
                  <div className="border-b border-[#1b2337]/50 pb-0.5">60</div>
                  <div className="border-b border-[#1b2337]/50 pb-0.5">40</div>
                  <div className="border-b border-[#1b2337]/50 pb-0.5">20</div>
                  <div className="border-b border-[#1b2337] pb-0.5">0</div>
                </div>

                {/* 12 Months Bars */}
                <div className="relative z-10 grid grid-cols-12 gap-1 sm:gap-2 items-end h-48 pl-6 pr-2">
                  {monthlyData.map((d) => (
                    <div key={d.month} className="flex flex-col items-center h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-0.5 h-38">
                        {/* Red Bar (Jobs) */}
                        {d.jobs > 0 && (
                          <div
                            style={{ height: `${(d.jobs / 80) * 100}%` }}
                            className="w-2 sm:w-2.5 bg-[#ea2e2e] rounded-t-xs transition-all group-hover:brightness-125"
                            title={`${d.month} Jobs: ${d.jobs}`}
                          />
                        )}
                        {/* Dark Navy Bar (Revenue) */}
                        {d.revenue > 0 && (
                          <div
                            style={{ height: `${(d.revenue / 80) * 100}%` }}
                            className="w-2 sm:w-2.5 bg-[#1e2a47] rounded-t-xs transition-all group-hover:brightness-125"
                            title={`${d.month} Revenue: ${d.revenue}`}
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium mt-2">
                        {d.month}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chart Legend (Matching screenshot) */}
                <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ea2e2e]" />
                    <span>Jobs</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e2a47]" />
                    <span>Revenue (BoL)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------------
                CARD 2: Container History (5 Cols) - Exact replica with Red bars
            --------------------------------------------------------------------- */}
            <div className="lg:col-span-5 bg-[#101524] rounded-3xl p-6 border border-[#1b2337] shadow-xl flex flex-col justify-between">
              <div>
                {/* Header & View All */}
                <div className="flex items-start justify-between border-b border-[#1b2337] pb-4 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      Container History
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      4 active containers
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-bold text-[#ea2e2e] hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>

                {/* Sub-Tabs: Scheduled (2), Progress (2), Delivered (2) */}
                <div className="flex items-center gap-4 text-xs border-b border-[#1b2337] pb-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setContainerTab("scheduled")}
                    className={`pb-1 font-semibold transition ${
                      containerTab === "scheduled"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Scheduled (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setContainerTab("progress")}
                    className={`pb-1 font-semibold transition ${
                      containerTab === "progress"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Progress (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setContainerTab("delivered")}
                    className={`pb-1 font-bold transition ${
                      containerTab === "delivered"
                        ? "text-[#ea2e2e] border-b-2 border-[#ea2e2e]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Delivered (2)
                  </button>
                </div>

                {/* Container Items (Exact layout as screenshot) */}
                <div className="space-y-4">
                  {/* Item 1: JOB-4760 */}
                  <div className="p-4 rounded-2xl bg-[#0b0e18] border border-[#1b2337] hover:border-red-500/40 transition space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 border border-red-500/20">
                          <Box className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">JOB-4760</div>
                          <div className="text-[11px] text-slate-400">Import Container</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white text-xs">$1,740</div>
                        <div className="text-[9.5px] uppercase font-bold text-slate-400">
                          4.00 PER MILES
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Houston — Barbours Cut</span>
                        <span className="text-[10px] text-slate-400">Pickup : Aug 12, 2026</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Dallas, TX</span>
                        <span className="text-[10px] text-slate-400">Drop-off : Aug 14, 2026</span>
                      </div>
                    </div>

                    {/* Progress Bar (Full Red line 100%) */}
                    <div>
                      <div className="text-right text-[10px] text-slate-400 font-semibold mb-1">
                        100%
                      </div>
                      <div className="h-1.5 w-full bg-[#1b2337] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ea2e2e] rounded-full w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Item 2: JOB-4751 */}
                  <div className="p-4 rounded-2xl bg-[#0b0e18] border border-[#1b2337] hover:border-red-500/40 transition space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#ea2e2e] flex items-center justify-center shrink-0 border border-red-500/20">
                          <Box className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">JOB-4751</div>
                          <div className="text-[11px] text-slate-400">Export Container</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white text-xs">$1,320</div>
                        <div className="text-[9.5px] uppercase font-bold text-slate-400">
                          3.40 PER MILES
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Seattle — T18</span>
                        <span className="text-[10px] text-slate-400">Pickup : Aug 10, 2026</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Tacoma, WA</span>
                        <span className="text-[10px] text-slate-400">Drop-off : Aug 11, 2026</span>
                      </div>
                    </div>

                    {/* Progress Bar (Full Red line 100%) */}
                    <div>
                      <div className="text-right text-[10px] text-slate-400 font-semibold mb-1">
                        100%
                      </div>
                      <div className="h-1.5 w-full bg-[#1b2337] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ea2e2e] rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              BOTTOM METRIC ROW (Matching Screenshot 1: $1,286,420 / $74,880 / Sales Share)
          --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Expected Earnings */}
            <div className="bg-[#101524] rounded-3xl p-6 border border-[#1b2337] shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                $ 1,286,420
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Expected Earnings (All Time)
              </div>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#ea2e2e]" />
                <span>Drayage Platform Operations</span>
              </div>
            </div>

            {/* Card 2: Weekly Activity Earnings */}
            <div className="bg-[#101524] rounded-3xl p-6 border border-[#1b2337] shadow-xl">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  $ 74,880
                </span>
                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  +12.4%
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Weekly Activity Earnings
              </div>
              <div className="mt-4 text-[11px] text-slate-500 font-mono">
                Volume: 56 Completed Dispatches
              </div>
            </div>

            {/* Card 3: Sales Share Breakdown */}
            <div className="bg-[#101524] rounded-3xl p-6 border border-[#1b2337] shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sales Share Breakdown
              </div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">
                $986,400 Total in BoL
              </div>
              <div className="mt-4 h-2 w-full bg-[#1b2337] rounded-full overflow-hidden flex">
                <div style={{ width: "65%" }} className="bg-[#ea2e2e] h-full" title="Direct Accounts: 65%" />
                <div style={{ width: "25%" }} className="bg-[#3862b8] h-full" title="Brokerage: 25%" />
                <div style={{ width: "10%" }} className="bg-slate-600 h-full" title="Spot: 10%" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
