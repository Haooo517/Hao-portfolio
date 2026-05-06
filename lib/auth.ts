/**
 * Lightweight access control for the /files area.
 *
 * Two roles, both gated by env-var-stored secrets sent in request headers:
 *   - "friend": anyone who knows FRIEND_CODE can upload to inbox/
 *   - "admin":  anyone who knows ADMIN_PASSWORD can list/move/delete anything
 *
 * No accounts, no DB, no signed cookies. Headers travel over HTTPS so the
 * shared secret is fine for low-stakes personal use.
 */

import { NextRequest } from "next/server";

export const FRIEND_HEADER = "x-friend-code";
export const ADMIN_HEADER = "x-admin-password";

function readEnv(name: string): string | null {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : null;
}

export function expectedFriendCode(): string | null {
  return readEnv("FRIEND_CODE");
}

export function expectedAdminPassword(): string | null {
  return readEnv("ADMIN_PASSWORD");
}

export function isAdmin(req: NextRequest): boolean {
  const expected = expectedAdminPassword();
  if (!expected) return false;
  return req.headers.get(ADMIN_HEADER) === expected;
}

export function isFriendOrAdmin(req: NextRequest): boolean {
  if (isAdmin(req)) return true;
  const expected = expectedFriendCode();
  if (!expected) return false;
  return req.headers.get(FRIEND_HEADER) === expected;
}

export function checkBodyCode(
  body: { friendCode?: string; adminPassword?: string },
): { ok: true; role: "friend" | "admin" } | { ok: false } {
  const admin = expectedAdminPassword();
  if (admin && body.adminPassword === admin) return { ok: true, role: "admin" };
  const friend = expectedFriendCode();
  if (friend && body.friendCode === friend) return { ok: true, role: "friend" };
  return { ok: false };
}
