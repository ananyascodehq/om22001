import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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
      uploadedPdfs: uploadedFormulaDocs.filter(
        (document) => document.unit?.unitNumber === sheet.unitNumber
      ),
    }));

    return NextResponse.json({ success: true, formulaSheets: enriched });
  } catch (error) {
    console.error("Error reading formula sheets:", error);
    return NextResponse.json(
      { error: "Failed to load formula sheets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { unitNumber, sections } = body;
    const parsedUnitNumber = Number(unitNumber);

    if (
      !Number.isInteger(parsedUnitNumber) ||
      parsedUnitNumber < 1 ||
      parsedUnitNumber > 5 ||
      !Array.isArray(sections)
    ) {
      return NextResponse.json(
        { error: "A valid unit number and formula sections are required" },
        { status: 400 }
      );
    }

    const sheet = await prisma.formulaSheet.upsert({
      where: { unitNumber: parsedUnitNumber },
      update: { sections: JSON.stringify(sections) },
      create: {
        unitNumber: parsedUnitNumber,
        unitTitle: `Unit ${parsedUnitNumber}`,
        coNumber: `CO${parsedUnitNumber}`,
        description: `Formula Sheet for Unit ${parsedUnitNumber}`,
        sections: JSON.stringify(sections),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Formula sheet for Unit ${unitNumber} updated successfully`,
      formulaSheet: { ...sheet, sections: JSON.parse(sheet.sections) },
    });
  } catch (error) {
    console.error("Error saving formula sheet:", error);
    return NextResponse.json(
      { error: "Failed to update formula sheet" },
      { status: 500 }
    );
  }
}
