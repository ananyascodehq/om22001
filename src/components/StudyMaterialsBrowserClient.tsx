"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Folder,
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  Edit2,
  Plus,
  Layers,
  Sigma,
  Table2,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { UploadModal } from "./UploadModal";
import { EditDocumentModal } from "./documents/EditDocumentModal";
import { useDocumentList } from "@/hooks/useDocumentList";
import { formatFileSize, type DocumentSummary } from "@/lib/documents";

interface StudyMaterialsBrowserClientProps {
  initialDocuments: DocumentSummary[];
}

const FOLDERS = [
  {
    id: "Complete_Notes",
    title: "Complete Subject Notes",
    desc: "Comprehensive syllabus-wide notes and complete subject compilations.",
    icon: BookOpen,
    unitNumber: null,
    badge: "Syllabus Wide",
    mathSymbol: "Σ",
    activeAccent: "text-teal-400",
    watermark: null,
    emptyMathIcon: "Σ",
  },
  {
    id: "Unit_1_Descriptive_Statistics",
    title: "Unit 1 – Descriptive Statistics",
    desc: "Central tendency, dispersion, moments, skewness, kurtosis, and Sheppard's corrections.",
    icon: Folder,
    unitNumber: 1,
    badge: "CO1",
    mathSymbol: "x̄",
    activeAccent: "text-teal-400",
    watermark: "x̄ = Σxᵢ/n",
    emptyMathIcon: "x̄",
  },
  {
    id: "Unit_2_Large_Sample_Tests",
    title: "Unit 2 – Testing of Hypothesis (Large Samples)",
    desc: "Sampling distributions, Type I/II errors, single mean, proportion, and Z-tests.",
    icon: Folder,
    unitNumber: 2,
    badge: "CO2",
    mathSymbol: "z",
    activeAccent: "text-blue-400",
    watermark: "z = (x̄-μ)/(σ/√n)",
    emptyMathIcon: "z",
  },
  {
    id: "Unit_3_Small_Sample_Tests",
    title: "Unit 3 – Testing of Hypotheses (Small Samples)",
    desc: "Student's t-tests, Snedecor's F-test, Chi-square goodness of fit, and contingency tables.",
    icon: Folder,
    unitNumber: 3,
    badge: "CO3",
    mathSymbol: "t",
    activeAccent: "text-purple-400",
    watermark: "t = (x̄-μ)/(s/√n)",
    emptyMathIcon: "t",
  },
  {
    id: "Unit_4_Design_of_Experiments",
    title: "Unit 4 – Analysis of Variance (ANOVA)",
    desc: "One-way ANOVA (CRD), two-way ANOVA (RBD), and Latin Square Design (LSD).",
    icon: Folder,
    unitNumber: 4,
    badge: "CO4",
    mathSymbol: "F",
    activeAccent: "text-amber-400",
    watermark: "F = MSB/MSW",
    emptyMathIcon: "F",
  },
  {
    id: "Unit_5_Statistical_Quality_Control",
    title: "Unit 5 – Statistical Quality Control (SQC)",
    desc: "Variables charts (X-bar, R), attributes charts (p, np, c), and process capability.",
    icon: Folder,
    unitNumber: 5,
    badge: "CO5",
    mathSymbol: "p",
    activeAccent: "text-rose-400",
    watermark: "UCL = x̄ + 3σ",
    emptyMathIcon: "p̄",
  },
  {
    id: "Formula_Sheets",
    title: "Formula Sheets & Revision Cards",
    desc: "KaTeX formula sheets, summary cards, and quick revision sheets.",
    icon: Sigma,
    unitNumber: null,
    badge: "Formulas",
    mathSymbol: "∫",
    activeAccent: "text-teal-400",
    watermark: null,
    emptyMathIcon: "∫",
  },
  {
    id: "Reference_Materials",
    title: "Statistical Tables & Reference Standards",
    desc: "Normal Z, t-distribution, chi-square, F tables, and ASTM quality tables.",
    icon: Table2,
    unitNumber: null,
    badge: "Reference",
    mathSymbol: "χ²",
    activeAccent: "text-blue-400",
    watermark: null,
    emptyMathIcon: "χ²",
  },
  {
    id: "Important_Concepts",
    title: "Important Exam Concepts",
    desc: "High-probability derivations, definitions, and university question highlights.",
    icon: Sparkles,
    unitNumber: null,
    badge: "Exam Focus",
    mathSymbol: "★",
    activeAccent: "text-amber-400",
    watermark: null,
    emptyMathIcon: "★",
  },
  {
    id: "Additional_Resources",
    title: "Additional Resources & Slides",
    desc: "Lecture PPTs, lab exercises, external references, and tutorial sheets.",
    icon: Layers,
    unitNumber: null,
    badge: "Resources",
    mathSymbol: "α",
    activeAccent: "text-purple-400",
    watermark: null,
    emptyMathIcon: "α",
  },
];

