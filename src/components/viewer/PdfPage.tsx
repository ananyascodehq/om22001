"use client";

import React, { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

interface PdfPageProps {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  width: number;
  aspect: number; // height / width, used to reserve space before render
  overlay: React.ReactNode;
}

/** A single PDF page, rendered to a canvas only once it scrolls into view. */
export function PdfPage({ pdf, pageNumber, width, aspect, overlay }: PdfPageProps) {
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

