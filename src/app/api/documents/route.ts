import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const examinationCode = searchParams.get("examinationCode");
    const unitNumber = searchParams.get("unitNumber");
    const documentType = searchParams.get("documentType");
    const subfolder = searchParams.get("subfolder");
    const search = searchParams.get("search");

    const where: Prisma.DocumentWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (examinationCode) {
      where.examination = {
        code: examinationCode,
      };
    }

    if (unitNumber) {
      where.unit = {
        unitNumber: Number(unitNumber),
      };
    }

    if (documentType) {
      where.documentType = documentType;
    }

    if (subfolder) {
      where.subfolder = subfolder;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { originalFilename: { contains: q } },
        { description: { contains: q } },
        { tags: { contains: q } },
        { ocrText: { contains: q } },
      ];
    }

    const documents = await prisma.document.findMany({
      where,
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

    return NextResponse.json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to retrieve documents" },
      { status: 500 }
    );
  }
}
