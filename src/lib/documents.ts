/**
 * Document shapes shared by server pages and client components, plus small
 * formatting helpers. Safe to import from both server and client code.
 */

export type DocumentCategory = "FAT" | "SEMESTER" | "STUDY_MATERIAL";

export interface DocumentSummary {
  id: string;
  originalFilename: string;
  category: DocumentCategory;
  subfolder: string;
  documentType: string;
  fileType: string;
  fileSize: number;
  description?: string | null;
  tags?: string | null;
  createdAt: string;
  examination?: { code: string; title: string } | null;
  unit?: { unitNumber: number; title: string } | null;
}

/** A document plus the question paper <-> answer links used by the paper browsers. */
export interface LinkedDocumentSummary extends DocumentSummary {
  answersFor: Array<{ answerDoc: { id: string; originalFilename: string } }>;
  questionPaperFor: Array<{ questionPaper: { id: string; originalFilename: string } }>;
}

/** Fields the PATCH /api/documents/[id] endpoint lets the UI change. */
export interface DocumentPatch {
  originalFilename?: string;
  description?: string;
  tags?: string;
}

/** "12.3 KB" - used in document cards. */
export function formatFileSize(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/** "1.5 MB" - picks the unit automatically, used for storage totals. */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
