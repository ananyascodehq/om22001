"use client";

import React, { useState } from "react";
import { FileCheck2, GraduationCap } from "lucide-react";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { DashboardHero } from "./dashboard/DashboardHero";
import { PaperSectionCard } from "./dashboard/PaperSectionCard";
import { StudyMaterialsSection } from "./dashboard/StudyMaterialsSection";
import { FAT_PAPERS, SEMESTER_PAPERS, type DashboardPaper } from "./dashboard/paperData";
import type { DocumentSummary } from "@/lib/documents";

interface DashboardClientProps {
  recentUploads: DocumentSummary[];
}

const normalizeFilename = (s: string) => s.replace(/[\u2010-\u2015]/g, "-").trim().toLowerCase();

export function DashboardClient({ recentUploads }: DashboardClientProps) {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Find the uploaded document for a paper so it can be previewed.
  const findDocId = (paper: DashboardPaper) => {
    const target = normalizeFilename(paper.filename);
    const found = recentUploads.find(
      (d) =>
        normalizeFilename(d.originalFilename) === target &&
        (!paper.code || d.examination?.code === paper.code)
    );
    return found ? found.id : null;
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <DashboardHero />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaperSectionCard
          icon={<FileCheck2 className="w-5 h-5" />}
          title="FAT Question Papers &amp; Answers"
          subtitle="FAT 1, FAT 2, and FAT 3 Examination Papers"
          href="/fat"
          papers={FAT_PAPERS}
          findDocId={findDocId}
          onPreview={setSelectedDocId}
        />
        <PaperSectionCard
          icon={<GraduationCap className="w-5 h-5" />}
          title="Semester Papers &amp; Answers (PYQs)"
          subtitle="Dec 2024, May 2025, Dec 2025, May 2026"
          href="/semester"
          papers={SEMESTER_PAPERS}
          findDocId={findDocId}
          onPreview={setSelectedDocId}
        />
        <StudyMaterialsSection />
      </div>

      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />
    </div>
  );
}
