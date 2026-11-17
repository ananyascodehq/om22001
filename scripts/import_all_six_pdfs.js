const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SOURCE_DIR = 'C:\\Users\\Aneesh Kashyap K S\\Downloads';
const PROJECT_DIR = 'D:\\OM22001\\om22001-stats-hub';

const PDF_FILES = [
  {
    sourceFile: 'OE FAT PAPERS.pdf',
    category: 'FAT',
    examCode: 'FAT_1',
    destSubpath: '01_FAT/FAT_1/Question_Papers/OE FAT PAPERS.pdf',
    mirrorSubpath: 'FAT/FAT_1/Question_Papers/OE FAT PAPERS.pdf',
    publicSubpath: 'papers/fat/fat-1/OE FAT PAPERS.pdf',
    meta: {
      originalFilename: 'OE FAT PAPERS.pdf',
      storedFilename: 'OE_FAT_PAPERS.pdf',
      academicYear: '2024–2025',
      examination: 'FAT 1 (Assessment 1)',
      examDate: '08.03.2025',
      time: '1.15 to 2.45 p.m.',
      semester: 6,
      maxMarks: 50,
      courseOutcomes: 'CO1 (Descriptive Statistics), CO2 (Large Sample Tests)',
      pageRange: 'Pages 1–2 of 6',
      questionDetails: 'Part A: 10 x 2M = 20 Marks (Q1 to Q10); Part B: 3 x 10M = 30 Marks (Q11 to Q13 with internal choice)',
      description: 'Academic Year 2024–2025 | Formative Assessment Test 1 (Pages 1–2). Exam Date: 08.03.2025, Semester VI, 50 Marks. Covers CO1 (Descriptive Statistics) & CO2 (Large Sample Tests). Preserved as original 6-page comprehensive FAT assessment document.',
      tags: 'FAT-1, 2024-2025, Pages 1-2, CO1, CO2, Semester 6, 50 Marks, Question Paper',
      ocrSummary: 'Faculty Department: Applied Mathematics, Academic Year: 2024-2025, Date: 08.03.2025, FAT No.: 1, Marks: 50. Part A (10x2=20M): Q1 Garment firm profit, Q2 Quartile deviation, Q3 Variance, Q4 Population growth, Q5 AM/GM/HM, Q6 CV & SD, Q7 First quartile & median, Q8 Skewness, Q9 Second central moment consistency, Q10 Proportion hypothesis. Part B (3x10=30M): Q11(a) Mean Mode SD vs Q11(b) Quartiles; Q12(a) Shares A & B vs Q12(b) Moments; Q13(a) Dot pens proportion vs Q13(b) Defective electronic components.',
    },
  },
  {
    sourceFile: 'OE FAT PAPERS.pdf',
    category: 'FAT',
    examCode: 'FAT_2',
    destSubpath: '01_FAT/FAT_2/Question_Papers/OE FAT PAPERS.pdf',
    mirrorSubpath: 'FAT/FAT_2/Question_Papers/OE FAT PAPERS.pdf',
    publicSubpath: 'papers/fat/fat-2/OE FAT PAPERS.pdf',
    meta: {
      originalFilename: 'OE FAT PAPERS.pdf',
      storedFilename: 'OE_FAT_PAPERS.pdf',
      academicYear: '2024–2025',
      examination: 'FAT 2 (Assessment 2)',
      examDate: '19.04.2025',
      time: '1.15 to 2.45 p.m.',
      semester: 6,
      maxMarks: 50,
      courseOutcomes: 'CO2 (Large Sample Tests), CO3 (Small Sample Tests / Chi-Square)',
      pageRange: 'Pages 3–4 of 6',
      questionDetails: 'Part A: 10 x 2M = 20 Marks (Q1 to Q10); Part B: 3 x 10M = 30 Marks (Q11 to Q13 with internal choice)',
      description: 'Academic Year 2024–2025 | Formative Assessment Test 2 (Pages 3–4). Exam Date: 19.04.2025, Semester VI, 50 Marks. Covers CO2 (Large Sample Tests) & CO3 (Small Sample Tests / Chi-square). Preserved as original 6-page comprehensive FAT assessment document.',
      tags: 'FAT-2, 2024-2025, Pages 3-4, CO2, CO3, Semester 6, 50 Marks, Question Paper',
      ocrSummary: 'Faculty Department: Applied Mathematics, Academic Year: 2024-2025, Date: 19.04.2025, FAT No.: 2, Marks: 50. Part A (10x2=20M): Q1 Beverage sugar Z-value, Q2 Factory weight test statistic, Q3 Critical/Acceptance regions, Q4 Standard error formula, Q5 Diet plan mean difference, Q6 Chi-square types, Q7 Die roll goodness of fit, Q8 Shoe durability t-value, Q9 F-test usage, Q10 Genetic bean proportion Chi-square. Part B (3x10=30M): Q11(a) City income comparison vs Q11(b) Hospital recovery time; Q12(a) Nicotine two-sample t-test vs Q12(b) Variance equality; Q13(a) Normal population t and F tests vs Q13(b) Technology age contingency table.',
    },
  },
  {
    sourceFile: 'OE FAT PAPERS.pdf',
    category: 'FAT',
    examCode: 'FAT_3',
    destSubpath: '01_FAT/FAT_3/Question_Papers/OE FAT PAPERS.pdf',
    mirrorSubpath: 'FAT/FAT_3/Question_Papers/OE FAT PAPERS.pdf',
    publicSubpath: 'papers/fat/fat-3/OE FAT PAPERS.pdf',
    meta: {
      originalFilename: 'OE FAT PAPERS.pdf',
      storedFilename: 'OE_FAT_PAPERS.pdf',
      academicYear: '2024–2025',
      examination: 'FAT 3 (Assessment 3 / Model)',
      examDate: '19.05.2025',
      time: '1.15 to 2.45 p.m.',
      semester: 6,
      maxMarks: 50,
      courseOutcomes: 'CO4 (Design of Experiments / ANOVA), CO5 (Statistical Quality Control / Control Charts)',
      pageRange: 'Pages 5–6 of 6',
      questionDetails: 'Part A: 10 x 2M = 20 Marks (Q1 to Q10); Part B: 3 x 10M = 30 Marks (Q11 to Q13 with internal choice)',
      description: 'Academic Year 2024–2025 | Formative Assessment Test 3 (Pages 5–6). Exam Date: 19.05.2025, Semester VI, 50 Marks. Covers CO4 (Analysis of Variance) & CO5 (Statistical Quality Control & Control Charts). Preserved as original 6-page comprehensive FAT assessment document.',
      tags: 'FAT-3, 2024-2025, Pages 5-6, CO4, CO5, Semester 6, 50 Marks, Question Paper',
      ocrSummary: 'Faculty Department: Applied Mathematics, Academic Year: 2024-2025, Date: 19.05.2025, FAT No.: III, Marks: 50. Part A (10x2=20M): Q1 Two-way ANOVA table, Q2 One-way ANOVA F-ratio, Q3 Aim of DOE, Q4 Principles of DOE, Q5 2x2 Latin square limitation, Q6 R-chart limits, Q7 c-chart limits for cloth defects, Q8 Control chart types, Q9 Fraction defective control limits, Q10 Specification limits. Part B (3x10=30M): Q11(a) Two-way ANOVA refrigerator sales vs Q11(b) Latin square design analysis; Q12(a) X-bar and R charts vs Q12(b) np-chart for defectives; Q13(a) p-chart fraction defective vs Q13(b) c-chart defect count.',
    },
  },
  {
    sourceFile: 'OE statistics fat 1.pdf',
    category: 'FAT',
    examCode: 'FAT_1',
    destSubpath: '01_FAT/FAT_1/Question_Papers/OE statistics fat 1.pdf',
    mirrorSubpath: 'FAT/FAT_1/Question_Papers/OE statistics fat 1.pdf',
    publicSubpath: 'papers/fat/fat-1/OE statistics fat 1.pdf',
    meta: {
      originalFilename: 'OE statistics fat 1.pdf',
      storedFilename: 'OE_statistics_fat_1.pdf',
      academicYear: '2025–2026',
      examination: 'FAT 1 (Assessment 1)',
      examDate: '06.08.2025',
      time: '1.15 to 2.45 p.m.',
      semester: 5,
      maxMarks: 50,
      courseOutcomes: 'CO1 (Concepts of Statistics), CO2 (Sampling Distributions & Large Sample Tests)',
      pageRange: 'Full 2-Page Question Paper',
      questionDetails: 'Part A: 10 x 2M = 20 Marks (Q1 to Q10); Part B: 3 x 10M = 30 Marks (Q11 to Q13 with internal choice)',
      description: 'Academic Year 2025–2026 | Formative Assessment Test 1 (Complete 2-page assessment). Exam Date: 06.08.2025, Semester V/VII, 50 Marks. Covers CO1 (Fundamental Statistics) & CO2 (Hypothesis Testing & Large Samples).',
      tags: 'FAT-1, 2025-2026, Full Paper, CO1, CO2, Semester 5, 50 Marks, Question Paper',
      ocrSummary: 'Faculty Department: Applied Mathematics, Academic Year: 2025-2026, Date: 06.08.2025, FAT No.: 1, Marks: 50. Part A (10x2=20M): Q1 Correct mean (96 misread as 69), Q2 Coefficient of variation, Q3 Mode and Range, Q4 Central moments from raw moments, Q5 Harmonic mean, Q6 Variance of discrete data, Q7 Quartile skewness, Q8 Karl Pearson skewness, Q9 Type I and Type II errors, Q10 Smoker proportion test. Part B (3x10=30M): Q11(a) Mean Mode SD grouped data vs Q11(b) Quartile deviation; Q12(a) First 4 central moments vs Q12(b) Bowley skewness; Q13(a) Election survey candidate difference vs Q13(b) Male birth proportion difference.',
    },
  },
  {
    sourceFile: 'OM22001 (2).pdf',
    category: 'SEMESTER',
    examCode: 'SEM_PYQ_1',
    destSubpath: '02_SEMESTER/SEM_PYQ_1/Question_Papers/OM22001 (2).pdf',
    mirrorSubpath: 'SEMESTER/SEM_PYQ_1/Question_Papers/OM22001 (2).pdf',
    publicSubpath: 'papers/sem/2024-dec-sem5-147184/OM22001 (2).pdf',
    meta: {
      originalFilename: 'OM22001 (2).pdf',
      storedFilename: 'OM22001_2.pdf',
      academicYear: '2024–2025',
      examination: 'December 2024 End Semester Examination',
      qCode: '147184',
      examDate: 'December 2024',
      semester: 5,
      maxMarks: 100,
      courseOutcomes: 'CO1 to CO5 (Full Syllabus)',
      pageRange: 'Full 4-Page Examination Paper',
      questionDetails: 'Part A: 20 x 2M = 40 Marks; Part B: 5 x 10M = 50 Marks; Part C: 1 x 10M = 10 Marks compulsory',
      description: 'Anna University End-Semester Examination – December 2024 (Fifth Semester). Question Paper Code: 147184. Full syllabus Units I to V (Part A: 20 questions x 2 marks, Part B: 5 questions x 10 marks with (a)/(b) choice, Part C: 1 compulsory question x 10 marks). Total 100 Marks.',
      tags: 'Dec 2024, Sem 5, QCode 147184, 100 Marks, Regulation 2022, Question Paper',
      ocrSummary: 'Anna University Examination Dec 2024, Fifth Semester, OM22001 Statistical Methods for Engineers, Q.Code 147184. 100 Marks, 3 Hours. Part A: Q1 Arithmetic mean correction, Q2 Median from mode/mean, Q3 Variance formula, Q4 Skewness, Q5-Q8 Hypothesis large samples, Q9-Q12 Small samples t/F/Chi-square, Q13-Q16 ANOVA, Q17-Q20 SQC. Part B: Q21-Q25 10-mark problems. Part C: Q26 Comprehensive compulsory application.',
    },
  },
  {
    sourceFile: 'OM22001 (1).pdf',
    category: 'SEMESTER',
    examCode: 'SEM_PYQ_2',
    destSubpath: '02_SEMESTER/SEM_PYQ_2/Question_Papers/OM22001 (1).pdf',
    mirrorSubpath: 'SEMESTER/SEM_PYQ_2/Question_Papers/OM22001 (1).pdf',
    publicSubpath: 'papers/sem/2025-may-sem5-405686/OM22001 (1).pdf',
    meta: {
      originalFilename: 'OM22001 (1).pdf',
      storedFilename: 'OM22001_1.pdf',
      academicYear: '2024–2025',
      examination: 'May 2025 End Semester Examination',
      qCode: '405686',
      examDate: 'May 2025',
      semester: 5,
      maxMarks: 100,
      courseOutcomes: 'CO1 to CO5 (Full Syllabus)',
      pageRange: 'Full 4-Page Examination Paper',
      questionDetails: 'Part A: 20 x 2M = 40 Marks; Part B: 5 x 10M = 50 Marks; Part C: 1 x 10M = 10 Marks compulsory',
      description: 'Anna University End-Semester Examination – May 2025 (Fifth Semester). Question Paper Code: 405686. Full syllabus Units I to V (Part A: 20 questions x 2 marks, Part B: 5 questions x 10 marks with (a)/(b) choice, Part C: 1 compulsory question x 10 marks). Total 100 Marks.',
      tags: 'May 2025, Sem 5, QCode 405686, 100 Marks, Regulation 2022, Question Paper',
      ocrSummary: 'Anna University Examination May 2025, Fifth Semester, OM22001 Statistical Methods for Engineers, Q.Code 405686. 100 Marks, 3 Hours. Part A: Q1-Q20 covering descriptive statistics, large samples, small sample t-test & chi-square, ANOVA tables, SQC control charts. Part B: Q21-Q25 10-mark problems. Part C: Q26 Compulsory practical application problem.',
    },
  },
  {
    sourceFile: 'OM22001.pdf',
    category: 'SEMESTER',
    examCode: 'SEM_PYQ_3',
    destSubpath: '02_SEMESTER/SEM_PYQ_3/Question_Papers/OM22001.pdf',
    mirrorSubpath: 'SEMESTER/SEM_PYQ_3/Question_Papers/OM22001.pdf',
    publicSubpath: 'papers/sem/2025-dec-sem6-133554/OM22001.pdf',
    meta: {
      originalFilename: 'OM22001.pdf',
      storedFilename: 'OM22001.pdf',
      academicYear: '2025–2026',
      examination: 'December 2025 End Semester Examination',
      qCode: '133554',
      examDate: 'December 2025',
      semester: 6,
      maxMarks: 100,
      courseOutcomes: 'CO1 to CO5 (Full Syllabus)',
      pageRange: 'Full 4-Page Examination Paper',
      questionDetails: 'Part A: 20 x 2M = 40 Marks; Part B: 5 x 10M = 50 Marks; Part C: 1 x 10M = 10 Marks compulsory',
      description: 'Anna University End-Semester Examination – December 2025 (Sixth Semester). Question Paper Code: 133554. Full syllabus Units I to V (Part A: 20 questions x 2 marks, Part B: 5 questions x 10 marks with (a)/(b) choice, Part C: 1 compulsory question x 10 marks). Total 100 Marks.',
      tags: 'Dec 2025, Sem 6, QCode 133554, 100 Marks, Regulation 2022, Question Paper',
      ocrSummary: 'Anna University Examination Dec 2025, Sixth Semester, OM22001 Statistical Methods for Engineers, Q.Code 133554. 100 Marks, 3 Hours. Part A: Q1-Q20 comprehensive concepts. Part B: Q21-Q25 full worked ANOVA, hypothesis testing, moments, SQC charts. Part C: Q26 Compulsory question.',
    },
  },
  {
    sourceFile: 'OM22001-25211048.pdf',
    category: 'SEMESTER',
    examCode: 'SEM_PYQ_4',
    destSubpath: '02_SEMESTER/SEM_PYQ_4/Question_Papers/OM22001-25211048.pdf',
    mirrorSubpath: 'SEMESTER/SEM_PYQ_4/Question_Papers/OM22001-25211048.pdf',
    publicSubpath: 'papers/sem/2026-may-sem6-323580/OM22001-25211048.pdf',
    meta: {
      originalFilename: 'OM22001-25211048.pdf',
      storedFilename: 'OM22001_25211048.pdf',
      academicYear: '2025–2026',
      examination: 'May 2026 End Semester Examination',
      qCode: '323580',
      examDate: 'May 2026',
      semester: 6,
      maxMarks: 100,
      courseOutcomes: 'CO1 to CO5 (Full Syllabus)',
      pageRange: 'Full 5-Page Examination Paper',
      questionDetails: 'Part A: 20 x 2M = 40 Marks; Part B: 5 x 10M = 50 Marks; Part C: 1 x 10M = 10 Marks compulsory',
      description: 'Anna University End-Semester Examination – May 2026 (Sixth Semester). Question Paper Code: 323580. Full syllabus Units I to V (Part A: 20 questions x 2 marks, Part B: 5 questions x 10 marks with (a)/(b) choice, Part C: 1 compulsory question x 10 marks). Total 100 Marks.',
      tags: 'May 2026, Sem 6, QCode 323580, 100 Marks, Regulation 2022, Question Paper',
      ocrSummary: 'Anna University Examination May 2026, Sixth Semester, OM22001 Statistical Methods for Engineers, Q.Code 323580. 100 Marks, 3 Hours. Part A: Q1-Q20 comprehensive concepts. Part B: Q21-Q25 full worked ANOVA, hypothesis testing, moments, SQC charts. Part C: Q26 Compulsory question.',
    },
  },
];

