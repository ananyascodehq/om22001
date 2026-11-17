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

  const serializedDocs = documents.map((d) => ({
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

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading study materials...</div>}>
      <StudyMaterialsBrowserClient initialDocuments={serializedDocs} />
    </Suspense>
  );
}

