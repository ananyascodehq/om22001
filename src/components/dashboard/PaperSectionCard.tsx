"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, FileText } from "lucide-react";
import type { DashboardPaper } from "./paperData";

interface PaperSectionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  /** Page the "Open Folder" link goes to. */
  href: string;
  papers: DashboardPaper[];
  /** Id of the uploaded PDF for this paper, if it exists (enables Preview). */
  findDocId: (paper: DashboardPaper) => string | null;
  onPreview: (documentId: string) => void;
}

/** A dashboard card listing papers with Preview and ChatGPT-answers actions. */
export function PaperSectionCard({
  icon,
  title,
  subtitle,
  href,
  papers,
  findDocId,
  onPreview,
}: PaperSectionCardProps) {
  return (
    <div className="stats-section-card bg-white dark:bg-[#0a1628] rounded-2xl border border-slate-200 dark:border-[#1a2d4a] p-6 space-y-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a2d4a] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d6fce]/20 to-[#0d9488]/20 dark:from-[#1d6fce]/30 dark:to-[#0d9488]/30 text-[#60a5fa] flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-[#e8f4ff]">{title}</h2>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>
        <Link
          href={href}
          className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>Open Folder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {papers.map((paper) => {
          const docId = findDocId(paper);
          return (
            <div
              key={`${paper.code}-${paper.filename}`}
              className="stats-paper-row p-3.5 rounded-xl border border-slate-100 dark:border-[#1a2d4a] bg-slate-50/60 dark:bg-[#0d1b33] space-y-2.5 transition dark:hover:border-[#2278e0]/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-[#e8f4ff]">{paper.title}</h4>
                  <p className="text-[11px] text-slate-400 dark:text-[#7ea8cc] mt-0.5">{paper.detail}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#4a7fa0] font-mono mt-1">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span>{paper.filename}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                {docId && (
                  <button
                    onClick={() => onPreview(docId)}
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
  );
}
