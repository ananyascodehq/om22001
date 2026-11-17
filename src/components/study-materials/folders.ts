import { BookOpen, Folder, Layers, Sigma, Table2, Sparkles } from "lucide-react";

/** The study-material folders shown on /study-materials, and URL-param matching for them. */
export const FOLDERS = [
  {
    id: "Complete_Notes",
    title: "Complete Subject Notes",
    desc: "Comprehensive syllabus-wide notes and complete subject compilations.",
    icon: BookOpen,
    unitNumber: null,
    badge: "Syllabus Wide",
    mathSymbol: "Σ",
    activeAccent: "text-teal-400",
    watermark: null,
    emptyMathIcon: "Σ",
  },
  {
    id: "Unit_1_Descriptive_Statistics",
    title: "Unit 1 – Descriptive Statistics",
    desc: "Central tendency, dispersion, moments, skewness, kurtosis, and Sheppard's corrections.",
    icon: Folder,
    unitNumber: 1,
    badge: "CO1",
    mathSymbol: "x̄",
    activeAccent: "text-teal-400",
    watermark: "x̄ = Σxᵢ/n",
    emptyMathIcon: "x̄",
  },
  {
    id: "Unit_2_Large_Sample_Tests",
    title: "Unit 2 – Testing of Hypothesis (Large Samples)",
    desc: "Sampling distributions, Type I/II errors, single mean, proportion, and Z-tests.",
    icon: Folder,
    unitNumber: 2,
    badge: "CO2",
    mathSymbol: "z",
    activeAccent: "text-blue-400",
    watermark: "z = (x̄-μ)/(σ/√n)",
    emptyMathIcon: "z",
  },
  {
    id: "Unit_3_Small_Sample_Tests",
    title: "Unit 3 – Testing of Hypotheses (Small Samples)",
    desc: "Student's t-tests, Snedecor's F-test, Chi-square goodness of fit, and contingency tables.",
    icon: Folder,
    unitNumber: 3,
    badge: "CO3",
    mathSymbol: "t",
    activeAccent: "text-purple-400",
    watermark: "t = (x̄-μ)/(s/√n)",
    emptyMathIcon: "t",
  },
  {
    id: "Unit_4_Design_of_Experiments",
    title: "Unit 4 – Analysis of Variance (ANOVA)",
    desc: "One-way ANOVA (CRD), two-way ANOVA (RBD), and Latin Square Design (LSD).",
    icon: Folder,
    unitNumber: 4,
    badge: "CO4",
    mathSymbol: "F",
    activeAccent: "text-amber-400",
    watermark: "F = MSB/MSW",
    emptyMathIcon: "F",
  },
  {
    id: "Unit_5_Statistical_Quality_Control",
    title: "Unit 5 – Statistical Quality Control (SQC)",
    desc: "Variables charts (X-bar, R), attributes charts (p, np, c), and process capability.",
    icon: Folder,
    unitNumber: 5,
    badge: "CO5",
    mathSymbol: "p",
    activeAccent: "text-rose-400",
    watermark: "UCL = x̄ + 3σ",
    emptyMathIcon: "p̄",
  },
  {
    id: "Formula_Sheets",
    title: "Formula Sheets & Revision Cards",
    desc: "KaTeX formula sheets, summary cards, and quick revision sheets.",
    icon: Sigma,
    unitNumber: null,
    badge: "Formulas",
    mathSymbol: "∫",
    activeAccent: "text-teal-400",
    watermark: null,
    emptyMathIcon: "∫",
  },
  {
    id: "Reference_Materials",
    title: "Statistical Tables & Reference Standards",
    desc: "Normal Z, t-distribution, chi-square, F tables, and ASTM quality tables.",
    icon: Table2,
    unitNumber: null,
    badge: "Reference",
    mathSymbol: "χ²",
    activeAccent: "text-blue-400",
    watermark: null,
    emptyMathIcon: "χ²",
  },
  {
    id: "Important_Concepts",
    title: "Important Exam Concepts",
    desc: "High-probability derivations, definitions, and university question highlights.",
    icon: Sparkles,
    unitNumber: null,
    badge: "Exam Focus",
    mathSymbol: "★",
    activeAccent: "text-amber-400",
    watermark: null,
    emptyMathIcon: "★",
  },
  {
    id: "Additional_Resources",
    title: "Additional Resources & Slides",
    desc: "Lecture PPTs, lab exercises, external references, and tutorial sheets.",
    icon: Layers,
    unitNumber: null,
    badge: "Resources",
    mathSymbol: "α",
    activeAccent: "text-purple-400",
    watermark: null,
    emptyMathIcon: "α",
  },
];

export function normalizeFolderId(param: string | null): string {
  if (!param) return "Unit_1_Descriptive_Statistics";
  const lower = param.toLowerCase().trim();
  if (lower === "unit_1" || lower === "unit-1" || lower === "1" || lower.includes("descriptive")) {
    return "Unit_1_Descriptive_Statistics";
  }
  if (lower === "unit_2" || lower === "unit-2" || lower === "2" || lower.includes("large")) {
    return "Unit_2_Large_Sample_Tests";
  }
  if (lower === "unit_3" || lower === "unit-3" || lower === "3" || lower.includes("small")) {
    return "Unit_3_Small_Sample_Tests";
  }
  if (lower === "unit_4" || lower === "unit-4" || lower === "4" || lower.includes("anova") || lower.includes("design") || lower.includes("experiments")) {
    return "Unit_4_Design_of_Experiments";
  }
  if (lower === "unit_5" || lower === "unit-5" || lower === "5" || lower.includes("quality") || lower.includes("sqc")) {
    return "Unit_5_Statistical_Quality_Control";
  }
  if (lower.includes("complete")) return "Complete_Notes";
  if (lower.includes("formula")) return "Formula_Sheets";
  if (lower.includes("table") || lower.includes("reference")) return "Reference_Materials";
  if (lower.includes("concept")) return "Important_Concepts";
  if (lower.includes("additional")) return "Additional_Resources";

  const found = FOLDERS.find((f) => f.id.toLowerCase() === lower);
  return found ? found.id : "Unit_1_Descriptive_Statistics";
}
