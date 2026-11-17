-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_pagePath_createdAt_idx" ON "Comment"("pagePath", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_ipHash_createdAt_idx" ON "Comment"("ipHash", "createdAt");
