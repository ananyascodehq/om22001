"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Search,
  FileText,
  Download,
  Trash2,
  RotateCcw,
  Edit2,
} from "lucide-react";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { EditDocumentModal } from "./documents/EditDocumentModal";
import { useDocumentList } from "@/hooks/useDocumentList";
import { formatFileSize, type DocumentSummary } from "@/lib/documents";

interface AllDocumentsClientProps {
  initialDocuments: DocumentSummary[];
}

export function AllDocumentsClient({ initialDocuments }: AllDocumentsClientProps) {
  const { documents, deleteDocument, updateDocument } = useDocumentList(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const [selectedDocType, setSelectedDocType] = useState<string>("ALL");
  const [selectedUnit, setSelectedUnit] = useState<number | "ALL">("ALL");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const [editDoc, setEditDoc] = useState<DocumentSummary | null>(null);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      if (selectedCategory !== "ALL" && doc.category !== selectedCategory) return false;
      if (selectedExam !== "ALL" && doc.examination?.code !== selectedExam) return false;
      if (selectedDocType !== "ALL" && doc.documentType !== selectedDocType) return false;
      if (selectedUnit !== "ALL" && doc.unit?.unitNumber !== selectedUnit) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = doc.originalFilename.toLowerCase().includes(q);
        const matchesDesc = (doc.description || "").toLowerCase().includes(q);
        const matchesTags = (doc.tags || "").toLowerCase().includes(q);
        const matchesExam = (doc.examination?.title || "").toLowerCase().includes(q);
        const matchesUnit = (doc.unit?.title || "").toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTags && !matchesExam && !matchesUnit) {
          return false;
        }
      }
      return true;
    });
  }, [documents, selectedCategory, selectedExam, selectedDocType, selectedUnit, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedExam("ALL");
    setSelectedDocType("ALL");
    setSelectedUnit("ALL");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-sky-600 transition">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">All Documents</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <FolderOpen className="w-7 h-7 text-sky-600" />
              All Documents Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Multi-faceted filter and search engine covering FAT tests, Semester PYQs, and Study Materials.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Ribbon */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by file name, examination title, topic, or tags..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2"
            >
              <option value="ALL">All Categories</option>
              <option value="FAT">FAT Examination</option>
              <option value="SEMESTER">Semester Examination</option>
              <option value="STUDY_MATERIAL">Study Materials & Notes</option>
            </select>
          </div>

          {/* Examination */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Examination
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2"
            >
              <option value="ALL">All Examinations</option>
              <option value="FAT_1">FAT 1</option>
              <option value="FAT_2">FAT 2</option>
              <option value="FAT_3">FAT 3</option>
              <option value="SEM_PYQ_1">SEM PYQ 1 (Dec 2024)</option>
              <option value="SEM_PYQ_2">SEM PYQ 2 (May 2025)</option>
              <option value="SEM_PYQ_3">SEM PYQ 3 (Dec 2025)</option>
              <option value="SEM_PYQ_4">SEM PYQ 4 (May 2026)</option>
            </select>
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Document Type
            </label>
            <select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2"
            >
              <option value="ALL">All Types</option>
              <option value="QUESTION_PAPER">Question Paper</option>
              <option value="ANSWER_KEY">Answers & Solutions</option>
              <option value="TWO_MARK_BANK">2 Mark Bank</option>
              <option value="TEN_MARK_BANK">10 Mark Bank</option>
              <option value="NOTES">Notes</option>
              <option value="FORMULA_SHEET">Formula Sheet</option>
              <option value="REFERENCE">Reference / Tables</option>
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Unit
            </label>
            <select
              value={selectedUnit}
              onChange={(e) =>
                setSelectedUnit(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
              }
              className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2"
            >
              <option value="ALL">All Units</option>
              <option value={1}>Unit 1: Descriptive Statistics</option>
              <option value={2}>Unit 2: Large Sample Tests</option>
              <option value={3}>Unit 3: Small Sample Tests</option>
              <option value={4}>Unit 4: ANOVA & Experiments</option>
              <option value={5}>Unit 5: Statistical Quality Control</option>
            </select>
          </div>
        </div>

        {/* Filter Stats Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>
            Found <strong className="text-slate-900 dark:text-white">{filteredDocs.length}</strong> matching documents
          </span>
          {(searchQuery || selectedCategory !== "ALL" || selectedExam !== "ALL" || selectedDocType !== "ALL" || selectedUnit !== "ALL") && (
            <button
              onClick={resetFilters}
              className="text-sky-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Results */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">
              No matching documents found.
            </p>
            <p className="text-xs text-slate-400">
              Try adjusting your search criteria or resetting filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Target Exam / Unit</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Uploaded</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition cursor-pointer group"
                    onClick={() => setSelectedDocId(doc.id)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-sky-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition block">
                            {doc.originalFilename}
                          </span>
                          {doc.description && (
                            <span className="text-[11px] text-slate-400 line-clamp-1">
                              {doc.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.category === "FAT"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : doc.category === "SEMESTER"
                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        }`}
                      >
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {doc.examination ? doc.examination.title : doc.unit ? `Unit ${doc.unit.unitNumber}` : doc.subfolder}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {doc.documentType.replace(/_/g, " ")}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {formatFileSize(doc.fileSize)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedDocId(doc.id)}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-[11px] hover:bg-slate-200"
                        >
                          View
                        </button>
                        <a
                          href={`/api/documents/${doc.id}/download`}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setEditDoc(doc)}
                          className="p-1 rounded-md text-slate-400 hover:text-sky-600"
                          title="Rename"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id, doc.originalFilename)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditDocumentModal
        doc={editDoc}
        onClose={() => setEditDoc(null)}
        onSave={updateDocument}
        accent="sky"
      />

      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />
    </div>
  );
}

