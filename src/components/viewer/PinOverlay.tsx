"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { formatTimeAgo } from "@/lib/format";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import type { PinComment, PinDraft } from "./pins";

const MAX_BODY = 1000;

interface PinOverlayProps {
  page: number;
  comments: PinComment[];
  commentMode: boolean;
  draft: PinDraft | null;
  activeId: string | null;
  onPlace: (draft: PinDraft) => void;
  onSelect: (id: string | null) => void;
  onCancelDraft: () => void;
  onPosted: (comment: PinComment) => void;
  documentId: string;
}

/** Overlay on one page: numbered pins, the open comment, and the new-comment form. */
export function PinOverlay({
  page,
  comments,
  commentMode,
  draft,
  activeId,
  onPlace,
  onSelect,
  onCancelDraft,
  onPosted,
  documentId,
}: PinOverlayProps) {
  const pageComments = comments.filter((c) => c.page === page);
  const activeComment = pageComments.find((c) => c.id === activeId) || null;
  const pageDraft = draft && draft.page === page ? draft : null;

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    // Pins and popovers stop propagation, so this only fires on empty page area.
    if (!commentMode) {
      onSelect(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    onPlace({
      page,
      x: Math.min(1, Math.max(0, x)),
      y: Math.min(1, Math.max(0, y)),
    });
  }

  return (
    <div
      onClick={handleClick}
      className={`absolute inset-0 ${commentMode ? "cursor-crosshair" : ""}`}
    >
      {pageComments.map((c) => {
        const number = comments.indexOf(c) + 1;
        const isActive = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isActive ? null : c.id);
            }}
            style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
            className={`absolute -translate-x-1/2 -translate-y-full flex h-6 min-w-6 items-center justify-center rounded-full rounded-bl-none px-1 text-[11px] font-bold shadow-md ring-2 transition ${
              isActive
                ? "bg-amber-400 text-slate-900 ring-white scale-110 z-20"
                : "bg-sky-600 text-white ring-white hover:bg-sky-500 z-10"
            }`}
            aria-label={`Comment ${number} by ${c.name}`}
          >
            {number}
          </button>
        );
      })}

      {pageDraft && (
        <>
          <span
            style={{ left: `${pageDraft.x * 100}%`, top: `${pageDraft.y * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-full flex h-6 w-6 items-center justify-center rounded-full rounded-bl-none bg-amber-400 text-slate-900 text-xs font-bold shadow-md ring-2 ring-white z-20"
          >
            +
          </span>
          <CommentForm
            documentId={documentId}
            draft={pageDraft}
            onCancel={onCancelDraft}
            onPosted={onPosted}
          />
        </>
      )}

      {activeComment && !pageDraft && (
        <Popover x={activeComment.x} y={activeComment.y}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 break-words">
                {activeComment.name}
              </p>
              <p className="text-[11px] text-slate-400">{formatTimeAgo(activeComment.createdAt)}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Close comment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
            {activeComment.body}
          </p>
        </Popover>
      )}
    </div>
  );
}

function Popover({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  // Open to the left when the pin is near the right edge, upwards when near the bottom.
  const alignRight = x > 0.55;
  const alignUp = y > 0.7;
  const style: React.CSSProperties = {
    top: `${y * 100}%`,
    left: `${x * 100}%`,
    transform: `translate(${alignRight ? "calc(-100% - 8px)" : "8px"}, ${
      alignUp ? "calc(-100% - 4px)" : "4px"
    })`,
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={style}
      className="absolute z-30 w-64 max-w-[80vw] cursor-default rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl"
    >
      {children}
    </div>
  );
}

function CommentForm({
  documentId,
  draft,
  onCancel,
  onPosted,
}: {
  documentId: string;
  draft: PinDraft;
  onCancel: () => void;
  onPosted: (comment: PinComment) => void;
}) {
  const [name, setName] = useState(() =>
    typeof window === "undefined" ? "" : localStorage.getItem(STORAGE_KEYS.commenterName) ?? ""
  );
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/documents/${documentId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, name, body, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not post comment");
        return;
      }
      localStorage.setItem(STORAGE_KEYS.commenterName, name.trim());
      if (data.comment) onPosted(data.comment);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-2.5 py-1.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500";

  return (
    <Popover x={draft.x} y={draft.y}>
      <form onSubmit={submit} className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Comment on this point
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Cancel comment"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="Your name (optional)"
          aria-label="Your name"
          className={inputClass}
        />
        <textarea
          autoFocus
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_BODY}
          rows={3}
          placeholder="Write your comment..."
          aria-label="Comment"
          className={inputClass}
        />
        {/* Honeypot field: hidden from people, tempting to bots */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        {error && (
          <p role="alert" className="text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting || !body.trim()}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 text-xs font-semibold text-white transition"
        >
          <Send className="w-3.5 h-3.5" />
          {submitting ? "Posting..." : "Post comment"}
        </button>
      </form>
    </Popover>
  );
}