function normalizeFolderId(param: string | null): string {
  if (!param) return "Unit_1_Descriptive_Statistics";
  const lower = param.toLowerCase().trim();
  if (lower === "unit_1" || lower === "unit-1" || lower === "1" || lower.includes("descriptive")) {
    return "Unit_1_Descriptive_Statistics";
  }
  if (lower === "unit_2" || lower === "unit-2" || lower === "2" || lower.includes("large")) {
    return "Unit_2_Large_Sample_Tests";
  }
  if (lower === "unit_3" || lower === "unit-3" || lower === "3" || lower.includes("small")) {
    return "Unit_3_Small_Sample_Tests";
  }
  if (lower === "unit_4" || lower === "unit-4" || lower === "4" || lower.includes("anova") || lower.includes("design") || lower.includes("experiments")) {
    return "Unit_4_Design_of_Experiments";
  }
  if (lower === "unit_5" || lower === "unit-5" || lower === "5" || lower.includes("quality") || lower.includes("sqc")) {
    return "Unit_5_Statistical_Quality_Control";
  }
  if (lower.includes("complete")) return "Complete_Notes";
  if (lower.includes("formula")) return "Formula_Sheets";
  if (lower.includes("table") || lower.includes("reference")) return "Reference_Materials";
  if (lower.includes("concept")) return "Important_Concepts";
  if (lower.includes("additional")) return "Additional_Resources";

  const found = FOLDERS.find((f) => f.id.toLowerCase() === lower);
  return found ? found.id : "Unit_1_Descriptive_Statistics";
}

