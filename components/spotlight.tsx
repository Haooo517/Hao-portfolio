"use client";

import { useEffect, useRef } from "react";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
  size?: number;
  intensity?: number;
};

export function Spotlight({
  children,
  className = "",
  size = 480,
  intensity = 0.18,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 30%), rgba(249, 115, 22, ${intensity}), transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
