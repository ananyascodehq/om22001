"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquarePlus, MessageSquare, X, Send } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { STORAGE_KEYS } from "@/lib/storageKeys";

export interface PinComment {
  id: string;
  page: number;
  x: number; // 0..1 of page width
  y: number; // 0..1 of page height
  name: string;
  body: string;
  createdAt: string;
}

interface Draft {
  page: number;
  x: number;
  y: number;
}

interface PinCommentViewerProps {
  documentId: string;
  src: string;
  kind: "pdf" | "image";
  zoom: number;
  title?: string;
}

const POLL_MS = 15000;
const MAX_BODY = 1000;

function timeAgo(iso: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

/* ------------------------------------------------------------------ */
/* Overlay: pins, the "new comment" form and the open comment popover  */
/* ------------------------------------------------------------------ */

interface PageOverlayProps {
  page: number;
  comments: PinComment[];
  commentMode: boolean;
  draft: Draft | null;
  activeId: string | null;
  onPlace: (draft: Draft) => void;
  onSelect: (id: string | null) => void;
  onCancelDraft: () => void;
  onPosted: (comment: PinComment) => void;
  documentId: string;
}

function PageOverlay({
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
}: PageOverlayProps) {
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
              <p className="text-[11px] text-slate-400">{timeAgo(activeComment.createdAt)}</p>
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
  draft: Draft;
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

/* ------------------------------------------------------------------ */
/* A single PDF page, rendered to a canvas only once it scrolls in view */
/* ------------------------------------------------------------------ */

interface PdfPageProps {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  width: number;
  aspect: number; // height / width, used to reserve space before render
  overlay: React.ReactNode;
}

function PdfPage({ pdf, pageNumber, width, aspect, overlay }: PdfPageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageAspect, setPageAspect] = useState(aspect);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || width <= 0) return;
    let cancelled = false;
    let task: { cancel: () => void; promise: Promise<unknown> } | null = null;

    (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      const scale = width / base.width;
      const viewport = page.getViewport({ scale });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      setPageAspect(base.height / base.width);
      task = page.render({
        canvas,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      try {
        await task.promise;
      } catch {
        // cancelled by a re-render (zoom/resize); ignore
      }
    })();

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [visible, pdf, pageNumber, width]);

  return (
    <div
      ref={wrapperRef}
      style={{ width, height: width * pageAspect }}
      className="relative mx-auto mb-4 bg-white shadow-md ring-1 ring-slate-200 dark:ring-slate-700"
    >
      <canvas ref={canvasRef} className="block" />
      <span className="absolute bottom-1 right-2 rounded bg-slate-900/60 px-1.5 text-[10px] text-white pointer-events-none">
        {pageNumber}
      </span>
      {overlay}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The viewer                                                          */
/* ------------------------------------------------------------------ */

export function PinCommentViewer({ documentId, src, kind, zoom, title }: PinCommentViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [firstAspect, setFirstAspect] = useState(1.414);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [comments, setComments] = useState<PinComment[]>([]);
  const [commentMode, setCommentMode] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Track available width so pages fit the viewer and respond to zoom.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load the PDF with PDF.js (browser only).
  useEffect(() => {
    if (kind !== "pdf") return;
    let cancelled = false;
    let loaded: PDFDocumentProxy | null = null;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();
        loaded = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) {
          loaded.destroy();
          return;
        }
        const first = await loaded.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        setFirstAspect(vp.height / vp.width);
        setPdf(loaded);
      } catch (err) {
        console.error("Error loading PDF:", err);
        if (!cancelled) setLoadError("Could not display this PDF.");
      }
    })();

    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [src, kind]);

  // Shared comments: load now, then poll so everyone sees new ones.
  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setComments(data.comments ?? []);
    } catch {
      // network hiccup; the next poll will retry
    }
  }, [documentId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch from external API
    loadComments();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") loadComments();
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [loadComments]);

  const handlePosted = (comment: PinComment) => {
    setComments((prev) => (prev.some((c) => c.id === comment.id) ? prev : [...prev, comment]));
    setDraft(null);
    setActiveId(comment.id);
  };

  const overlayFor = (page: number) => (
    <PageOverlay
      page={page}
      documentId={documentId}
      comments={comments}
      commentMode={commentMode}
      draft={draft}
      activeId={activeId}
      onPlace={(d) => {
        setActiveId(null);
        setDraft(d);
      }}
      onSelect={setActiveId}
      onCancelDraft={() => setDraft(null)}
      onPosted={handlePosted}
    />
  );

  const pageWidth = Math.max(200, (containerWidth - 24) * (zoom / 100));

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 mb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <MessageSquare className="w-4 h-4 text-sky-500" />
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
          <span className="hidden sm:inline text-slate-400">
            {commentMode
              ? "- click anywhere on the page to place a comment"
              : "- click a numbered pin to read it"}
          </span>
        </span>
        <button
          type="button"
          onClick={() => {
            setCommentMode((m) => !m);
            setDraft(null);
            setActiveId(null);
          }}
          aria-pressed={commentMode}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            commentMode
              ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
              : "bg-sky-600 text-white hover:bg-sky-500"
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          {commentMode ? "Done commenting" : "Add comment"}
        </button>
      </div>

      {/* Pages */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-200/60 dark:bg-[#060b18] p-3"
      >
        {kind === "image" ? (
          <div
            style={{ width: pageWidth }}
            className="relative mx-auto bg-white shadow-md ring-1 ring-slate-200 dark:ring-slate-700"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={title} className="block w-full h-auto select-none" draggable={false} />
            {overlayFor(1)}
          </div>
        ) : loadError ? (
          <p className="p-6 text-center text-sm text-red-600 dark:text-red-400">{loadError}</p>
        ) : !pdf ? (
          <div className="flex flex-col items-center gap-3 py-16 text-slate-400">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs">Loading PDF...</p>
          </div>
        ) : (
          Array.from({ length: pdf.numPages }, (_, i) => (
            <PdfPage
              key={i + 1}
              pdf={pdf}
              pageNumber={i + 1}
              width={pageWidth}
              aspect={firstAspect}
              overlay={overlayFor(i + 1)}
            />
          ))
        )}
      </div>
    </div>
  );
}
