import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { StudyMaterialsBrowserClient } from "@/components/study-materials/StudyMaterialsBrowserClient";
import { serializeDocument } from "@/lib/serializeDocument";
import type { DocumentSummary } from "@/lib/documents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Study Materials & Notes Archive | OM22001",
  description:
    "Organized study materials for OM22001 Statistical Methods for Engineers across all 5 units, formula sheets, reference tables, and concept cards.",
};

export default async function StudyMaterialsPage() {
  let documents: DocumentSummary[] = [];

  try {
    const rows = await prisma.document.findMany({
      where: { category: "STUDY_MATERIAL" },
      include: { unit: true },
      orderBy: { createdAt: "desc" },
    });
    documents = rows.map(serializeDocument);
  } catch (error) {
    console.error("Failed to load study materials from database:", error);
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading study materials...</div>}>
      <StudyMaterialsBrowserClient initialDocuments={documents} />
    </Suspense>
  );
}
