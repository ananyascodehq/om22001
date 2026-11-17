import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/prisma";
import {
  deleteDocumentFile,
  isValidStagingKey,
  readDocumentFile,
  saveDocumentFile,
} from "@/lib/storage";

export async function POST(request: NextRequest) {
  let finalStoragePath: string | null = null;

  try {
    const body = await request.json();
    const {
      stagingKey,
      originalFilename,
      category,
      examinationCode,
      documentType,
      subfolder,
      unitNumber,
      description,
      tags,
      questionPaperIdToLink,
    } = body;

    if (
      typeof stagingKey !== "string" ||
      !isValidStagingKey(stagingKey) ||
      typeof originalFilename !== "string" ||
      !originalFilename ||
      !category
    ) {
      return NextResponse.json(
        { error: "Missing or invalid document information" },
        { status: 400 }
      );
    }

    const fileBuffer = await readDocumentFile(stagingKey);
    if (!fileBuffer) {
      return NextResponse.json(
        { error: "Staged upload expired or not found. Please upload again." },
        { status: 404 }
      );
    }

    const fileSize = fileBuffer.length;
    const fileType = path.extname(originalFilename).toLowerCase().replace(".", "");
    const subject = await prisma.subject.findFirst({
      where: { code: "OM22001" },
    });

    if (!subject) {
      return NextResponse.json(
        { error: "Subject OM22001 not found" },
        { status: 404 }
      );
    }

    let examId: string | null = null;
    if (examinationCode && category !== "STUDY_MATERIAL") {
      let exam = await prisma.examination.findFirst({
        where: { subjectId: subject.id, code: examinationCode },
      });

      if (!exam && category === "SEMESTER") {
        exam = await prisma.examination.create({
          data: {
            subjectId: subject.id,
            type: "SEMESTER",
            code: examinationCode,
            title: examinationCode.replace(/_/g, " "),
            maxMarks: 100,
            duration: "3 Hours",
          },
        });
      }

      if (exam) examId = exam.id;
    }

    let unitId: string | null = null;
    if (unitNumber) {
      const unit = await prisma.unit.findFirst({
        where: { subjectId: subject.id, unitNumber: Number(unitNumber) },
      });
      if (unit) unitId = unit.id;
    }

    const cleanSubfolder = (subfolder || "General").replace(
      /[^a-zA-Z0-9_-]/g,
      "_"
    );
    const timestamp = Date.now();
    const safeStoredFilename = `${timestamp}-${originalFilename.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    )}`;
    let relativeStoragePath: string;

    if (category === "FAT") {
      relativeStoragePath = path.posix.join(
        "01_FAT",
        examinationCode || "FAT_1",
        cleanSubfolder,
        safeStoredFilename
      );
    } else if (category === "SEMESTER") {
      relativeStoragePath = path.posix.join(
        "02_SEMESTER",
        examinationCode || "SEM_PYQ_1",
        cleanSubfolder,
        safeStoredFilename
      );
    } else if (
      category === "FORMULA_SHEET" ||
      cleanSubfolder.toLowerCase().includes("formula")
    ) {
      relativeStoragePath = path.posix.join(
        "FORMULA_SHEETS",
        unitNumber ? `Unit_${unitNumber}` : "General",
        safeStoredFilename
      );
    } else {
      relativeStoragePath = path.posix.join(
        "STUDY_MATERIALS",
        cleanSubfolder,
        safeStoredFilename
      );
    }

    const storedFile = await saveDocumentFile(fileBuffer, relativeStoragePath);
    finalStoragePath = storedFile.storagePath;

    const document = await prisma.$transaction(async (transaction) => {
      const createdDocument = await transaction.document.create({
        data: {
          subjectId: subject.id,
          category,
          examinationId: examId,
          unitId,
          subfolder: cleanSubfolder,
          documentType: documentType || "NOTES",
          originalFilename,
          storedFilename: safeStoredFilename,
          storagePath: storedFile.storagePath,
          fileType,
          fileSize,
          description: description || null,
          tags: tags || null,
          classificationStatus: "CONFIRMED",
          isVerified: true,
        },
        include: {
          examination: true,
          unit: true,
        },
      });

      if (questionPaperIdToLink && createdDocument.documentType === "ANSWER_KEY") {
        await transaction.documentRelationship.create({
          data: {
            questionPaperId: questionPaperIdToLink,
            answerDocId: createdDocument.id,
            relationshipType: "ANSWERS_TO",
          },
        });
      }

      await transaction.uploadHistory.create({
        data: {
          filename: originalFilename,
          fileSize,
          detectedCategory: category,
          status: "SUCCESS",
          details: `Stored in ${relativeStoragePath}`,
        },
      });

      return createdDocument;
    });

    try {
      await deleteDocumentFile(stagingKey);
    } catch (cleanupError) {
      console.error("Could not remove confirmed staging blob:", cleanupError);
    }

    return NextResponse.json({ success: true, document });
  } catch (error) {
    if (finalStoragePath) {
      try {
        await deleteDocumentFile(finalStoragePath);
      } catch (cleanupError) {
        console.error("Could not remove incomplete document blob:", cleanupError);
      }
    }
    console.error("Confirmation error:", error);
    return NextResponse.json(
      { error: "Failed to confirm and save document" },
      { status: 500 }
    );
  }
}
