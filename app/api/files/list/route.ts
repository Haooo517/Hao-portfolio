import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";
import {
  Area,
  INBOX_PREFIX,
  PUBLIC_PREFIX,
  basename,
  normalizePrefix,
} from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const area = (searchParams.get("area") ?? "public") as Area;
  const sub = searchParams.get("path");

  if (area !== "public" && area !== "inbox") {
    return NextResponse.json({ error: "Invalid area" }, { status: 400 });
  }

  // Inbox listing is admin-only.
  if (area === "inbox" && !isAdmin(req)) {
    return NextResponse.json({ error: "Admin required" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage not configured (BLOB_READ_WRITE_TOKEN missing)" },
      { status: 500 },
    );
  }

  const prefix = normalizePrefix(area, sub);

  try {
    // mode: "folded" so siblings are split into folder names + files at this depth
    const { blobs, folders } = await list({
      prefix,
      mode: "folded",
      limit: 1000,
    });

    const subFolders = (folders ?? [])
      .map((f) => f.replace(/\/$/, ""))
      .map((f) => ({
        name: basename(f),
        path: f.startsWith(PUBLIC_PREFIX)
          ? f.slice(PUBLIC_PREFIX.length)
          : f.startsWith(INBOX_PREFIX)
            ? f.slice(INBOX_PREFIX.length)
            : f,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const files = blobs
      .map((b) => ({
        name: basename(b.pathname),
        url: b.url,
        size: b.size,
        uploadedAt: b.uploadedAt,
        pathname: b.pathname,
      }))
      .sort((a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      );

    return NextResponse.json({
      area,
      prefix,
      folders: subFolders,
      files,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "List failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
