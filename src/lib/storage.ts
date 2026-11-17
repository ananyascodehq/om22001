import { del, get, put } from "@vercel/blob";
import path from "path";

export async function saveDocumentFile(
  fileBuffer: Buffer,
  relativePath: string
): Promise<{ storagePath: string; fileSize: number }> {
  const safePath = relativePath
    .replace(/\\/g, "/")
    .split("/")
    .filter((segment) => segment && segment !== "." && segment !== "..")
    .join("/");

  if (!safePath) {
    throw new Error("A valid document storage path is required");
  }

  const blob = await put(`documents/${safePath}`, fileBuffer, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return {
    storagePath: blob.pathname,
    fileSize: fileBuffer.length,
  };
}

export async function getDocumentBlob(storagePath: string) {
  return get(storagePath, { access: "private" });
}

export async function readDocumentFile(
  storagePath: string
): Promise<Buffer | null> {
  const blob = await getDocumentBlob(storagePath);
  if (!blob?.stream) {
    return null;
  }

  return Buffer.from(await new Response(blob.stream).arrayBuffer());
}

export async function deleteDocumentFile(storagePath: string): Promise<void> {
  await del(storagePath);
}

export function isValidStagingKey(stagingKey: string): boolean {
  return /^staging\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9._-]+$/.test(stagingKey);
}

export function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeMap: Record<string, string> = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".txt": "text/plain",
    ".json": "application/json",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };
  return mimeMap[ext] || "application/octet-stream";
}
