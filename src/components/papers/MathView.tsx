"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathViewProps {
  text?: string;
  content?: string;
  className?: string;
  block?: boolean;
}

/**
 * Strips wrapping math delimiters ($...$, $$...$$, \[...\], \(...\))
 * and safely separates trailing punctuation (like $. or $,) so KaTeX never fails.
 */
function cleanMath(raw: string): { formula: string; trailing: string } {
  let s = (raw || "").trim();
  let trailing = "";

  // Check if raw ends with punctuation outside $ (e.g. "$.", "$,", "$;", "$:")
  const punctMatch = s.match(/^(.*\$)([.,;:!?]+)$/);
  if (punctMatch) {
    s = punctMatch[1];
    trailing = punctMatch[2];
  }

  // Strip block delimiters
  if (s.startsWith("$$") && s.endsWith("$$")) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith("\\[") && s.endsWith("\\]")) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith("\\(") && s.endsWith("\\)")) {
    s = s.slice(2, -2).trim();
  } else {
    // Strip leading and trailing $
    s = s.replace(/^\$+/, "").replace(/\$+$/, "").trim();
  }

  // Remove any remaining unescaped single $ inside math mode
  s = s.replace(/(^|[^\\])\$/g, "$1");

  return { formula: s.trim(), trailing };
}

/** Renders LaTeX to an HTML string, or returns null if KaTeX throws. */
function renderKatex(formula: string, displayMode: boolean): string | null {
  try {
    return katex.renderToString(formula, { displayMode, throwOnError: false });
  } catch {
    return null;
  }
}

export function MathView({ text, content, className = "", block = false }: MathViewProps) {
  const actualText = text || content || "";

  const renderedContent = useMemo(() => {
    if (!actualText) return null;

    if (block) {
      const { formula, trailing } = cleanMath(actualText);
      const html = renderKatex(formula, true);
      if (html === null) return <span>{actualText}</span>;
      return (
        <>
          <span dangerouslySetInnerHTML={{ __html: html }} />
          {trailing && <span>{trailing}</span>}
        </>
      );
    }

    // Split text by $$...$$, \[...\], \(...\), and $...$ (with optional trailing punctuation)
    const parts: React.ReactNode[] = [];
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$(?:\\\$|[^\$])+?\$[.,;:!?]?)/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(actualText)) !== null) {
      const matchIndex = match.index;
      // Plain text before match
      if (matchIndex > lastIndex) {
        parts.push(actualText.substring(lastIndex, matchIndex));
      }

      const raw = match[0];
      const isBlock = raw.startsWith("$$") || raw.startsWith("\\[");
      const { formula, trailing } = cleanMath(raw);

      const html = renderKatex(formula, isBlock);
      if (html === null) {
        parts.push(<span key={`math-err-${matchIndex}`}>{raw}</span>);
      } else {
        parts.push(
          <React.Fragment key={`math-frag-${matchIndex}`}>
            <span
              className={isBlock ? "block my-2 overflow-x-auto" : "inline-block"}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {trailing && <span>{trailing}</span>}
          </React.Fragment>
        );
      }

      lastIndex = matchIndex + raw.length;
    }

    // Trailing plain text
    if (lastIndex < actualText.length) {
      parts.push(actualText.substring(lastIndex));
    }

    return parts;
  }, [actualText, block]);

  return <span className={className}>{renderedContent}</span>;
}
