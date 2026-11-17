"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/** localStorage keys used by the app for per-browser question state. */
export const STORAGE_KEYS = {
  done: "om22001-done",
  bookmarks: "om22001-bookmarks",
  theme: "om22001-theme",
} as const;

const EMPTY = "[]";
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // "storage" fires when another tab changes the same key.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

function parseIds(raw: string): string[] {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/**
 * A list of string ids persisted in localStorage (e.g. done / bookmarked
 * questions). All components using the same key stay in sync, including across
 * browser tabs, and server rendering always sees an empty list.
 */
export function useStoredIdList(key: string) {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key) ?? EMPTY;
      } catch {
        return EMPTY;
      }
    },
    () => EMPTY
  );

  const ids = useMemo(() => parseIds(raw), [raw]);

  const toggle = useCallback(
    (id: string) => {
      try {
        const current = parseIds(localStorage.getItem(key) ?? EMPTY);
        const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
        localStorage.setItem(key, JSON.stringify(next));
        notify();
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return { ids, toggle };
}
