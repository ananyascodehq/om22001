import { CHATGPT_ANSWER_LINKS } from "@/lib/answerLinks";

/** A paper listed on the dashboard, with the PDF it maps to and its ChatGPT answers link. */
export interface DashboardPaper {
  code: string;
  title: string;
  detail: string;
  filename: string;
  chatGptUrl: string;
}

export const SEMESTER_PAPERS: DashboardPaper[] = [
  {
    code: "SEM_PYQ_1",
    title: "Semester Examination – Dec 2024",
    detail: "Semester 5 • Q.Code: 147184 • 100 Marks",
    filename: "OM22001 (2).pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_1.chatGptUrl,
  },
  {
    code: "SEM_PYQ_2",
    title: "Semester Examination – May 2025",
    detail: "Semester 5 • Q.Code: 405686 • 100 Marks",
    filename: "OM22001 (1).pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_2.chatGptUrl,
  },
  {
    code: "SEM_PYQ_3",
    title: "Semester Examination – Dec 2025",
    detail: "Semester 6 • Q.Code: 133554 • 100 Marks",
    filename: "OM22001.pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_3.chatGptUrl,
  },
  {
    code: "SEM_PYQ_4",
    title: "Semester Examination – May 2026",
    detail: "Semester 6 • Q.Code: 323580 • 100 Marks",
    filename: "OM22001-25211048.pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.SEM_PYQ_4.chatGptUrl,
  },
];

export const FAT_PAPERS: DashboardPaper[] = [
  {
    code: "FAT_1",
    title: "FAT 1 (Academic Year 2025–2026)",
    detail: "Semester 5 • Date: 06.08.2025 • 50 Marks",
    filename: "OE statistics fat 1.pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_1_AY2025_2026.chatGptUrl,
  },
  {
    code: "FAT_1",
    title: "FAT 1 (Academic Year 2024–2025)",
    detail: "Semester 6 • Date: 08.03.2025 • 50 Marks",
    filename: "OE statistics fat 1 (2024-2025).pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_1_AY2024_2025.chatGptUrl,
  },
  {
    code: "FAT_2",
    title: "FAT 2 (Academic Year 2024–2025)",
    detail: "Semester 6 • Date: 19.04.2025 • 50 Marks",
    filename: "OE statistics fat 2.pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_2_AY2024_2025.chatGptUrl,
  },
  {
    code: "FAT_3",
    title: "FAT 3 (Academic Year 2024–2025)",
    detail: "Semester 6 • Date: 19.05.2025 • 50 Marks",
    filename: "OE statistics fat 3.pdf",
    chatGptUrl: CHATGPT_ANSWER_LINKS.FAT_3_AY2024_2025.chatGptUrl,
  },
];
