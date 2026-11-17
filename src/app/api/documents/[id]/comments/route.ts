import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MAX_NAME = 40;
const MAX_BODY = 1000;
const MAX_COMMENTS_PER_DOCUMENT = 500;
const RATE_LIMIT_PER_MINUTE = 5;

interface Params {
  params: Promise<{ id: string }>;
}

function hashIp(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const salt = process.env.COMMENT_HASH_SALT || "om22001-comments";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const comments = await prisma.documentComment.findMany({
      where: { documentId: id },
      orderBy: { createdAt: "asc" },
      take: MAX_COMMENTS_PER_DOCUMENT,
      select: {
        id: true,
        page: true,
        x: true,
        y: true,
        name: true,
        body: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error("Error loading document comments:", error);
    return NextResponse.json({ error: "Failed to load comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const payload = await request.json();

    // Honeypot: real users never fill this hidden field.
    if (payload?.website) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const page = Number(payload?.page);
    const x = Number(payload?.x);
    const y = Number(payload?.y);
    const name = typeof payload?.name === "string" ? payload.name.trim() : "";
    const body = typeof payload?.body === "string" ? payload.body.trim() : "";

    if (!Number.isInteger(page) || page < 1 || page > 5000) {
      return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }
    if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > 1 || y < 0 || y > 1) {
      return NextResponse.json({ error: "Invalid position" }, { status: 400 });
    }
    if (!body || body.length > MAX_BODY) {
      return NextResponse.json(
        { error: `Comment must be 1-${MAX_BODY} characters` },
        { status: 400 }
      );
    }
    if (name.length > MAX_NAME) {
      return NextResponse.json(
        { error: `Name must be at most ${MAX_NAME} characters` },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const ipHash = hashIp(request);
    const recent = await prisma.documentComment.count({
      where: { ipHash, createdAt: { gte: new Date(Date.now() - 60_000) } },
    });
    if (recent >= RATE_LIMIT_PER_MINUTE) {
      return NextResponse.json(
        { error: "You're commenting too fast. Please wait a minute." },
        { status: 429 }
      );
    }

    const comment = await prisma.documentComment.create({
      data: { documentId: id, page, x, y, name: name || "Anonymous", body, ipHash },
      select: { id: true, page: true, x: true, y: true, name: true, body: true, createdAt: true },
    });
    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    console.error("Error posting document comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
