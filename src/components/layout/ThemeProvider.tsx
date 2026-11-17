"use client";

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { STORAGE_KEYS } from "@/lib/storageKeys";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The saved theme, or the OS preference when nothing has been saved yet. */
function readTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");
  const mounted = useIsClient();

  // Keep the <html> class in sync with the theme.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme === "light" ? "dark" : "light");
    listeners.forEach((listener) => listener());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted ? "" : "opacity-0"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
