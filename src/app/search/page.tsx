import React from "react";
import { Metadata } from "next";
import { getAllQuestions } from "@/lib/data";
import { SearchClient } from "@/components/SearchClient";
import { Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Question Search | OM22001 Stats Hub",
  description:
    "Fast client-side full-text search across all 124 examination questions, solutions, formulas, and syllabus topics for OM22001 Statistical Methods for Engineers.",
};

export default function SearchPage() {
  const allQuestions = getAllQuestions();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">Search Questions</span>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Search Question Bank
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Search any question, solution step, formula, or statistical concept across all Anna University papers.
            </p>
          </div>
        </div>
      </div>

      {/* Client Search */}
      <SearchClient allQuestions={allQuestions} />
    </div>
  );
}

