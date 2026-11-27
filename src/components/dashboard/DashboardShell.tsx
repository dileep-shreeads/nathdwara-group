"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  BookOpenCheck,
  Building2,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  FileText,
  GraduationCap,
  IndianRupee,
  LayoutDashboard,
  Loader2,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";
import { useDemoState, useSessionUserId } from "@/lib/demo/store";
import { canAccess, modulesFor, ROLE_LABELS, type ModuleKey } from "@/lib/demo/permissions";
import { initials, lookups, scoped, timeAgo } from "@/lib/demo/selectors";
import type { DemoState, User } from "@/lib/demo/types";
import { signOut } from "@/lib/services";
import { openRecord, Toaster } from "./ui";

const ICONS: Record<ModuleKey, React.ComponentType<{ className?: string }>> = {
  overview: LayoutDashboard,
  enquiries: MessageSquare,
  applications: ClipboardList,
  students: GraduationCap,
  fees: IndianRupee,
  colleges: Building2,
  users: Users,
  notices: Megaphone,
  settings: Settings,
  "my-application": BookOpenCheck,
  "my-fees": FileText,
};

interface DashboardContextValue {
  user: User;
  state: DemoState;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
  const value = useContext(DashboardContext);
  if (!value) throw new Error("useDashboard must be used inside the dashboard layout");
  return value;
}

