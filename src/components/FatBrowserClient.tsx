"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FileCheck2,
  Folder,
  FileText,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Plus,
  Edit2,
  ExternalLink,
} from "lucide-react";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { UploadModal } from "./UploadModal";
import { getChatGptAnswerUrl, CHATGPT_ANSWER_LINKS } from "@/lib/answerLinks";

interface FatDocument {
  id: string;
  originalFilename: string;
  documentType: string;
  subfolder: string;
  fileType: string;
  fileSize: number;
  description?: string | null;
  tags?: string | null;
  createdAt: string;
  examination?: {
    code: string;
    title: string;
  } | null;
  unit?: {
    unitNumber: number;
    title: string;
  } | null;
  answersFor: Array<{
    answerDoc: {
      id: string;
      originalFilename: string;
    };
  }>;
  questionPaperFor: Array<{
    questionPaper: {
      id: string;
      originalFilename: string;
    };
  }>;
}

interface FatBrowserClientProps {
  initialDocuments: FatDocument[];
}

export function FatBrowserClient({ initialDocuments }: FatBrowserClientProps) {
  const searchParams = useSearchParams();
  const folderParam = searchParams.get("folder") || searchParams.get("exam") || searchParams.get("fat");

  const [documents, setDocuments] = useState<FatDocument[]>(initialDocuments);
  const [activeFat, setActiveFat] = useState<"FAT_1" | "FAT_2" | "FAT_3">(() => {
    if (folderParam) {
      const lower = folderParam.toLowerCase();
      if (lower.includes("2")) return "FAT_2";
      if (lower.includes("3")) return "FAT_3";
      return "FAT_1";
    }
    return "FAT_1";
  });

  useEffect(() => {
    if (folderParam) {
      const lower = folderParam.toLowerCase();
      if (lower.includes("2")) setActiveFat("FAT_2");
      else if (lower.includes("3")) setActiveFat("FAT_3");
      else setActiveFat("FAT_1");
    }
  }, [folderParam]);
  const [activeSubfolder, setActiveSubfolder] = useState<
    "ALL" | "Question_Papers" | "Answers"
  >("ALL");

  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadTargetQP, setUploadTargetQP] = useState<string | undefined>(undefined);

  // Rename state
  const [editDoc, setEditDoc] = useState<FatDocument | null>(null);
  const [editFilename, setEditFilename] = useState("");

  const handleOpenEdit = (doc: FatDocument) => {
    setEditDoc(doc);
    setEditFilename(doc.originalFilename);
  };

  const handleSaveEdit = async () => {
    if (!editDoc || !editFilename.trim()) return;
    try {
      const res = await fetch(`/api/documents/${editDoc.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalFilename: editFilename.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === editDoc.id ? { ...d, originalFilename: editFilename.trim() } : d))
        );
        setEditDoc(null);
      }
    } catch (e) {
      console.error("Rename error:", e);
    }
  };

  const handleDeleteDoc = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleUploadAnswerForQP = (qpId: string) => {
    setUploadTargetQP(qpId);
    setUploadModalOpen(true);
  };

  const fatDocs = documents.filter((d) => d.examination?.code === activeFat);

  const displayedDocs = fatDocs.filter((d) => {
    if (activeSubfolder === "ALL") return true;
    if (activeSubfolder === "Question_Papers") return d.documentType === "QUESTION_PAPER";
    if (activeSubfolder === "Answers") return d.documentType === "ANSWER_KEY";
    return true;
  });

  const countBySubfolder = {
    Question_Papers: fatDocs.filter((d) => d.documentType === "QUESTION_PAPER").length,
    Answers: fatDocs.filter((d) => d.documentType === "ANSWER_KEY").length,
  };

  const FAT_FOLDERS = [
    { code: "FAT_1", label: "FAT 1", chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_1_AY2025_2026.chatGptUrl },
    { code: "FAT_2", label: "FAT 2", chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_2_AY2024_2025.chatGptUrl },
    { code: "FAT_3", label: "FAT 3", chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_3_AY2024_2025.chatGptUrl },
  ] as const;

  const currentFolder = FAT_FOLDERS.find((f) => f.code === activeFat) || FAT_FOLDERS[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1a2d4a] pb-5 dark:bg-transparent relative overflow-hidden">
        {/* Decorative: Z-score normal distribution bell curve SVG */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.1 }}
          aria-hidden="true"
        >
          {/* Bell curve path */}
          <path
            d="M10,90 Q30,90 50,70 Q70,50 100,10 Q130,50 150,70 Q170,90 190,90"
            stroke="#2278e0"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Shaded tail area (right tail) */}
          <path
            d="M150,70 Q170,90 190,90 L190,90 L150,90 Z"
            fill="#2278e0"
            fillOpacity="0.25"
          />
          {/* Baseline */}
          <line x1="10" y1="90" x2="190" y2="90" stroke="#2278e0" strokeWidth="1" strokeOpacity="0.5" />
          {/* Mean line */}
          <line x1="100" y1="10" x2="100" y2="90" stroke="#2278e0" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
        </svg>

        {/* Decorative watermark math symbols */}
        <div
          className="absolute left-0 bottom-0 pointer-events-none select-none font-mono text-[#2278e0] leading-tight"
          style={{ opacity: 0.06, fontSize: "1.1rem" }}
          aria-hidden="true"
        >
          <div>H₀ : μ = μ₀</div>
          <div>z = (x̄ - μ) / (σ/√n)</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-blue-900 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">FAT Materials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <FileCheck2 className="w-7 h-7 text-amber-500" />
            <span className="dark:bg-gradient-to-r dark:from-[#e8f4ff] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent text-blue-950">
              FAT Question Papers &amp; Answers
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Direct folder repository for Formative Assessment Tests (FAT 1, FAT 2, FAT 3).
          </p>
        </div>

        <button
          onClick={() => {
            setUploadTargetQP(undefined);
            setUploadModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-md shadow-amber-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload to {currentFolder.label}</span>
        </button>
      </div>

      {/* Simple Clean Folder Tabs (Replaces Bulky Cards) */}
      <div className="flex flex-wrap items-center gap-3">
        {FAT_FOLDERS.map((f) => {
          const isActive = activeFat === f.code;
          const qpCount = documents.filter(
            (d) => d.examination?.code === f.code && d.documentType === "QUESTION_PAPER"
          ).length;

          return (
            <button
              key={f.code}
              onClick={() => setActiveFat(f.code)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition border ${
                isActive
                  ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white border-transparent shadow-sm shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-[#1a2d4a] dark:text-[#7ea8cc] dark:hover:bg-[#1a2d4a] text-slate-700 hover:border-slate-300"
              }`}
            >
              <Folder className={`w-4 h-4 ${isActive ? "text-white" : "text-amber-500"}`} />
              <span>{f.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {qpCount} {qpCount === 1 ? "Paper" : "Papers"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subfolder Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100 dark:bg-[#0a1628] p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-[#1a2d4a]">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveSubfolder("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 min-h-[36px] ${
              activeSubfolder === "ALL"
                ? "bg-white dark:bg-[#0d1b33] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-[#7ea8cc] hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All ({fatDocs.length})
          </button>

          <button
            onClick={() => setActiveSubfolder("Question_Papers")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 min-h-[36px] ${
              activeSubfolder === "Question_Papers"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-slate-600 dark:text-[#7ea8cc] hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Question Papers</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/10">
              {countBySubfolder.Question_Papers}
            </span>
          </button>

          <button
            onClick={() => setActiveSubfolder("Answers")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 min-h-[36px] ${
              activeSubfolder === "Answers"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 dark:text-[#7ea8cc] hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Answers Folder</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/10">
              {countBySubfolder.Answers}
            </span>
          </button>
        </div>

        {/* Direct ChatGPT Answers Button for this FAT folder */}
        <a
          href={currentFolder.chatGptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/20 transition min-h-[36px] shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span>{currentFolder.label} Answers on ChatGPT</span>
        </a>
      </div>

      {/* Answers Subfolder View when Selected */}
      {activeSubfolder === "Answers" && countBySubfolder.Answers === 0 && (
        <div className="p-8 text-center rounded-2xl border dark:border-[#1a2d4a] dark:bg-[#0d1b33] border-slate-200 bg-white space-y-4">
          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-teal-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#e8f4ff]">
              Solved Answers &amp; Step-by-Step Solutions
            </h3>
            <p className="text-xs dark:text-[#7ea8cc] text-slate-500 max-w-md mx-auto">
              Complete worked step-by-step solutions for {currentFolder.label} are accessible directly on ChatGPT.
            </p>
          </div>
          <a
            href={currentFolder.chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open {currentFolder.label} Solved Answers on ChatGPT</span>
          </a>
        </div>
      )}

      {/* Question Papers List */}
      {displayedDocs.length === 0 && activeSubfolder !== "Answers" ? (
        <div className="p-12 text-center rounded-2xl border border-dashed dark:border-[#1a2d4a] dark:bg-[#0d1b33] border-slate-300 bg-white space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Folder className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#e8f4ff]">
              No files in {currentFolder.label}
            </h3>
            <p className="text-xs dark:text-[#7ea8cc] text-slate-500 max-w-sm mx-auto">
              Upload PDF • Max 50MB
            </p>
          </div>
          <button
            onClick={() => {
              setUploadTargetQP(undefined);
              setUploadModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-md shadow-amber-500/20"
          >
            Upload {currentFolder.label} Documents
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedDocs.map((doc) => {
            const isQP = doc.documentType === "QUESTION_PAPER";
            const chatGptUrl = getChatGptAnswerUrl(doc);
            const isFat2 = activeFat === "FAT_2";
            const isFat3 = activeFat === "FAT_3";

            return (
              <div
                key={doc.id}
                className="relative overflow-hidden p-5 rounded-2xl dark:bg-[#0a1628] dark:border-[#1a2d4a] dark:hover:border-[#2278e0]/40 bg-white border border-slate-200 hover:border-slate-300 shadow-sm space-y-4 flex flex-col justify-between transition"
              >
                {/* Decorative watermark formula for FAT 2 */}
                {isFat2 && (
                  <span
                    className="absolute bottom-3 right-3 pointer-events-none select-none font-mono text-[#2278e0] text-sm leading-none"
                    style={{ opacity: 0.04 }}
                    aria-hidden="true"
                  >
                    σ² = Σ(xᵢ-x̄)²/(n-1)
                  </span>
                )}
                {/* Decorative watermark formula for FAT 3 */}
                {isFat3 && (
                  <span
                    className="absolute bottom-3 right-3 pointer-events-none select-none font-mono text-[#2278e0] text-sm leading-none"
                    style={{ opacity: 0.04 }}
                    aria-hidden="true"
                  >
                    CV = (σ/μ) × 100%
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded dark:bg-[#0d1b33] dark:border dark:border-[#1a2d4a] bg-slate-100 dark:text-[#7ea8cc] text-slate-600 font-mono">
                      {doc.subfolder.replace(/_/g, " ")}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-600">
                      {currentFolder.label}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-sm dark:text-[#e8f4ff] text-slate-900 truncate">
                        {doc.originalFilename}
                      </h4>
                      <p className="text-[11px] dark:text-[#4a7fa0] text-slate-400 mt-0.5">
                        {(doc.fileSize / 1024).toFixed(1)} KB • Uploaded on{" "}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-[#1a2d4a] flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelectedDocId(doc.id)}
                      className="px-3 py-1.5 rounded-lg dark:bg-[#1a2d4a] dark:text-[#93c5fd] dark:hover:bg-[#1d2f4d] bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview QP</span>
                    </button>
                    {chatGptUrl && (
                      <a
                        href={chatGptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Answers on ChatGPT</span>
                      </a>
                    )}
                    <a
                      href={`/api/documents/${doc.id}/download`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(doc)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition"
                      title="Rename document"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc.id, doc.originalFilename)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rename Document Modal */}
      {editDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Rename Document
            </h3>
            <p className="text-xs text-slate-500">
              Update the original filename for this document in the repository.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Filename:
              </label>
              <input
                type="text"
                value={editFilename}
                onChange={(e) => setEditFilename(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditDoc(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-white hover:bg-amber-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setUploadTargetQP(undefined);
        }}
        defaultCategory="FAT"
        defaultExamCode={activeFat}
        defaultQuestionPaperIdToLink={uploadTargetQP}
      />
    </div>
  );
}
