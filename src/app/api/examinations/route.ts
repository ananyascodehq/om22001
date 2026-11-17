import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "FAT" or "SEMESTER"

    const where: Prisma.ExaminationWhereInput = {};
    if (type) {
      where.type = type.toUpperCase();
    }

    const examinations = await prisma.examination.findMany({
      where,
      orderBy: { code: "asc" },
      include: {
        documents: {
          select: {
            id: true,
            originalFilename: true,
            documentType: true,
            subfolder: true,
            fileType: true,
            fileSize: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      examinations,
    });
  } catch (error) {
    console.error("Error fetching examinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch examinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, qCode, semester, code, type = "SEMESTER" } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Examination title is required" },
        { status: 400 }
      );
    }

    // Find Subject OM22001
    const subject = await prisma.subject.findFirst({
      where: { code: "OM22001" },
    });

    if (!subject) {
      return NextResponse.json(
        { error: "Subject OM22001 not found" },
        { status: 404 }
      );
    }

    // Generate code if not supplied
    let examCode = code;
    if (!examCode) {
      const existing = await prisma.examination.count({
        where: { subjectId: subject.id, type },
      });
      examCode = type === "SEMESTER" ? `SEM_PYQ_${existing + 1}` : `FAT_${existing + 1}`;
    }

    // Check for duplicate code
    const existingExam = await prisma.examination.findFirst({
      where: { subjectId: subject.id, code: examCode },
    });

    if (existingExam) {
      return NextResponse.json(
        { error: `Examination with code "${examCode}" already exists` },
        { status: 409 }
      );
    }

    const newExam = await prisma.examination.create({
      data: {
        subjectId: subject.id,
        type,
        code: examCode,
        title: title.trim(),
        qCode: qCode?.trim() || null,
        semester: semester ? Number(semester) : 6,
        duration: "3 Hours",
        maxMarks: type === "SEMESTER" ? 100 : 50,
      },
      include: {
        documents: true,
      },
    });

    return NextResponse.json({
      success: true,
      examination: newExam,
    });
  } catch (error) {
    console.error("Error creating examination:", error);
    return NextResponse.json(
      { error: "Failed to create examination" },
      { status: 500 }
    );
  }
}

