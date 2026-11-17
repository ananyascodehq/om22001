import fs from "fs";
import path from "path";

const BASE_DIR = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(BASE_DIR, "content");
const SEM_DIR = path.join(CONTENT_DIR, "sem");
const FAT_DIR = path.join(CONTENT_DIR, "fat");
const SYLLABUS_FILE = path.join(CONTENT_DIR, "syllabus.json");

interface Question {
  id: string;
  paperId: string;
  part: string;
  number: string;
  marks: number;
  co: number;
  rbt: number;
  unit: number;
  topic: string;
  questionText: string;
  tables: Array<{
    title?: string;
    headers: string[];
    rows: string[][];
  }>;
  answer: {
    status: "complete" | "pending";
    steps: string[];
    finalAnswer: string;
    tableValuesUsed?: string;
    sourceLink?: string;
  };
  needsReview: boolean;
  tags: string[];
}

interface Paper {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  regulation: string;
  duration?: string;
  maxMarks?: number;
  pdfUrl?: string;
  questions: Question[];
}

let totalErrors = 0;
const needsReviewList: Array<{ paperId: string; qNum: string; topic: string; reason?: string }> = [];

console.log("================================================================================");
console.log("                     OM22001 CONTENT VALIDATION REPORT                          ");
console.log("================================================================================\n");

// 1. Check syllabus.json
if (!fs.existsSync(SYLLABUS_FILE)) {
  console.error("❌ ERROR: syllabus.json missing!");
  totalErrors++;
} else {
  try {
    const syllabus = JSON.parse(fs.readFileSync(SYLLABUS_FILE, "utf-8"));
    if (!syllabus.units || syllabus.units.length !== 5) {
      console.error(`❌ ERROR: syllabus.json should have 5 units, found ${syllabus.units?.length}`);
      totalErrors++;
    } else {
      console.log(`✅ syllabus.json: Validated (5 Units, ${syllabus.courseOutcomes?.length || 0} COs)`);
    }
  } catch (e) {
    console.error("❌ ERROR: Failed to parse syllabus.json", e);
    totalErrors++;
  }
}

// 2. Validate SEM papers
const semFiles = fs.readdirSync(SEM_DIR).filter((f) => f.endsWith(".json"));
console.log(`\nValidating SEM Papers (${semFiles.length} files found)...`);

const EXPECTED_SEM_PAPERS = [
  "2024-dec-sem5-147184.json",
  "2025-may-sem5-405686.json",
  "2025-dec-sem6-133554.json",
  "2026-may-sem6-323580.json",
];

for (const expected of EXPECTED_SEM_PAPERS) {
  if (!semFiles.includes(expected)) {
    console.error(`❌ ERROR: Expected SEM paper ${expected} is missing!`);
    totalErrors++;
  }
}

