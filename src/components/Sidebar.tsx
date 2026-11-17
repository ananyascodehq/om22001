"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck2,
  GraduationCap,
  BookOpen,
  FolderOpen,
  Upload,
  Settings,
  Sigma,
  Table2,
  Flame,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Layers,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UploadModal } from "./UploadModal";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const MAIN_NAV: NavItem[] = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/fat", label: "FAT Question Papers & Answers", icon: FileCheck2 },
    { href: "/semester", label: "Semester Question Papers & Answers", icon: GraduationCap },
  ];

  return (
    <>
      {/* Mobile Top Navbar Trigger */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
            <Sigma className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">OM22001</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-sm shrink-0">
              <Sigma className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight truncate">
                  OM22001
                </h1>
                <p className="text-[11px] text-slate-500 truncate font-medium">
                  Stats for Engineers
                </p>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Upload Action */}
        <div className="p-3">
          <button
            onClick={() => {
              setUploadModalOpen(true);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-sky-600/20 hover:opacity-95 transition ${
              collapsed ? "p-2.5" : ""
            }`}
            title="Upload New Document"
          >
            <Upload className="w-4 h-4" />
            {!collapsed && <span>Upload Document</span>}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main Academic Repositories */}
          <div className="space-y-1">
            {!collapsed && (
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Academic Repositories
              </span>
            )}
            {MAIN_NAV.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400"}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer info & Theme Toggle */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!collapsed && (
              <span className="text-[11px] text-slate-400 font-medium">Theme Mode</span>
            )}
          </div>
        </div>
      </aside>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  );
}

