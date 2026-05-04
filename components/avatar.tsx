import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";

type AvatarProps = {
  name: string;
  size?: number;
  className?: string;
};

const AVATAR_FILE = "avatar.jpg";

export function Avatar({ name, size = 96, className = "" }: AvatarProps) {
  const hasPhoto = existsSync(join(process.cwd(), "public", AVATAR_FILE));
  const initial = name.trim().charAt(0) || "?";
  const dimension = { width: size, height: size };

  if (hasPhoto) {
    return (
      <Image
        src={`/${AVATAR_FILE}`}
        alt={name}
        {...dimension}
        priority
        className={`rounded-full border-2 border-orange-500/60 object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={dimension}
      className={`flex items-center justify-center rounded-full border-2 border-orange-500/60 bg-gradient-to-br from-orange-500/30 to-orange-700/20 font-semibold text-orange-300 ${className}`}
    >
      <span style={{ fontSize: size * 0.42 }}>{initial}</span>
    </div>
  );
}
