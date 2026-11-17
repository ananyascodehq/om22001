import React from "react";
import { Metadata } from "next";
import { getRepeatedQuestions, getAllQuestions } from "@/lib/data";
import { RepeatedQuestionsClient } from "@/components/RepeatedQuestionsClient";
import { Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Repeated Questions & Exam Trends | OM22001 Stats Hub",
  description:
    "Discover the most frequently repeated questions and high-probability exam concepts for OM22001 Statistical Methods for Engineers across Anna University semester examinations.",
};

export default function RepeatedQuestionsPage() {
  const repeated = getRepeatedQuestions();
  const allQuestions = getAllQuestions();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">Repeated Questions</span>
      </div>

      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Most Repeated Questions & High-Yield Concepts
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Cross-paper intelligence identifying questions and numerical patterns that recur across 4 Anna University SEM papers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Client Content */}
      <RepeatedQuestionsClient repeated={repeated} allQuestions={allQuestions} />
    </div>
  );
}

