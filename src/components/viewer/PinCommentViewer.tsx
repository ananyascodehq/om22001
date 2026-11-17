"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquarePlus, MessageSquare } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { PdfPage } from "./PdfPage";
import { PinOverlay } from "./PinOverlay";
import type { PinComment, PinDraft } from "./pins";

interface PinCommentViewerProps {
  documentId: string;
  src: string;
  kind: "pdf" | "image";
  zoom: number;
  title?: string;
}

const POLL_MS = 15000;

export function PinCommentViewer({ documentId, src, kind, zoom, title }: PinCommentViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [firstAspect, setFirstAspect] = useState(1.414);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [comments, setComments] = useState<PinComment[]>([]);
  const [commentMode, setCommentMode] = useState(false);
  const [draft, setDraft] = useState<PinDraft | null>(null);
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
    <PinOverlay
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
