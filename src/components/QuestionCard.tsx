"use client";

import React, { useState, useEffect } from "react";
import { Question } from "@/lib/types";
import { MathView } from "./MathView";
import { 
  Bookmark, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Table as TableIcon
} from "lucide-react";

interface QuestionCardProps {
  question: Question;
  showAnswerDefault?: boolean;
  onBookmarkChange?: () => void;
  onDoneChange?: () => void;
}

const UNIT_COLORS: Record<number, { bg: string; text: string; border: string; accent: string }> = {
  1: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800/60",
    accent: "bg-emerald-500",
  },
  2: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800/60",
    accent: "bg-indigo-500",
  },
  3: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800/60",
    accent: "bg-purple-500",
  },
  4: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/60",
    accent: "bg-amber-500",
  },
  5: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800/60",
    accent: "bg-rose-500",
  },
};

export function QuestionCard({
  question,
  showAnswerDefault = false,
  onBookmarkChange,
  onDoneChange,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(showAnswerDefault);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check localStorage for bookmark and done status
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem("om22001-bookmarks") || "[]");
      setIsBookmarked(savedBookmarks.includes(question.id));

      const savedDone = JSON.parse(localStorage.getItem("om22001-done") || "[]");
      setIsDone(savedDone.includes(question.id));
    } catch (e) {
      // safe fallback
    }
  }, [question.id]);

  useEffect(() => {
    setIsOpen(showAnswerDefault);
  }, [showAnswerDefault]);

  const toggleBookmark = () => {
    try {
      const savedBookmarks: string[] = JSON.parse(localStorage.getItem("om22001-bookmarks") || "[]");
      let nextBookmarks: string[];
      if (savedBookmarks.includes(question.id)) {
        nextBookmarks = savedBookmarks.filter((id) => id !== question.id);
        setIsBookmarked(false);
      } else {
        nextBookmarks = [...savedBookmarks, question.id];
        setIsBookmarked(true);
      }
      localStorage.setItem("om22001-bookmarks", JSON.stringify(nextBookmarks));
      if (onBookmarkChange) onBookmarkChange();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDone = () => {
    try {
      const savedDone: string[] = JSON.parse(localStorage.getItem("om22001-done") || "[]");
      let nextDone: string[];
      if (savedDone.includes(question.id)) {
        nextDone = savedDone.filter((id) => id !== question.id);
        setIsDone(false);
      } else {
        nextDone = [...savedDone, question.id];
        setIsDone(true);
      }
      localStorage.setItem("om22001-done", JSON.stringify(nextDone));
      if (onDoneChange) onDoneChange();
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = () => {
    const tableText = (question.tables || [])
      .map(
        (t) =>
          `${t.title ? `${t.title}\n` : ""}${t.headers.join("\t")}\n${t.rows
            .map((r) => r.join("\t"))
            .join("\n")}`
      )
      .join("\n\n");

    const answerText =
      question.answer?.status === "complete"
        ? `\n\n--- Worked Solution ---\n${question.answer.steps.join("\n")}\n\nFinal Answer: ${
            question.answer.finalAnswer
          }`
        : "";

    const fullContent = `Q.${question.number} (${question.marks} Marks, CO${question.co}, Unit ${question.unit}):\n${question.questionText}\n\n${tableText}${answerText}`;

    navigator.clipboard.writeText(fullContent.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const unitColor = UNIT_COLORS[question.unit] || UNIT_COLORS[1];

  return (
    <div
      id={question.id}
      className={`rounded-xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-soft ${
        isDone
          ? "border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      {/* Header bar: badges and actions */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Question Number Badge */}
          <span className="px-2.5 py-1 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs tracking-wide">
            Q. {question.number}
          </span>

          {/* Marks badge */}
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
              question.marks === 2
                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                : "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold"
            }`}
          >
            {question.marks} Marks
          </span>

          {/* Unit Badge */}
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium border ${unitColor.bg} ${unitColor.text} ${unitColor.border}`}
          >
            Unit {question.unit}
          </span>

          {/* CO Badge */}
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            CO{question.co}
          </span>

          {/* RBT Level */}
          <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            RBT L{question.rbt}
          </span>

          {/* Needs Review Flag */}
          {question.needsReview && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <AlertTriangle className="w-3 h-3" />
              <span>Needs Review</span>
            </span>
          )}

          {/* Answer verified badge */}
          {question.answer?.status === "complete" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Verified</span>
            </span>
          )}
        </div>

        {/* Action icons: Completed, Bookmark, Copy */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Mark as Done */}
          <button
            onClick={toggleDone}
            aria-label={isDone ? "Mark as not reviewed" : "Mark as reviewed"}
            title={isDone ? "Reviewed (Click to uncheck)" : "Mark as reviewed"}
            className={`p-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 ${
              isDone
                ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}
          >
            <Check className={`w-3.5 h-3.5 ${isDone ? "stroke-[2.5]" : ""}`} />
            <span className="text-[11px] hidden sm:inline">{isDone ? "Done" : "Mark Done"}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
            title={isBookmarked ? "Bookmarked" : "Bookmark question"}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-500" : ""}`} />
          </button>

          {/* Copy Question */}
          <button
            onClick={copyToClipboard}
            aria-label="Copy question and worked solution"
            title="Copy question & solution"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            {copied ? (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Topic Pill */}
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Topic: <span className="text-slate-800 dark:text-slate-200 font-medium normal-case">{question.topic}</span>
        </div>

        {/* Question Statement with KaTeX & Serif font */}
        <div className="font-serif text-slate-900 dark:text-slate-100 text-[15px] sm:text-base leading-relaxed">
          <MathView text={question.questionText} />
        </div>

        {/* Data Tables rendered as proper HTML tables */}
        {question.tables && question.tables.length > 0 && (
          <div className="space-y-3 pt-2">
            {question.tables.map((table, tIdx) => (
              <div key={tIdx} className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                {table.title && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 opacity-70" />
                    <span>{table.title}</span>
                  </div>
                )}
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      {table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-3.5 py-2 whitespace-nowrap">
                          <MathView text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3.5 py-2 text-slate-700 dark:text-slate-300 font-mono text-xs whitespace-nowrap">
                            <MathView text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Answer Section Toggle Bar */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full px-5 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 rounded-b-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
          <span className="flex items-center gap-2">
            {isOpen ? "Hide Worked Solution" : "Show Worked Solution"}
            {question.answer?.status === "complete" ? (
              <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                (Exam Method & Steps)
              </span>
            ) : (
              <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                (Pending ChatGPT Source)
              </span>
            )}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Collapsible Answer Body */}
        {isOpen && (
          <div className="px-5 pb-6 pt-3 space-y-4 border-t border-slate-100 dark:border-slate-800">
            {question.answer?.status === "complete" ? (
              <>
                {/* Step-by-step Solution */}
                <div className="space-y-2.5">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Step-by-Step Method:
                  </h5>
                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                    {question.answer.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <span className="text-primary-500 font-mono text-xs mt-0.5 select-none">•</span>
                        <div className="flex-1 overflow-x-auto">
                          <MathView text={step} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Answer Highlight Box */}
                {question.answer.finalAnswer && (
                  <div className="p-3.5 rounded-lg bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-sm">
                    <span className="font-bold text-primary-900 dark:text-primary-200 mr-2">
                      Final Answer:
                    </span>
                    <span className="font-medium text-primary-800 dark:text-primary-300">
                      <MathView text={question.answer.finalAnswer} />
                    </span>
                  </div>
                )}

                {/* Table Values Used */}
                {question.answer.tableValuesUsed && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Table Values Cited:
                    </span>
                    <span>{question.answer.tableValuesUsed}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-2">
                <p className="font-semibold">Solution Pending Import</p>
                <p>
                  This answer is currently pending. You can paste the solution from your ChatGPT thread in the Admin Import helper.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

