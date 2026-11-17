import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { SemesterBrowserClient } from "@/components/SemesterBrowserClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Semester Examination PYQs | OM22001 Statistical Methods for Engineers",
  description:
    "Completely independent end-semester question paper archive for OM22001. Question papers and worked solutions stored separately by examination session.",
};

export default async function SemesterPage() {
  const [examinations, documents] = await Promise.all([
    prisma.examination.findMany({
      where: { type: "SEMESTER" },
      orderBy: { code: "asc" },
    }),
    prisma.document.findMany({
      where: { category: "SEMESTER" },
      include: {
        examination: true,
        unit: true,
        answersFor: {
          include: {
            answerDoc: true,
          },
        },
        questionPaperFor: {
          include: {
            questionPaper: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const serializedExams = examinations.map((e) => ({
    id: e.id,
    code: e.code,
    title: e.title,
    qCode: e.qCode,
    examDate: e.examDate,
    semester: e.semester,
    documents: [],
  }));

  const serializedDocs = documents.map((d) => ({
    id: d.id,
    originalFilename: d.originalFilename,
    documentType: d.documentType,
    subfolder: d.subfolder,
    fileType: d.fileType,
    fileSize: d.fileSize,
    description: d.description,
    tags: d.tags,
    createdAt: d.createdAt.toISOString(),
    examination: d.examination
      ? { code: d.examination.code, title: d.examination.title }
      : null,
    unit: d.unit ? { unitNumber: d.unit.unitNumber, title: d.unit.title } : null,
    answersFor: d.answersFor.map((r) => ({
      answerDoc: {
        id: r.answerDoc.id,
        originalFilename: r.answerDoc.originalFilename,
      },
    })),
    questionPaperFor: d.questionPaperFor.map((r) => ({
      questionPaper: {
        id: r.questionPaper.id,
        originalFilename: r.questionPaper.originalFilename,
      },
    })),
  }));

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading semester examination materials...</div>}>
      <SemesterBrowserClient
        initialExaminations={serializedExams}
        initialDocuments={serializedDocs}
      />
    </Suspense>
  );
}

