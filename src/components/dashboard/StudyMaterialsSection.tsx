"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Folder, BookOpen, Sigma } from "lucide-react";

/** Study-material folders and the unit-wise formula sheet links. */
export function StudyMaterialsSection() {
  return (
    <>
      <div className="stats-section-card bg-white dark:bg-[#0a1628] rounded-2xl border border-slate-200 dark:border-[#1a2d4a] p-6 space-y-4 shadow-sm md:col-span-2">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a2d4a] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 text-purple-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-[#e8f4ff]">
                Study Materials &amp; Unit Notes
              </h2>
              <p className="text-xs text-slate-400">
                Unit 1 to 5 course materials, descriptive statistics, hypothesis testing, ANOVA, and SQC
              </p>
            </div>
          </div>
          <Link
            href="/study-materials"
            className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Open Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-1">
          {[
            {
              title: "Complete Notes",
              subtitle: "Full Subject",
              folderId: "Complete_Notes",
              symbol: "Σ",
              linkClass:
                "border-slate-200/60 dark:border-[#1a2d4a] dark:bg-[#0d1b33] hover:border-slate-300 dark:hover:border-slate-600",
            },
            {
              title: "Unit 1",
              subtitle: "x̄ · s² · Histograms",
              folderId: "Unit_1_Descriptive_Statistics",
              symbol: "x̄",
              linkClass:
                "border-slate-200/60 dark:border-teal-900/50 dark:bg-[#0d1b33] dark:hover:border-teal-500/40 hover:border-slate-300",
            },
            {
              title: "Unit 2",
              subtitle: "Z · Confidence · α",
              folderId: "Unit_2_Large_Sample_Tests",
              symbol: "z",
              linkClass:
                "border-slate-200/60 dark:border-blue-900/50 dark:bg-[#0d1b33] dark:hover:border-blue-500/40 hover:border-slate-300",
            },
            {
              title: "Unit 3",
              subtitle: "t · χ² · F",
              folderId: "Unit_3_Small_Sample_Tests",
              symbol: "t",
              linkClass:
                "border-slate-200/60 dark:border-purple-900/50 dark:bg-[#0d1b33] dark:hover:border-purple-500/40 hover:border-slate-300",
            },
            {
              title: "Unit 4",
              subtitle: "ANOVA · F-ratios",
              folderId: "Unit_4_Design_of_Experiments",
              symbol: "F",
              linkClass:
                "border-slate-200/60 dark:border-amber-900/50 dark:bg-[#0d1b33] dark:hover:border-amber-500/40 hover:border-slate-300",
            },
            {
              title: "Unit 5",
              subtitle: "X̄ · R · P · C charts",
              folderId: "Unit_5_Statistical_Quality_Control",
              symbol: "UCL",
              linkClass:
                "border-slate-200/60 dark:border-rose-900/50 dark:bg-[#0d1b33] dark:hover:border-rose-500/40 hover:border-slate-300",
            },
          ].map((folder, idx) => (
            <Link
              key={idx}
              href={`/study-materials?folder=${folder.folderId}`}
              className={`stats-folder-link relative overflow-hidden p-3 rounded-xl border bg-slate-50/60 hover:bg-slate-100/60 dark:hover:bg-[#0d1b33]/80 transition space-y-1 block ${folder.linkClass}`}
            >
              {/* Decorative mathematical symbol */}
              <span
                className="pointer-events-none select-none absolute top-1 right-1.5 font-serif text-slate-500 dark:text-[#2278e0] font-bold"
                style={{ fontSize: "2rem", opacity: 0.08, lineHeight: 1 }}
                aria-hidden="true"
              >
                {folder.symbol}
              </span>
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-xs">
                <Folder className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span className="truncate">{folder.title}</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">{folder.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Unit-wise formula sheets */}
      <div className="stats-section-card bg-white dark:bg-[#0a1628] rounded-2xl border border-slate-200 dark:border-[#1a2d4a] p-6 space-y-5 shadow-sm md:col-span-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#1a2d4a] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/20 text-cyan-700 dark:text-cyan-300 flex items-center justify-center">
              <Sigma className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-[#e8f4ff]">
                Unit-wise Formula Sheets
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#8ba3bd]">
                Statistical notation and reference formulas across all five units
              </p>
            </div>
          </div>
          <Link
            href="/formulas"
            className="text-xs font-semibold text-blue-900 dark:text-cyan-300 hover:underline flex items-center gap-1"
          >
            <span>Open Formula Sheets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { unit: "01", name: "Descriptive statistics", formula: "x̄ · s² · σ", accent: "text-teal-600 dark:text-teal-300" },
            { unit: "02", name: "Large-sample tests", formula: "z · α · p̂", accent: "text-blue-700 dark:text-blue-300" },
            { unit: "03", name: "Small-sample tests", formula: "t · χ² · F", accent: "text-violet-700 dark:text-violet-300" },
            { unit: "04", name: "Analysis of variance", formula: "F = MSB / MSW", accent: "text-amber-700 dark:text-amber-300" },
            { unit: "05", name: "Statistical quality control", formula: "UCL · CL · LCL", accent: "text-rose-700 dark:text-rose-300" },
          ].map((item) => (
            <Link
              key={item.unit}
              href="/formulas"
              className="stats-formula-link group rounded-xl border border-slate-200/80 dark:border-[#213b57] bg-slate-50/70 dark:bg-[#0d1b2e] p-4 transition hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:hover:bg-[#10243a]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider text-slate-400 dark:text-slate-500">UNIT {item.unit}</span>
                <span className={`unit-mark text-lg ${item.accent}`}>{item.formula}</span>
              </div>
              <p className="mt-3 text-xs font-semibold leading-snug text-slate-700 dark:text-slate-200">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
