"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck2,
  GraduationCap,
  BookOpen,
  Upload,
  Sigma,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UploadModal } from "./UploadModal";

interface NavLinkItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_LINKS: NavLinkItem[] = [
  {
    href: "/",
    label: "Home",
    shortLabel: "Home",
    icon: LayoutDashboard,
  },
  {
    href: "/fat",
    label: "FAT Question Papers & Answers",
    shortLabel: "FAT Papers & Answers",
    icon: FileCheck2,
  },
  {
    href: "/semester",
    label: "Semester Question Papers & Answers",
    shortLabel: "Semester Papers & Answers",
    icon: GraduationCap,
  },
  {
    href: "/study-materials",
    label: "Study Materials",
    shortLabel: "Study Materials",
    icon: BookOpen,
  },
  {
    href: "/formulas",
    label: "Formula Sheets",
    shortLabel: "Formulas",
    icon: Sigma,
  },
];

export function TopNavbar() {
  const pathname = usePathname();
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const mobileMenuOpen = mobileMenuPath === pathname;
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuPath(null);
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="portal-header sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#1a2d4a] bg-white/95 dark:bg-[#080e1c]/98 backdrop-blur-xl transition-colors shadow-sm relative overflow-hidden">
        {/* Decorative math watermark — dark mode only, non-interactive */}
        <div
          className="pointer-events-none select-none absolute inset-0 hidden dark:flex items-center justify-around px-8 overflow-hidden"
          aria-hidden="true"
        >
          {["Σ", "μ", "σ", "α", "β"].map((sym, i) => (
            <span
              key={i}
              className="text-[#e8f4ff] font-serif italic"
              style={{ fontSize: "2rem", opacity: 0.03 }}
            >
              {sym}
            </span>
          ))}
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d6fce] to-[#0d9488] text-white flex items-center justify-center shadow-md shadow-blue-900/30 group-hover:scale-105 transition-transform shrink-0">
                <Sigma className="w-5 h-5" />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-[#e8f4ff] group-hover:text-blue-900 dark:group-hover:text-[#60a5fa] transition-colors">
                    OM22001
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-[#1a2d4a] text-blue-900 dark:text-[#60a5fa] font-mono">
                    AU Reg 2022
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-[#7ea8cc] font-medium -mt-0.5 whitespace-nowrap hidden sm:inline">
                  Statistical Methods for Engineers
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Top Navigation Links (Desktop) */}
          <nav aria-label="Primary navigation" className="hidden xl:flex items-center justify-center gap-2 flex-1">
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`h-10 px-4 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-slate-400 dark:text-slate-500"}`} />
                  <span className="hidden 2xl:inline">{item.label}</span>
                  <span className="inline 2xl:hidden">{item.shortLabel}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="h-10 px-2.5 sm:px-4 flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-[#1d6fce] to-[#0d9488] hover:from-[#2278e0] hover:to-[#14b8a6] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition hover:shadow-lg whitespace-nowrap shrink-0"
              title="Upload Document"
            >
              <Upload className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Upload Document</span>
              <span className="inline sm:hidden">Upload</span>
            </button>

            <div className="flex items-center justify-center shrink-0">
              <ThemeToggle />
            </div>

            {/* Mobile menu trigger */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setMobileMenuPath(mobileMenuOpen ? null : pathname)}
              className="xl:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
              aria-label="Toggle navigation menu"
              aria-controls="mobile-primary-navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          id="mobile-primary-navigation"
          aria-hidden={!mobileMenuOpen}
          className={`${mobileMenuOpen ? "block" : "hidden"} xl:hidden border-t border-slate-200 dark:border-[#1a2d4a] bg-white dark:bg-[#080e1c] px-4 py-3 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150`}
        >
          {NAV_LINKS.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuPath(null)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition min-h-[44px] ${
                  active
                    ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {/* Mobile Upload Button */}
          <div className="pt-2 border-t border-slate-200 dark:border-[#1a2d4a]">
            <button
              onClick={() => {
                setMobileMenuPath(null);
                setUploadModalOpen(true);
              }}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition min-h-[44px]"
            >
              <Upload className="w-4 h-4 shrink-0" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  );
}
