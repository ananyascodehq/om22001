import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");
const STORAGE_DIR = path.join(ROOT_DIR, "storage", "documents");

// Ensure required physical folder structure exists
const REQUIRED_FOLDERS = [
  // FAT
  path.join(STORAGE_DIR, "FAT", "FAT_1", "Question_Papers"),
  path.join(STORAGE_DIR, "FAT", "FAT_1", "Answers"),
  path.join(STORAGE_DIR, "FAT", "FAT_1", "Two_Mark"),
  path.join(STORAGE_DIR, "FAT", "FAT_1", "Ten_Mark"),
  path.join(STORAGE_DIR, "FAT", "FAT_2", "Question_Papers"),
  path.join(STORAGE_DIR, "FAT", "FAT_2", "Answers"),
  path.join(STORAGE_DIR, "FAT", "FAT_2", "Two_Mark"),
  path.join(STORAGE_DIR, "FAT", "FAT_2", "Ten_Mark"),
  path.join(STORAGE_DIR, "FAT", "FAT_3", "Question_Papers"),
  path.join(STORAGE_DIR, "FAT", "FAT_3", "Answers"),
  path.join(STORAGE_DIR, "FAT", "FAT_3", "Two_Mark"),
  path.join(STORAGE_DIR, "FAT", "FAT_3", "Ten_Mark"),

  // SEMESTER
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_1", "Question_Papers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_1", "Answers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_2", "Question_Papers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_2", "Answers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_3", "Question_Papers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_3", "Answers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_4", "Question_Papers"),
  path.join(STORAGE_DIR, "SEMESTER", "SEM_PYQ_4", "Answers"),

  // STUDY MATERIALS
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Complete_Notes"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Unit_1_Descriptive_Statistics"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Unit_2_Large_Sample_Tests"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Unit_3_Small_Sample_Tests"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Unit_4_Design_of_Experiments"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Unit_5_Statistical_Quality_Control"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Formula_Sheets"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Reference_Materials"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Important_Concepts"),
  path.join(STORAGE_DIR, "STUDY_MATERIALS", "Additional_Resources"),
];

for (const folder of REQUIRED_FOLDERS) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

