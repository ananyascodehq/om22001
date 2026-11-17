import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { StudyMaterialsBrowserClient } from "@/components/StudyMaterialsBrowserClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Study Materials & Notes Archive | OM22001",
  description:
    "Organized study materials for OM22001 Statistical Methods for Engineers across all 5 units, formula sheets, reference tables, and concept cards.",
};

export default async function StudyMaterialsPage() {
  let serializedDocs: Array<{
    id: string;
    originalFilename: string;
    subfolder: string;
    documentType: string;
    fileType: string;
    fileSize: number;
    description: string | null;
    tags: string | null;
    createdAt: string;
    unit: { unitNumber: number; title: string } | null;
  }> = [];

  try {
    const documents = await prisma.document.findMany({
      where: {
        category: "STUDY_MATERIAL",
      },
      include: {
        unit: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    serializedDocs = documents.map((d) => ({
      id: d.id,
      originalFilename: d.originalFilename,
      subfolder: d.subfolder,
      documentType: d.documentType,
      fileType: d.fileType,
      fileSize: d.fileSize,
      description: d.description,
      tags: d.tags,
      createdAt: d.createdAt.toISOString(),
      unit: d.unit ? { unitNumber: d.unit.unitNumber, title: d.unit.title } : null,
    }));
  } catch (error) {
    console.error("Failed to load study materials from database:", error);
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading study materials...</div>}>
      <StudyMaterialsBrowserClient initialDocuments={serializedDocs} />
    </Suspense>
  );
}

