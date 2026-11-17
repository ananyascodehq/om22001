import React from "react";
import { Metadata } from "next";
import { getAllQuestions, getSyllabus } from "@/lib/data";
import { TopicsClient } from "@/components/TopicsClient";
import { Layers } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Topic-wise Question Bank & Analytics | OM22001 Stats Hub",
  description:
    "Explore 124 categorized exam questions across all 5 units of OM22001 Statistical Methods for Engineers, filter by topic, marks, CO, and RBT level, and track your revision progress.",
};

export default function TopicsPage() {
  const allQuestions = getAllQuestions();
  const syllabus = getSyllabus();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">Topic-wise Question Bank</span>
      </div>

      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Topic-wise Question Bank
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Browse all 124 semester exam questions grouped by unit and syllabus topic, with unit weightage analytics and revision progress tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Main Client Content */}
      <TopicsClient allQuestions={allQuestions} syllabus={syllabus} />
    </div>
  );
}

