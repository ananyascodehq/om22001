import { loadEnvConfig } from "@next/env";
import { Prisma, PrismaClient } from "@prisma/client";
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { saveDocumentFile } from "../src/lib/storage";

type ExportedRow = Record<string, unknown>;
type SqliteExport = Record<string, ExportedRow[]>;

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required before importing local data.");
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error(
    "BLOB_READ_WRITE_TOKEN is required to copy local documents to Vercel Blob."
  );
}

const prisma = new PrismaClient();
const repositoryRoot = process.cwd();

function exportLocalData(): SqliteExport {
  const python = process.env.PYTHON_EXECUTABLE || "python";
  const result = spawnSync(
    python,
    [path.join(repositoryRoot, "scripts", "export_sqlite_data.py")],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    }
  );

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(result.stderr || "Failed to export the local SQLite database.");
  }

  return JSON.parse(result.stdout) as SqliteExport;
}

function resolveLocalDocument(storagePath: string): string {
  const normalizedPath = storagePath.replace(/[\\/]/g, path.sep);
  const candidates = [
    path.join(repositoryRoot, "storage", "documents", normalizedPath),
    path.join(repositoryRoot, "storage", normalizedPath),
    path.join(repositoryRoot, "public", normalizedPath),
    path.join(repositoryRoot, normalizedPath),
  ];

  const source = candidates.find((candidate) => {
    const resolved = path.resolve(candidate);
    return (
      resolved.startsWith(`${repositoryRoot}${path.sep}`) &&
      fs.existsSync(resolved) &&
      fs.statSync(resolved).isFile()
    );
  });

  if (!source) {
    throw new Error(`Local document is missing: ${storagePath}`);
  }
  return source;
}

function withDateFields(
  row: ExportedRow,
  fields: string[]
): Record<string, unknown> {
  const converted = { ...row };
  for (const field of fields) {
    const value = converted[field];
    if (typeof value === "string" || typeof value === "number") {
      converted[field] = new Date(value);
    }
  }
  return converted;
}

async function main() {
  const existingRows = await prisma.subject.count();
  if (existingRows > 0) {
    throw new Error(
      "The target database is not empty. Refusing to duplicate or overwrite data."
    );
  }

  const exported = exportLocalData();
  const documents = exported.Document || [];
  const migratedDocumentPaths = new Map<string, string>();
  const migratedDocuments: Prisma.DocumentCreateManyInput[] = [];

  for (let index = 0; index < documents.length; index += 1) {
    const document = documents[index];
    const sourcePath = String(document.storagePath);
    let targetPath = migratedDocumentPaths.get(sourcePath);

    if (!targetPath) {
      const sourceFile = resolveLocalDocument(sourcePath);
      const stored = await saveDocumentFile(
        fs.readFileSync(sourceFile),
        sourcePath
      );
      targetPath = stored.storagePath;
      migratedDocumentPaths.set(sourcePath, targetPath);
    }

    migratedDocuments.push({
      ...withDateFields(document, ["createdAt", "updatedAt"]),
      storagePath: targetPath,
      isVerified: Boolean(document.isVerified),
    } as Prisma.DocumentCreateManyInput);

    console.log(`Copied document ${index + 1}/${documents.length}`);
  }

  const formulaPath = path.join(
    repositoryRoot,
    "content",
    "materials",
    "formula-sheets.json"
  );
  const formulaSheets: Array<Record<string, unknown>> = JSON.parse(
    fs.readFileSync(formulaPath, "utf8")
  );

  await prisma.$transaction(async (transaction) => {
    await transaction.subject.createMany({
      data: (exported.Subject || []).map((row) =>
        withDateFields(row, ["createdAt"])
      ) as Prisma.SubjectCreateManyInput[],
    });
    await transaction.unit.createMany({
      data: (exported.Unit || []).map((row) =>
        withDateFields(row, ["createdAt"])
      ) as Prisma.UnitCreateManyInput[],
    });
    await transaction.examination.createMany({
      data: (exported.Examination || []).map((row) =>
        withDateFields(row, ["createdAt"])
      ) as Prisma.ExaminationCreateManyInput[],
    });
    await transaction.document.createMany({ data: migratedDocuments });
    await transaction.documentRelationship.createMany({
      data: (exported.DocumentRelationship || []).map((row) =>
        withDateFields(row, ["createdAt"])
      ) as Prisma.DocumentRelationshipCreateManyInput[],
    });
    await transaction.question.createMany({
      data: (exported.Question || []).map((row) => ({
        ...withDateFields(row, ["createdAt"]),
        needsReview: Boolean(row.needsReview),
      })) as Prisma.QuestionCreateManyInput[],
    });
    await transaction.uploadHistory.createMany({
      data: (exported.UploadHistory || []).map((row) =>
        withDateFields(row, ["createdAt"])
      ) as Prisma.UploadHistoryCreateManyInput[],
    });
    await transaction.formulaSheet.createMany({
      data: formulaSheets.map((sheet) => ({
        unitNumber: Number(sheet.unitNumber),
        unitTitle: String(sheet.unitTitle),
        coNumber: String(sheet.coNumber),
        description: String(sheet.description),
        sections: JSON.stringify(sheet.sections),
      })),
    });
  });

  console.log(
    `Imported ${exported.Subject?.length || 0} subject, ` +
      `${exported.Unit?.length || 0} units, ${documents.length} documents, ` +
      `and ${formulaSheets.length} formula sheets.`
  );
}

main()
  .catch((error: unknown) => {
    console.error("Local data migration failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
