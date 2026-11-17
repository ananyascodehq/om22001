"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UploadModal } from "@/components/UploadModal";
import {
  Upload,
  FileText,
  Folder,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function UploadPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-sky-600 transition">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">Upload Materials</span>
      </div>

      {/* Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-xl shadow-sky-600/10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Smart Document Intake
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Upload & Categorize Academic Materials
        </h1>
        <p className="text-sm text-sky-100 max-w-xl leading-relaxed">
          Drop question papers, worked answer solutions, unit lecture notes, formula sheets, or statistical tables. Our local engine analyzes document text and assists with intelligent folder placement.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-sky-50 transition shadow-lg flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-sky-600" />
            <span>Open Upload Wizard</span>
          </button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 w-fit">
            <Folder className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Strict Isolation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            FAT, Semester, and Subject Study Materials are filed into separate designated folders and never intermixed.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Auto-Classification</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Extracts headers, examination patterns, marks allocation, and syllabus keywords to propose folder suggestions.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Manual Verification</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every classification requires your confirmation. Files are never silently misplaced into incorrect folders.
          </p>
        </div>
      </div>

      <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

