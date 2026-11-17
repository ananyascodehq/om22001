import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const [
      totalFiles,
      totalQuestionPapers,
      totalAnswers,
      totalStudyMaterials,
      fatCount,
      semCount,
      recentUploads,
      examinations,
      units,
    ] = await Promise.all([
      prisma.document.count(),
      prisma.document.count({ where: { documentType: "QUESTION_PAPER" } }),
      prisma.document.count({ where: { documentType: "ANSWER_KEY" } }),
      prisma.document.count({ where: { category: "STUDY_MATERIAL" } }),
      prisma.document.count({ where: { category: "FAT" } }),
      prisma.document.count({ where: { category: "SEMESTER" } }),
      prisma.document.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { examination: true, unit: true },
      }),
      prisma.examination.findMany({
        include: {
          _count: {
            select: { documents: true },
          },
        },
      }),
      prisma.unit.findMany({
        include: {
          _count: {
            select: { documents: true, questions: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalFiles,
        totalQuestionPapers,
        totalAnswers,
        totalStudyMaterials,
        fatCount,
        semCount,
        recentUploads,
        examinations,
        units,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}

