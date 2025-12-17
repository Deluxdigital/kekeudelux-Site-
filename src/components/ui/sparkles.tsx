"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SparklesCoreProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speed?: number;
}

// Lightweight sparkle background inspired by Aceternity UI,
// adapted to this project's design tokens and without extra deps.
export const SparklesCore = React.forwardRef<HTMLDivElement, SparklesCoreProps>(
  (
    {
      className,
      background,
      particleColor = "rgba(129, 140, 248, 0.6)",
      speed = 18,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        aria-hidden
        style={{
          ...(style || {}),
          "--sparkles-color": particleColor,
          "--sparkles-speed": `${speed}s`,
          background,
        } as React.CSSProperties}
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(circle_at_0%_0%,var(--sparkles-color)_0,transparent_45%),radial-gradient(circle_at_100%_0%,var(--sparkles-color)_0,transparent_45%),radial-gradient(circle_at_0%_100%,var(--sparkles-color)_0,transparent_45%),radial-gradient(circle_at_100%_100%,var(--sparkles-color)_0,transparent_45%)]",
          "opacity-60 mix-blend-screen animate-sparkles",
          className
        )}
        {...props}
      />
    );
  }
);

SparklesCore.displayName = "SparklesCore";
