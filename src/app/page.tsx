import React from "react";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { serializeDocument } from "@/lib/serializeDocument";
import type { DocumentSummary } from "@/lib/documents";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let recentUploads: DocumentSummary[] = [];

  try {
    const documents = await prisma.document.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: { examination: true, unit: true },
    });
    recentUploads = documents.map(serializeDocument);
  } catch (error) {
    console.error("Dashboard database fetch error:", error);
  }

  return <DashboardClient recentUploads={recentUploads} />;
}
