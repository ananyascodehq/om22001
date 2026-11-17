"use client";

import React, { useState } from "react";
import type { DocumentPatch } from "@/lib/documents";

interface EditableDocument {
  id: string;
  originalFilename: string;
  description?: string | null;
  tags?: string | null;
}

interface EditDocumentModalProps {
  /** The document being edited; the modal is hidden while this is null. */
  doc: EditableDocument | null;
  onClose: () => void;
  /** Should resolve true when saved, which closes the modal. */
  onSave: (id: string, patch: DocumentPatch) => Promise<boolean>;
  /** Also edit description and tags (Study Materials). Defaults to filename only. */
  withMetadata?: boolean;
  /** Heading; defaults to "Rename Document" (or "Edit Document" with metadata). */
  title?: string;
  /** Helper text under the title. */
  description?: string;
  filenameLabel?: string;
  accent?: "sky" | "amber" | "indigo" | "emerald";
}

// Full class names so Tailwind can see them at build time.
const ACCENTS = {
  sky: { ring: "focus:ring-sky-500", button: "bg-sky-600 hover:bg-sky-500" },
  amber: { ring: "focus:ring-amber-500", button: "bg-amber-500 hover:bg-amber-600" },
  indigo: { ring: "focus:ring-indigo-500", button: "bg-indigo-600 hover:bg-indigo-500" },
  emerald: { ring: "focus:ring-emerald-500", button: "bg-emerald-600 hover:bg-emerald-500" },
} as const;

export function EditDocumentModal(props: EditDocumentModalProps) {
  if (!props.doc) return null;
  // Keyed by document so the form fields reset whenever a different one is opened.
  return <EditForm key={props.doc.id} {...props} doc={props.doc} />;
}

function EditForm({
  doc,
  onClose,
  onSave,
  withMetadata = false,
  title,
  description = "Update the display name of this document.",
  filenameLabel = "Filename:",
  accent = "sky",
}: EditDocumentModalProps & { doc: EditableDocument }) {
  const [filename, setFilename] = useState(doc.originalFilename);
  const [desc, setDesc] = useState(doc.description || "");
  const [tags, setTags] = useState(doc.tags || "");
  const styles = ACCENTS[accent];

  const inputClass = `w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${styles.ring}`;

  async function save() {
    // The filename is required: ignore clicks while it is blank.
    if (!filename.trim()) return;
    const patch: DocumentPatch = { originalFilename: filename.trim() };
    if (withMetadata) {
      patch.description = desc.trim();
      patch.tags = tags.trim();
    }
    if (await onSave(doc.id, patch)) onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {title ?? (withMetadata ? "Edit Document" : "Rename Document")}
        </h3>
        {!withMetadata && <p className="text-xs text-slate-500">{description}</p>}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              {filenameLabel}
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className={inputClass}
            />
          </div>
          {withMetadata && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Description:
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tags (comma separated):
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className={inputClass}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white ${styles.button}`}
          >
            {withMetadata ? "Save Changes" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
