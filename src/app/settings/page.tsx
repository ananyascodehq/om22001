import React from "react";
import { prisma } from "@/lib/prisma";
import { SettingsClient } from "@/components/SettingsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings & Syllabus Management | OM22001 Portal",
  description: "Configure subject metadata, customize Unit I to V syllabus titles and topics, and inspect repository health.",
};

export default async function SettingsPage() {
  const subject = await prisma.subject.findFirst({
    include: {
      units: {
        orderBy: { unitNumber: "asc" },
      },
    },
  });

  const docCounts = await prisma.document.groupBy({
    by: ["category"],
    _count: true,
    _sum: { fileSize: true },
  });

  const physicalBytes = docCounts.reduce(
    (total, category) => total + (category._sum.fileSize || 0),
    0
  );

  const fallbackSubject = {
    id: subject?.id || "fallback-id",
    code: subject?.code || "OM22001",
    name: subject?.name || "Statistical Methods for Engineers",
    regulation: subject?.regulation || "2022",
    departments: subject?.departments || "Common to AE, CE, CS, EC, EE, IT, ME, MN, BT, CH",
    units: (subject?.units || []).map((u) => ({
      id: u.id,
      unitNumber: u.unitNumber,
      coNumber: u.coNumber,
      title: u.title,
      description: u.description,
      topics: u.topics,
    })),
  };

  const stats = {
    totalDocuments: docCounts.reduce((acc: number, curr: { _count: number }) => acc + curr._count, 0),
    categoryCounts: docCounts.map((c: { category: string; _count: number; _sum: { fileSize: number | null } }) => ({
      category: c.category,
      count: c._count,
      sizeBytes: c._sum.fileSize || 0,
    })),
    physicalBytes,
  };

  return <SettingsClient initialSubject={fallbackSubject} initialStats={stats} />;
}
