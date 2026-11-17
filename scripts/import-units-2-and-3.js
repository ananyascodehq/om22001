const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const baseUploadDir = 'C:/Users/Aneesh Kashyap K S/.gemini/antigravity/brain/8539697b-d182-4b45-8e22-4b464b2cc327/.user_uploaded';
  const unit2Src = path.join(baseUploadDir, 'media_1794644028438_b5a5de81.pdf');
  const unit3Src = path.join(baseUploadDir, 'media_1794644033919_eb233d93.pdf');

  const unit2DestDir = path.join(process.cwd(), 'storage', 'documents', 'STUDY_MATERIALS', 'Unit_2_Large_Sample_Tests');
  const unit3DestDir = path.join(process.cwd(), 'storage', 'documents', 'STUDY_MATERIALS', 'Unit_3_Small_Sample_Tests');

  fs.mkdirSync(unit2DestDir, { recursive: true });
  fs.mkdirSync(unit3DestDir, { recursive: true });

  // Unit 2 File setup
  const unit2Stored = 'OM22001_Unit_2_Large_Sample_Tests_Complete_Notes.pdf';
  const unit2Original = 'OM22001 - Unit 2 Testing of Hypothesis (Large Sample Tests - Complete Handwritten Notes).pdf';
  const unit2DestPath = path.join(unit2DestDir, unit2Stored);
  const unit2AliasPath = path.join(unit2DestDir, unit2Original);
  fs.copyFileSync(unit2Src, unit2DestPath);
  fs.copyFileSync(unit2Src, unit2AliasPath);
  const unit2Size = fs.statSync(unit2DestPath).size;

  // Unit 3 File setup
  const unit3Stored = 'OM22001_Unit_3_Small_Sample_Tests_Complete_Notes.pdf';
  const unit3Original = 'OM22001 - Unit 3 Testing of Hypotheses (Small Sample Tests - Complete Handwritten Notes).pdf';
  const unit3DestPath = path.join(unit3DestDir, unit3Stored);
  const unit3AliasPath = path.join(unit3DestDir, unit3Original);
  fs.copyFileSync(unit3Src, unit3DestPath);
  fs.copyFileSync(unit3Src, unit3AliasPath);
  const unit3Size = fs.statSync(unit3DestPath).size;

  console.log(`Copied Unit 2 (${unit2Size} bytes) and Unit 3 (${unit3Size} bytes)`);

  const subject = await prisma.subject.findFirst();
  const subjectId = subject ? subject.id : 'cmwcz9r4t0000133k4hwn3pxy';

  const unit2Record = await prisma.unit.findFirst({ where: { unitNumber: 2 } });
  const unit3Record = await prisma.unit.findFirst({ where: { unitNumber: 3 } });

  // Delete any existing doc with this storagePath or storedFilename to avoid duplicate entries
  await prisma.document.deleteMany({
    where: {
      storagePath: {
        in: [
          'STUDY_MATERIALS/Unit_2_Large_Sample_Tests/OM22001_Unit_2_Large_Sample_Tests_Complete_Notes.pdf',
          'STUDY_MATERIALS/Unit_3_Small_Sample_Tests/OM22001_Unit_3_Small_Sample_Tests_Complete_Notes.pdf'
        ]
      }
    }
  });

  const doc2 = await prisma.document.create({
    data: {
      subjectId: subjectId,
      unitId: unit2Record ? unit2Record.id : null,
      category: 'STUDY_MATERIAL',
      subfolder: 'Unit_2_Large_Sample_Tests',
      documentType: 'HANDWRITTEN',
      originalFilename: unit2Original,
      storedFilename: unit2Stored,
      storagePath: 'STUDY_MATERIALS/Unit_2_Large_Sample_Tests/' + unit2Stored,
      fileType: 'pdf',
      fileSize: unit2Size,
      description: 'Complete 14-page handwritten class notes for Unit 2: Sampling Distributions & Large Sample Tests. Covers Z-test for Single Mean, Difference between Means, Single Proportion, Difference of Proportions, Standard Error calculations, one-tailed and two-tailed tests, and solved university problems.',
      tags: 'Unit 2, Large Sample Tests, Z-Test, Single Mean, Difference of Means, Proportions, Standard Error, Handwritten Notes, 14 Pages',
      classificationStatus: 'CONFIRMED',
      isVerified: true,
    }
  });

  const doc3 = await prisma.document.create({
    data: {
      subjectId: subjectId,
      unitId: unit3Record ? unit3Record.id : null,
      category: 'STUDY_MATERIAL',
      subfolder: 'Unit_3_Small_Sample_Tests',
      documentType: 'HANDWRITTEN',
      originalFilename: unit3Original,
      storedFilename: unit3Stored,
      storagePath: 'STUDY_MATERIALS/Unit_3_Small_Sample_Tests/' + unit3Stored,
      fileType: 'pdf',
      fileSize: unit3Size,
      description: 'Complete 18-page handwritten class notes for Unit 3: Small Sample Tests. Covers Student\'s t-test (Single Mean, Difference of Means, Paired t-test), Snedecor\'s F-test for Equality of Variances, Chi-Square Goodness of Fit, Chi-Square Test for Independence of Attributes, 2x2 Contingency Tables, and step-by-step solved university problems.',
      tags: 'Unit 3, Small Sample Tests, Student t-test, Paired t-test, F-test, Chi-Square, Goodness of Fit, Independence of Attributes, Contingency Tables, Handwritten Notes, 18 Pages',
      classificationStatus: 'CONFIRMED',
      isVerified: true,
    }
  });

  console.log('Created documents:');
  console.log('Unit 2 Doc ID:', doc2.id);
  console.log('Unit 3 Doc ID:', doc3.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
