"use client";

import React, { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { ClassificationResult } from "@/lib/documentClassifier";
import { formatFileSize } from "@/lib/documents";

interface StagedFile {
  id: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  stagingKey: string;
  extractedSnippet: string;
  classification: ClassificationResult;
  // User overrides
  confirmedCategory: "FAT" | "SEMESTER" | "STUDY_MATERIAL";
  confirmedExamCode: string;
  confirmedDocType: string;
  confirmedSubfolder: string;
  confirmedUnitNumber: number | "";
  description: string;
  tags: string;
  questionPaperIdToLink?: string;
  status: "PENDING_CONFIRMATION" | "UPLOADING" | "COMPLETED" | "ERROR";
  errorMessage?: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
  defaultCategory?: "FAT" | "SEMESTER" | "STUDY_MATERIAL";
  defaultExamCode?: string;
  defaultQuestionPaperIdToLink?: string;
}

export function UploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
  defaultCategory,
  defaultExamCode,
  defaultQuestionPaperIdToLink,
}: UploadModalProps) {
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [activeStep, setActiveStep] = useState<"SELECT" | "REVIEW">("SELECT");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const updateStagedFile = (id: string, updates: Partial<StagedFile>) => {
    setStagedFiles((files) =>
      files.map((file) => (file.id === id ? { ...file, ...updates } : file))
    );
  };

  const removeRemoteStagingFile = (stagingKey: string) => {
    void fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stagingKey }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Staged upload cleanup failed (${response.status})`);
        }
      })
      .catch((error) => console.error("Could not remove staged upload:", error));
  };

  const handleClose = () => {
    stagedFiles
      .filter((file) => file.status === "PENDING_CONFIRMATION" || file.status === "ERROR")
      .forEach((file) => removeRemoteStagingFile(file.stagingKey));
    onClose();
  };

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newStaged: StagedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let stagingKey: string | null = null;

      try {
        const safeFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "upload";
        const uploaded = await upload(
          `staging/${crypto.randomUUID()}/${safeFilename}`,
          file,
          {
            access: "private",
            handleUploadUrl: "/api/upload",
          }
        );
        stagingKey = uploaded.pathname;

        const res = await fetch("/api/upload/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stagingKey, originalFilename: file.name }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          const c: ClassificationResult = data.classification;
          newStaged.push({
            id: stagingKey,
            originalFilename: data.originalFilename,
            fileType: data.fileType,
            fileSize: data.fileSize,
            stagingKey,
            extractedSnippet: data.extractedSnippet,
            classification: c,
            confirmedCategory: defaultCategory || c.category,
            confirmedExamCode: defaultExamCode || c.examinationCode || "FAT_1",
            confirmedDocType: c.documentType,
            confirmedSubfolder: c.subfolder,
            confirmedUnitNumber: c.unitNumber || "",
            description: "",
            tags: "",
            questionPaperIdToLink: defaultQuestionPaperIdToLink,
            status: "PENDING_CONFIRMATION",
          });
        } else {
          throw new Error(data.error || "Failed to classify uploaded file");
        }
      } catch (err) {
        console.error("Error staging file:", err);
        if (stagingKey) {
          removeRemoteStagingFile(stagingKey);
        }
      }
    }

    setStagedFiles((prev) => [...prev, ...newStaged]);
    setIsProcessing(false);
    if (newStaged.length > 0) {
      setActiveStep("REVIEW");
    }
  };

  const handleConfirmSingle = async (staged: StagedFile) => {
    updateStagedFile(staged.id, { status: "UPLOADING", errorMessage: undefined });
    try {
      const res = await fetch("/api/documents/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stagingKey: staged.stagingKey,
          originalFilename: staged.originalFilename,
          category: staged.confirmedCategory,
          examinationCode: staged.confirmedExamCode,
          documentType: staged.confirmedDocType,
          subfolder: staged.confirmedSubfolder,
          unitNumber: staged.confirmedUnitNumber || null,
          description: staged.description,
          tags: staged.tags,
          questionPaperIdToLink: staged.questionPaperIdToLink,
        }),
      });

      const data: { success?: boolean; error?: string } = await res.json();
      if (res.ok && data.success) {
        updateStagedFile(staged.id, { status: "COMPLETED" });
      } else {
        updateStagedFile(staged.id, {
          status: "ERROR",
          errorMessage: data.error || "Failed to confirm upload",
        });
      }
    } catch (error: unknown) {
      updateStagedFile(staged.id, {
        status: "ERROR",
        errorMessage:
          error instanceof Error ? error.message : "Failed to confirm upload",
      });
    }
  };

  const handleConfirmAll = async () => {
    const pending = stagedFiles.filter((f) => f.status === "PENDING_CONFIRMATION");
    for (const f of pending) {
      await handleConfirmSingle(f);
    }
    if (onUploadSuccess) onUploadSuccess();
  };

  const removeStaged = (id: string) => {
    const staged = stagedFiles.find((file) => file.id === id);
    if (staged?.status === "UPLOADING") return;
    if (staged && staged.status !== "COMPLETED") {
      removeRemoteStagingFile(staged.stagingKey);
    }
    setStagedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const allCompleted =
    stagedFiles.length > 0 && stagedFiles.every((f) => f.status === "COMPLETED");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-[#060b18]/90 bg-black/70 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="dark:bg-[#0a1628] bg-white dark:border-[#1a2d4a] rounded-2xl border border-slate-200 shadow-2xl shadow-black/50 w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-b dark:border-[#1a2d4a] dark:bg-[#080e1c] flex items-center justify-between gap-3">
          <div className="overflow-hidden">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 truncate">
              <Upload className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span className="text-slate-900 dark:bg-gradient-to-r dark:from-[#e8f4ff] dark:to-[#93c5fd] dark:bg-clip-text dark:text-transparent truncate">
                Upload Document
              </span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
              Intelligent multi-file upload with automated classification and verification.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl dark:text-[#7ea8cc] dark:hover:text-[#e8f4ff] text-slate-400 hover:text-slate-700 transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-4 flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              activeStep === "SELECT"
                ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white shadow-sm"
                : "dark:bg-[#1a2d4a] dark:text-[#4a7fa0] bg-slate-100 text-slate-500"
            }`}
          >
            <span>1</span>
            <span>Select Files</span>
          </div>
          <div className="flex-1 h-px dark:bg-[#1a2d4a] bg-slate-200" />
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              activeStep === "REVIEW"
                ? "bg-gradient-to-r from-[#1d6fce] to-[#0d9488] text-white shadow-sm"
                : "dark:bg-[#1a2d4a] dark:text-[#4a7fa0] bg-slate-100 text-slate-500"
            }`}
          >
            <span>2</span>
            <span>Classify & Confirm</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeStep === "SELECT" || stagedFiles.length === 0 ? (
            /* Drag and Drop Zone */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 rounded-2xl p-10 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-sky-500 bg-sky-50/50 dark:bg-sky-950/20"
                  : "dark:border-[#1a2d4a] dark:border-dashed dark:hover:border-[#2278e0]/60 dark:bg-[#0d1b33] dark:hover:bg-[#0d1b33]/80 border-slate-300 border-dashed hover:border-sky-400 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,.png,.jpg,.jpeg"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1d6fce]/20 to-[#0d9488]/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                {isProcessing ? (
                  <RefreshCw className="w-8 h-8 animate-spin" />
                ) : (
                  <Upload className="w-8 h-8" />
                )}
              </div>

              <h4 className="text-base font-bold dark:text-[#e8f4ff] text-slate-900">
                {isProcessing
                  ? "Analyzing document content & structure..."
                  : "Drag and drop files here"}
              </h4>
              <p className="text-xs dark:text-[#7ea8cc] text-slate-500 mt-1 max-w-md mx-auto">
                Supports PDF question papers, worked solution files, handwritten notes (JPG/PNG), slides, and formula sheets up to 50MB.{" "}
                <span className="dark:text-cyan-400 text-sky-600 font-medium">or click to browse</span>
              </p>
            </div>
          ) : (
            /* Smart Classification Review Screen */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider dark:text-[#4a7fa0] text-slate-400">
                  Classification Confirmation ({stagedFiles.length} file{stagedFiles.length > 1 ? "s" : ""})
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  + Add more files
                </button>
              </div>

              <div className="space-y-4">
                {stagedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-5 rounded-2xl dark:bg-[#0d1b33] dark:border-[#1a2d4a] bg-slate-50 border border-slate-200 space-y-4"
                  >
                    {/* Top Row: File Name & Detected Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0 overflow-hidden flex-1">
                        <FileText className="w-5 h-5 text-sky-500 shrink-0" />
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <h5 className="font-bold text-xs sm:text-sm dark:text-[#e8f4ff] text-slate-900 truncate">
                            {file.originalFilename}
                          </h5>
                          <span className="text-[11px] dark:text-[#4a7fa0] text-slate-400">
                            {formatFileSize(file.fileSize)} • {file.fileType.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <Sparkles className="w-3 h-3" />
                          {Math.round(file.classification.confidence * 100)}% Match
                        </span>
                        {file.status === "COMPLETED" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                          </span>
                        ) : (
                          <button
                            onClick={() => removeStaged(file.id)}
                            disabled={file.status === "UPLOADING"}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Detected Reasons Tagline */}
                    {file.classification.reasons.length > 0 && (
                      <div className="p-2.5 rounded-xl dark:bg-[#0a1628] dark:border-[#1a2d4a] bg-white border border-slate-200/80 text-[11px] dark:text-[#7ea8cc] text-slate-600 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{file.classification.reasons.join(" • ")}</span>
                      </div>
                    )}

                    {/* Classification Selectors Form */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {/* Category */}
                      <div>
                        <label className="block font-semibold dark:text-[#7ea8cc] text-slate-500 mb-1">
                          Category:
                        </label>
                        <select
                          value={file.confirmedCategory}
                          onChange={(e) => {
                            const category = e.target.value;
                            if (
                              category === "FAT" ||
                              category === "SEMESTER" ||
                              category === "STUDY_MATERIAL"
                            ) {
                              updateStagedFile(file.id, {
                                confirmedCategory: category,
                              });
                            }
                          }}
                          className="w-full text-xs rounded-lg border border-slate-200 dark:border-[#1a2d4a] dark:bg-[#0d1b33] dark:text-[#e8f4ff] dark:focus:border-[#2278e0]/60 bg-white text-slate-900 p-2"
                        >
                          <option value="FAT">FAT Examination</option>
                          <option value="SEMESTER">Semester Examination</option>
                          <option value="STUDY_MATERIAL">Study Materials & Notes</option>
                        </select>
                      </div>

                      {/* Examination */}
                      {file.confirmedCategory !== "STUDY_MATERIAL" ? (
                        <div>
                          <label className="block font-semibold dark:text-[#7ea8cc] text-slate-500 mb-1">
                            Examination:
                          </label>
                          <select
                            value={file.confirmedExamCode}
                            onChange={(e) => {
                              updateStagedFile(file.id, {
                                confirmedExamCode: e.target.value,
                              });
                            }}
                            className="w-full text-xs rounded-lg border border-slate-200 dark:border-[#1a2d4a] dark:bg-[#0d1b33] dark:text-[#e8f4ff] dark:focus:border-[#2278e0]/60 bg-white text-slate-900 p-2"
                          >
                            {file.confirmedCategory === "FAT" ? (
                              <>
                                <option value="FAT_1">FAT 1</option>
                                <option value="FAT_2">FAT 2</option>
                                <option value="FAT_3">FAT 3 (Model Exam)</option>
                              </>
                            ) : (
                              <>
                                <option value="SEM_PYQ_1">SEM PYQ 1 (Dec 2024)</option>
                                <option value="SEM_PYQ_2">SEM PYQ 2 (May 2025)</option>
                                <option value="SEM_PYQ_3">SEM PYQ 3 (Dec 2025)</option>
                                <option value="SEM_PYQ_4">SEM PYQ 4 (May 2026)</option>
                                <option value="SEM_PYQ_5">New Semester PYQ 5</option>
                              </>
                            )}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label className="block font-semibold dark:text-[#7ea8cc] text-slate-500 mb-1">
                            Material Type:
                          </label>
                          <select
                            value={file.confirmedSubfolder}
                            onChange={(e) => {
                              updateStagedFile(file.id, {
                                confirmedSubfolder: e.target.value,
                              });
                            }}
                            className="w-full text-xs rounded-lg border border-slate-200 dark:border-[#1a2d4a] dark:bg-[#0d1b33] dark:text-[#e8f4ff] dark:focus:border-[#2278e0]/60 bg-white text-slate-900 p-2"
                          >
                            <option value="Complete_Notes">Complete Subject Notes</option>
                            <option value="Formula_Sheets">Formula Sheets</option>
                            <option value="Reference_Materials">Reference Materials</option>
                            <option value="Important_Concepts">Important Concepts</option>
                            <option value="Additional_Resources">Additional Resources</option>
                          </select>
                        </div>
                      )}

                      {/* Document Type */}
                      <div>
                        <label className="block font-semibold dark:text-[#7ea8cc] text-slate-500 mb-1">
                          Document Type:
                        </label>
                        <select
                          value={file.confirmedDocType}
                          onChange={(e) => {
                            updateStagedFile(file.id, {
                              confirmedDocType: e.target.value,
                            });
                          }}
                          className="w-full text-xs rounded-lg border border-slate-200 dark:border-[#1a2d4a] dark:bg-[#0d1b33] dark:text-[#e8f4ff] dark:focus:border-[#2278e0]/60 bg-white text-slate-900 p-2"
                        >
                          <option value="QUESTION_PAPER">Question Paper</option>
                          <option value="ANSWER_KEY">Answer Document / Solutions</option>
                          <option value="TWO_MARK_BANK">2 Mark Question Bank</option>
                          <option value="TEN_MARK_BANK">10 Mark Question Bank</option>
                          <option value="NOTES">Study Notes</option>
                          <option value="FORMULA_SHEET">Formula Sheet</option>
                          <option value="REFERENCE">Statistical Table / Ref</option>
                        </select>
                      </div>

                      {/* Unit */}
                      <div>
                        <label className="block font-semibold dark:text-[#7ea8cc] text-slate-500 mb-1">
                          Syllabus Unit:
                        </label>
                        <select
                          value={file.confirmedUnitNumber}
                          onChange={(e) => {
                            updateStagedFile(file.id, {
                              confirmedUnitNumber: e.target.value
                                ? Number(e.target.value)
                                : "",
                            });
                          }}
                          className="w-full text-xs rounded-lg border border-slate-200 dark:border-[#1a2d4a] dark:bg-[#0d1b33] dark:text-[#e8f4ff] dark:focus:border-[#2278e0]/60 bg-white text-slate-900 p-2"
                        >
                          <option value="">Multiple / Entire Subject</option>
                          <option value={1}>Unit 1: Descriptive Statistics</option>
                          <option value={2}>Unit 2: Large Sample Tests</option>
                          <option value={3}>Unit 3: Small Sample Tests</option>
                          <option value={4}>Unit 4: ANOVA & Experiments</option>
                          <option value={5}>Unit 5: Statistical Quality Control</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-[#1a2d4a] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 dark:bg-[#080e1c] bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold dark:bg-[#1a2d4a] dark:text-[#7ea8cc] dark:hover:bg-[#1d2f4d] text-slate-600 hover:bg-slate-100 transition min-h-[44px] flex items-center justify-center"
          >
            {allCompleted ? "Close" : "Cancel"}
          </button>

          {stagedFiles.length > 0 && !allCompleted && (
            <button
              onClick={handleConfirmAll}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1d6fce] to-[#0d9488] hover:from-[#2278e0] hover:to-[#14b8a6] text-white font-semibold text-xs transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Confirm & Upload All Files</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {allCompleted && (
            <button
              onClick={() => {
                onClose();
                if (onUploadSuccess) onUploadSuccess();
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition shadow-md min-h-[44px] flex items-center justify-center"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