export function StudyMaterialsBrowserClient({
  initialDocuments,
}: StudyMaterialsBrowserClientProps) {
  const searchParams = useSearchParams();
  const folderParam = searchParams.get("folder") || searchParams.get("unit");

  const { documents, setDocuments, deleteDocument, updateDocument } =
    useDocumentList(initialDocuments);
  const [activeFolderId, setActiveFolderId] = useState<string>(() =>
    normalizeFolderId(folderParam)
  );
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Follow the URL parameter when it changes (adjusting state during render).
  const [prevFolderParam, setPrevFolderParam] = useState(folderParam);
  if (prevFolderParam !== folderParam) {
    setPrevFolderParam(folderParam);
    if (folderParam) setActiveFolderId(normalizeFolderId(folderParam));
  }

  const [editDoc, setEditDoc] = useState<DocumentSummary | null>(null);

  const activeFolder = FOLDERS.find((f) => f.id === activeFolderId) || FOLDERS[0];

  const folderDocs = documents.filter((d) => {
    if (activeFolder.unitNumber !== null) {
      return d.unit?.unitNumber === activeFolder.unitNumber || d.subfolder === activeFolder.id;
    }
    return d.subfolder === activeFolder.id;
  });

  const refreshDocuments = async () => {
    try {
      const res = await fetch("/api/documents?category=STUDY_MATERIAL");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch {
      // ignore
    }
  };

  const getFileIcon = (fileType: string) => {
    if (["jpg", "jpeg", "png"].includes(fileType.toLowerCase())) {
      return <ImageIcon className="w-5 h-5 text-purple-500" />;
    }
    if (["doc", "docx"].includes(fileType.toLowerCase())) {
      return <FileText className="w-5 h-5 text-blue-500" />;
    }
    if (["ppt", "pptx"].includes(fileType.toLowerCase())) {
      return <FileText className="w-5 h-5 text-orange-500" />;
    }
    return <FileText className="w-5 h-5 text-emerald-500" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1a2d4a] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-sky-600 transition">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">Study Materials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-emerald-600 dark:text-teal-400 shrink-0" />
            <span className="text-slate-900 dark:bg-gradient-to-r dark:from-[#e8f4ff] dark:to-[#93c5fd] dark:bg-clip-text dark:text-transparent">
              Study Materials &amp; Notes Archive
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#7ea8cc] mt-1">
            Dedicated notes repository organized across all 5 syllabus units, formula sheets, reference tables, and concept cards.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Materials</span>
        </button>
      </div>

      {/* Main Layout: Left Folder Directory & Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Folder Directory Menu */}
        <div className="rounded-2xl bg-white dark:bg-[#0a1628] border border-slate-200 dark:border-[#1a2d4a] p-2 sm:p-3 shadow-sm">
          <span className="hidden lg:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#4a7fa0]">
            Folders &amp; Units
          </span>

          <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
            {FOLDERS.filter(
              (folder) => folder.id !== "Complete_Notes" && folder.id !== "Important_Concepts"
            ).map((folder) => {
              const isActive = activeFolderId === folder.id;
              const count = documents.filter((d) => {
                if (folder.unitNumber !== null) {
                  return d.unit?.unitNumber === folder.unitNumber || d.subfolder === folder.id;
                }
                return d.subfolder === folder.id;
              }).length;

              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  className={`shrink-0 lg:w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left min-h-[42px] whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? "bg-emerald-50 dark:bg-gradient-to-r dark:from-[#1d6fce]/15 dark:to-[#0d9488]/15 text-emerald-700 dark:text-[#60a5fa] shadow-sm dark:border dark:border-[#2278e0]/25"
                      : "text-slate-600 dark:text-[#7ea8cc] hover:bg-slate-50 dark:hover:bg-[#1a2d4a]"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <folder.icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? `text-emerald-600 dark:${folder.activeAccent}` : "text-slate-400 dark:text-[#4a7fa0]"
                      }`}
                    />
                    {/* Per-folder math symbol identity */}
                    <span
                      className={`text-[10px] font-mono shrink-0 ${
                        isActive ? `dark:${folder.activeAccent}` : "dark:text-[#4a7fa0]"
                      }`}
                      aria-hidden="true"
                    >
                      {folder.mathSymbol}
                    </span>
                    <span className="truncate">{folder.title}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-slate-100 dark:bg-[#1a2d4a] text-slate-500 dark:text-[#4a7fa0] shrink-0">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Folder View */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Folder Banner */}
          <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent dark:from-[#1d6fce]/10 dark:via-[#0d9488]/10 dark:to-transparent border border-emerald-200/80 dark:border-[#1a2d4a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Watermark math expression — per unit */}
            {activeFolder.watermark && (
              <span
                className="pointer-events-none select-none absolute right-4 top-1/2 -translate-y-1/2 text-6xl font-mono font-bold text-slate-900 dark:text-white opacity-[0.06] whitespace-nowrap"
                aria-hidden="true"
              >
                {activeFolder.watermark}
              </span>
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-[#1a2d4a] dark:text-[#60a5fa]">
                  {activeFolder.badge}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#7ea8cc]">
                  {folderDocs.length} material{folderDocs.length === 1 ? "" : "s"} uploaded
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-[#e8f4ff]">
                {activeFolder.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-[#7ea8cc] mt-1">
                {activeFolder.desc}
              </p>
            </div>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="relative z-10 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 shrink-0 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document to this Folder</span>
            </button>
          </div>

          {/* Folder Documents Grid */}
          {folderDocs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-[#1a2d4a] dark:border-dashed bg-white dark:bg-[#0d1b33] space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 dark:bg-[#1a2d4a] flex items-center justify-center">
                {/* Unit-specific math symbol instead of generic folder icon */}
                <span className="text-3xl font-mono font-bold text-emerald-600 dark:text-[#60a5fa] select-none" aria-hidden="true">
                  {activeFolder.emptyMathIcon}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-[#4a7fa0]">
                  No materials uploaded yet in {activeFolder.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#4a7fa0] max-w-sm mx-auto">
                  Upload lecture notes (PDF), handwritten notes (JPG/PNG), presentation slides (PPTX), or reference guides.
                </p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
              >
                Upload to {activeFolder.title}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {folderDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0d1b33] border border-slate-200 dark:border-[#1a2d4a] shadow-sm space-y-4 flex flex-col justify-between hover:border-slate-300 dark:hover:border-[#2278e0]/40 dark:hover:shadow-sm dark:hover:shadow-blue-500/10 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1a2d4a] text-slate-600 dark:text-[#60a5fa] uppercase font-mono">
                        {doc.fileType}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-[#4a7fa0]">
                        {formatFileSize(doc.fileSize)}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1a2d4a] shrink-0 mt-0.5">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <div className="overflow-hidden min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-[#e8f4ff] break-words leading-snug">
                          {doc.originalFilename}
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-[#4a7fa0] mt-1">
                          Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {doc.description && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1628] border border-slate-100 dark:border-[#1a2d4a]/70">
                        <p className="text-xs text-slate-700 dark:text-[#a5d4ff] leading-relaxed break-words whitespace-normal">
                          {doc.description}
                        </p>
                      </div>
                    )}

                    {doc.tags && (
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.split(",").map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#1a2d4a] text-slate-500 dark:text-[#4a7fa0]"
                          >
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-[#1a2d4a] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDocId(doc.id)}
                        className="px-3 py-2 rounded-lg bg-slate-900 text-white dark:bg-[#1a2d4a] dark:text-[#93c5fd] dark:hover:bg-[#1d2f4d] text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5 min-h-[38px]"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>Preview</span>
                      </button>
                      <a
                        href={`/api/documents/${doc.id}/download`}
                        className="p-2 rounded-lg text-slate-400 dark:text-[#4a7fa0] hover:text-slate-700 dark:hover:text-[#60a5fa] hover:bg-slate-100 dark:hover:bg-[#1a2d4a] min-h-[38px] min-w-[38px] flex items-center justify-center transition"
                        title="Download Original"
                      >
                        <Download className="w-4 h-4 shrink-0" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditDoc(doc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        title="Edit Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id, doc.originalFilename)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EditDocumentModal
        doc={editDoc}
        onClose={() => setEditDoc(null)}
        onSave={updateDocument}
        withMetadata
        accent="emerald"
        title="Edit Document Details"
        filenameLabel="File Display Name:"
      />

      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        defaultCategory="STUDY_MATERIAL"
        onUploadSuccess={refreshDocuments}
      />
    </div>
  );
}
