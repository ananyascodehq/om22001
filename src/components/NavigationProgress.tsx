"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationProgressIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const active = useRef(false);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      progressTimer.current = null;
      hideTimer.current = null;
    };

    const startProgress = () => {
      clearTimers();
      active.current = true;
      setVisible(true);
      setProgress(0);
      requestAnimationFrame(() => setProgress(8));
      progressTimer.current = setInterval(() => {
        setProgress((current) => {
          if (current >= 90) return 90;
          return Math.min(90, current + Math.max(1, Math.ceil((90 - current) * 0.08)));
        });
      }, 160);
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname.startsWith("/api/") ||
        (destination.pathname === window.location.pathname && destination.search === window.location.search)
      ) {
        return;
      }

      startProgress();
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (!active.current) return;

    active.current = false;
    if (progressTimer.current) clearInterval(progressTimer.current);
    progressTimer.current = null;
    setProgress(100);
    hideTimer.current = setTimeout(() => setVisible(false), 350);
  }, [routeKey]);

  if (!visible) return null;

  return (
    <div className="navigation-loading-screen" role="status" aria-live="polite">
      <div className="navigation-loading-card">
        <div className="navigation-loading-card__brand">
          <span className="navigation-loading-card__mark" aria-hidden="true">Σ</span>
          <span>OM22001 <span className="navigation-loading-card__divider">/</span> STATISTICS</span>
        </div>

        <svg
          className="navigation-loading-curve"
          viewBox="0 0 360 112"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20 88H340M180 14V88" className="navigation-loading-curve__axis" />
          <path
            d="M28 87C85 87 108 78 132 55C151 36 160 14 180 14C200 14 209 36 228 55C252 78 275 87 332 87"
            className="navigation-loading-curve__line"
          />
          <path d="M180 15V88" className="navigation-loading-curve__mean" />
        </svg>

        <h1 className="navigation-loading-card__title">Loading your workspace</h1>
        <p className="navigation-loading-card__subtitle">
          Preparing your selected study page
        </p>
        <p className="navigation-loading-card__equation" aria-hidden="true">
          x̄ = Σxᵢ / n <span>·</span> H₀ ⇄ H₁ <span>·</span> μ ± σ
        </p>

        <div
          className="navigation-loading-card__progress"
          role="progressbar"
          aria-label="Page loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={`${progress}%`}
        >
          <div
            className="navigation-loading-card__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="navigation-loading-card__progress-caption">
          <span>LOADING</span>
          <span className="navigation-loading-card__percentage">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressIndicator />
    </Suspense>
  );
}
