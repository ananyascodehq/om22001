"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Question } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { 
  Search, 
  X, 
  Filter, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

interface SearchClientProps {
  allQuestions: Array<Question & { paperTitle: string; examMonthYear?: string }>;
}

const UNIT_NAMES: Record<number, string> = {
  1: "Descriptive Statistics",
  2: "Large Sample Tests",
  3: "Small Sample Tests",
  4: "Design of Experiments",
  5: "Statistical Quality Control",
};

export function SearchClient({ allQuestions }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<number | "ALL">("ALL");
  const [selectedMarks, setSelectedMarks] = useState<number | "ALL">("ALL");
  const [selectedPaper, setSelectedPaper] = useState<string>("ALL");
  const [expandAll, setExpandAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Setup Fuse.js index
  const fuse = useMemo(() => {
    return new Fuse(allQuestions, {
      keys: [
        { name: "questionText", weight: 0.4 },
        { name: "topic", weight: 0.25 },
        { name: "tags", weight: 0.15 },
        { name: "answer.finalAnswer", weight: 0.1 },
        { name: "answer.steps", weight: 0.05 },
        { name: "number", weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [allQuestions]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter & Search results
  const searchResults = useMemo(() => {
    let list: Array<Question & { paperTitle: string; examMonthYear?: string }> = allQuestions;

    if (query.trim()) {
      const results = fuse.search(query.trim());
      list = results.map((r) => r.item);
    }

    return list.filter((q) => {
      if (selectedUnit !== "ALL" && q.unit !== selectedUnit) return false;
      if (selectedMarks !== "ALL" && q.marks !== selectedMarks) return false;
      if (selectedPaper !== "ALL" && q.paperId !== selectedPaper) return false;
      return true;
    });
  }, [allQuestions, fuse, query, selectedUnit, selectedMarks, selectedPaper]);

  // Suggestion tags for one-click search
  const SUGGESTED_QUERIES = [
    "ANOVA",
    "Latin Square",
    "Z-test",
    "t-test",
    "Chi-square",
    "p-chart",
    "X-bar chart",
    "Bowley Skewness",
    "Process capability",
    "Contingency table",
  ];

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <div role="search" aria-label="Search question bank" className="relative rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus-within:border-sky-500 dark:focus-within:border-sky-400 p-2 shadow-sm transition-all">
        <div className="flex items-center gap-3 px-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search questions, formulas, and topics"
            aria-keyshortcuts="Control+K Meta+K"
            placeholder="Search questions, formulas, topics (e.g. 'Type I error', 'ANOVA table', 'critical region')..."
            className="w-full py-2.5 text-base sm:text-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
          <div aria-hidden="true" className="hidden sm:flex items-center text-[10px] font-semibold text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800">
            <span>Ctrl / ⌘ K</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Searches */}
        <div className="pt-2 px-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Popular:
          </span>
          {SUGGESTED_QUERIES.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950/50 dark:hover:text-sky-300 text-slate-600 dark:text-slate-300 font-medium transition text-xs"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between text-xs">
        {/* Units */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Unit:
          </span>
          <button
            onClick={() => setSelectedUnit("ALL")}
            aria-pressed={selectedUnit === "ALL"}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedUnit === "ALL"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            All
          </button>
          {[1, 2, 3, 4, 5].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              aria-pressed={selectedUnit === u}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedUnit === u
                  ? "bg-sky-600 text-white dark:bg-sky-500"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              U{u}
            </button>
          ))}
        </div>

        {/* Marks and Paper Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedMarks}
            aria-label="Filter by mark value"
            onChange={(e) =>
              setSelectedMarks(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
            }
            className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2.5 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All Marks</option>
            <option value={2}>2 Marks (Part A)</option>
            <option value={10}>10 Marks (Part B & C)</option>
          </select>

          <select
            value={selectedPaper}
            aria-label="Filter by examination paper"
            onChange={(e) => setSelectedPaper(e.target.value)}
            className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2.5 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All 4 Papers</option>
            <option value="2024-dec-sem5-147184">Dec 2024 (Sem 5)</option>
            <option value="2025-may-sem5-405686">May 2025 (Sem 5)</option>
            <option value="2025-dec-sem6-133554">Dec 2025 (Sem 6)</option>
            <option value="2026-may-sem6-323580">May 2026 (Sem 6)</option>
          </select>

          <button
            onClick={() => setExpandAll(!expandAll)}
            aria-expanded={expandAll}
            aria-label={expandAll ? "Collapse all answers" : "Expand all answers"}
            className="px-3 py-1.5 rounded-lg font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1"
          >
            {expandAll ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Expand
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Header Count */}
      <div role="status" aria-live="polite" aria-atomic="true" className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{searchResults.length}</strong>{" "}
          of {allQuestions.length} questions
          {query && (
            <span>
              {" "}
              matching &quot;<span className="text-sky-600 dark:text-sky-400 font-semibold">{query}</span>&quot;
            </span>
          )}
        </span>
        {(query || selectedUnit !== "ALL" || selectedMarks !== "ALL" || selectedPaper !== "ALL") && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedUnit("ALL");
              setSelectedMarks("ALL");
              setSelectedPaper("ALL");
            }}
            className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results List */}
      {searchResults.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No questions matched your search
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Try searching for related keywords like &quot;chi-square&quot;, &quot;ANOVA&quot;, &quot;skewness&quot;, or clearing the unit filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((q) => (
            <div key={q.id} className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
                <span>
                  {q.paperTitle} • Part {q.part} (Q.{q.number}) • Unit {q.unit}: {UNIT_NAMES[q.unit]}
                </span>
                <Link
                  href={`/sem/${q.paperId}#${q.id}`}
                  className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  View in Paper <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <QuestionCard question={q} showAnswerDefault={expandAll} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

