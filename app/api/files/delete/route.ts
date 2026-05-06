import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

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

  const body = await req.json().catch(() => null) as { url?: string } | null;
  if (!body?.url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  try {
    await del(body.url);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