for (const file of semFiles) {
  const filePath = path.join(SEM_DIR, file);
  try {
    const paper: Paper = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const qCount = paper.questions?.length || 0;
    
    // Check paper root fields
    if (!paper.id || !paper.title || !paper.subjectCode) {
      console.error(`❌ ERROR in ${file}: Missing required root fields.`);
      totalErrors++;
    }

    // Question breakdown
    const partA = paper.questions.filter((q) => q.part === "A");
    const partB = paper.questions.filter((q) => q.part === "B");
    const partC = paper.questions.filter((q) => q.part === "C");

    const completeAnswers = paper.questions.filter((q) => q.answer?.status === "complete").length;
    const reviewRequired = paper.questions.filter((q) => q.needsReview);

    reviewRequired.forEach((q) => {
      needsReviewList.push({
        paperId: paper.id,
        qNum: q.number,
        topic: q.topic,
        reason: q.questionText.slice(0, 70) + "...",
      });
    });

    console.log(`\n📄 Paper: ${paper.id} (${paper.title})`);
    console.log(`   - Total Questions: ${qCount} / 31 expected`);
    console.log(`   - Part A: ${partA.length} (expected 20)`);
    console.log(`   - Part B: ${partB.length} (expected 10: 5 pairs a/b)`);
    console.log(`   - Part C: ${partC.length} (expected 1 compulsory)`);
    console.log(`   - Completed Solutions: ${completeAnswers} / ${qCount} (${Math.round((completeAnswers / qCount) * 100)}%)`);
    console.log(`   - needsReview items: ${reviewRequired.length}`);

    if (qCount !== 31) {
      console.error(`   ❌ FAIL: Question count mismatch! Expected 31, got ${qCount}`);
      totalErrors++;
    }
    if (partA.length !== 20 || partB.length !== 10 || partC.length !== 1) {
      console.error(`   ❌ FAIL: Parts distribution invalid! Part A=${partA.length}, Part B=${partB.length}, Part C=${partC.length}`);
      totalErrors++;
    }

    // Validate individual questions
    paper.questions.forEach((q, idx) => {
      const qRef = `${paper.id} [${q.number || `idx:${idx}`}]`;
      if (!q.id) { console.error(`   ❌ Missing id on ${qRef}`); totalErrors++; }
      if (!q.paperId) { console.error(`   ❌ Missing paperId on ${qRef}`); totalErrors++; }
      if (!q.part || !["A", "B", "C"].includes(q.part)) { console.error(`   ❌ Invalid part on ${qRef}`); totalErrors++; }
      if (!q.marks || q.marks <= 0) { console.error(`   ❌ Invalid marks on ${qRef}`); totalErrors++; }
      if (!q.co || q.co < 1 || q.co > 5) { console.error(`   ❌ Invalid CO on ${qRef}`); totalErrors++; }
      if (!q.rbt || q.rbt < 1 || q.rbt > 6) { console.error(`   ❌ Invalid RBT on ${qRef}`); totalErrors++; }
      if (!q.unit || q.unit < 1 || q.unit > 5) { console.error(`   ❌ Invalid Unit on ${qRef}`); totalErrors++; }
      if (!q.topic) { console.error(`   ❌ Missing topic on ${qRef}`); totalErrors++; }
      if (!q.questionText || q.questionText.trim().length === 0) { console.error(`   ❌ Empty questionText on ${qRef}`); totalErrors++; }
      if (!Array.isArray(q.tables)) { console.error(`   ❌ Invalid tables format on ${qRef}`); totalErrors++; }
      if (!q.answer || !q.answer.status || !Array.isArray(q.answer.steps)) { console.error(`   ❌ Invalid answer structure on ${qRef}`); totalErrors++; }
      if (typeof q.needsReview !== "boolean") { console.error(`   ❌ needsReview must be boolean on ${qRef}`); totalErrors++; }
      if (!Array.isArray(q.tags)) { console.error(`   ❌ tags must be array on ${qRef}`); totalErrors++; }
    });
  } catch (e) {
    console.error(`❌ Failed parsing ${file}:`, e);
    totalErrors++;
  }
}

// 3. Validate FAT tests
const fatFiles = fs.readdirSync(FAT_DIR).filter((f) => f.endsWith(".json"));
console.log(`\nValidating FAT Assessments (${fatFiles.length} files found)...`);

for (const file of fatFiles) {
  const filePath = path.join(FAT_DIR, file);
  try {
    const fat = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(`   - ${fat.id}: ${fat.title} (Questions: ${fat.questions?.length || 0})`);
    if (!fat.id || !fat.title || !fat.subjectCode) {
      console.error(`   ❌ ERROR in ${file}: Missing root fields`);
      totalErrors++;
    }
  } catch (e) {
    console.error(`❌ Failed parsing ${file}:`, e);
    totalErrors++;
  }
}

// 4. Print Summary & NeedsReview items
console.log("\n--------------------------------------------------------------------------------");
console.log(`SUMMARY: ${needsReviewList.length} items flagged with "needsReview: true":`);
needsReviewList.forEach((item, i) => {
  console.log(`  ${i + 1}. [${item.paperId}] Q.${item.qNum} (${item.topic}): ${item.reason}`);
});

console.log("--------------------------------------------------------------------------------");
if (totalErrors === 0) {
  console.log("🎉 ALL VALIDATION CHECKS PASSED PERFECTLY (0 errors)!");
  process.exit(0);
} else {
  console.error(`💥 VALIDATION FAILED with ${totalErrors} errors!`);
  process.exit(1);
}

