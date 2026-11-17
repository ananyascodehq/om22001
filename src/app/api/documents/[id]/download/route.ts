import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDocumentBlob, getMimeType } from "@/lib/storage";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const doc = await prisma.document.findUnique({
      where: { id },
    });

    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const blob = await getDocumentBlob(doc.storagePath);
    if (!blob?.stream) {
      return NextResponse.json(
        { error: "File content not found on server" },
        { status: 404 }
      );
    }

    const mimeType = getMimeType(doc.originalFilename);

    return new NextResponse(blob.stream, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(doc.originalFilename)}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download document" },
      { status: 500 }
    );
  }
}