function FullScreenMessage({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-dvh items-center justify-center bg-soft p-6 text-center">{children}</div>;
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const state = useDemoState();
  const sessionId = useSessionUserId();
  const pathname = usePathname();
  const router = useRouter();
  const user = state && sessionId ? state.users.find((u) => u.id === sessionId && u.status === "Active") : undefined;
  const signedOut = sessionId === null || (state !== null && sessionId !== undefined && !user);

  useEffect(() => {
    if (signedOut) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [signedOut, pathname, router]);

  if (!state || sessionId === undefined || !user) {
    return (
      <FullScreenMessage>
        <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" /> {signedOut ? "Redirecting to sign in…" : "Loading your portal…"}
        </p>
      </FullScreenMessage>
    );
  }

  return (
    <DashboardContext.Provider value={{ user, state }}>
      <Frame user={user} state={state} pathname={pathname}>
        {canAccess(user.role, pathname) ? (
          children
        ) : (
          <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-8 text-center">
            <ShieldAlert className="mx-auto h-8 w-8 text-rose-600" />
            <h1 className="mt-3 font-display text-lg font-bold text-primary">You don&apos;t have access to this page</h1>
            <p className="mt-1 text-sm text-slate-500">Your role ({ROLE_LABELS[user.role]}) can&apos;t open this module.</p>
            <Link href="/dashboard" className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">
              Back to overview
            </Link>
          </div>
        )}
      </Frame>
      <Toaster />
    </DashboardContext.Provider>
  );
}

function Frame({ user, state, pathname, children }: { user: User; state: DemoState; pathname: string; children: React.ReactNode }) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const modules = modulesFor(user.role);
  const { college } = lookups(state);

  const counts: Partial<Record<ModuleKey, number>> = {
    enquiries: scoped(state.enquiries, user).filter((e) => e.status === "New").length,
    applications: scoped(state.applications, user).filter((a) => a.stage === "Submitted").length,
  };

  const groups = modules.reduce<Record<string, typeof modules>>((acc, m) => {
    const group = user.role === "student" && m.group === "Administration" ? "Account" : m.group;
    (acc[group] ??= []).push(m);
    return acc;
  }, {});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSignOut = () => {
    signOut();
    router.replace("/login?signedOut=1");
  };

  const sidebar = (
    <nav aria-label="Dashboard" className="flex h-full flex-col">
      <Link href="/dashboard" className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <span className="rounded-lg bg-white p-1">
          <img src="/ngi-logo.png" alt="" className="h-8 w-auto" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-bold text-white">Nathdwara Group</span>
          <span className="block text-[11px] font-medium text-white/50">{user.role === "student" ? "Student portal" : "Campus ERP"}</span>
        </span>
      </Link>
      <div className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">{group}</p>
            <ul className="space-y-0.5">
              {items.map((m) => {
                const Icon = ICONS[m.key];
                const active = m.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(m.href);
                const count = counts[m.key];
                return (
                  <li key={m.key}>
                    <Link
                      href={m.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-[18px] w-[18px] ${active ? "text-accent" : ""}`} />
                      <span className="flex-1">{m.label}</span>
                      {count ? <span className="rounded-full bg-accent px-1.5 text-[11px] font-bold text-primary">{count}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        <Link href="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white">
          <ExternalLink className="h-4 w-4" /> View public website
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-dvh bg-soft">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-primary lg:block">{sidebar}</aside>
      {navOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary-dark/50" onClick={() => setNavOpen(false)} aria-hidden="true" />
          <aside
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-primary shadow-2xl"
            onClick={(event) => (event.target as HTMLElement).closest("a") && setNavOpen(false)}
          >
            <button type="button" onClick={() => setNavOpen(false)} aria-label="Close menu" className="absolute right-3 top-4 rounded-md p-1.5 text-white/70 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-white">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button type="button" onClick={() => setNavOpen(true)} aria-label="Open menu" className="shrink-0 rounded-lg border border-line p-2 text-primary lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            {user.role !== "student" ? <GlobalSearch user={user} state={state} /> : null}
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden rounded-full bg-accent/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-dark md:inline">
                Demo data
              </span>
              <Notifications user={user} state={state} />
              <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
              <UserMenu user={user} collegeName={college(user.collegeId)?.shortName} onSignOut={handleSignOut} />
            </div>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </div>
    </div>
  );
}

function useClickAway(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && close();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

function GlobalSearch({ user, state }: { user: User; state: DemoState }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useClickAway(open, () => setOpen(false));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const has = (...fields: (string | undefined)[]) => fields.some((f) => f?.toLowerCase().includes(q));
    const can = (path: string) => canAccess(user.role, path);
    const out: { id: string; label: string; meta: string; href: string }[] = [];
    if (can("/dashboard/students"))
      scoped(state.students, user).filter((s) => has(s.name, s.rollNo, s.phone)).slice(0, 4).forEach((s) => out.push({ id: s.id, label: s.name, meta: `Student · ${s.rollNo}`, href: "/dashboard/students" }));
    if (can("/dashboard/applications"))
      scoped(state.applications, user).filter((a) => has(a.candidateName, a.id, a.phone)).slice(0, 4).forEach((a) => out.push({ id: a.id, label: a.candidateName, meta: `Application · ${a.id} · ${a.stage}`, href: "/dashboard/applications" }));
    if (can("/dashboard/enquiries"))
      scoped(state.enquiries, user).filter((e) => has(e.name, e.id, e.phone)).slice(0, 4).forEach((e) => out.push({ id: e.id, label: e.name, meta: `Enquiry · ${e.id} · ${e.status}`, href: "/dashboard/enquiries" }));
    return out.slice(0, 8);
  }, [query, state, user]);

  const go = (r: (typeof results)[number]) => {
    setOpen(false);
    setQuery("");
    if (pathname === r.href) openRecord(r.id);
    else router.push(`${r.href}?open=${r.id}`);
  };

  return (
    <div ref={ref} className="relative min-w-0 flex-1 md:max-w-xl">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search students, applications, enquiries…"
        aria-label="Search records"
        className="w-full rounded-lg border border-line bg-soft py-2 pl-9 pr-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
      />
      {open && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">No matches for “{query}”.</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={`${r.href}-${r.id}`}>
                  <button type="button" onClick={() => go(r)} className="block w-full px-4 py-2.5 text-left hover:bg-soft">
                    <span className="block text-sm font-semibold text-primary">{r.label}</span>
                    <span className="block text-xs text-slate-500">{r.meta}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Notifications({ user, state }: { user: User; state: DemoState }) {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(open, () => setOpen(false));
  const items = useMemo(() => {
    if (user.role === "student") {
      return state.notices
        .filter((n) => n.audience !== "Staff")
        .slice(0, 5)
        .map((n) => ({ id: n.id, text: n.title, at: n.publishedAt, href: "/dashboard/notices" }));
    }
    const today = new Date().toDateString();
    const list: { id: string; text: string; at: string; href: string }[] = [];
    if (canAccess(user.role, "/dashboard/enquiries")) {
      scoped(state.enquiries, user)
        .filter((e) => e.status === "New")
        .slice(0, 4)
        .forEach((e) => list.push({ id: e.id, text: `New enquiry: ${e.name}`, at: e.createdAt, href: `/dashboard/enquiries?open=${e.id}` }));
      scoped(state.enquiries, user)
        .filter((e) => e.followUpAt && new Date(e.followUpAt).toDateString() === today)
        .forEach((e) => list.push({ id: `${e.id}-f`, text: `Follow up today: ${e.name}`, at: e.followUpAt!, href: `/dashboard/enquiries?open=${e.id}` }));
    }
    if (canAccess(user.role, "/dashboard/applications")) {
      scoped(state.applications, user)
        .filter((a) => a.stage === "Submitted")
        .slice(0, 3)
        .forEach((a) => list.push({ id: a.id, text: `Application to review: ${a.candidateName}`, at: a.createdAt, href: `/dashboard/applications?open=${a.id}` }));
    }
    return list.slice(0, 8);
  }, [state, user]);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={`Notifications (${items.length})`} className="relative rounded-lg p-2 text-slate-500 hover:bg-soft hover:text-primary">
        <Bell className="h-5 w-5" />
        {items.length ? <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">{items.length}</span> : null}
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-line bg-white shadow-xl">
          <p className="border-b border-line px-4 py-3 text-sm font-bold text-primary">Notifications</p>
          {items.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-500">You&apos;re all caught up.</p>
          ) : (
            <ul className="max-h-80 divide-y divide-line overflow-y-auto">
              {items.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block px-4 py-3 hover:bg-soft">
                    <span className="block text-sm text-slate-800">{item.text}</span>
                    <span className="text-xs text-slate-400">{timeAgo(item.at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

function UserMenu({ user, collegeName, onSignOut }: { user: User; collegeName?: string; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-soft">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-accent">{initials(user.name)}</span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-semibold text-primary">{user.name}</span>
          <span className="block text-[11px] text-slate-500">
            {ROLE_LABELS[user.role]}
            {collegeName ? ` · ${collegeName}` : ""}
          </span>
        </span>
        <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-xl">
          <p className="border-b border-line px-4 py-2.5 text-xs text-slate-500">
            Signed in as
            <span className="block truncate text-sm font-semibold text-primary">{user.email}</span>
          </p>
          <Link href="/dashboard/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-soft">
            <Settings className="h-4 w-4" /> Profile & settings
          </Link>
          <button type="button" onClick={onSignOut} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-700 hover:bg-rose-50">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
