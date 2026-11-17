import React from "react";
import Link from "next/link";
import { getAllSemPapers } from "@/lib/data";
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  Clock,
  Award,
  Hash
} from "lucide-react";

export const metadata = {
  title: "SEM Question Papers | OM22001 Statistical Methods for Engineers",
  description: "End Semester question papers for OM22001 with full worked solutions, formulas, and PDF downloads.",
};

export default function SemPapersPage() {
  const papers = getAllSemPapers();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Anna University Examinations</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          End Semester (SEM) Question Papers
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Access all four officially loaded semester examination papers. Each paper includes complete Part A (2-mark), Part B (10-mark), and Part C (10-mark compulsory) step-by-step worked solutions.
        </p>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {papers.map((paper) => {
          const totalQ = paper.questions.length;
          const completedQ = paper.questions.filter((q) => q.answer.status === "complete").length;
          const completionPct = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;
          const partA = paper.questions.filter((q) => q.part === "A").length;
          const partB = paper.questions.filter((q) => q.part === "B").length;
          const partC = paper.questions.filter((q) => q.part === "C").length;

          return (
            <div
              key={paper.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft hover:shadow-cardHover transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header with Exam Month & QCode */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.examMonthYear}
                  </span>

                  {paper.qCode && (
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      Q.Code: {paper.qCode}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {paper.title}
                  </h2>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>Semester {paper.semester || "5/6"}</span>
                    <span>•</span>
                    <span>Regulation {paper.regulation}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {paper.duration || "3 Hours"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" /> {paper.maxMarks || 100} Marks
                    </span>
                  </div>
                </div>

                {/* Question Breakdown */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center border border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Part A (2M)</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{partA} Qs (40M)</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Part B (10M)</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{partB} Qs (50M)</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Part C (10M)</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{partC} Q (10M)</div>
                  </div>
                </div>

                {/* Answer Completion Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Answer Completion:
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {completionPct}% ({completedQ}/{totalQ} Solved)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Links */}
              <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                {paper.pdfUrl ? (
                  <a
                    href={paper.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <span />
                )}

                <Link
                  href={`/sem/${paper.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Open Paper & Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

