"use client";

import React from "react";
import { Filter, Search, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { PAPERS, UNIT_META } from "./unitMeta";
import type { TopicFilters } from "./types";

interface TopicsFilterBarProps {
  filters: TopicFilters;
  onChange: (patch: Partial<TopicFilters>) => void;
  onReset: () => void;
  availableTopics: string[];
  expandAll: boolean;
  onToggleExpandAll: () => void;
  /** Number of questions matching the current filters. */
  matchCount: number;
  /** Sum of marks of the matching questions. */
  totalMarks: number;
}

/** Search box, unit pills and dropdown filters for the question bank. */
export function TopicsFilterBar({
  filters,
  onChange,
  onReset,
  availableTopics,
  expandAll,
  onToggleExpandAll,
  matchCount,
  totalMarks,
}: TopicsFilterBarProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Row 1: Search & Expand/Collapse */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search in question text, formulas, tags (e.g., Bowley, ANOVA, Z-test, X-bar)..."
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleExpandAll}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            {expandAll ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Collapse Answers
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Expand All Answers
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition flex items-center gap-1"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Row 2: Unit Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Unit:
        </span>
        <button
          onClick={() => onChange({ unit: "ALL" })}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            filters.unit === "ALL"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          All Units
        </button>
        {[1, 2, 3, 4, 5].map((u) => (
          <button
            key={u}
            onClick={() => onChange({ unit: u })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filters.unit === u
                ? "bg-sky-600 text-white dark:bg-sky-500 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Unit {u}: {UNIT_META[u].name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Row 3: Dropdown Filters for Marks, Topic, CO, RBT, Paper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-2">
        {/* Marks */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Marks</label>
          <select
            value={filters.marks}
            onChange={(e) =>
              onChange({ marks: e.target.value === "ALL" ? "ALL" : Number(e.target.value) })
            }
            className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All Marks</option>
            <option value={2}>2 Marks (Part A)</option>
            <option value={10}>10 Marks (Part B & C)</option>
          </select>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Topic</label>
          <select
            value={filters.topic}
            onChange={(e) => onChange({ topic: e.target.value })}
            className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All Topics ({availableTopics.length})</option>
            {availableTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* CO */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">CO (Course Outcome)</label>
          <select
            value={filters.co}
            onChange={(e) =>
              onChange({ co: e.target.value === "ALL" ? "ALL" : Number(e.target.value) })
            }
            className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All COs</option>
            <option value={1}>CO1 (Unit 1)</option>
            <option value={2}>CO2 (Unit 2)</option>
            <option value={3}>CO3 (Unit 3)</option>
            <option value={4}>CO4 (Unit 4)</option>
            <option value={5}>CO5 (Unit 5)</option>
          </select>
        </div>

        {/* RBT Level */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Bloom&apos;s Level (RBT)</label>
          <select
            value={filters.rbt}
            onChange={(e) =>
              onChange({ rbt: e.target.value === "ALL" ? "ALL" : Number(e.target.value) })
            }
            className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All Levels</option>
            <option value={1}>L1: Remember</option>
            <option value={2}>L2: Understand</option>
            <option value={3}>L3: Apply</option>
            <option value={4}>L4: Analyze</option>
          </select>
        </div>

        {/* Paper */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Exam Paper</label>
          <select
            value={filters.paper}
            onChange={(e) => onChange({ paper: e.target.value })}
            className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1.5 px-2 focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All 4 Papers</option>
            {PAPERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results summary line */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <div>
          Found <strong className="text-slate-900 dark:text-white">{matchCount}</strong> questions matching criteria
        </div>
        <div>
          Total Marks:{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            {totalMarks} Marks
          </strong>
        </div>
      </div>
    </div>
  );
}
