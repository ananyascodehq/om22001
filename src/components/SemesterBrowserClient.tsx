"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  GraduationCap,
  Folder,
  FileText,
  Upload,
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

interface SemExam {
  id: string;
  code: string;
  title: string;
  qCode: string | null;
  examDate: string | null;
  semester: number | null;
  documents: SemDocument[];
}

interface SemDocument {
  id: string;
  originalFilename: string;
  documentType: string;
  subfolder: string;
  fileType: string;
  fileSize: number;
  description?: string | null;
  tags?: string | null;
  createdAt: string;
  examinationId?: string | null;
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

interface SemesterBrowserClientProps {
  initialExaminations: SemExam[];
  initialDocuments: SemDocument[];
}

export function SemesterBrowserClient({
  initialExaminations,
  initialDocuments,
}: SemesterBrowserClientProps) {
  const searchParams = useSearchParams();
  const folderParam = searchParams.get("folder") || searchParams.get("pyq") || searchParams.get("exam") || searchParams.get("id");

  const normalizeExamCode = (param: string | null): string => {
    if (!param) return initialExaminations[0]?.code || "SEM_PYQ_1";
    const lower = param.toLowerCase().trim();
    if (lower.includes("1") || lower.includes("2024-dec") || lower.includes("147184")) return "SEM_PYQ_1";
    if (lower.includes("2") || lower.includes("2025-may") || lower.includes("405686")) return "SEM_PYQ_2";
    if (lower.includes("3") || lower.includes("2025-dec") || lower.includes("133554")) return "SEM_PYQ_3";
    if (lower.includes("4") || lower.includes("2026-may") || lower.includes("323580")) return "SEM_PYQ_4";
    if (lower.includes("5")) return "SEM_PYQ_5";
    const found = initialExaminations.find((e) => e.code.toLowerCase() === lower);
    return found ? found.code : (initialExaminations[0]?.code || "SEM_PYQ_1");
  };

  const [examinations, setExaminations] = useState<SemExam[]>(initialExaminations);
  const [documents, setDocuments] = useState<SemDocument[]>(initialDocuments);
  const [activeExamCode, setActiveExamCode] = useState<string>(() =>
    normalizeExamCode(folderParam)
  );

  useEffect(() => {
    if (folderParam) {
      setActiveExamCode(normalizeExamCode(folderParam));
    }
  }, [folderParam]);
  const [activeSubfolder, setActiveSubfolder] = useState<
    "ALL" | "Question_Papers" | "Answers"
  >("ALL");

  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadTargetQP, setUploadTargetQP] = useState<string | undefined>(undefined);
  const [newPyqModalOpen, setNewPyqModalOpen] = useState(false);
  const [newPyqTitle, setNewPyqTitle] = useState("");
  const [newPyqQCode, setNewPyqQCode] = useState("");

  const activeExam = examinations.find((e) => e.code === activeExamCode);
  const examDocs = documents.filter((d) => d.examination?.code === activeExamCode);

  const displayedDocs = examDocs.filter((d) => {
    if (activeSubfolder === "ALL") return true;
    if (activeSubfolder === "Question_Papers") return d.documentType === "QUESTION_PAPER";
    if (activeSubfolder === "Answers") return d.documentType === "ANSWER_KEY";
    return true;
  });

  const qpCount = examDocs.filter((d) => d.documentType === "QUESTION_PAPER").length;
  const ansCount = examDocs.filter((d) => d.documentType === "ANSWER_KEY").length;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  // Rename state
  const [editDoc, setEditDoc] = useState<SemDocument | null>(null);
  const [editFilename, setEditFilename] = useState("");

