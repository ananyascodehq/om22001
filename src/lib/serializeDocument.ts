import type { Document, Examination, Unit } from "@prisma/client";
import type { DocumentCategory, LinkedDocumentSummary } from "./documents";

/** A Prisma Document row with any of the relations the pages commonly include. */
export type SerializableDocument = Document & {
  examination?: Pick<Examination, "code" | "title"> | null;
  unit?: Pick<Unit, "unitNumber" | "title"> | null;
  answersFor?: Array<{ answerDoc: Pick<Document, "id" | "originalFilename"> }>;
  questionPaperFor?: Array<{ questionPaper: Pick<Document, "id" | "originalFilename"> }>;
};

/**
 * Converts a Prisma document (with optional relations) into the plain,
 * JSON-safe shape passed from server pages to client components.
 */
export function serializeDocument(d: SerializableDocument): LinkedDocumentSummary {
  return {
    id: d.id,
    originalFilename: d.originalFilename,
    category: d.category as DocumentCategory,
    subfolder: d.subfolder,
    documentType: d.documentType,
    fileType: d.fileType,
    fileSize: d.fileSize,
    description: d.description,
    tags: d.tags,
    createdAt: d.createdAt.toISOString(),
    examination: d.examination ? { code: d.examination.code, title: d.examination.title } : null,
    unit: d.unit ? { unitNumber: d.unit.unitNumber, title: d.unit.title } : null,
    answersFor: (d.answersFor ?? []).map((r) => ({
      answerDoc: { id: r.answerDoc.id, originalFilename: r.answerDoc.originalFilename },
    })),
    questionPaperFor: (d.questionPaperFor ?? []).map((r) => ({
      questionPaper: {
        id: r.questionPaper.id,
        originalFilename: r.questionPaper.originalFilename,
      },
    })),
  };
}

/** Include clause that loads everything serializeDocument understands. */
export const DOCUMENT_WITH_LINKS_INCLUDE = {
  examination: true,
  unit: true,
  answersFor: { include: { answerDoc: true } },
  questionPaperFor: { include: { questionPaper: true } },
} as const;
