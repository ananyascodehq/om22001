export interface ClassificationResult {
  category: "FAT" | "SEMESTER" | "STUDY_MATERIAL";
  examinationCode: string | null; // "FAT_1", "FAT_2", "FAT_3", "SEM_PYQ_1", etc.
  documentType:
    | "QUESTION_PAPER"
    | "ANSWER_KEY"
    | "TWO_MARK_BANK"
    | "TEN_MARK_BANK"
    | "COMPLETE_NOTES"
    | "UNIT_NOTES"
    | "FORMULA_SHEET"
    | "REFERENCE"
    | "IMPORTANT_CONCEPTS"
    | "ADDITIONAL";
  subfolder: string;
  unitNumber: number | null; // 1 to 5, or null
  suggestedTitle: string;
  confidence: number; // 0.0 to 1.0
  reasons: string[];
  status: "CONFIRMED" | "SUGGESTED" | "MANUAL_REQUIRED";
}

const UNIT_KEYWORDS: Record<number, string[]> = {
  1: [
    "descriptive statistics",
    "measures of central tendency",
    "arithmetic mean",
    "harmonic mean",
    "geometric mean",
    "median",
    "mode",
    "quartile deviation",
    "standard deviation",
    "variance",
    "coefficient of variation",
    "skewness",
    "karl pearson",
    "bowley",
    "kurtosis",
    "raw moments",
    "central moments",
    "sheppard",
  ],
  2: [
    "large sample",
    "testing of hypothesis",
    "null hypothesis",
    "alternative hypothesis",
    "type i error",
    "type ii error",
    "critical region",
    "standard error",
    "single mean",
    "difference of means",
    "single proportion",
    "difference of proportions",
    "z-test",
    "z test",
    "two-tailed",
    "one-tailed",
  ],
  3: [
    "small sample",
    "student's t",
    "t-test",
    "paired t-test",
    "independent samples",
    "f-test",
    "snedecor",
    "equality of two variances",
    "chi-square",
    "goodness of fit",
    "independence of attributes",
    "contingency table",
    "yates",
  ],
  4: [
    "analysis of variance",
    "anova",
    "one-way anova",
    "two-way anova",
    "completely randomized design",
    "crd",
    "randomized block design",
    "rbd",
    "latin square",
    "lsd",
    "sum of squares",
    "mean square",
    "treatment sum of squares",
    "error sum of squares",
  ],
  5: [
    "statistical quality control",
    "sqc",
    "control chart",
    "x-bar chart",
    "r chart",
    "range chart",
    "p chart",
    "fraction defective",
    "np chart",
    "number of defectives",
    "c chart",
    "number of defects",
    "u chart",
    "process capability",
    "specification limits",
    "tolerance limits",
    "ucl",
    "lcl",
  ],
};

