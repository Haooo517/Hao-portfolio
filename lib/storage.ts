/**
 * Vercel Blob path conventions and helpers shared between API routes and UI.
 *
 * Layout:
 *   public/<...folders>/<filename>   — visible to everyone via /files
 *   inbox/<...folders>/<filename>    — visible only to admin via /files/admin
 *
 * The two top-level prefixes act as access boundaries; everything else is
 * just user-chosen folder structure.
 */

export const PUBLIC_PREFIX = "public/";
export const INBOX_PREFIX = "inbox/";

export type Area = "public" | "inbox";

export function areaPrefix(area: Area): string {
  return area === "public" ? PUBLIC_PREFIX : INBOX_PREFIX;
}

/** Parses a user-supplied path query into a normalized prefix that ends with "/". */
export function normalizePrefix(area: Area, sub?: string | null): string {
  const base = areaPrefix(area);
  if (!sub) return base;
  // strip leading/trailing slashes, drop ".." segments, collapse double slashes
  const cleaned = sub
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0 && segment !== "..")
    .join("/");
  return cleaned ? `${base}${cleaned}/` : base;
}

/** Strips the area prefix to produce a display-friendly relative path. */
export function relativePath(area: Area, fullKey: string): string {
  const base = areaPrefix(area);
  return fullKey.startsWith(base) ? fullKey.slice(base.length) : fullKey;
}

/** "public/photos/sub/" -> ["photos", "sub"] */
export function pathSegments(prefix: string): string[] {
  const stripped = prefix
    .replace(new RegExp(`^(${PUBLIC_PREFIX}|${INBOX_PREFIX})`), "")
    .replace(/\/$/, "");
  return stripped ? stripped.split("/") : [];
}

/** Last segment of a key, e.g. "public/foo/bar.zip" -> "bar.zip" */
export function basename(key: string): string {
  const trimmed = key.replace(/\/$/, "");
  const idx = trimmed.lastIndexOf("/");
  return idx === -1 ? trimmed : trimmed.slice(idx + 1);
}

/** "public/photos/" -> "photos"; for breadcrumb display */
export function folderLabel(prefix: string): string {
  const segs = pathSegments(prefix);
  return segs[segs.length - 1] ?? "";
}

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // 50 MB

/** Sanitize a user-supplied filename for use as a path segment. Keeps unicode. */
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[/\\<>:"|?*\x00-\x1f]/g, "_")
    .replace(/^\.+/, "_")
    .slice(0, 200);
}

/** Build a Blob path under inbox/ that won't collide with siblings. */
export function buildInboxKey(filename: string): string {
  const safe = sanitizeFilename(filename);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return `${INBOX_PREFIX}${stamp}__${safe}`;
}
