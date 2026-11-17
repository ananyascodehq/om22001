import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { SemesterBrowserClient, type SemExam } from "@/components/papers/SemesterBrowserClient";
import { DOCUMENT_WITH_LINKS_INCLUDE, serializeDocument } from "@/lib/serializeDocument";
import type { LinkedDocumentSummary } from "@/lib/documents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Semester Examination PYQs | OM22001 Statistical Methods for Engineers",
  description:
    "Completely independent end-semester question paper archive for OM22001. Question papers and worked solutions stored separately by examination session.",
};

export default async function SemesterPage() {
  let examinations: SemExam[] = [];
  let documents: LinkedDocumentSummary[] = [];

  try {
    const [examRows, documentRows] = await Promise.all([
      prisma.examination.findMany({
        where: { type: "SEMESTER" },
        orderBy: { code: "asc" },
      }),
      prisma.document.findMany({
        where: { category: "SEMESTER" },
        include: DOCUMENT_WITH_LINKS_INCLUDE,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    examinations = examRows.map((e) => ({
      id: e.id,
      code: e.code,
      title: e.title,
      qCode: e.qCode,
      examDate: e.examDate,
      semester: e.semester,
    }));
    documents = documentRows.map(serializeDocument);
  } catch (error) {
    console.error("Failed to load semester documents from database:", error);
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading semester examination materials...</div>}>
      <SemesterBrowserClient initialExaminations={examinations} initialDocuments={documents} />
    </Suspense>
  );
}
