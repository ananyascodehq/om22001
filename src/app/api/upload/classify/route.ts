import { NextRequest, NextResponse } from "next/server";
import { classifyDocument } from "@/lib/documentClassifier";
import { getDocumentBlob, isValidStagingKey } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stagingKey, originalFilename } = body;

    if (
      typeof stagingKey !== "string" ||
      !isValidStagingKey(stagingKey) ||
      typeof originalFilename !== "string"
    ) {
      return NextResponse.json({ error: "Invalid upload details" }, { status: 400 });
    }

    const blob = await getDocumentBlob(stagingKey);
    if (!blob?.stream) {
      return NextResponse.json(
        { error: "Uploaded file could not be found" },
        { status: 404 }
      );
    }

    const buffer = Buffer.from(await new Response(blob.stream).arrayBuffer());
    const fileType = originalFilename.split(".").pop()?.toLowerCase() || "";
    let extractedText = "";

    if (fileType === "pdf") {
      try {
        const { PDFParse } = await import("pdf-parse");
        const parser = new PDFParse({ data: buffer });
        try {
          const pdfData = await parser.getText();
          extractedText = pdfData.text || "";
        } finally {
          await parser.destroy();
        }
      } catch (error) {
        console.warn("Could not extract text from PDF:", error);
      }
    } else if (fileType === "txt" || fileType === "json") {
      extractedText = buffer.toString("utf-8");
    }

    return NextResponse.json({
      success: true,
      stagingKey,
      originalFilename,
      fileType,
      fileSize: buffer.length,
      extractedSnippet: extractedText.slice(0, 300),
      classification: classifyDocument(originalFilename, extractedText),
    });
  } catch (error) {
    console.error("Upload classification error:", error);
    return NextResponse.json(
      { error: "Failed to classify uploaded document" },
      { status: 500 }
    );
  }
}
