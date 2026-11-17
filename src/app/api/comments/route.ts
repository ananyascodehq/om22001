import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MAX_NAME = 40;
const MAX_BODY = 1000;
const RATE_LIMIT_PER_MINUTE = 3;

function normalizePath(raw: string | null | undefined): string | null {
  if (!raw || !raw.startsWith("/") || raw.length > 200) return null;
  const clean = raw.split("?")[0].split("#")[0];
  return clean.length > 1 ? clean.replace(/\/+$/, "") : clean;
}

function hashIp(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const salt = process.env.COMMENT_HASH_SALT || "om22001-comments";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function GET(request: NextRequest) {
  const pagePath = normalizePath(request.nextUrl.searchParams.get("path"));
  if (!pagePath) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { pagePath },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { id: true, name: true, body: true, createdAt: true },
    });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error("Error loading comments:", error);
    return NextResponse.json({ error: "Failed to load comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const pagePath = normalizePath(payload?.path);
    const name = typeof payload?.name === "string" ? payload.name.trim() : "";
    const body = typeof payload?.body === "string" ? payload.body.trim() : "";

    // Honeypot: real users never fill this hidden field.
    if (payload?.website) {
      return NextResponse.json({ success: true, ignored: true });
    }
    if (!pagePath) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
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

    const ipHash = hashIp(request);
    const recent = await prisma.comment.count({
      where: { ipHash, createdAt: { gte: new Date(Date.now() - 60_000) } },
    });
    if (recent >= RATE_LIMIT_PER_MINUTE) {
      return NextResponse.json(
        { error: "You're commenting too fast. Please wait a minute." },
        { status: 429 }
      );
    }

    const comment = await prisma.comment.create({
      data: { pagePath, name: name || "Anonymous", body, ipHash },
      select: { id: true, name: true, body: true, createdAt: true },
    });
    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
