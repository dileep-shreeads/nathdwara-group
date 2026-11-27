"use client";

import { useSyncExternalStore } from "react";
import { createSeed, DEMO_VERSION } from "./seed";
import type { DemoState } from "./types";

/**
 * Browser-side demo database. Each visitor gets their own copy in
 * localStorage, so a demo never collides with someone else's clicks and
 * survives page reloads. Replace the service layer (src/lib/services) with
 * API calls when Postgres is connected; screens do not touch this file.
 */

const DATA_KEY = "ngi-demo-data";
const SESSION_KEY = "ngi-demo-session";

let state: DemoState | null = null;
let sessionUserId: string | null | undefined;
const listeners = new Set<() => void>();

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode): the demo keeps working in memory.
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function getState(): DemoState {
  if (!state) {
    const saved = read<DemoState>(DATA_KEY);
    state = saved && saved.version === DEMO_VERSION ? saved : createSeed();
    if (!saved || saved.version !== DEMO_VERSION) write(DATA_KEY, state);
  }
  return state;
}

export function setState(update: (draft: DemoState) => DemoState) {
  state = update(structuredClone(getState()));
  write(DATA_KEY, state);
  emit();
}

export function resetDemoData() {
  state = createSeed();
  write(DATA_KEY, state);
  emit();
}

export function getSessionUserId(): string | null {
  if (sessionUserId === undefined) {
    sessionUserId = read<{ userId: string }>(SESSION_KEY)?.userId ?? null;
  }
  return sessionUserId;
}

export function setSessionUserId(userId: string | null) {
  sessionUserId = userId;
  write(SESSION_KEY, userId ? { userId, at: new Date().toISOString() } : null);
  emit();
}

/** Increment a named counter on a draft and return the new value. */
export function bump(draft: DemoState, counter: string) {
  draft.counters[counter] = (draft.counters[counter] ?? 0) + 1;
  return draft.counters[counter];
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === DATA_KEY) {
      state = null;
      listener();
    }
    if (event.key === SESSION_KEY) {
      sessionUserId = undefined;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Read from the demo store; returns null during server rendering. */
export function useDemoState(): DemoState | null {
  return useSyncExternalStore(subscribe, getState, () => null);
}

/** `undefined` while hydrating, `null` when signed out. */
export function useSessionUserId(): string | null | undefined {
  return useSyncExternalStore(subscribe, getSessionUserId, () => undefined);
}
