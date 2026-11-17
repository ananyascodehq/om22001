import type { Question } from "@/lib/types";

/** A question annotated with the paper it came from. */
export type TopicQuestion = Question & { paperTitle: string; examMonthYear?: string };

export interface TopicFilters {
  unit: number | "ALL";
  topic: string;
  marks: number | "ALL";
  co: number | "ALL";
  rbt: number | "ALL";
  paper: string;
  query: string;
}

export const DEFAULT_FILTERS: TopicFilters = {
  unit: "ALL",
  topic: "ALL",
  marks: "ALL",
  co: "ALL",
  rbt: "ALL",
  paper: "ALL",
  query: "",
};

/** Per-unit numbers shown in the analytics charts and progress cards. */
export interface UnitStat {
  unit: string;
  unitNum: number;
  name: string;
  questions: number;
  marks: number;
  avgMarksPerExam: number;
  completed: number;
  percent: number;
  color: string;
}