  const handleOpenEdit = (doc: SemDocument) => {
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

  const handleCreateNewPyq = async () => {
    if (!newPyqTitle.trim()) return;
    try {
      const res = await fetch("/api/examinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPyqTitle.trim(),
          qCode: newPyqQCode.trim() || undefined,
          semester: 6,
          type: "SEMESTER",
        }),
      });
      const data = await res.json();
      if (data.success && data.examination) {
        setExaminations((prev) => [...prev, data.examination]);
        setActiveExamCode(data.examination.code);
        setNewPyqTitle("");
        setNewPyqQCode("");
        setNewPyqModalOpen(false);
      } else {
        alert(data.error || "Failed to create examination folder");
      }
    } catch (e) {
      console.error("Create exam error:", e);
      alert("Failed to create examination folder");
    }
  };

  const refreshDocuments = async () => {
    try {
      const res = await fetch("/api/documents?category=SEMESTER");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1a2d4a] pb-6 dark:bg-transparent">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-sky-600 transition">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">Semester Materials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-indigo-600" />
            <span className="dark:bg-gradient-to-r dark:from-[#e8f4ff] dark:to-[#60a5fa] dark:bg-clip-text dark:text-transparent text-slate-900">
              Semester Examination PYQs
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#7ea8cc] mt-1">
            Independent End-Semester question paper archive. Maintains strict folder separation between Question Papers and Answer documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNewPyqModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#1a2d4a] bg-white dark:bg-[#0a1628] text-xs font-semibold text-slate-700 dark:text-[#7ea8cc] hover:bg-slate-50 dark:hover:bg-[#0d1b33] transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New PYQ</span>
          </button>

          <button
            onClick={() => {
              setUploadTargetQP(undefined);
              setUploadModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md shadow-indigo-600/20"
          >
            <Upload className="w-4 h-4" />
            <span>Upload to {activeExamCode.replace(/_/g, " ")}</span>
          </button>
        </div>
      </div>

      {/* Semester PYQ Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {examinations.map((exam) => {
          const isActive = activeExamCode === exam.code;
          const count = documents.filter((d) => d.examination?.code === exam.code).length;

          return (
            <button
              key={exam.code}
              onClick={() => setActiveExamCode(exam.code)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${isActive
                  ? "dark:bg-[#0a1628] dark:border-[#2278e0]/60 border-indigo-600 bg-white shadow-md ring-2 ring-indigo-500/20"
                  : "dark:bg-[#0a1628] dark:border-[#1a2d4a] dark:hover:border-[#2278e0]/40 bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white"
                      : "bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300"
                  }`}
                >
                  {exam.code.replace(/_/g, " ")}
                </span>
                <span className="text-[11px] font-mono text-slate-400 dark:text-[#7ea8cc]">
                  {count} file{count === 1 ? "" : "s"}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-[#e8f4ff] truncate">
                {exam.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <p className="text-[11px] text-slate-500 dark:text-[#7ea8cc]">
                  {exam.examDate || "Anna University"}
                </p>
                {exam.qCode && (
                  <span className="dark:bg-[#1a2d4a] dark:text-[#60a5fa] bg-slate-100 text-slate-500 font-mono text-[10px] px-1.5 py-0.5 rounded">
                    {exam.qCode}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Subfolder Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 bg-slate-100 dark:bg-[#0a1628] p-1.5 rounded-2xl border border-slate-200 dark:border-[#1a2d4a] scrollbar-none">
          <button
            onClick={() => setActiveSubfolder("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 min-h-[36px] ${activeSubfolder === "ALL"
                ? "bg-white dark:bg-[#0d1b33] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-[#7ea8cc] hover:text-slate-900"
              }`}
          >
            All Files ({examDocs.length})
          </button>

          <button
            onClick={() => setActiveSubfolder("Question_Papers")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 min-h-[36px] ${activeSubfolder === "Question_Papers"
                ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white shadow-sm"
                : "text-slate-600 dark:text-[#7ea8cc] hover:text-slate-900"
              }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Question Papers ({qpCount})</span>
          </button>

          <button
            onClick={() => setActiveSubfolder("Answers")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 min-h-[36px] ${activeSubfolder === "Answers"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 dark:text-[#7ea8cc] hover:text-slate-900"
              }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Answers &amp; Solutions ({ansCount})</span>
          </button>
        </div>

        {/* Direct ChatGPT Answers Button */}
        {CHATGPT_ANSWER_LINKS[activeExamCode]?.chatGptUrl && (
          <a
            href={CHATGPT_ANSWER_LINKS[activeExamCode].chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/20 transition min-h-[36px] shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>{activeExam?.code?.replace(/_/g, " ")} Answers on ChatGPT</span>
          </a>
        )}
      </div>

      {/* Answers View when Selected */}
      {activeSubfolder === "Answers" && CHATGPT_ANSWER_LINKS[activeExamCode]?.chatGptUrl && (
        <div className="p-8 text-center rounded-2xl border dark:border-[#1a2d4a] dark:bg-[#0d1b33] border-slate-200 bg-white space-y-4">
          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-teal-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#e8f4ff]">
              Solved Answers &amp; Step-by-Step Solutions
            </h3>
            <p className="text-xs dark:text-[#7ea8cc] text-slate-500 max-w-md mx-auto">
              Complete worked step-by-step solutions for {activeExam?.title} are accessible directly on ChatGPT.
            </p>
          </div>
          <a
            href={CHATGPT_ANSWER_LINKS[activeExamCode].chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open {activeExam?.code?.replace(/_/g, " ")} Solved Answers on ChatGPT</span>
          </a>
        </div>
      )}

      {/* Documents Grid */}
      {displayedDocs.length === 0 && activeSubfolder !== "Answers" ? (
        <div className="p-12 text-center rounded-3xl border border-dashed dark:border-[#1a2d4a] dark:bg-[#0d1b33] border-slate-300 bg-white space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Folder className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#e8f4ff]">
              No files in {activeExam?.title} &gt; {activeSubfolder.replace(/_/g, " ")}
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
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md shadow-indigo-600/20"
          >
            Upload to {activeExamCode}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedDocs.map((doc) => {
            const isQP = doc.documentType === "QUESTION_PAPER";
            const hasAnswers = doc.answersFor && doc.answersFor.length > 0;

            return (
              <div
                key={doc.id}
                className="relative overflow-hidden p-5 rounded-2xl dark:bg-[#0a1628] dark:border-[#1a2d4a] dark:hover:border-[#2278e0]/40 bg-white border border-slate-200 hover:border-slate-300 shadow-sm space-y-4 flex flex-col justify-between transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded dark:bg-[#0d1b33] dark:border dark:border-[#1a2d4a] bg-slate-100 dark:text-[#7ea8cc] text-slate-600 font-mono">
                      {doc.subfolder.replace(/_/g, " ")}
                    </span>
                    <span className="text-[11px] font-mono dark:text-[#7ea8cc] text-slate-400 uppercase">
                      {doc.fileType}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl dark:bg-[#0d1b33] dark:border dark:border-[#1a2d4a] bg-slate-100 dark:text-[#7ea8cc] text-slate-700 shrink-0 mt-0.5">
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

                  {/* Q&A Relational Pairing Box (only if local answer document is uploaded) */}
                  {isQP && hasAnswers && (
                    <div className="p-3 rounded-xl dark:bg-[#0d1b33] dark:border dark:border-[#1a2d4a] bg-slate-50 border border-slate-200/80 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-teal-400 flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Associated Worked Solutions Available
                        </span>
                        <div className="text-[11px] dark:text-[#7ea8cc] text-slate-600 line-clamp-1">
                          {doc.answersFor[0].answerDoc.originalFilename}
                        </div>
                      </div>
                    </div>
                  )}

                  {doc.documentType === "ANSWER_KEY" && doc.questionPaperFor?.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300">
                      <strong>Paired Question Paper: </strong>
                      <span>{doc.questionPaperFor[0].questionPaper.originalFilename}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-[#1a2d4a] flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelectedDocId(doc.id)}
                      className="px-3 py-1.5 rounded-lg dark:bg-[#1a2d4a] dark:text-[#93c5fd] dark:hover:bg-[#1d2f4d] bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview QP</span>
                    </button>
                    {getChatGptAnswerUrl(doc) && (
                      <a
                        href={getChatGptAnswerUrl(doc)!}
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
                      title="Download Original"
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
                      onClick={() => handleDelete(doc.id, doc.originalFilename)}
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

      {/* Add New PYQ Modal */}
      {newPyqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Create New Semester PYQ Folder
            </h3>
            <p className="text-xs text-slate-500">
              Add a new examination session folder to store semester papers and solutions.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Examination Title (e.g. Nov 2026 / Sem 5):
                </label>
                <input
                  type="text"
                  value={newPyqTitle}
                  onChange={(e) => setNewPyqTitle(e.target.value)}
                  placeholder="Semester Examination – Nov 2026"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Question Paper Code (Optional):
                </label>
                <input
                  type="text"
                  value={newPyqQCode}
                  onChange={(e) => setNewPyqQCode(e.target.value)}
                  placeholder="e.g. 512344"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNewPyqModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewPyq}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Document Modal */}
      {editDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Rename Document
            </h3>
            <p className="text-xs text-slate-500">
              Update the display name of this examination paper or answer document.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Filename:
              </label>
              <input
                type="text"
                value={editFilename}
                onChange={(e) => setEditFilename(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
        onUploadAnswer={(qpId) => {
          setUploadTargetQP(qpId);
          setUploadModalOpen(true);
        }}
      />

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        defaultCategory="SEMESTER"
        defaultExamCode={activeExamCode}
        defaultQuestionPaperIdToLink={uploadTargetQP}
        onUploadSuccess={refreshDocuments}
      />
    </div>
  );
}
