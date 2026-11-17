import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { FatBrowserClient } from "@/components/FatBrowserClient";
import { DOCUMENT_WITH_LINKS_INCLUDE, serializeDocument } from "@/lib/serializeDocument";
import type { LinkedDocumentSummary } from "@/lib/documents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAT Materials | OM22001 Statistical Methods for Engineers",
  description:
    "Formative Assessment Tests (FAT 1, FAT 2, FAT 3) repository with dedicated subfolders for Question Papers, Answers, 2-Mark, and 10-Mark banks.",
};

export default async function FatPage() {
  let documents: LinkedDocumentSummary[] = [];

  try {
    const rows = await prisma.document.findMany({
      where: { category: "FAT" },
      include: DOCUMENT_WITH_LINKS_INCLUDE,
      orderBy: { createdAt: "desc" },
    });
    documents = rows.map(serializeDocument);
  } catch (error) {
    console.error("Failed to load FAT documents from database:", error);
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading FAT examination materials...</div>}>
      <FatBrowserClient initialDocuments={documents} />
    </Suspense>
  );
}
