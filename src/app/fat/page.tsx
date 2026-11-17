import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { FatBrowserClient } from "@/components/FatBrowserClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAT Materials | OM22001 Statistical Methods for Engineers",
  description:
    "Formative Assessment Tests (FAT 1, FAT 2, FAT 3) repository with dedicated subfolders for Question Papers, Answers, 2-Mark, and 10-Mark banks.",
};

export default async function FatPage() {
  const documents = await prisma.document.findMany({
    where: {
      category: "FAT",
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

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
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading FAT examination materials...</div>}>
      <FatBrowserClient initialDocuments={serializedDocs} />
    </Suspense>
  );
}
