import fs from "fs";
import path from "path";
import { Paper, Question, Syllabus, MaterialsIndex, RepeatedQuestion } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const SEM_DIR = path.join(CONTENT_DIR, "sem");
const FAT_DIR = path.join(CONTENT_DIR, "fat");
const SYLLABUS_PATH = path.join(CONTENT_DIR, "syllabus.json");
const MATERIALS_PATH = path.join(CONTENT_DIR, "materials", "index.json");
const REPEATED_PATH = path.join(CONTENT_DIR, "repeated-questions.json");

export function getAllSemPapers(): Paper[] {
  if (!fs.existsSync(SEM_DIR)) return [];
  const files = fs.readdirSync(SEM_DIR).filter((f) => f.endsWith(".json"));
  const papers: Paper[] = [];

  for (const file of files) {
    try {
      const data = fs.readFileSync(path.join(SEM_DIR, file), "utf-8");
      papers.push(JSON.parse(data));
    } catch (e) {
      console.error(`Error reading ${file}`, e);
    }
  }

  // Sort papers chronologically: 2024-dec, 2025-may, 2025-dec, 2026-may
  return papers.sort((a, b) => a.id.localeCompare(b.id));
}

export function getSemPaperById(id: string): Paper | null {
  if (!id) return null;
  const cleanId = id.trim();
  const filePath = path.join(SEM_DIR, `${cleanId}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error loading paper ${cleanId}`, e);
    }
  }

  const all = getAllSemPapers();
  const lower = cleanId.toLowerCase();

  // Match by exact id (case-insensitive)
  const exact = all.find((p) => p.id.toLowerCase() === lower);
  if (exact) return exact;

  // Match by prefix or qCode (e.g. "2024-dec", "147184")
  const byPrefixOrCode = all.find(
    (p) => p.id.toLowerCase().startsWith(lower) || (p.qCode && p.qCode.toLowerCase() === lower)
  );
  if (byPrefixOrCode) return byPrefixOrCode;

  // Match by aliases like "SEM_PYQ_1", "sem-1", "pyq-1", "1"
  if (lower.includes("1") || lower.includes("dec-2024") || lower.includes("2024-dec")) return all[0] || null;
  if (lower.includes("2") || lower.includes("may-2025") || lower.includes("2025-may")) return all[1] || null;
  if (lower.includes("3") || lower.includes("dec-2025") || lower.includes("2025-dec")) return all[2] || null;
  if (lower.includes("4") || lower.includes("may-2026") || lower.includes("2026-may")) return all[3] || null;

  return null;
}

export function getAllFatPapers(): Paper[] {
  if (!fs.existsSync(FAT_DIR)) return [];
  const files = fs.readdirSync(FAT_DIR).filter((f) => f.endsWith(".json"));
  const papers: Paper[] = [];

  for (const file of files) {
    try {
      const data = fs.readFileSync(path.join(FAT_DIR, file), "utf-8");
      papers.push(JSON.parse(data));
    } catch (e) {
      console.error(`Error reading FAT ${file}`, e);
    }
  }

  return papers.sort((a, b) => a.id.localeCompare(b.id));
}

export function getFatPaperById(id: string): Paper | null {
  if (!id) return null;
  const cleanId = id.trim();
  const filePath = path.join(FAT_DIR, `${cleanId}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error loading FAT paper ${cleanId}`, e);
    }
  }

  const all = getAllFatPapers();
  const lower = cleanId.toLowerCase();

  // Match fat-1, FAT_1, fat1, 1
  let targetNum: number | null = null;
  if (lower.includes("1")) targetNum = 1;
  else if (lower.includes("2")) targetNum = 2;
  else if (lower.includes("3")) targetNum = 3;

  if (targetNum !== null) {
    const found = all.find((p) => p.testNumber === targetNum || p.id === `fat-${targetNum}`);
    if (found) return found;
  }

  return (
    all.find(
      (p) =>
        p.id.toLowerCase() === lower ||
        p.id.toLowerCase().replace(/-/g, "_") === lower
    ) || null
  );
}

export function getSyllabus(): Syllabus {
  if (!fs.existsSync(SYLLABUS_PATH)) {
    throw new Error("syllabus.json not found");
  }
  return JSON.parse(fs.readFileSync(SYLLABUS_PATH, "utf-8"));
}

export function getMaterials(): MaterialsIndex {
  if (!fs.existsSync(MATERIALS_PATH)) {
    return { units: [] };
  }
  return JSON.parse(fs.readFileSync(MATERIALS_PATH, "utf-8"));
}

export function getAllQuestions(): Array<Question & { paperTitle: string; examMonthYear?: string }> {
  const papers = getAllSemPapers();
  const allQ: Array<Question & { paperTitle: string; examMonthYear?: string }> = [];

  for (const p of papers) {
    for (const q of p.questions) {
      allQ.push({
        ...q,
        paperTitle: p.title,
        examMonthYear: p.examMonthYear,
      });
    }
  }
  return allQ;
}

export function getSubjectStats() {
  const semPapers = getAllSemPapers();
  const fatPapers = getAllFatPapers();
  const allQ = getAllQuestions();

  const totalQuestions = allQ.length;
  const completedAnswers = allQ.filter((q) => q.answer.status === "complete").length;
  const needsReview = allQ.filter((q) => q.needsReview).length;

  const unitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const unitMarks: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const q of allQ) {
    if (unitCounts[q.unit] !== undefined) {
      unitCounts[q.unit]++;
      unitMarks[q.unit] += q.marks;
    }
  }

  return {
    totalSemPapers: semPapers.length,
    totalFatPapers: fatPapers.length,
    totalQuestions,
    completedAnswers,
    answerPercentage: totalQuestions > 0 ? Math.round((completedAnswers / totalQuestions) * 100) : 0,
    needsReview,
    unitCounts,
    unitMarks,
  };
}

export function getRepeatedQuestions(): RepeatedQuestion[] {
  if (!fs.existsSync(REPEATED_PATH)) return [];
  try {
    const content = fs.readFileSync(REPEATED_PATH, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    console.error("Error reading repeated-questions.json", e);
    return [];
  }
}
