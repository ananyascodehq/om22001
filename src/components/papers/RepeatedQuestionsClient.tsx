"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RepeatedQuestion, Question } from "@/lib/types";
import { QuestionCard } from "@/components/papers/QuestionCard";
import { 
  Flame, 
  Sparkles, 
  BookOpen, 
  Search, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink 
} from "lucide-react";

interface RepeatedQuestionsClientProps {
  repeated: RepeatedQuestion[];
  allQuestions: Array<Question & { paperTitle: string; examMonthYear?: string }>;
}

const PAPER_LABELS: Record<string, string> = {
  "2024-dec-sem5-147184": "Dec 2024 (Sem 5)",
  "2025-may-sem5-405686": "May 2025 (Sem 5)",
  "2025-dec-sem6-133554": "Dec 2025 (Sem 6)",
  "2026-may-sem6-323580": "May 2026 (Sem 6)",
};

const UNIT_NAMES: Record<number, string> = {
  1: "Descriptive Statistics",
  2: "Large Sample Tests",
  3: "Small Sample Tests",
  4: "Design of Experiments",
  5: "Statistical Quality Control",
};

export function RepeatedQuestionsClient({ repeated, allQuestions }: RepeatedQuestionsClientProps) {
  const [selectedUnit, setSelectedUnit] = useState<number | "ALL">("ALL");
  const [onlyHighProb, setOnlyHighProb] = useState<boolean>(false);
  const [selectedMarks, setSelectedMarks] = useState<number | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Map to quickly find Question by paperId and questionNumber
  const questionLookup = useMemo(() => {
    const map = new Map<string, Question>();
    for (const q of allQuestions) {
      // standard key: `${q.paperId}-${q.number.toLowerCase()}`
      map.set(`${q.paperId}-${q.number.toLowerCase()}`, q);
      // also key by full id
      map.set(q.id, q);
    }
    return map;
  }, [allQuestions]);

  const filteredClusters = useMemo(() => {
    return repeated.filter((c) => {
      if (selectedUnit !== "ALL" && c.unit !== selectedUnit) return false;
      if (onlyHighProb && !c.isHighProbability) return false;
      if (selectedMarks !== "ALL" && c.marks !== selectedMarks) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesTopic = c.topic.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTopic && !matchesDesc) return false;
      }
      return true;
    });
  }, [repeated, selectedUnit, onlyHighProb, selectedMarks, searchQuery]);

  const highProbCount = repeated.filter((c) => c.isHighProbability).length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Insight */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-200 dark:border-amber-900/40 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Exam Frequency Intelligence
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                  {repeated.length} Repeated Concepts
                </span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Analysis of 4 semester papers (Dec 2024, May 2025, Dec 2025, May 2026). Concepts appearing in 3+ papers have a 75%+ recurrence probability.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setOnlyHighProb(!onlyHighProb)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
                onlyHighProb
                  ? "bg-amber-500 text-white shadow-amber-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-400"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>High Probability Only ({highProbCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, topics (e.g. ANOVA, LSD, Poisson, Control Limits)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition"
            />
          </div>

          {/* Unit selector pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedUnit("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedUnit === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Units
            </button>
            {[1, 2, 3, 4, 5].map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUnit(u)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedUnit === u
                    ? "bg-sky-600 text-white dark:bg-sky-500 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Unit {u}
              </button>
            ))}
          </div>

          {/* Marks Filter */}
          <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-3">
            <button
              onClick={() => setSelectedMarks("ALL")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                selectedMarks === "ALL"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              All Marks
            </button>
            <button
              onClick={() => setSelectedMarks(2)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                selectedMarks === 2
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              2 Marks (Part A)
            </button>
            <button
              onClick={() => setSelectedMarks(10)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                selectedMarks === 10
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              10 Marks (Part B/C)
            </button>
          </div>
        </div>

        {/* Active Filter Count */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredClusters.length}</strong> repeated question clusters
          </span>
          {(selectedUnit !== "ALL" || onlyHighProb || selectedMarks !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedUnit("ALL");
                setOnlyHighProb(false);
                setSelectedMarks("ALL");
                setSearchQuery("");
              }}
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Cluster List */}
      <div className="space-y-4">
        {filteredClusters.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No matching repeated questions found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Try broadening your search or resetting active filters to view all 17 recurring concepts.
            </p>
          </div>
        ) : (
          filteredClusters.map((cluster) => {
            const isExpanded = expandedId === cluster.id;
            const appearancePercentage = Math.round((cluster.frequency / 4) * 100);

            return (
              <div
                key={cluster.id}
                className={`rounded-2xl border transition-all ${
                  cluster.isHighProbability
                    ? "bg-gradient-to-r from-amber-500/5 via-white to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 border-amber-300/80 dark:border-amber-800/60 shadow-sm"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* High probability badge */}
                      {cluster.isHighProbability && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm shadow-amber-500/20">
                          <Flame className="w-3.5 h-3.5" />
                          High Probability ({appearancePercentage}% Recurrence)
                        </span>
                      )}

                      {/* Recurrence count */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        Appeared in {cluster.frequency} / 4 Papers
                      </span>

                      {/* Unit badge */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        Unit {cluster.unit}: {UNIT_NAMES[cluster.unit]}
                      </span>

                      {/* Marks badge */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {cluster.marks} Marks (Part {cluster.marks === 2 ? "A" : "B/C"})
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : cluster.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition self-end sm:self-auto"
                    >
                      {isExpanded ? (
                        <>
                          Hide Solutions <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View All {cluster.appearances.length} Occurrences & Solutions <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title & Topic */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {cluster.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      Syllabus Topic: <span className="text-slate-700 dark:text-slate-300 font-semibold">{cluster.topic}</span>
                    </p>
                  </div>

                  {/* Description / Concept notes */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white">Core Concept: </strong>
                    {cluster.description}
                  </p>

                  {/* Appearances Chips */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Exact Papers & Question Numbers:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cluster.appearances.map((app, idx) => {
                        const qObj = questionLookup.get(`${app.paperId}-${app.questionNumber.toLowerCase()}`);
                        const paperName = PAPER_LABELS[app.paperId] || app.paperId;

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 transition"
                          >
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {paperName}
                            </span>
                            <span className="text-slate-400 dark:text-slate-600">•</span>
                            <span className="text-sky-600 dark:text-sky-400 font-bold">
                              Q.{app.questionNumber} (Part {app.part})
                            </span>
                            <Link
                              href={`/sem/${app.paperId}#${qObj ? qObj.id : ""}`}
                              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1"
                              title="Go to full question paper"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expanded View with Full Questions & Worked Solutions */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-sky-500" />
                          Questions & Worked Solutions for this Concept
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {cluster.appearances.map((app, idx) => {
                          const qObj = questionLookup.get(`${app.paperId}-${app.questionNumber.toLowerCase()}`);
                          const paperName = PAPER_LABELS[app.paperId] || app.paperId;

                          if (!qObj) {
                            return (
                              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500">
                                Question {app.questionNumber} from {paperName}
                              </div>
                            );
                          }

                          return (
                            <div key={qObj.id} className="space-y-2">
                              <div className="flex items-center justify-between text-xs px-1">
                                <span className="font-bold text-slate-600 dark:text-slate-300">
                                  From {paperName} – Part {qObj.part} (Q.{qObj.number})
                                </span>
                                <Link
                                  href={`/sem/${app.paperId}#${qObj.id}`}
                                  className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-medium"
                                >
                                  Open in Paper View <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                              <QuestionCard question={qObj} showAnswerDefault={true} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

