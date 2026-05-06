import { NextRequest, NextResponse } from "next/server";
import { copy, del } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";
import { PUBLIC_PREFIX, sanitizeFilename } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Move an inbox file to a public folder. Admin only.
 * Body: { sourceUrl, targetPath } where targetPath is relative under public/,
 *   e.g. "shared/photos/foo.jpg".
 */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Admin required" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage not configured" },
      { status: 500 },
    );
  }

  const body = (await req
    .json()
    .catch(() => null)) as { sourceUrl?: string; targetPath?: string } | null;

  if (!body?.sourceUrl || !body?.targetPath) {
    return NextResponse.json(
      { error: "sourceUrl and targetPath are required" },
      { status: 400 },
    );
  }

  // Sanitize target path: collapse slashes, drop ".."
  const cleaned = body.targetPath
    .split("/")
    .map((s) => sanitizeFilename(s.trim()))
    .filter((s) => s.length > 0 && s !== "..")
    .join("/");

  if (!cleaned) {
    return NextResponse.json({ error: "Invalid target path" }, { status: 400 });
  }

  const targetKey = `${PUBLIC_PREFIX}${cleaned}`;

  try {
    const newBlob = await copy(body.sourceUrl, targetKey, {
      access: "public",
      addRandomSuffix: false,
    });
    await del(body.sourceUrl);
    return NextResponse.json({ ok: true, newUrl: newBlob.url, pathname: newBlob.pathname });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Move failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
