import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import {
  expectedAdminPassword,
  expectedFriendCode,
} from "@/lib/auth";
import {
  INBOX_PREFIX,
  MAX_UPLOAD_BYTES,
  PUBLIC_PREFIX,
} from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Single endpoint that issues client upload tokens for both areas.
 *   - pathname starting with "inbox/"  → friend code or admin password required
 *   - pathname starting with "public/" → admin password required
 *
 * Credentials travel inside `clientPayload` (a JSON string) sent by the
 * Vercel Blob browser SDK, since it doesn't expose a way to attach custom
 * request headers to its handshake call.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as HandleUploadBody;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage not configured" },
      { status: 500 },
    );
  }

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayloadRaw) => {
        let creds: { friendCode?: string; adminPassword?: string } = {};
        if (clientPayloadRaw) {
          try {
            creds = JSON.parse(clientPayloadRaw);
          } catch {
            // ignore malformed payload — treated as empty credentials
          }
        }

        const isInbox = pathname.startsWith(INBOX_PREFIX);
        const isPublic = pathname.startsWith(PUBLIC_PREFIX);

        if (!isInbox && !isPublic) {
          throw new Error("Path must start with public/ or inbox/");
        }

        const adminExpected = expectedAdminPassword();
        const friendExpected = expectedFriendCode();

        const adminOk =
          adminExpected !== null && creds.adminPassword === adminExpected;
        const friendOk =
          friendExpected !== null && creds.friendCode === friendExpected;

        if (isPublic && !adminOk) {
          throw new Error("Admin password required to upload to public/");
        }
        if (isInbox && !adminOk && !friendOk) {
          throw new Error("Friend code required to upload to inbox/");
        }

        return {
          allowedContentTypes: ["*/*"],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: isInbox,
          tokenPayload: JSON.stringify({
            role: adminOk ? "admin" : "friend",
            area: isInbox ? "inbox" : "public",
          }),
        };
      },
      onUploadCompleted: async () => {
        // No-op for now. Hook here later if we want a notification on inbox uploads.
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
