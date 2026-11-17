"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  FileText,
  CheckCircle2,
  Link as LinkIcon,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { getChatGptAnswerUrl } from "@/lib/answerLinks";
import { PinCommentViewer } from "./PinCommentViewer";

export interface ViewerDocument {
  id: string;
  originalFilename: string;
  category: "FAT" | "SEMESTER" | "STUDY_MATERIAL";
  subfolder: string;
  documentType: string;
  fileType: string;
  fileSize: number;
  description?: string | null;
  tags?: string | null;
  createdAt: string;
  storagePath: string;
  examination?: {
    code: string;
    title: string;
  } | null;
  unit?: {
    unitNumber: number;
    title: string;
  } | null;
}

interface DocumentViewerModalProps {
  documentId: string | null;
  onClose: () => void;
  onSelectDocument?: (id: string) => void;
  onUploadAnswer?: (questionPaperId: string) => void;
}

export function DocumentViewerModal({
  documentId,
  onClose,
  onSelectDocument,
  onUploadAnswer,
}: DocumentViewerModalProps) {
  const [doc, setDoc] = useState<ViewerDocument | null>(null);
  const [associatedAnswers, setAssociatedAnswers] = useState<ViewerDocument[]>([]);
  const [associatedQuestionPapers, setAssociatedQuestionPapers] = useState<ViewerDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Open sidebar by default on large desktop screens only
    if (typeof window !== "undefined" && window.innerWidth >= 1280) {
      setSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!documentId) return;

    let isMounted = true;
    setLoading(true);
    fetch(`/api/documents/${documentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success) {
          setDoc(data.document);
          setAssociatedAnswers(data.associatedAnswers || []);
          setAssociatedQuestionPapers(data.associatedQuestionPapers || []);
        }
      })
      .catch((err) => console.error("Error loading document:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [documentId]);

  if (!documentId) return null;

  const isPdf = doc?.fileType === "pdf";
  const isImage = ["png", "jpg", "jpeg"].includes(doc?.fileType || "");
  const isJson = doc?.fileType === "json";

  const previewUrl = `/api/documents/${documentId}/preview?v=${doc?.fileSize || 0}`;
  const downloadUrl = `/api/documents/${documentId}/download`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-[#060b18]/95 bg-black/75 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-white dark:bg-[#0a1628] rounded-2xl border border-slate-200 dark:border-[#1a2d4a] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-6xl h-[92vh]"
        }`}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b dark:border-b dark:border-[#1a2d4a] border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-[#0a1628]">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1a2d4a] text-xs font-semibold text-slate-700 dark:bg-[#1a2d4a] dark:text-[#93c5fd] hover:bg-slate-100 dark:hover:bg-[#1d2f4d] transition shrink-0"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden min-w-0">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-[#e8f4ff] truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-md">
                {doc?.originalFilename || "Loading document..."}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-[#7ea8cc] mt-0.5">
                {doc?.category && (
                  <span className="px-1.5 sm:px-2 py-0.5 rounded font-semibold text-[9px] sm:text-[10px] bg-slate-200 dark:bg-[#1a2d4a] text-slate-800 dark:text-[#60a5fa]">
                    {doc.category}
                  </span>
                )}
                {doc?.examination && (
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-[100px] sm:max-w-none">
                    {doc.examination.title}
                  </span>
                )}
                {doc?.unit && (
                  <span className="text-[10px] sm:text-[11px] text-sky-600 dark:text-sky-400 font-medium">
                    Unit {doc.unit.unitNumber}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 mr-1">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 20))}
                className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-1 text-slate-500">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 20))}
                className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1a2d4a] text-xs font-medium text-slate-700 dark:bg-[#1a2d4a] dark:text-[#7ea8cc] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Toggle Details & Q&A Panel"
            >
              <LinkIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="hidden sm:inline">{sidebarOpen ? "Hide Details" : "Show Details"}</span>
              <span className="inline sm:hidden">{sidebarOpen ? "Hide" : "Info"}</span>
            </button>

            {doc && getChatGptAnswerUrl(doc) && (
              <a
                href={getChatGptAnswerUrl(doc)!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm shadow-emerald-500/20 transition"
                title="Open worked solutions on ChatGPT"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Answers on ChatGPT</span>
                <span className="inline md:hidden">ChatGPT</span>
              </a>
            )}

            <a
              href={downloadUrl}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl dark:bg-[#1d6fce] dark:hover:bg-[#2278e0] dark:text-white bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm shadow-blue-500/20"
              title="Download Original File"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden sm:flex p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl dark:text-[#7ea8cc] dark:hover:text-[#e8f4ff] text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition shrink-0"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Viewer */}
          <div className="flex-1 dark:bg-[#060b18] bg-slate-100/60 overflow-auto flex items-center justify-center p-2 sm:p-4">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs">Loading document...</p>
              </div>
            ) : isPdf ? (
              <div className="flex flex-col w-full h-full">
                <div className="sm:hidden flex items-center justify-between px-3 py-1.5 mb-1.5 rounded-lg bg-slate-200 dark:bg-[#1a2d4a] text-[11px] shrink-0">
                  <span className="font-semibold text-slate-700 dark:text-[#93c5fd] truncate">PDF Preview</span>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]"
                  >
                    <Download className="w-3 h-3" />
                    <span>Open in Tab</span>
                  </a>
                </div>
                <PinCommentViewer
                  documentId={documentId}
                  src={previewUrl}
                  kind="pdf"
                  zoom={zoom}
                  title={doc?.originalFilename}
                />
              </div>
            ) : isImage ? (
              <div className="w-full h-full">
                <PinCommentViewer
                  documentId={documentId}
                  src={previewUrl}
                  kind="image"
                  zoom={zoom}
                  title={doc?.originalFilename}
                />
              </div>
            ) : (
              <div className="max-w-md p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {doc?.originalFilename}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct browser preview is not supported for this file format ({doc?.fileType.toUpperCase()}).
                  </p>
                </div>
                <a
                  href={downloadUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs hover:bg-sky-500 transition shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File to View</span>
                </a>
              </div>
            )}
          </div>

          {/* Right Information & Q&A Association Side Panel */}
          {sidebarOpen && doc && (
            <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto md:static z-30 w-full sm:w-96 md:w-80 lg:w-96 dark:border-l dark:border-[#1a2d4a] border-l border-slate-200 dark:bg-[#0a1628] bg-white overflow-y-auto p-4 sm:p-5 space-y-5 sm:space-y-6 shrink-0 text-xs shadow-2xl md:shadow-none animate-in slide-in-from-right duration-200">
              {/* Mobile Close Button for Details Drawer */}
              <div className="flex md:hidden items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1a2d4a]">
                <span className="font-bold text-slate-900 dark:text-[#e8f4ff] text-sm">Document Details</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg dark:text-[#7ea8cc] text-slate-500 hover:bg-slate-100 dark:hover:bg-[#1a2d4a]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Relationship Section: Question Paper ↔ Answers */}
              <div className="space-y-3 pb-5 dark:border-b dark:border-[#1a2d4a] border-b border-slate-100">
                <h4 className="font-bold dark:text-[#4a7fa0] text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-sky-500" />
                  Linked Q&A Association
                </h4>

                {doc.documentType === "QUESTION_PAPER" ? (
                  <div className="space-y-2">
                    <p className="text-slate-500 dark:text-[#7ea8cc] text-[11px]">
                      Worked answers associated with this Question Paper:
                    </p>
                    {associatedAnswers.length > 0 ? (
                      <div className="space-y-2">
                        {associatedAnswers.map((ans) => (
                          <div
                            key={ans.id}
                            onClick={() => onSelectDocument && onSelectDocument(ans.id)}
                            className="cursor-pointer group p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400 transition"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                                {ans.originalFilename}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                              Click to view worked solution
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : doc && getChatGptAnswerUrl(doc) ? (
                      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                        <p className="text-slate-900 dark:text-white font-semibold text-xs">
                          Worked Solutions on ChatGPT
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Complete step-by-step solved answers are available directly on ChatGPT.
                        </p>
                        <a
                          href={getChatGptAnswerUrl(doc)!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-500 transition shadow-sm shadow-emerald-500/20"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Answers on ChatGPT</span>
                        </a>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl dark:bg-[#0d1b33] dark:border-[#1a2d4a] bg-slate-50 border border-slate-200 text-center space-y-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 mx-auto" />
                        <p className="dark:text-[#7ea8cc] text-slate-600 font-semibold text-xs">
                          Solutions available via examination repository
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-slate-500 dark:text-[#7ea8cc] text-[11px]">
                      This is an Answer Document. Associated Question Paper:
                    </p>
                    {associatedQuestionPapers.length > 0 ? (
                      <div className="space-y-2">
                        {associatedQuestionPapers.map((qp) => (
                          <div
                            key={qp.id}
                            onClick={() => onSelectDocument && onSelectDocument(qp.id)}
                            className="cursor-pointer group p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60 hover:border-sky-400 transition"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sky-800 dark:text-sky-300">
                                {qp.originalFilename}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-sky-600 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <span className="text-[10px] text-sky-600 dark:text-sky-400 block mt-0.5">
                              Click to view question paper
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic text-[11px]">
                        No specific Question Paper linked to this answer file.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Document Metadata Details */}
              <div className="space-y-3">
                <h4 className="font-bold dark:text-[#4a7fa0] text-slate-900 uppercase tracking-wider text-[11px] dark:border-b dark:border-[#1a2d4a] pb-1.5">
                  Document Information
                </h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="dark:text-[#4a7fa0] text-slate-400">Category:</span>
                    <span className="font-semibold dark:text-[#93c5fd] text-slate-900">{doc.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="dark:text-[#4a7fa0] text-slate-400">Storage Subfolder:</span>
                    <span className="font-mono text-[11px] dark:text-[#93c5fd]">{doc.subfolder}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="dark:text-[#4a7fa0] text-slate-400">File Type:</span>
                    <span className="font-mono uppercase dark:text-[#93c5fd]">{doc.fileType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="dark:text-[#4a7fa0] text-slate-400">File Size:</span>
                    <span className="dark:text-[#93c5fd]">{(doc.fileSize / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="dark:text-[#4a7fa0] text-slate-400">Upload Date:</span>
                    <span className="dark:text-[#93c5fd]">{new Date(doc.createdAt).toLocaleDateString()}</span>
                  </div>
                  {doc.description && (
                    <div className="pt-2">
                      <span className="dark:text-[#4a7fa0] text-slate-400 block mb-1">Description:</span>
                      <p className="p-2.5 rounded-lg dark:bg-[#0d1b33] dark:text-[#7ea8cc] bg-slate-50 text-[11px] leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  )}
                  {doc.tags && (
                    <div className="pt-2">
                      <span className="dark:text-[#4a7fa0] text-slate-400 block mb-1">Tags:</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.split(",").map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] dark:bg-[#1a2d4a] dark:text-[#4a7fa0] bg-slate-100 text-slate-600"
                          >
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
