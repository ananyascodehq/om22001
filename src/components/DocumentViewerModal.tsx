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
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";
import { getChatGptAnswerUrl } from "@/lib/answerLinks";
import { PinCommentViewer } from "./viewer/PinCommentViewer";
import { DocumentDetailsPanel } from "./documents/DocumentDetailsPanel";
import type { DocumentSummary } from "@/lib/documents";

export interface ViewerDocument extends DocumentSummary {
  storagePath: string;
}

interface DocumentViewerModalProps {
  documentId: string | null;
  onClose: () => void;
  onSelectDocument?: (id: string) => void;
}

export function DocumentViewerModal({
  documentId,
  onClose,
  onSelectDocument,
}: DocumentViewerModalProps) {
  const [doc, setDoc] = useState<ViewerDocument | null>(null);
  const [associatedAnswers, setAssociatedAnswers] = useState<ViewerDocument[]>([]);
  const [associatedQuestionPapers, setAssociatedQuestionPapers] = useState<ViewerDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Open the details sidebar by default on large desktop screens only.
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1280
  );

  // Show the spinner as soon as a different document is requested
  // (adjusting state during render rather than inside the fetch effect).
  const [prevDocumentId, setPrevDocumentId] = useState<string | null>(null);
  if (prevDocumentId !== documentId) {
    setPrevDocumentId(documentId);
    if (documentId) setLoading(true);
  }

  useEffect(() => {
    if (!documentId) return;

    let isMounted = true;
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
            <DocumentDetailsPanel
              doc={doc}
              associatedAnswers={associatedAnswers}
              associatedQuestionPapers={associatedQuestionPapers}
              onSelectDocument={onSelectDocument}
              onClose={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
