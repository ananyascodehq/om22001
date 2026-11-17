import React from "react";
import { notFound } from "next/navigation";
import { getAllSemPapers, getSemPaperById } from "@/lib/data";
import { PaperViewClient } from "@/components/PaperViewClient";

interface PageProps {
  params: Promise<{ paperId: string }>;
}

export async function generateStaticParams() {
  const papers = getAllSemPapers();
  return papers.map((p) => ({
    paperId: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { paperId } = await params;
  const paper = getSemPaperById(paperId);
  if (!paper) return { title: "Paper Not Found" };

  return {
    title: `${paper.title} (${paper.qCode ? `Q.${paper.qCode}` : paper.id}) | OM22001`,
    description: `Full worked solutions and questions for ${paper.title} - OM22001 Statistical Methods for Engineers.`,
  };
}

export default async function SemPaperPage({ params }: PageProps) {
  const { paperId } = await params;
  const paper = getSemPaperById(paperId);
  if (!paper) {
    notFound();
  }

  return <PaperViewClient paper={paper} />;
}

