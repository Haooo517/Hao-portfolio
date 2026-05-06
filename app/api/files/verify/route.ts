import { NextRequest, NextResponse } from "next/server";
import { checkBodyCode } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Lightweight credential probe — the client posts the friend code or admin
 * password and we tell it whether it's valid, so the UI can flip into the
 * authenticated view before the user picks a file. Subsequent file
 * operations still re-validate via headers.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { friendCode?: string; adminPassword?: string }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const result = checkBodyCode(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Wrong code" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, role: result.role });
}
