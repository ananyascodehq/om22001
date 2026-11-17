"use client";

import React from "react";
import { X, ExternalLink, CheckCircle2, Link as LinkIcon, ArrowRight } from "lucide-react";
import { getChatGptAnswerUrl } from "@/lib/answerLinks";
import { formatFileSize } from "@/lib/documents";
import type { ViewerDocument } from "@/components/documents/DocumentViewerModal";

interface DocumentDetailsPanelProps {
  doc: ViewerDocument;
  associatedAnswers: ViewerDocument[];
  associatedQuestionPapers: ViewerDocument[];
  onSelectDocument?: (id: string) => void;
  /** Closes the panel (shown as a button on mobile, where it covers the screen). */
  onClose: () => void;
}

/** Right-hand panel of the document viewer: Q&A links and file metadata. */
export function DocumentDetailsPanel({
  doc,
  associatedAnswers,
  associatedQuestionPapers,
  onSelectDocument,
  onClose,
}: DocumentDetailsPanelProps) {
  return (
    <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto md:static z-30 w-full sm:w-96 md:w-80 lg:w-96 dark:border-l dark:border-[#1a2d4a] border-l border-slate-200 dark:bg-[#0a1628] bg-white overflow-y-auto p-4 sm:p-5 space-y-5 sm:space-y-6 shrink-0 text-xs shadow-2xl md:shadow-none animate-in slide-in-from-right duration-200">
      {/* Mobile Close Button for Details Drawer */}
      <div className="flex md:hidden items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1a2d4a]">
        <span className="font-bold text-slate-900 dark:text-[#e8f4ff] text-sm">Document Details</span>
        <button
          onClick={onClose}
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
                    onClick={() => onSelectDocument?.(ans.id)}
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
            ) : getChatGptAnswerUrl(doc) ? (
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
                    onClick={() => onSelectDocument?.(qp.id)}
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
            <span className="dark:text-[#93c5fd]">{formatFileSize(doc.fileSize)}</span>
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
  );
}
