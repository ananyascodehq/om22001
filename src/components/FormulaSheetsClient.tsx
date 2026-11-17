"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MathView } from "@/components/MathView";
import { DocumentViewerModal } from "@/components/DocumentViewerModal";
import { UploadModal } from "@/components/UploadModal";
import {
  Sigma,
  Printer,
  Upload,
  Edit3,
  Plus,
  Trash2,
  Save,
  X,
  FileText,
  Download,
  Eye,
  Folder,
} from "lucide-react";

interface FormulaItem {
  name: string;
  latex: string;
  notes?: string;
}

interface FormulaSection {
  title: string;
  items: FormulaItem[];
}

interface UnitFormulaSheet {
  unitNumber: number;
  unitTitle: string;
  coNumber: string;
  description: string;
  sections: FormulaSection[];
  uploadedPdfs?: Array<{
    id: string;
    originalFilename: string;
    fileSize: number;
  }>;
}

interface FormulaSheetsClientProps {
  initialSheets: UnitFormulaSheet[];
}

function cloneSections(sheet: UnitFormulaSheet | undefined): FormulaSection[] {
  return JSON.parse(JSON.stringify(sheet?.sections || []));
}

export function FormulaSheetsClient({ initialSheets }: FormulaSheetsClientProps) {
  const [sheets, setSheets] = useState<UnitFormulaSheet[]>(initialSheets);
  const [activeUnit, setActiveUnit] = useState<number>(1);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentSheet = sheets.find((s) => s.unitNumber === activeUnit) || sheets[0];

  const [editSections, setEditSections] = useState<FormulaSection[]>(() =>
    cloneSections(currentSheet)
  );

  // Reset the editable copy whenever the visible sheet changes (adjusting state
  // during render rather than in an effect).
  const [syncedSheet, setSyncedSheet] = useState(currentSheet);
  if (syncedSheet !== currentSheet) {
    setSyncedSheet(currentSheet);
    if (currentSheet) setEditSections(cloneSections(currentSheet));
  }

  const handleStartEdit = () => {
    if (currentSheet) {
      setEditSections(cloneSections(currentSheet));
      setIsEditing(true);
    }
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/formulas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitNumber: activeUnit,
          sections: editSections,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSheets((prev) =>
          prev.map((s) => (s.unitNumber === activeUnit ? { ...s, sections: editSections } : s))
        );
        setIsEditing(false);
      } else {
        alert(data.error || "Failed to save formula sheet");
      }
    } catch (e) {
      console.error("Save error:", e);
      alert("Failed to save formula sheet");
    } finally {
      setSaving(false);
    }
  };

  const handleAddFormulaItem = (sectionIdx: number) => {
    const updated = [...editSections];
    updated[sectionIdx].items.push({
      name: "New Formula",
      latex: "y = mx + c",
      notes: "Formula description and conditions",
    });
    setEditSections(updated);
  };

  const handleRemoveFormulaItem = (sectionIdx: number, itemIdx: number) => {
    const updated = [...editSections];
    updated[sectionIdx].items.splice(itemIdx, 1);
    setEditSections(updated);
  };

  const handleAddSection = () => {
    setEditSections([
      ...editSections,
      {
        title: "New Topic / Formula Group",
        items: [
          {
            name: "Formula Name",
            latex: "\\bar{x} = \\frac{\\sum x_i}{n}",
            notes: "Formula notes",
          },
        ],
      },
    ]);
  };

  const refreshFormulas = async () => {
    try {
      const res = await fetch("/api/formulas");
      const data = await res.json();
      if (data.success) {
        setSheets(data.formulaSheets);
      }
    } catch (e) {
      console.error("Refresh error:", e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-blue-900 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">Formula Sheets</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-950 dark:text-white flex items-center gap-2">
            <Sigma className="w-6 h-6 text-blue-900 dark:text-blue-400" />
            Formula Sheets – OM22001 Statistical Methods for Engineers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated unit-wise formula repository. View, edit with KaTeX math live preview, or upload PDF sheets.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm"
          >
            <Upload className="w-4 h-4 text-blue-900 dark:text-blue-400" />
            <span>Upload PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950 text-white text-xs font-semibold hover:bg-blue-900 transition shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* 5 Separate Unit Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 print:hidden">
        {[
          { num: 1, title: "Descriptive Statistics", co: "CO1" },
          { num: 2, title: "Large Sample Tests", co: "CO2" },
          { num: 3, title: "Small Sample Tests", co: "CO3" },
          { num: 4, title: "Analysis of Variance", co: "CO4" },
          { num: 5, title: "Quality Control", co: "CO5" },
        ].map((u) => {
          const isActive = activeUnit === u.num;
          return (
            <button
              key={u.num}
              onClick={() => {
                setActiveUnit(u.num);
                setIsEditing(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                isActive
                  ? "bg-blue-950 text-white border-blue-950 shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  Unit {u.num} • {u.co}
                </span>
                <Folder className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-400"}`} />
              </div>
              <h4 className="text-xs font-bold leading-snug line-clamp-2">
                {u.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Unit Formula Sheet Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
        {/* Unit Header & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-mono">
                {currentSheet?.coNumber || `CO${activeUnit}`}
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Unit {activeUnit} – {currentSheet?.unitTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentSheet?.description}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save Formulas"}</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                <span>Edit Formula Sheet</span>
              </button>
            )}
          </div>
        </div>

        {/* Uploaded PDF sheets if any */}
        {currentSheet?.uploadedPdfs && currentSheet.uploadedPdfs.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-900" />
              Uploaded PDF Formula Sheets ({currentSheet.uploadedPdfs.length}):
            </h5>
            <div className="flex flex-wrap gap-2">
              {currentSheet.uploadedPdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs">
                    {pdf.originalFilename}
                  </span>
                  <button
                    onClick={() => setSelectedDocId(pdf.id)}
                    className="p-1 text-slate-500 hover:text-blue-900"
                    title="Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`/api/documents/${pdf.id}/download`}
                    className="p-1 text-slate-500 hover:text-slate-900"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= EDIT MODE ================= */}
        {isEditing ? (
          <div className="space-y-6">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300">
              💡 <strong>Formula Editor:</strong> Type mathematical expressions using LaTeX syntax (e.g. <code>\bar&#123;x&#125; = \frac&#123;\sum x_i&#125;&#123;n&#125;</code>, <code>\sigma^2</code>, <code>\sqrt&#123;n&#125;</code>, Greek letters like <code>\mu</code>, <code>\alpha</code>, <code>\chi^2</code>). The preview updates live below.
            </div>

            {editSections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-800/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => {
                      const updated = [...editSections];
                      updated[sIdx].title = e.target.value;
                      setEditSections(updated);
                    }}
                    placeholder="Section Title"
                    className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-700 pb-1 w-full focus:outline-none focus:border-blue-900"
                  />
                  <button
                    onClick={() => {
                      const updated = [...editSections];
                      updated.splice(sIdx, 1);
                      setEditSections(updated);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 shrink-0"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {sec.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...editSections];
                            updated[sIdx].items[iIdx].name = e.target.value;
                            setEditSections(updated);
                          }}
                          placeholder="Formula Name (e.g. Arithmetic Mean)"
                          className="font-semibold text-xs text-slate-900 dark:text-white bg-transparent border-b border-slate-200 dark:border-slate-800 pb-0.5 w-full focus:outline-none"
                        />
                        <button
                          onClick={() => handleRemoveFormulaItem(sIdx, iIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                          LaTeX Equation:
                        </label>
                        <input
                          type="text"
                          value={item.latex}
                          onChange={(e) => {
                            const updated = [...editSections];
                            updated[sIdx].items[iIdx].latex = e.target.value;
                            setEditSections(updated);
                          }}
                          placeholder="e.g. \bar{x} = \frac{\sum x_i}{n}"
                          className="w-full font-mono text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Live Formula Preview */}
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Live Render Preview:
                        </span>
                        <div className="text-slate-900 dark:text-white overflow-x-auto py-1">
                          <MathView text={`$$${item.latex}$$`} block={true} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                          Notes / Description:
                        </label>
                        <input
                          type="text"
                          value={item.notes || ""}
                          onChange={(e) => {
                            const updated = [...editSections];
                            updated[sIdx].items[iIdx].notes = e.target.value;
                            setEditSections(updated);
                          }}
                          placeholder="Conditions, degrees of freedom, or usage tips"
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddFormulaItem(sIdx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:border-slate-400"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Formula to this Section</span>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleAddSection}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-blue-900 hover:text-blue-900 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Topic Section</span>
            </button>
          </div>
        ) : (
          /* ================= VIEW MODE ================= */
          <div className="space-y-8">
            {currentSheet?.sections && currentSheet.sections.length > 0 ? (
              currentSheet.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-950 dark:text-blue-300 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                    {section.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5"
                      >
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </h4>

                        <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto text-sm text-slate-900 dark:text-slate-100 flex items-center justify-center min-h-[52px]">
                          <MathView text={`$$${item.latex}$$`} block={true} />
                        </div>

                        {item.notes && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                            <MathView text={item.notes} />
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p className="text-xs">No formulas added yet for this unit.</p>
                <button
                  onClick={handleStartEdit}
                  className="mt-2 text-xs font-bold text-blue-900 underline"
                >
                  Click to add formulas
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <DocumentViewerModal
        documentId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        defaultCategory="STUDY_MATERIAL"
        defaultExamCode=""
        onUploadSuccess={refreshFormulas}
      />
    </div>
  );
}