export function classifyDocument(
  filename: string,
  rawText: string = ""
): ClassificationResult {
  const text = (rawText + " " + filename).toLowerCase();
  const reasons: string[] = [];
  let score = 0.5;

  let category: "FAT" | "SEMESTER" | "STUDY_MATERIAL" = "STUDY_MATERIAL";
  let examCode: string | null = null;
  let docType: ClassificationResult["documentType"] = "COMPLETE_NOTES";
  let subfolder = "Complete_Notes";
  let unitNumber: number | null = null;

  // 1. Detect Category & Examination
  const isFat =
    /\bfat[-_\s]?1\b/i.test(text) ||
    /\bfat[-_\s]?2\b/i.test(text) ||
    /\bfat[-_\s]?3\b/i.test(text) ||
    /\bformative assessment\b/i.test(text) ||
    /\bfat\b/i.test(text);

  const isSem =
    /\bsemester\b/i.test(text) ||
    /\bend semester\b/i.test(text) ||
    /\bpyq\b/i.test(text) ||
    /\bq\.?\s?code\b/i.test(text) ||
    /\bb\.e\.\s?\/?\s?b\.tech\b/i.test(text) ||
    /\banna university\b/i.test(text) ||
    /\bdegree examinations\b/i.test(text);

  const isFormula =
    /\bformula\b/i.test(text) ||
    /\bquick formula\b/i.test(text) ||
    /\bcheat sheet\b/i.test(text);

  const isTable =
    /\bstatistical table\b/i.test(text) ||
    /\bz table\b/i.test(text) ||
    /\bt-distribution table\b/i.test(text) ||
    /\bchi-square table\b/i.test(text);

  if (isFat && !isSem) {
    category = "FAT";
    reasons.push("Detected Formative Assessment Test (FAT) indicator");

    if (/\b(?:fat[-_\s]?1|test[-_\s]?1)\b/i.test(text)) {
      examCode = "FAT_1";
      reasons.push("Identified as FAT 1");
    } else if (/\b(?:fat[-_\s]?2|test[-_\s]?2)\b/i.test(text)) {
      examCode = "FAT_2";
      reasons.push("Identified as FAT 2");
    } else if (/\b(?:fat[-_\s]?3|test[-_\s]?3|model)\b/i.test(text)) {
      examCode = "FAT_3";
      reasons.push("Identified as FAT 3 / Model Exam");
    } else {
      examCode = "FAT_1"; // Default proposal
      reasons.push("Defaulted to FAT 1 (confirmation recommended)");
    }
  } else if (isSem) {
    category = "SEMESTER";
    reasons.push("Detected University Semester Examination pattern");

    if (/2024[-_\s]?dec|147184/i.test(text)) {
      examCode = "SEM_PYQ_1";
      reasons.push("Matched Dec 2024 (Q.Code 147184)");
    } else if (/2025[-_\s]?may|405686/i.test(text)) {
      examCode = "SEM_PYQ_2";
      reasons.push("Matched May 2025 (Q.Code 405686)");
    } else if (/2025[-_\s]?dec|133554/i.test(text)) {
      examCode = "SEM_PYQ_3";
      reasons.push("Matched Dec 2025 (Q.Code 133554)");
    } else if (/2026[-_\s]?may|323580/i.test(text)) {
      examCode = "SEM_PYQ_4";
      reasons.push("Matched May 2026 (Q.Code 323580)");
    } else {
      examCode = "SEM_PYQ_1";
      reasons.push("Assigned to Semester PYQ folder");
    }
  } else if (isFormula) {
    category = "STUDY_MATERIAL";
    docType = "FORMULA_SHEET";
    subfolder = "Formula_Sheets";
    reasons.push("Identified Formula Sheet reference");
  } else if (isTable) {
    category = "STUDY_MATERIAL";
    docType = "REFERENCE";
    subfolder = "Reference_Materials";
    reasons.push("Identified Statistical Reference Table");
  } else {
    category = "STUDY_MATERIAL";
    reasons.push("Categorized as Study Materials & Notes");
  }

  // 2. Detect Document Type (Question Paper vs Answer vs 2M vs 10M vs Notes)
  const isAnswer =
    /\b(?:answer|solution|worked|key|steps|final answer|solved)\b/i.test(text);

  const isQuestionPaper =
    /\b(?:question paper|time:\s*3 hours|max(?:imum)? marks:\s*100|part a|part b|part c|answer all questions)\b/i.test(
      text
    );

  const isTwoMark =
    /\b2\s*marks?\b/i.test(text) ||
    /\bpart\s*a\b/i.test(text) ||
    /\bshort answers?\b/i.test(text);

  const isTenMark =
    /\b10\s*marks?\b/i.test(text) ||
    /\bpart\s*b\b/i.test(text) ||
    /\blong answers?\b/i.test(text);

  if (category === "FAT") {
    if (isAnswer) {
      docType = "ANSWER_KEY";
      subfolder = "Answers";
      reasons.push("Document contains worked solutions/answer key");
    } else if (isTwoMark && !isTenMark) {
      docType = "TWO_MARK_BANK";
      subfolder = "Two_Mark";
      reasons.push("Identified 2 Mark question collection");
    } else if (isTenMark && !isTwoMark) {
      docType = "TEN_MARK_BANK";
      subfolder = "Ten_Mark";
      reasons.push("Identified 10 Mark question collection");
    } else {
      docType = "QUESTION_PAPER";
      subfolder = "Question_Papers";
      reasons.push("Identified FAT Question Paper structure");
    }
  } else if (category === "SEMESTER") {
    if (isAnswer) {
      docType = "ANSWER_KEY";
      subfolder = "Answers";
      reasons.push("Identified Semester Exam Solutions / Answer Document");
    } else {
      docType = "QUESTION_PAPER";
      subfolder = "Question_Papers";
      reasons.push("Identified Semester Examination Question Paper");
    }
  } else {
    // STUDY_MATERIAL
    if (isFormula) {
      docType = "FORMULA_SHEET";
      subfolder = "Formula_Sheets";
    } else if (/\b(?:important|highlights|key concepts)\b/i.test(text)) {
      docType = "IMPORTANT_CONCEPTS";
      subfolder = "Important_Concepts";
      reasons.push("Contains key exam concepts and highlights");
    } else if (/\b(?:reference|handbook|standard)\b/i.test(text)) {
      docType = "REFERENCE";
      subfolder = "Reference_Materials";
      reasons.push("Classified as Reference Material");
    } else {
      docType = "UNIT_NOTES";
      subfolder = "Unit_Notes";
      reasons.push("Classified as Unit Study Notes");
    }
  }

  // 3. Detect Unit by Keyword Density
  const unitMatches: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const [unit, keywords] of Object.entries(UNIT_KEYWORDS)) {
    const u = Number(unit);
    for (const kw of keywords) {
      if (text.includes(kw)) {
        unitMatches[u]++;
      }
    }
  }

  let topUnit: number | null = null;
  let topCount = 0;
  for (const [uStr, count] of Object.entries(unitMatches)) {
    const u = Number(uStr);
    if (count > topCount && count >= 2) {
      topCount = count;
      topUnit = u;
    }
  }

  if (topUnit !== null) {
    unitNumber = topUnit;
    reasons.push(
      `Strong match for Unit ${topUnit} (${topCount} syllabus topic matches)`
    );
    if (category === "STUDY_MATERIAL" && docType === "UNIT_NOTES") {
      const folderMap: Record<number, string> = {
        1: "Unit_1_Descriptive_Statistics",
        2: "Unit_2_Large_Sample_Tests",
        3: "Unit_3_Small_Sample_Tests",
        4: "Unit_4_Design_of_Experiments",
        5: "Unit_5_Statistical_Quality_Control",
      };
      subfolder = folderMap[topUnit] || "Complete_Notes";
    }
  }

  // 4. Calculate Confidence Score
  if (reasons.length >= 3) {
    score = 0.92;
  } else if (reasons.length === 2) {
    score = 0.82;
  } else {
    score = 0.65;
  }

  const status = score >= 0.85 ? "CONFIRMED" : "SUGGESTED";

  // Build clean suggested title
  const cleanBaseName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  const suggestedTitle = cleanBaseName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    category,
    examinationCode: examCode,
    documentType: docType,
    subfolder,
    unitNumber,
    suggestedTitle,
    confidence: score,
    reasons,
    status,
  };
}

