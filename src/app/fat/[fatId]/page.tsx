import React from "react";
import { notFound } from "next/navigation";
import { getAllFatPapers, getFatPaperById } from "@/lib/data";
import { PaperViewClient } from "@/components/PaperViewClient";
import Link from "next/link";
import {
  ChevronRight,
  FileQuestion,
  UploadCloud,
  Code,
  Download,
  BookOpen
} from "lucide-react";

interface PageProps {
  params: Promise<{ fatId: string }>;
}

export async function generateStaticParams() {
  const fatPapers = getAllFatPapers();
  return fatPapers.map((p) => ({
    fatId: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { fatId } = await params;
  const paper = getFatPaperById(fatId);
  if (!paper) return { title: "FAT Assessment Not Found" };

  return {
    title: `${paper.title} | OM22001 Statistical Methods for Engineers`,
    description: `Formative Assessment Test questions and solutions for ${paper.title}.`,
  };
}

export default async function FatPaperPage({ params }: PageProps) {
  const { fatId } = await params;
  const paper = getFatPaperById(fatId);
  if (!paper) {
    notFound();
  }

  // If questions exist, render standard PaperViewClient
  if (paper.questions && paper.questions.length > 0) {
    return <PaperViewClient paper={paper} />;
  }

  // Friendly, intentional, polished empty state
  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/fat" className="hover:text-primary-600 transition-colors">
          FAT Assessments
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-900 dark:text-slate-200">
          {paper.id.toUpperCase()}
        </span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Formative Assessment Test {paper.testNumber || 1}
          </span>

          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Question Paper PDF</span>
            </a>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {paper.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Units Covered: {paper.unitsCovered?.join(", ") || "1, 2"} • Time: {paper.duration || "90 Minutes"} • Max Marks: {paper.maxMarks || 50}
          </p>
        </div>
      </div>

      {/* Polished Empty State Box */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Question Paper Not Added Yet
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            This FAT assessment placeholder is pre-configured. As soon as your internal exam questions are available, you can add them without altering any UI code.
          </p>
        </div>

        {/* Instructions */}
        <div className="max-w-lg mx-auto text-left rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
            <UploadCloud className="w-4 h-4 text-primary-500" />
            How to add questions to this paper:
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400 leading-relaxed">
            <li>
              Open <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">content/fat/{paper.id}.json</code>
            </li>
            <li>
              Add question objects to the <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border">&quot;questions&quot;: [...]</code> array following the standard schema.
            </li>
            <li>
              Optional: Place the original question PDF at <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border">public/papers/fat/{paper.id}/question-paper.pdf</code>
            </li>
            <li>
              Questions will immediately render here with step-by-step solutions!
            </li>
          </ol>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/admin/import"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Use Admin Import Helper</span>
          </Link>
          <Link
            href="/sem"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Available SEM Papers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

