import React from "react";
import { prisma } from "@/lib/prisma";
import { AllDocumentsClient } from "@/components/AllDocumentsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Academic Documents | OM22001 Repository",
  description: "Browse, filter, preview, and download all FAT, Semester, and Study Material files for OM22001.",
};

export default async function DocumentsPage() {
  let serializedDocs: any[] = [];

  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        examination: {
          select: { code: true, title: true },
        },
        unit: {
          select: { unitNumber: true, title: true },
        },
      },
    });

    serializedDocs = docs.map((d: any) => ({
      id: d.id,
      originalFilename: d.originalFilename,
      category: d.category as "FAT" | "SEMESTER" | "STUDY_MATERIAL",
      subfolder: d.subfolder,
      documentType: d.documentType,
      fileType: d.fileType,
      fileSize: d.fileSize,
      description: d.description,
      tags: d.tags,
      createdAt: d.createdAt.toISOString(),
      examination: d.examination,
      unit: d.unit,
    }));
  } catch (error) {
    console.error("Failed to load documents from database:", error);
  }

  return <AllDocumentsClient initialDocuments={serializedDocs} />;
}
