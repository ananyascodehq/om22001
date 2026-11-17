import { handleUpload } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { deleteDocumentFile, isValidStagingKey } from "@/lib/storage";

const ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "application/json",
  "image/png",
  "image/jpeg",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isValidStagingKey(pathname)) {
          throw new Error("Invalid staging upload path");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: false,
        };
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Upload token generation error:", error);
    return NextResponse.json(
      { error: "Failed to authorize document upload" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { stagingKey } = await request.json();
    if (typeof stagingKey !== "string" || !isValidStagingKey(stagingKey)) {
      return NextResponse.json({ error: "Invalid staging key" }, { status: 400 });
    }

    await deleteDocumentFile(stagingKey);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Staged upload cleanup error:", error);
    return NextResponse.json(
      { error: "Failed to remove staged upload" },
      { status: 500 }
    );
  }
}
