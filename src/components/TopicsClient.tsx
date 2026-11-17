"use client";

import React, { useState, useMemo } from "react";
import { BookOpen, BarChart3 } from "lucide-react";
import { useStoredIdList } from "@/hooks/useStoredIdList";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { TopicsAnalytics } from "./topics/TopicsAnalytics";
import { TopicsFilterBar } from "./topics/TopicsFilterBar";
import { TopicQuestionList } from "./topics/TopicQuestionList";
import { UNIT_META } from "./topics/unitMeta";
import {
  DEFAULT_FILTERS,
  type TopicFilters,
  type TopicQuestion,
  type UnitStat,
} from "./topics/types";

interface TopicsClientProps {
  allQuestions: TopicQuestion[];
}

const UNIT_NUMBERS = [1, 2, 3, 4, 5];

export function TopicsClient({ allQuestions }: TopicsClientProps) {
  const { ids: doneIds } = useStoredIdList(STORAGE_KEYS.done);

  const [filters, setFilters] = useState<TopicFilters>(DEFAULT_FILTERS);
  const [expandAll, setExpandAll] = useState(false);
  const [activeTab, setActiveTab] = useState<"questions" | "analytics">("questions");

  const updateFilters = (patch: Partial<TopicFilters>) =>
    setFilters((current) => ({ ...current, ...patch }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Topics available for the selected unit
  const availableTopics = useMemo(() => {
    const pool =
      filters.unit === "ALL" ? allQuestions : allQuestions.filter((q) => q.unit === filters.unit);
    return Array.from(new Set(pool.map((q) => q.topic))).sort();
  }, [allQuestions, filters.unit]);

  // When the unit changes, reset the topic if it doesn't belong to it
  // (adjusting state during render rather than in an effect).
  if (filters.topic !== "ALL" && !availableTopics.includes(filters.topic)) {
    updateFilters({ topic: "ALL" });
  }

  const filteredQuestions = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return allQuestions.filter((q) => {
      if (filters.unit !== "ALL" && q.unit !== filters.unit) return false;
      if (filters.topic !== "ALL" && q.topic !== filters.topic) return false;
      if (filters.marks !== "ALL" && q.marks !== filters.marks) return false;
      if (filters.co !== "ALL" && q.co !== filters.co) return false;
      if (filters.rbt !== "ALL" && q.rbt !== filters.rbt) return false;
      if (filters.paper !== "ALL" && q.paperId !== filters.paper) return false;
      if (query) {
        const matches =
          q.questionText.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query) ||
          q.tags.some((t) => t.toLowerCase().includes(query)) ||
          q.answer.finalAnswer.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [allQuestions, filters]);

  const totalMarks = useMemo(
    () => filteredQuestions.reduce((sum, q) => sum + q.marks, 0),
    [filteredQuestions]
  );

  const unitStats = useMemo<UnitStat[]>(
    () =>
      UNIT_NUMBERS.map((u) => {
        const uQuestions = allQuestions.filter((q) => q.unit === u);
        const marks = uQuestions.reduce((sum, q) => sum + q.marks, 0);
        const completed = uQuestions.filter((q) => doneIds.includes(q.id)).length;
        return {
          unit: `Unit ${u}`,
          unitNum: u,
          name: UNIT_META[u].name,
          questions: uQuestions.length,
          marks,
          avgMarksPerExam: Math.round(marks / 4), // across 4 SEM papers
          completed,
          percent: uQuestions.length > 0 ? Math.round((completed / uQuestions.length) * 100) : 0,
          color: UNIT_META[u].color,
        };
      }),
    [allQuestions, doneIds]
  );

  const totalDone = allQuestions.filter((q) => doneIds.includes(q.id)).length;
  const overallPercent =
    allQuestions.length > 0 ? Math.round((totalDone / allQuestions.length) * 100) : 0;

  const tabClass = (active: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
      active
        ? "bg-sky-600 text-white shadow-sm"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="space-y-8">
      {/* View Switcher: Question Bank vs Analytics */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab("questions")} className={tabClass(activeTab === "questions")}>
            <BookOpen className="w-4 h-4" />
            <span>Question Bank ({filteredQuestions.length})</span>
          </button>
          <button onClick={() => setActiveTab("analytics")} className={tabClass(activeTab === "analytics")}>
            <BarChart3 className="w-4 h-4" />
            <span>Unit Weightage & Progress</span>
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Revision Progress:{" "}
              <span className="text-sky-600 dark:text-sky-400">
                {totalDone} / {allQuestions.length}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">{overallPercent}% Questions Solved</div>
          </div>
          <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {activeTab === "analytics" && (
        <TopicsAnalytics
          unitStats={unitStats}
          onSelectUnit={(unit) => {
            updateFilters({ unit });
            setActiveTab("questions");
          }}
        />
      )}

      <TopicsFilterBar
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        availableTopics={availableTopics}
        expandAll={expandAll}
        onToggleExpandAll={() => setExpandAll((v) => !v)}
        matchCount={filteredQuestions.length}
        totalMarks={totalMarks}
      />

      <TopicQuestionList
        questions={filteredQuestions}
        expandAll={expandAll}
        onReset={resetFilters}
      />
    </div>
  );
}
