"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, Send } from "lucide-react";

interface CommentItem {
  id: string;
  name: string;
  body: string;
  createdAt: string;
}

// Pages that are admin/utility screens rather than content pages.
const HIDDEN_PREFIXES = ["/admin", "/settings", "/upload"];
const POLL_MS = 15000;
const NAME_KEY = "om22001-comment-name";
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

export function Comments() {
  const pathname = usePathname() || "/";
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  // key remounts the thread on navigation so state resets cleanly
  return <CommentThread key={pathname} pathname={pathname} />;
}

function CommentThread({ pathname }: { pathname: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (path: string) => {
    try {
      const res = await fetch(`/api/comments?path=${encodeURIComponent(path)}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      setComments(data.comments ?? []);
    } catch {
      // network hiccup; the next poll will retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only
    setName(localStorage.getItem(NAME_KEY) ?? "");
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch from external API
    load(pathname);
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load(pathname);
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [pathname, load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, name, body, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not post comment");
        return;
      }
      localStorage.setItem(NAME_KEY, name.trim());
      setBody("");
      if (data.comment) setComments((prev) => [data.comment, ...prev]);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft p-4 sm:p-6"
    >
      <h2
        id="comments-heading"
        className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100"
      >
        <MessageSquare className="w-5 h-5 text-sky-500" />
        Comments{" "}
        {comments.length > 0 && (
          <span className="text-sm font-medium text-slate-500">({comments.length})</span>
        )}
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Visible to everyone viewing this page. Be kind and keep it relevant.
      </p>

      <form onSubmit={submit} className="mt-4 space-y-3">
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
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_BODY}
          rows={3}
          placeholder="Write a comment..."
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
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {body.length}/{MAX_BODY}
          </span>
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Send className="w-4 h-4" />
            {submitting ? "Posting..." : "Post comment"}
          </button>
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </form>

      <ul className="mt-6 space-y-3" aria-live="polite">
        {loading && comments.length === 0 && (
          <li className="text-sm text-slate-500">Loading comments...</li>
        )}
        {!loading && comments.length === 0 && (
          <li className="text-sm text-slate-500">No comments yet. Be the first!</li>
        )}
        {comments.map((c) => (
          <li
            key={c.id}
            className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 break-words">
                {c.name}
              </span>
              <time dateTime={c.createdAt} className="text-xs text-slate-400 shrink-0">
                {timeAgo(c.createdAt)}
              </time>
            </div>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
              {c.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
