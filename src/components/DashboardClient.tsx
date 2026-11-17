"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  GraduationCap,
  ExternalLink,
  Eye,
  Download,
  FileText,
  ArrowRight,
  Folder,
  BookOpen,
  Sigma,
} from "lucide-react";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { CHATGPT_ANSWER_LINKS } from "@/lib/answerLinks";

interface DashboardClientProps {
  stats: {
    totalFiles: number;
    totalQuestionPapers: number;
    totalAnswers: number;
    totalStudyMaterials: number;
    fatCount: number;
    semCount: number;
  };
  recentUploads: Array<{
    id: string;
    originalFilename: string;
    category: "FAT" | "SEMESTER" | "STUDY_MATERIAL";
    subfolder: string;
    documentType: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
    examination?: {
      code: string;
      title: string;
    } | null;
  }>;
}

export function DashboardClient({ stats, recentUploads }: DashboardClientProps) {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const SEMESTER_PAPERS = [
    {
      code: "SEM_PYQ_1",
      title: "Semester Examination – Dec 2024",
      semester: "Semester 5 • Q.Code: 147184 • 100 Marks",
      filename: "OM22001 (2).pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_1.chatGptUrl,
    },
    {
      code: "SEM_PYQ_2",
      title: "Semester Examination – May 2025",
      semester: "Semester 5 • Q.Code: 405686 • 100 Marks",
      filename: "OM22001 (1).pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_2.chatGptUrl,
    },
    {
      code: "SEM_PYQ_3",
      title: "Semester Examination – Dec 2025",
      semester: "Semester 6 • Q.Code: 133554 • 100 Marks",
      filename: "OM22001.pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_3.chatGptUrl,
    },
    {
      code: "SEM_PYQ_4",
      title: "Semester Examination – May 2026",
      semester: "Semester 6 • Q.Code: 323580 • 100 Marks",
      filename: "OM22001-25211048.pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_4.chatGptUrl,
    },
  ];

  const FAT_PAPERS = [
    {
      code: "FAT_1",
      title: "FAT 1 (Academic Year 2025–2026)",
      coverage: "Semester 5 • Date: 06.08.2025 • 50 Marks",
      filename: "OE statistics fat 1.pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_1_AY2025_2026.chatGptUrl,
    },
    {
      code: "FAT_1",
      title: "FAT 1 (Academic Year 2024–2025)",
      coverage: "Semester 6 • Date: 08.03.2025 • 50 Marks",
      filename: "OE statistics fat 1 (2024-2025).pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_1_AY2024_2025.chatGptUrl,
    },
    {
      code: "FAT_2",
      title: "FAT 2 (Academic Year 2024–2025)",
      coverage: "Semester 6 • Date: 19.04.2025 • 50 Marks",
      filename: "OE statistics fat 2.pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_2_AY2024_2025.chatGptUrl,
    },
    {
      code: "FAT_3",
      title: "FAT 3 (Academic Year 2024–2025)",
      coverage: "Semester 6 • Date: 19.05.2025 • 50 Marks",
      filename: "OE statistics fat 3.pdf",
      chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_3_AY2024_2025.chatGptUrl,
    },
  ];

  // Find doc ID for preview if present in recentUploads
  const findDocId = (filename: string, examCode?: string) => {
    const normalize = (s: string) => s.replace(/[\u2010-\u2015]/g, "-").trim().toLowerCase();
    const targetNorm = normalize(filename);
    const found = recentUploads.find(
      (d) =>
        normalize(d.originalFilename) === targetNorm &&
        (!examCode || d.examination?.code === examCode)
    );
    return found ? found.id : null;
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="stats-hero math-grid-bg relative overflow-hidden rounded-3xl border border-slate-200 dark:border-[#1a2d4a] px-6 py-9 sm:px-10 sm:py-12">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="math-symbol font-serif text-[#60a5fa] text-7xl right-[43%] top-5">Σ</span>
          <span className="math-symbol font-serif text-[#20b9ca] text-6xl left-[45%] bottom-7">σ²</span>
          <span className="math-symbol font-serif text-[#60a5fa] text-6xl right-8 top-5">χ²</span>
        </div>

        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block w-[48%] max-w-[610px] h-auto"
          viewBox="0 0 560 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.72 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="density-area" x1="280" y1="42" x2="280" y2="218" gradientUnits="userSpaceOnUse">
              <stop stopColor="#20B9CA" stopOpacity=".28" />
              <stop offset="1" stopColor="#20B9CA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="#6E9BC0" strokeOpacity=".22" strokeWidth="1">
            <path d="M56 48H520M56 88H520M56 128H520M56 168H520M56 208H520" />
            <path d="M96 32V218M156 32V218M216 32V218M276 32V218M336 32V218M396 32V218M456 32V218" />
          </g>
          <path d="M56 218H520M276 32V218" stroke="#83AFCF" strokeOpacity=".72" strokeWidth="1.5" />
          <path d="M56 218C118 218 164 203 202 174C238 145 248 48 276 48C304 48 314 145 350 174C388 203 434 218 496 218V218H56Z" fill="url(#density-area)" />
          <path
            d="M56 218C118 218 164 203 202 174C238 145 248 48 276 48C304 48 314 145 350 174C388 203 434 218 496 218"
            stroke="#43C7D3"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M276 48V218" stroke="#A8D9E5" strokeOpacity=".7" strokeDasharray="5 6" />
          <path d="M198 212V224M276 212V224M354 212V224" stroke="#83AFCF" strokeWidth="1.4" />
          <g fill="#A8D9E5" fontFamily="ui-monospace, monospace" fontSize="12">
            <text x="188" y="244">μ − σ</text>
            <text x="268" y="244">μ</text>
            <text x="346" y="244">μ + σ</text>
            <text x="282" y="44">f(x)</text>
          </g>
        </svg>

        <div className="relative z-10 max-w-none md:max-w-[48%] space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-[#1a2d4a] text-blue-900 dark:text-[#60a5fa] font-mono tracking-wider">
              REGULATION 2022
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-[#8ba3bd]">
              Engineering statistics · Anna University
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.4rem] font-extrabold tracking-[-0.045em] leading-[1.08] sm:leading-[1.15] text-slate-950 dark:text-[#e8f4ff]">
            OM22001 <span className="text-blue-700 dark:text-[#64b5f6]">– Statistical Methods for Engineers</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#a2b7ce] max-w-lg leading-relaxed">
            A focused mathematics workspace for exam papers, worked solutions, unit notes, and statistical reference.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {["Descriptive statistics", "Hypothesis testing", "ANOVA", "Quality control"].map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/70 dark:bg-[#10223a]/80 text-slate-700 dark:text-[#b5cbe0] border border-slate-200/80 dark:border-[#264363]"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="math-display stats-equation-strip pt-1 text-[13px] sm:text-sm text-blue-800 dark:text-[#66c9d1]">
            <span>x̄ = Σxᵢ / n</span>
            <span className="stats-equation-separator" aria-hidden="true">·</span>
            <span>z = (x̄ − μ) / (σ / √n)</span>
            <span className="stats-equation-separator" aria-hidden="true">·</span>
            <span>H₀ ⇄ H₁</span>
          </p>
        </div>
      </section>

      {/* Two Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAT Section Card */}
        <div className="stats-section-card bg-white dark:bg-[#0a1628] rounded-2xl border border-slate-200 dark:border-[#1a2d4a] p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a2d4a] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d6fce]/20 to-[#0d9488]/20 dark:from-[#1d6fce]/30 dark:to-[#0d9488]/30 text-[#60a5fa] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 dark:text-[#e8f4ff]">
                  FAT Question Papers &amp; Answers
                </h2>
                <p className="text-xs text-slate-400">
                  FAT 1, FAT 2, and FAT 3 Examination Papers
                </p>
              </div>
            </div>
            <Link
              href="/fat"
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Open Folder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {FAT_PAPERS.map((paper, idx) => {
              const docId = findDocId(paper.filename, paper.code);
              return (
                <div
                  key={idx}
                  className="stats-paper-row p-3.5 rounded-xl border border-slate-100 dark:border-[#1a2d4a] bg-slate-50/60 dark:bg-[#0d1b33] space-y-2.5 transition dark:hover:border-[#2278e0]/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-[#e8f4ff]">
                        {paper.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-[#7ea8cc] mt-0.5">
                        {paper.coverage}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#4a7fa0] font-mono mt-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span>{paper.filename}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    {docId && (
                      <button
                        onClick={() => setSelectedDocId(docId)}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-[#1a2d4a] hover:bg-slate-300 dark:hover:bg-[#1d2f4d] text-slate-800 dark:text-[#93c5fd] font-semibold text-xs flex items-center gap-1.5 transition min-h-[38px]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#60a5fa] shrink-0" />
                        <span>Preview QP</span>
                      </button>
                    )}
                    <a
                      href={paper.chatGptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 transition min-h-[38px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>Answers on ChatGPT</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Semester Section Card */}
        <div className="stats-section-card bg-white dark:bg-[#0a1628] rounded-2xl border border-slate-200 dark:border-[#1a2d4a] p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a2d4a] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d6fce]/20 to-[#0d9488]/20 dark:from-[#1d6fce]/30 dark:to-[#0d9488]/30 text-[#60a5fa] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900 dark:text-[#e8f4ff]">
                  Semester Papers &amp; Answers (PYQs)
                </h2>
                <p className="text-xs text-slate-400">
                  Dec 2024, May 2025, Dec 2025, May 2026
                </p>
              </div>
            </div>
            <Link
              href="/semester"
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Open Folder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {SEMESTER_PAPERS.map((paper, idx) => {
              const docId = findDocId(paper.filename, paper.code);
              return (
                <div
                  key={idx}
                  className="stats-paper-row p-3.5 rounded-xl border border-slate-100 dark:border-[#1a2d4a] bg-slate-50/60 dark:bg-[#0d1b33] space-y-2.5 transition dark:hover:border-[#2278e0]/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-[#e8f4ff]">
                        {paper.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-[#7ea8cc] mt-0.5">
                        {paper.semester}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#4a7fa0] font-mono mt-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span>{paper.filename}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    {docId && (
                      <button
                        onClick={() => setSelectedDocId(docId)}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-[#1a2d4a] hover:bg-slate-300 dark:hover:bg-[#1d2f4d] text-slate-800 dark:text-[#93c5fd] font-semibold text-xs flex items-center gap-1.5 transition min-h-[38px]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#60a5fa] shrink-0" />
                        <span>Preview QP</span>
                      </button>
                    )}
                    <a
                      href={paper.chatGptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 transition min-h-[38px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>Answers on ChatGPT</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Materials Section Card */}
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
      </div>

      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />
    </div>
  );
}
