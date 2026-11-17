import React from "react";
import Link from "next/link";
import { FileQuestion, Home, FileCheck2, GraduationCap, BookOpen, Sigma } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Page Not Found (404)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            The study material, paper, or link you requested is not available. Explore the repositories below:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 text-white dark:bg-[#1a2d4a] dark:text-[#93c5fd] hover:bg-slate-800 transition min-h-[44px]"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Home</span>
          </Link>
          <Link
            href="/fat"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-[#0a1628] border border-slate-200 dark:border-[#1a2d4a] text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition min-h-[44px]"
          >
            <FileCheck2 className="w-4 h-4 shrink-0 text-amber-500" />
            <span>FAT Papers</span>
          </Link>
          <Link
            href="/semester"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-[#0a1628] border border-slate-200 dark:border-[#1a2d4a] text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition min-h-[44px]"
          >
            <GraduationCap className="w-4 h-4 shrink-0 text-sky-500" />
            <span>Semester Papers</span>
          </Link>
          <Link
            href="/study-materials"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-[#0a1628] border border-slate-200 dark:border-[#1a2d4a] text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition min-h-[44px]"
          >
            <BookOpen className="w-4 h-4 shrink-0 text-teal-400" />
            <span>Study Materials</span>
          </Link>
          <Link
            href="/formulas"
            className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white hover:from-[#2278e0] hover:to-[#14b8a6] transition min-h-[44px] shadow-sm"
          >
            <Sigma className="w-4 h-4 shrink-0" />
            <span>Formula Sheets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

