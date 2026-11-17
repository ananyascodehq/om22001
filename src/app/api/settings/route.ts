import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subject = await prisma.subject.findFirst({
      include: {
        units: {
          orderBy: { unitNumber: "asc" },
        },
      },
    });

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    const docCounts = await prisma.document.groupBy({
      by: ["category"],
      _count: true,
      _sum: { fileSize: true },
    });

    const physicalBytes = docCounts.reduce(
      (total, category) => total + (category._sum.fileSize || 0),
      0
    );

    return NextResponse.json({
      subject,
      stats: {
        totalDocuments: docCounts.reduce((acc: number, curr: { _count: number }) => acc + curr._count, 0),
        categoryCounts: docCounts.map((c: { category: string; _count: number; _sum: { fileSize: number | null } }) => ({
          category: c.category,
          count: c._count,
          sizeBytes: c._sum.fileSize || 0,
        })),
        physicalBytes,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body: {
      subjectId?: string;
      subjectData?: {
        name?: string;
        code?: string;
        regulation?: string;
        departments?: string;
      };
      units?: Array<{
        id?: string;
        title?: string;
        coNumber?: string;
        topics?: string | string[];
        description?: string | null;
      }>;
    } = await req.json();
    const { subjectId, subjectData, units } = body;

    if (!subjectId) {
      return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
    }

    if (subjectData) {
      await prisma.subject.update({
        where: { id: subjectId },
        data: {
          name: subjectData.name,
          code: subjectData.code,
          regulation: subjectData.regulation,
          departments: subjectData.departments,
        },
      });
    }

    if (Array.isArray(units)) {
      for (const u of units) {
        if (u.id) {
          await prisma.unit.update({
            where: { id: u.id },
            data: {
              title: u.title,
              coNumber: u.coNumber,
              topics: typeof u.topics === "string" ? u.topics : JSON.stringify(u.topics || []),
              description: u.description || null,
            },
          });
        }
      }
    }

    const updated = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        units: {
          orderBy: { unitNumber: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, subject: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
