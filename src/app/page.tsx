import React from "react";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let stats = {
    totalFiles: 26,
    totalQuestionPapers: 7,
    totalAnswers: 7,
    totalStudyMaterials: 18,
    fatCount: 3,
    semCount: 4,
  };

  let serializedRecentUploads: Array<{
    id: string;
    originalFilename: string;
    category: any;
    subfolder: string;
    documentType: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
    examination: { code: string; title: string } | null;
    unit: { unitNumber: number; title: string } | null;
  }> = [];

  try {
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

    stats = {
      totalFiles,
      totalQuestionPapers,
      totalAnswers,
      totalStudyMaterials,
      fatCount,
      semCount,
    };

    serializedRecentUploads = recentUploads.map((d) => ({
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
  } catch (error) {
    console.error("Dashboard database fetch error, using fallback stats:", error);
  }

  return <DashboardClient stats={stats} recentUploads={serializedRecentUploads} />;
}
