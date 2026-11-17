"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Question } from "@/lib/types";
import { QuestionCard } from "@/components/QuestionCard";
import { useIsClient } from "@/hooks/useIsClient";
import { useStoredIdList } from "@/hooks/useStoredIdList";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Filter,
  Search,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  BarChart3,
  RotateCcw,
} from "lucide-react";

interface TopicsClientProps {
  allQuestions: Array<Question & { paperTitle: string; examMonthYear?: string }>;
}

const UNIT_META: Record<
  number,
  { name: string; color: string; hoverColor: string; bgBadge: string; textBadge: string }
> = {
  1: {
    name: "Descriptive Statistics",
    color: "#10b981", // emerald
    hoverColor: "#059669",
    bgBadge: "bg-emerald-100 dark:bg-emerald-950/60",
    textBadge: "text-emerald-800 dark:text-emerald-300",
  },
  2: {
    name: "Large Sample Tests",
    color: "#6366f1", // indigo
    hoverColor: "#4f46e5",
    bgBadge: "bg-indigo-100 dark:bg-indigo-950/60",
    textBadge: "text-indigo-800 dark:text-indigo-300",
  },
  3: {
    name: "Small Sample Tests",
    color: "#a855f7", // purple
    hoverColor: "#9333ea",
    bgBadge: "bg-purple-100 dark:bg-purple-950/60",
    textBadge: "text-purple-800 dark:text-purple-300",
  },
  4: {
    name: "Design of Experiments",
    color: "#f59e0b", // amber
    hoverColor: "#d97706",
    bgBadge: "bg-amber-100 dark:bg-amber-950/60",
    textBadge: "text-amber-800 dark:text-amber-300",
  },
  5: {
    name: "Statistical Quality Control",
    color: "#f43f5e", // rose
    hoverColor: "#e11d48",
    bgBadge: "bg-rose-100 dark:bg-rose-950/60",
    textBadge: "text-rose-800 dark:text-rose-300",
  },
};

const PAPERS = [
  { id: "2024-dec-sem5-147184", label: "Dec 2024 (Sem 5)" },
  { id: "2025-may-sem5-405686", label: "May 2025 (Sem 5)" },
  { id: "2025-dec-sem6-133554", label: "Dec 2025 (Sem 6)" },
  { id: "2026-may-sem6-323580", label: "May 2026 (Sem 6)" },
];

