/** Display metadata for the five course units and the four exam papers. */
export const UNIT_META: Record<
  number,
  { name: string; color: string; hoverColor: string; bgBadge: string; textBadge: string }
> = {
  1: {
    name: "Descriptive Statistics",
    color: "#10b981", // emerald
    hoverColor: "#059669",
    bgBadge: "bg-emerald-100 dark:bg-emerald-950/60",
    textBadge: "text-emerald-800 dark:text-emerald-300",
  },
  2: {
    name: "Large Sample Tests",
    color: "#6366f1", // indigo
    hoverColor: "#4f46e5",
    bgBadge: "bg-indigo-100 dark:bg-indigo-950/60",
    textBadge: "text-indigo-800 dark:text-indigo-300",
  },
  3: {
    name: "Small Sample Tests",
    color: "#a855f7", // purple
    hoverColor: "#9333ea",
    bgBadge: "bg-purple-100 dark:bg-purple-950/60",
    textBadge: "text-purple-800 dark:text-purple-300",
  },
  4: {
    name: "Design of Experiments",
    color: "#f59e0b", // amber
    hoverColor: "#d97706",
    bgBadge: "bg-amber-100 dark:bg-amber-950/60",
    textBadge: "text-amber-800 dark:text-amber-300",
  },
  5: {
    name: "Statistical Quality Control",
    color: "#f43f5e", // rose
    hoverColor: "#e11d48",
    bgBadge: "bg-rose-100 dark:bg-rose-950/60",
    textBadge: "text-rose-800 dark:text-rose-300",
  },
};

export const PAPERS = [
  { id: "2024-dec-sem5-147184", label: "Dec 2024 (Sem 5)" },
  { id: "2025-may-sem5-405686", label: "May 2025 (Sem 5)" },
  { id: "2025-dec-sem6-133554", label: "Dec 2025 (Sem 6)" },
  { id: "2026-may-sem6-323580", label: "May 2026 (Sem 6)" },
];
