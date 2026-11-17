"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { QuestionCard } from "@/components/papers/QuestionCard";
import { UNIT_META } from "@/components/papers/topics/unitMeta";
import type { TopicQuestion } from "@/components/papers/topics/types";

interface TopicQuestionListProps {
  questions: TopicQuestion[];
  expandAll: boolean;
  onReset: () => void;
}

/** Questions grouped by unit, then by topic, with an empty state. */
export function TopicQuestionList({ questions, expandAll, onReset }: TopicQuestionListProps) {
  const groupedQuestions = useMemo(() => {
    const groups: Record<number, Record<string, TopicQuestion[]>> = {};
    for (const q of questions) {
      if (!groups[q.unit]) groups[q.unit] = {};
      if (!groups[q.unit][q.topic]) groups[q.unit][q.topic] = [];
      groups[q.unit][q.topic].push(q);
    }
    return groups;
  }, [questions]);

  return (
    <>
    {questions.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No questions match the current filters</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Try resetting your topic or RBT filters to see more questions.
        </p>
        <button
          onClick={onReset}
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
    </>
  );
}
