import React from "react";
import { prisma } from "@/lib/prisma";
import { FormulaSheetsClient } from "@/components/formulas/FormulaSheetsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Formula Sheets | OM22001 Statistical Methods for Engineers",
  description:
    "Dedicated unit-wise formula repository. View, edit, or upload PDF formula sheets for Units 1 to 5.",
};

export default async function FormulasPage() {
  const [formulaSheets, uploadedFormulaDocs] = await Promise.all([
    prisma.formulaSheet.findMany({ orderBy: { unitNumber: "asc" } }),
    prisma.document.findMany({
      where: {
        OR: [
          { category: "FORMULA_SHEET" },
          { subfolder: "FORMULA_SHEETS" },
          { documentType: "FORMULA_SHEET" },
        ],
      },
      include: { unit: true },
    }),
  ]);

  const enriched = formulaSheets.map((sheet) => ({
    ...sheet,
    sections: JSON.parse(sheet.sections),
    uploadedPdfs: uploadedFormulaDocs
      .filter((document) => document.unit?.unitNumber === sheet.unitNumber)
      .map((document) => ({
        id: document.id,
        originalFilename: document.originalFilename,
        fileSize: document.fileSize,
      })),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <FormulaSheetsClient initialSheets={enriched} />
    </div>
  );
}
