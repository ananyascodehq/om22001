import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteDocumentFile } from "@/lib/storage";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const document = await prisma.document.findUnique({
      where: { id },
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
        questions: {
          orderBy: { number: "asc" },
        },
      },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      document,
      associatedAnswers: document.answersFor.map((r) => r.answerDoc),
      associatedQuestionPapers: document.questionPaperFor.map((r) => r.questionPaper),
    });
  } catch (error) {
    console.error("Error retrieving document:", error);
    return NextResponse.json(
      { error: "Failed to retrieve document details" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      originalFilename,
      description,
      tags,
      unitId,
      documentType,
      isVerified,
      linkAnswerDocId,
      linkQuestionPaperId,
    } = body;

    const updated = await prisma.document.update({
      where: { id },
      data: {
        originalFilename: originalFilename || undefined,
        description: description !== undefined ? description : undefined,
        tags: tags !== undefined ? tags : undefined,
        unitId: unitId !== undefined ? unitId : undefined,
        documentType: documentType || undefined,
        isVerified: isVerified !== undefined ? isVerified : undefined,
      },
    });

    // Handle linking
    if (linkAnswerDocId) {
      await prisma.documentRelationship.create({
        data: {
          questionPaperId: id,
          answerDocId: linkAnswerDocId,
          relationshipType: "ANSWERS_TO",
        },
      });
    }

    if (linkQuestionPaperId) {
      await prisma.documentRelationship.create({
        data: {
          questionPaperId: linkQuestionPaperId,
          answerDocId: id,
          relationshipType: "ANSWERS_TO",
        },
      });
    }

    return NextResponse.json({
      success: true,
      document: updated,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: "Failed to update document" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const doc = await prisma.document.findUnique({
      where: { id },
    });

    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    await deleteDocumentFile(doc.storagePath);

    // Delete from database (cascade deletes relationships and questions)
    await prisma.document.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}

