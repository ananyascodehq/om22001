"use client";

import React, { useState } from "react";
import { Paper } from "@/lib/types";
import { QuestionCard } from "@/components/papers/QuestionCard";
import { 
  Download, 
  Eye, 
  EyeOff, 
  Calendar, 
  Clock, 
  Award, 
  Hash,
  Layers,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface PaperViewClientProps {
  paper: Paper;
}

type TabType = "ALL" | "A" | "B" | "C";

export function PaperViewClient({ paper }: PaperViewClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const partA = paper.questions.filter((q) => q.part === "A");
  const partB = paper.questions.filter((q) => q.part === "B");
  const partC = paper.questions.filter((q) => q.part === "C");

  const displayedQuestions =
    activeTab === "ALL"
      ? paper.questions
      : activeTab === "A"
      ? partA
      : activeTab === "B"
      ? partB
      : partC;

  const totalQuestions = paper.questions.length;
  const completedAnswers = paper.questions.filter((q) => q.answer.status === "complete").length;

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={paper.assessmentType === "FAT" ? "/fat" : "/sem"} className="hover:text-primary-600 transition-colors">
          {paper.assessmentType === "FAT" ? "FAT Assessments" : "SEM Papers"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-900 dark:text-slate-200 truncate">
          {paper.id}
        </span>
      </nav>

      {/* Paper Header Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-card space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {paper.examMonthYear || `Assessment ${paper.testNumber || 1}`}
            </span>

            {paper.qCode && (
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                Q.Code: {paper.qCode}
              </span>
            )}
          </div>

          {/* Download PDF button */}
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Paper</span>
            </a>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {paper.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {paper.subjectCode} – {paper.subjectName} ({paper.departments || "All Branches"}) • Regulation {paper.regulation}
          </p>
        </div>

        {/* Paper Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Time: {paper.duration || "3 Hours"}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            Max Marks: {paper.maxMarks || 100}
          </span>
          <span>•</span>
          <span>Total Questions: {totalQuestions}</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {completedAnswers} of {totalQuestions} Solved ({totalQuestions > 0 ? Math.round((completedAnswers/totalQuestions)*100) : 0}%)
          </span>
        </div>
      </div>

      {/* Interactive Tabs and Show/Hide Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        {/* Tabs: ALL, Part A, Part B, Part C */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {[
            { id: "ALL", label: `All Questions (${totalQuestions})` },
            { id: "A", label: `Part A (${partA.length} Qs • 40M)` },
            { id: "B", label: `Part B (${partB.length} Qs • 50M)` },
            { id: "C", label: `Part C (${partC.length} Q • 10M)` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Answer Visibility Toggle */}
        <button
          onClick={() => setShowAllAnswers(!showAllAnswers)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-sm transition-colors"
        >
          {showAllAnswers ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
              <span>Collapse All Answers</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-primary-500" />
              <span>Expand All Answers</span>
            </>
          )}
        </button>
      </div>

      {/* Part Instruction Banner */}
      {activeTab === "A" && (
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <strong>PART A (20 × 2 = 40 Marks):</strong> Answer all questions. Concise short answers with formulas and key conclusions.
        </div>
      )}
      {activeTab === "B" && (
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <strong>PART B (5 × 10 = 50 Marks):</strong> 5 Questions with internal choice (a OR b). Comprehensive exam-style worked steps.
        </div>
      )}
      {activeTab === "C" && (
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <strong>PART C (1 × 10 = 10 Marks):</strong> Compulsory application problem with in-depth statistical reasoning and calculations.
        </div>
      )}

      {/* Questions Stack */}
      {displayedQuestions.length > 0 ? (
        <div className="space-y-6">
          {displayedQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              showAnswerDefault={showAllAnswers}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No questions in this part
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select another part tab above to view questions.
          </p>
        </div>
      )}
    </div>
  );
}

