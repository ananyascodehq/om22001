import React from "react";
import { prisma } from "@/lib/prisma";
import { AllDocumentsClient } from "@/components/documents/AllDocumentsClient";
import { serializeDocument } from "@/lib/serializeDocument";
import type { DocumentSummary } from "@/lib/documents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Academic Documents | OM22001 Repository",
  description: "Browse, filter, preview, and download all FAT, Semester, and Study Material files for OM22001.",
};

export default async function DocumentsPage() {
  let documents: DocumentSummary[] = [];

  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        examination: { select: { code: true, title: true } },
        unit: { select: { unitNumber: true, title: true } },
      },
    });
    documents = docs.map(serializeDocument);
  } catch (error) {
    console.error("Failed to load documents from database:", error);
  }

  return <AllDocumentsClient initialDocuments={documents} />;
}
