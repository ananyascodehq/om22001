import React from "react";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    totalFiles,
    totalQuestionPapers,
    totalAnswers,
    totalStudyMaterials,
    fatCount,
    semCount,
    recentUploads,
  ] = await Promise.all([
    prisma.document.count(),
    prisma.document.count({ where: { documentType: "QUESTION_PAPER" } }),
    prisma.document.count({ where: { documentType: "ANSWER_KEY" } }),
    prisma.document.count({ where: { category: "STUDY_MATERIAL" } }),
    prisma.document.count({ where: { category: "FAT" } }),
    prisma.document.count({ where: { category: "SEMESTER" } }),
    prisma.document.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: { examination: true, unit: true },
    }),
  ]);

  const stats = {
    totalFiles,
    totalQuestionPapers,
    totalAnswers,
    totalStudyMaterials,
    fatCount,
    semCount,
  };

  // Serialize dates for client component
  const serializedRecentUploads = recentUploads.map((d) => ({
    id: d.id,
    originalFilename: d.originalFilename,
    category: d.category as any,
    subfolder: d.subfolder,
    documentType: d.documentType,
    fileType: d.fileType,
    fileSize: d.fileSize,
    createdAt: d.createdAt.toISOString(),
    examination: d.examination ? { code: d.examination.code, title: d.examination.title } : null,
    unit: d.unit ? { unitNumber: d.unit.unitNumber, title: d.unit.title } : null,
  }));

  return <DashboardClient stats={stats} recentUploads={serializedRecentUploads} />;
}