export function TopicsClient({ allQuestions }: TopicsClientProps) {
  const mounted = useIsClient();
  const { ids: doneIds } = useStoredIdList(STORAGE_KEYS.done);

  // Filter States
  const [selectedUnit, setSelectedUnit] = useState<number | "ALL">("ALL");
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [selectedMarks, setSelectedMarks] = useState<number | "ALL">("ALL");
  const [selectedCo, setSelectedCo] = useState<number | "ALL">("ALL");
  const [selectedRbt, setSelectedRbt] = useState<number | "ALL">("ALL");
  const [selectedPaper, setSelectedPaper] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"questions" | "analytics">("questions");

  // Available topics for selected unit
  const availableTopics = useMemo(() => {
    if (selectedUnit === "ALL") {
      const allT = new Set<string>();
      allQuestions.forEach((q) => allT.add(q.topic));
      return Array.from(allT).sort();
    }
    const unitT = new Set<string>();
    allQuestions.filter((q) => q.unit === selectedUnit).forEach((q) => unitT.add(q.topic));
    return Array.from(unitT).sort();
  }, [allQuestions, selectedUnit]);

  // When unit changes, reset selectedTopic if it doesn't belong to the unit
  // (adjusting state during render rather than in an effect).
  if (selectedTopic !== "ALL" && !availableTopics.includes(selectedTopic)) {
    setSelectedTopic("ALL");
  }

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedUnit !== "ALL" && q.unit !== selectedUnit) return false;
      if (selectedTopic !== "ALL" && q.topic !== selectedTopic) return false;
      if (selectedMarks !== "ALL" && q.marks !== selectedMarks) return false;
      if (selectedCo !== "ALL" && q.co !== selectedCo) return false;
      if (selectedRbt !== "ALL" && q.rbt !== selectedRbt) return false;
      if (selectedPaper !== "ALL" && q.paperId !== selectedPaper) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesText = q.questionText.toLowerCase().includes(query);
        const matchesTopic = q.topic.toLowerCase().includes(query);
        const matchesTags = q.tags.some((t) => t.toLowerCase().includes(query));
        const matchesAnswer = q.answer.finalAnswer.toLowerCase().includes(query);
        if (!matchesText && !matchesTopic && !matchesTags && !matchesAnswer) return false;
      }
      return true;
    });
  }, [
    allQuestions,
    selectedUnit,
    selectedTopic,
    selectedMarks,
    selectedCo,
    selectedRbt,
    selectedPaper,
    searchQuery,
  ]);

  // Chart data calculations
  const unitStats = useMemo(() => {
    const data = [1, 2, 3, 4, 5].map((u) => {
      const uQuestions = allQuestions.filter((q) => q.unit === u);
      const totalMarks = uQuestions.reduce((acc, q) => acc + q.marks, 0);
      const totalQuestions = uQuestions.length;
      const completed = uQuestions.filter((q) => doneIds.includes(q.id)).length;
      const percent = totalQuestions > 0 ? Math.round((completed / totalQuestions) * 100) : 0;
      return {
        unit: `Unit ${u}`,
        unitNum: u,
        name: UNIT_META[u].name,
        questions: totalQuestions,
        marks: totalMarks,
        avgMarksPerExam: Math.round(totalMarks / 4), // across 4 SEM papers
        completed,
        percent,
        color: UNIT_META[u].color,
      };
    });
    return data;
  }, [allQuestions, doneIds]);

  const totalDone = allQuestions.filter((q) => doneIds.includes(q.id)).length;
  const overallPercent = allQuestions.length > 0 ? Math.round((totalDone / allQuestions.length) * 100) : 0;

  // Group filtered questions by Unit and Topic
  const groupedQuestions = useMemo(() => {
    const groups: Record<number, Record<string, typeof filteredQuestions>> = {};
    for (const q of filteredQuestions) {
      if (!groups[q.unit]) groups[q.unit] = {};
      if (!groups[q.unit][q.topic]) groups[q.unit][q.topic] = [];
      groups[q.unit][q.topic].push(q);
    }
    return groups;
  }, [filteredQuestions]);

  const resetFilters = () => {
    setSelectedUnit("ALL");
    setSelectedTopic("ALL");
    setSelectedMarks("ALL");
    setSelectedCo("ALL");
    setSelectedRbt("ALL");
    setSelectedPaper("ALL");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {/* View Switcher: Question Bank vs Analytics */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("questions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "questions"
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Question Bank ({filteredQuestions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "analytics"
                ? "bg-sky-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Unit Weightage & Progress</span>
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Revision Progress: <span className="text-sky-600 dark:text-sky-400">{totalDone} / {allQuestions.length}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {overallPercent}% Questions Solved
            </div>
          </div>
          <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Analytics & Weightage Section */}
      {activeTab === "analytics" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Marks Distribution Chart */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-500" />
                Unit Marks Weightage (Across 4 Papers)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Total marks allotted per unit across all 4 Anna University papers (~90 marks per unit total, ~22.5 marks per exam).
              </p>

              {mounted ? (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={unitStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <XAxis dataKey="unit" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                        formatter={(val: number) => [`${val} Marks`, "Total Marks"]}
                      />
                      <Bar dataKey="marks" radius={[6, 6, 0, 0]}>
                        {unitStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-xs text-slate-400">
                  Loading charts...
                </div>
              )}
            </div>

            {/* Questions Distribution Chart */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Total Questions Count per Unit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Breakdown of 124 questions distributed across the 5 course units (Part A 2M and Part B/C 10M).
              </p>

              {mounted ? (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={unitStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <XAxis dataKey="unit" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                        formatter={(val: number) => [`${val} Questions`, "Questions Count"]}
                      />
                      <Bar dataKey="questions" radius={[6, 6, 0, 0]}>
                        {unitStats.map((entry, index) => (
                          <Cell key={`cell-q-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-xs text-slate-400">
                  Loading charts...
                </div>
              )}
            </div>
          </div>

          {/* Unit Revision Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {unitStats.map((u) => (
              <div
                key={u.unitNum}
                onClick={() => {
                  setSelectedUnit(u.unitNum);
                  setActiveTab("questions");
                }}
                className="cursor-pointer group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-sky-500 dark:hover:border-sky-400 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${u.color}20`, color: u.color }}
                  >
                    Unit {u.unitNum}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{u.percent}%</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-sky-600 transition">
                  {u.name}
                </h4>
                <div className="text-[11px] text-slate-400 mt-1 mb-3">
                  {u.completed} / {u.questions} questions done
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${u.percent}%`, backgroundColor: u.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        {/* Row 1: Search & Expand/Collapse */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search in question text, formulas, tags (e.g., Bowley, ANOVA, Z-test, X-bar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandAll(!expandAll)}
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
              onClick={resetFilters}
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
              value={selectedMarks}
              onChange={(e) =>
                setSelectedMarks(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
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
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
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
              value={selectedCo}
              onChange={(e) =>
                setSelectedCo(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
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
              value={selectedRbt}
              onChange={(e) =>
                setSelectedRbt(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
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
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
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
            Found <strong className="text-slate-900 dark:text-white">{filteredQuestions.length}</strong> questions matching criteria
          </div>
          <div>
            Total Marks:{" "}
            <strong className="text-indigo-600 dark:text-indigo-400">
              {filteredQuestions.reduce((acc, q) => acc + q.marks, 0)} Marks
            </strong>
          </div>
        </div>
      </div>

      {/* Question List Grouped by Unit & Topic */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No questions match the current filters</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Try resetting your topic or RBT filters to see more questions.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedQuestions).map(([unitStr, topicMap]) => {
            const uNum = Number(unitStr);
            const uMeta = UNIT_META[uNum];

            return (
              <div key={uNum} className="space-y-6">
                {/* Unit Header Divider */}
                <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-200 dark:border-slate-800">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: uMeta.color }}
                  />
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Unit {uNum}: {uMeta.name}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    CO{uNum}
                  </span>
                </div>

                {/* Topics in this unit */}
                <div className="space-y-8">
                  {Object.entries(topicMap).map(([topicName, qList]) => (
                    <div key={topicName} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {topicName}
                          </h3>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {qList.length} {qList.length === 1 ? "question" : "questions"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {qList.map((q) => (
                          <div key={q.id} className="space-y-1">
                            <div className="text-[11px] text-slate-400 px-1 font-medium flex items-center justify-between">
                              <span>
                                {q.paperTitle} • Part {q.part} (Q.{q.number})
                              </span>
                              <Link
                                href={`/sem/${q.paperId}#${q.id}`}
                                className="text-sky-600 dark:text-sky-400 hover:underline"
                              >
                                View in paper
                              </Link>
                            </div>
                            <QuestionCard
                              question={q}
                              showAnswerDefault={expandAll}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