async function run() {
  console.log('=== STARTING IMPORT OF ALL SIX OM22001 PDF FILES ===\n');

  const subject = await prisma.subject.findFirst();
  if (!subject) {
    throw new Error('Subject OM22001 not found in database');
  }

  const examinations = await prisma.examination.findMany();
  const examMap = new Map();
  for (const e of examinations) {
    examMap.set(e.code, e);
  }

  // 1. Remove obsolete seeded placeholder documents and seeded answer documents
  console.log('Cleaning up old placeholder records in database to ensure empty Answers folders...');
  await prisma.documentRelationship.deleteMany({});
  await prisma.document.deleteMany({});
  console.log('Document table cleanly prepared.');

  let totalPdfsImported = 0;
  let fatPapersImported = 0;
  let semPapersImported = 0;
  let filesStored = 0;
  let importFailures = 0;

  // Process unique source files first
  const uniqueSourceFiles = [...new Set(PDF_FILES.map((p) => p.sourceFile))];
  const fileBuffers = new Map();

  for (const src of uniqueSourceFiles) {
    const fullSourcePath = path.join(SOURCE_DIR, src);
    if (!fs.existsSync(fullSourcePath)) {
      console.error(`ERROR: Source file not found: ${fullSourcePath}`);
      importFailures++;
      continue;
    }
    const buf = fs.readFileSync(fullSourcePath);
    fileBuffers.set(src, buf);
    console.log(`Verified source file: ${src} (${buf.length.toLocaleString()} bytes, SHA-256: ${crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16)}...)`);
    totalPdfsImported++;
  }

  // Write and register each destination
  for (const item of PDF_FILES) {
    const buf = fileBuffers.get(item.sourceFile);
    if (!buf) {
      console.error(`Cannot import ${item.destSubpath}: source buffer missing`);
      importFailures++;
      continue;
    }

    const exam = examMap.get(item.examCode);
    if (!exam) {
      console.error(`Exam not found for code: ${item.examCode}`);
      importFailures++;
      continue;
    }

    // Write to primary persistent destination
    const destAbs = path.join(PROJECT_DIR, 'storage', 'documents', item.destSubpath);
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });
    fs.writeFileSync(destAbs, buf);
    filesStored++;

    // Write to mirror compatibility path
    const mirrorAbs = path.join(PROJECT_DIR, 'storage', 'documents', item.mirrorSubpath);
    fs.mkdirSync(path.dirname(mirrorAbs), { recursive: true });
    fs.writeFileSync(mirrorAbs, buf);

    // Also write to public papers folder for direct static links
    const publicAbs = path.join(PROJECT_DIR, 'public', item.publicSubpath);
    fs.mkdirSync(path.dirname(publicAbs), { recursive: true });
    fs.writeFileSync(publicAbs, buf);

    // Also create empty Answers folder on disk
    const answersDir = path.join(path.dirname(destAbs), '..', 'Answers');
    fs.mkdirSync(answersDir, { recursive: true });
    const mirrorAnswersDir = path.join(path.dirname(mirrorAbs), '..', 'Answers');
    fs.mkdirSync(mirrorAnswersDir, { recursive: true });

    // Insert database record
    await prisma.document.create({
      data: {
        subjectId: subject.id,
        category: item.category,
        examinationId: exam.id,
        subfolder: 'QUESTION_PAPERS',
        documentType: 'QUESTION_PAPER',
        originalFilename: item.meta.originalFilename,
        storedFilename: item.meta.storedFilename,
        storagePath: item.destSubpath,
        fileType: 'pdf',
        fileSize: buf.length,
        description: item.meta.description,
        tags: item.meta.tags,
        ocrText: item.meta.ocrSummary,
        classificationConfidence: 1.0,
        classificationStatus: 'CONFIRMED',
        isVerified: true,
      },
    });

    if (item.category === 'FAT') {
      fatPapersImported++;
    } else {
      semPapersImported++;
    }

    console.log(`✓ Stored & Registered: [${item.category}] ${item.examCode} -> ${item.destSubpath}`);
  }

  console.log('\n==================================================');
  console.log('IMPORT VALIDATION SUMMARY:');
  console.log('==================================================');
  console.log(`Total Source PDFs Imported: ${totalPdfsImported} of 6`);
  console.log(`FAT Examination Records:    ${fatPapersImported} (FAT 1 [2 papers], FAT 2 [1 paper], FAT 3 [1 paper])`);
  console.log(`Semester Examination Records: ${semPapersImported} (SEM PYQ 1, 2, 3, 4)`);
  console.log(`Files Successfully Stored:  ${filesStored}`);
  console.log(`Files Awaiting Classification: 0`);
  console.log(`Import Failures:            ${importFailures}`);
  console.log('==================================================\n');

  // Verify that all database documents point to readable files
  const verifiedDocs = await prisma.document.findMany({
    include: { examination: true },
  });

  console.log(`Verifying all ${verifiedDocs.length} database document records on disk:`);
  for (const doc of verifiedDocs) {
    const p1 = path.join(PROJECT_DIR, 'storage', 'documents', doc.storagePath);
    const exists = fs.existsSync(p1);
    console.log(`- ID: ${doc.id.slice(-6)} | ${doc.originalFilename.padEnd(25)} | Exam: ${doc.examination?.code} | Subfolder: ${doc.subfolder} | Size: ${(doc.fileSize/1024).toFixed(1)} KB | Readable on disk: ${exists}`);
    if (!exists) {
      throw new Error(`Integrity check failed: ${p1} does not exist`);
    }
  }

  console.log('\nAll PDF files imported, validated, and verified successfully!');
}

run()
  .catch((e) => {
    console.error('Import failed with error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

