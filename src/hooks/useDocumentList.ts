"use client";

import { useCallback, useState } from "react";
import type { DocumentPatch } from "@/lib/documents";

/**
 * Client-side list of documents with delete / rename-or-edit actions that call
 * the documents API and keep the list in sync. Shared by the FAT, Semester,
 * Study Materials and All Documents browsers.
 */
export function useDocumentList<T extends { id: string; originalFilename: string }>(
  initial: T[]
) {
  const [documents, setDocuments] = useState<T[]>(initial);

  const deleteDocument = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  }, []);

  /** Returns true when the server accepted the change. */
  const updateDocument = useCallback(async (id: string, patch: DocumentPatch) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (data.success) {
        setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
        return true;
      }
    } catch (e) {
      console.error("Update error:", e);
    }
    return false;
  }, []);

  return { documents, setDocuments, deleteDocument, updateDocument };
}
