export interface TableData {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface AnswerData {
  status: "complete" | "pending";
  steps: string[];
  finalAnswer: string;
  tableValuesUsed?: string;
  sourceLink?: string;
  isVerified?: boolean;
}

export interface Question {
  id: string;
  paperId: string;
  part: "A" | "B" | "C";
  number: string;
  marks: number;
  co: number;
  rbt: number;
  unit: number;
  topic: string;
  questionText: string;
  tables: TableData[];
  answer: AnswerData;
  needsReview: boolean;
  tags: string[];
}

export interface Paper {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  regulation: string;
  semester?: number;
  qCode?: string;
  examMonthYear?: string;
  departments?: string;
  duration?: string;
  maxMarks?: number;
  pdfUrl?: string;
  assessmentType?: "SEM" | "FAT";
  testNumber?: number;
  unitsCovered?: number[];
  isPlaceholder?: boolean;
  questions: Question[];
}

export interface CourseOutcome {
  co: string;
  statement: string;
  rbtLevel: number;
}

export interface SyllabusUnit {
  unit: number;
  co: string;
  title: string;
  description: string;
  topics: string[];
}

export interface Syllabus {
  subjectCode: string;
  subjectName: string;
  regulation: string;
  departments: string[];
  credits: {
    lecture: number;
    tutorial: number;
    practical: number;
    total: number;
  };
  courseOutcomes: CourseOutcome[];
  units: SyllabusUnit[];
}

export interface MaterialItem {
  id: string;
  unit: number;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  category: "Notes" | "Slides" | "Formula" | "Table" | "Assignment";
  uploadedAt: string;
}

export interface UnitMaterials {
  unit: number;
  slug: string;
  title: string;
  materials: MaterialItem[];
}

export interface MaterialsIndex {
  units: UnitMaterials[];
}

export interface RepeatedAppearance {
  paperId: string;
  questionNumber: string;
  part: string;
}

export interface RepeatedQuestion {
  id: string;
  title: string;
  unit: number;
  topic: string;
  frequency: number;
  isHighProbability: boolean;
  marks: number;
  description: string;
  appearances: RepeatedAppearance[];
}