async function main() {
  console.log("🌱 Seeding OM22001 Academic Repository Database...");

  // 1. Subject
  const subject = await prisma.subject.upsert({
    where: { code: "OM22001" },
    update: {},
    create: {
      code: "OM22001",
      name: "Statistical Methods for Engineers",
      regulation: "2022",
      departments: "Common to AE, CE, CS, EC, EE, IT, ME, MN, BT, CH",
    },
  });

  console.log(`✅ Subject created/loaded: ${subject.code} - ${subject.name}`);

  // 2. Units from syllabus.json
  const syllabusPath = path.join(CONTENT_DIR, "syllabus.json");
  const syllabus = JSON.parse(fs.readFileSync(syllabusPath, "utf-8"));

  const unitMap = new Map<number, string>();

  for (const u of syllabus.units) {
    const existingUnit = await prisma.unit.findFirst({
      where: { subjectId: subject.id, unitNumber: u.unit },
    });

    let unitRecord;
    if (existingUnit) {
      unitRecord = await prisma.unit.update({
        where: { id: existingUnit.id },
        data: {
          title: u.title,
          description: u.description,
          topics: JSON.stringify(u.topics),
        },
      });
    } else {
      unitRecord = await prisma.unit.create({
        data: {
          subjectId: subject.id,
          unitNumber: u.unit,
          coNumber: u.co,
          title: u.title,
          description: u.description,
          topics: JSON.stringify(u.topics),
        },
      });
    }

    unitMap.set(u.unit, unitRecord.id);
  }
  console.log("✅ 5 Course Units seeded");

  // 3. FAT Examinations (FAT 1, 2, 3)
  const fatExams = [
    { code: "FAT_1", title: "Formative Assessment Test 1 (FAT-1)", type: "FAT", maxMarks: 50, duration: "1.5 Hours" },
    { code: "FAT_2", title: "Formative Assessment Test 2 (FAT-2)", type: "FAT", maxMarks: 50, duration: "1.5 Hours" },
    { code: "FAT_3", title: "Formative Assessment Test 3 (FAT-3 / Model)", type: "FAT", maxMarks: 100, duration: "3 Hours" },
  ];

  for (const fe of fatExams) {
    const existing = await prisma.examination.findFirst({
      where: { subjectId: subject.id, code: fe.code },
    });
    if (!existing) {
      await prisma.examination.create({
        data: {
          subjectId: subject.id,
          type: fe.type,
          code: fe.code,
          title: fe.title,
          maxMarks: fe.maxMarks,
          duration: fe.duration,
        },
      });
    }
  }
  console.log("✅ FAT 1, 2, 3 Examinations created");

  // 4. Semester Examinations (SEM PYQ 1 to 4)
  const semExams = [
    {
      code: "SEM_PYQ_1",
      paperFile: "2024-dec-sem5-147184",
      title: "Semester Examination – Dec 2024 (Semester 5)",
      qCode: "147184",
      examDate: "Dec 2024",
      semester: 5,
    },
    {
      code: "SEM_PYQ_2",
      paperFile: "2025-may-sem5-405686",
      title: "Semester Examination – May 2025 (Semester 5)",
      qCode: "405686",
      examDate: "May 2025",
      semester: 5,
    },
    {
      code: "SEM_PYQ_3",
      paperFile: "2025-dec-sem6-133554",
      title: "Semester Examination – Dec 2025 (Semester 6)",
      qCode: "133554",
      examDate: "Dec 2025",
      semester: 6,
    },
    {
      code: "SEM_PYQ_4",
      paperFile: "2026-may-sem6-323580",
      title: "Semester Examination – May 2026 (Semester 6)",
      qCode: "323580",
      examDate: "May 2026",
      semester: 6,
    },
  ];

  for (const se of semExams) {
    let exam = await prisma.examination.findFirst({
      where: { subjectId: subject.id, code: se.code },
    });

    if (!exam) {
      exam = await prisma.examination.create({
        data: {
          subjectId: subject.id,
          type: "SEMESTER",
          code: se.code,
          title: se.title,
          qCode: se.qCode,
          examDate: se.examDate,
          semester: se.semester,
          maxMarks: 100,
          duration: "3 Hours",
        },
      });
    }

    // Read JSON data for this paper
    const paperJsonPath = path.join(CONTENT_DIR, "sem", `${se.paperFile}.json`);
    if (fs.existsSync(paperJsonPath)) {
      const paperData = JSON.parse(fs.readFileSync(paperJsonPath, "utf-8"));

      // Copy PDF into storage/documents/SEMESTER/<code/Question_Papers/
      const pdfSource = path.join(ROOT_DIR, "public", "papers", "sem", se.paperFile, "question-paper.pdf");
      const pdfDestFolder = path.join(STORAGE_DIR, "SEMESTER", se.code, "Question_Papers");
      const pdfDestPath = path.join(pdfDestFolder, `${se.code}_Question_Paper.pdf`);

      let pdfFileSize = 1024 * 50; // fallback
      if (fs.existsSync(pdfSource)) {
        fs.copyFileSync(pdfSource, pdfDestPath);
        pdfFileSize = fs.statSync(pdfDestPath).size;
      }

      // 1. Create Question Paper Document
      let qpDoc = await prisma.document.findFirst({
        where: { examinationId: exam.id, documentType: "QUESTION_PAPER" },
      });

      if (!qpDoc) {
        qpDoc = await prisma.document.create({
          data: {
            subjectId: subject.id,
            category: "SEMESTER",
            examinationId: exam.id,
            subfolder: "QUESTION_PAPERS",
            documentType: "QUESTION_PAPER",
            originalFilename: `${se.paperFile}-question-paper.pdf`,
            storedFilename: `${se.code}_Question_Paper.pdf`,
            storagePath: `SEMESTER/${se.code}/Question_Papers/${se.code}_Question_Paper.pdf`,
            fileType: "pdf",
            fileSize: pdfFileSize,
            description: `${se.title} – Question Paper (Q.Code: ${se.qCode})`,
            tags: "semester,pyq,exam-paper,anna-university",
            classificationConfidence: 1.0,
            classificationStatus: "CONFIRMED",
            isVerified: true,
          },
        });
      }

      // 2. Create Solution/Answer Document
      let ansDoc = await prisma.document.findFirst({
        where: { examinationId: exam.id, documentType: "ANSWER_KEY" },
      });

      if (!ansDoc) {
        ansDoc = await prisma.document.create({
          data: {
            subjectId: subject.id,
            category: "SEMESTER",
            examinationId: exam.id,
            subfolder: "ANSWERS",
            documentType: "ANSWER_KEY",
            originalFilename: `${se.paperFile}-worked-solutions.json`,
            storedFilename: `${se.code}_Worked_Solutions.json`,
            storagePath: `SEMESTER/${se.code}/Answers/${se.code}_Worked_Solutions.json`,
            fileType: "json",
            fileSize: fs.statSync(paperJsonPath).size,
            description: `Complete step-by-step worked solutions for ${se.title}`,
            tags: "solutions,worked-answers,exam-answers,anna-university",
            classificationConfidence: 1.0,
            classificationStatus: "CONFIRMED",
            isVerified: true,
          },
        });
      }

      // 3. Establish Question Paper <-> Answer Document Relationship
      const existingRel = await prisma.documentRelationship.findFirst({
        where: {
          questionPaperId: qpDoc.id,
          answerDocId: ansDoc.id,
        },
      });

      if (!existingRel) {
        await prisma.documentRelationship.create({
          data: {
            questionPaperId: qpDoc.id,
            answerDocId: ansDoc.id,
            relationshipType: "ANSWERS_TO",
          },
        });
      }

      // 4. Seed Questions (20 Part A + 10 Part B + 1 Part C)
      for (const q of paperData.questions) {
        const uId = unitMap.get(q.unit);
        const existingQ = await prisma.question.findFirst({
          where: { documentId: qpDoc.id, number: q.number },
        });

        if (!existingQ) {
          await prisma.question.create({
            data: {
              documentId: qpDoc.id,
              unitId: uId,
              number: q.number,
              part: q.part,
              marks: q.marks,
              co: q.co,
              rbt: q.rbt,
              topic: q.topic,
              questionText: q.questionText,
              solutionText: q.answer
                ? `${q.answer.steps.join("\n\n")}\n\nFinal Answer: ${q.answer.finalAnswer}`
                : null,
              needsReview: q.needsReview || false,
              tags: (q.tags || []).join(", "),
            },
          });
        }
      }

      console.log(`✅ Seeded ${se.code}: Question Paper, Answer Document, and ${paperData.questions.length} Questions`);
    }
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

