import React from "react";

import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "999px",
      background = "transparent",
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: React.CSSProperties = {
      ...(style || {}),
      "--shimmer-color": shimmerColor,
      "--shimmer-size": shimmerSize,
      "--speed": shimmerDuration,
      "--radius": borderRadius,
      "--btn-bg": background,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        style={cssVars}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium text-primary-foreground outline-none transition-transform duration-150 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "[border-radius:var(--radius)] border border-primary/60 bg-[var(--btn-bg)]",
          "[&_.shimmer-spark]:pointer-events-none",
          className
        )}
        {...props}
      >
        {/* spark container */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-1px] overflow-hidden [border-radius:inherit]"
        >
          {/* spark */}
          <span
            className="shimmer-spark absolute inset-0 inline-flex h-full w-[var(--shimmer-size)] -translate-x-full animate-shimmer-slide [transform-origin:left_center]"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--shimmer-color), transparent)",
            }}
          />
        </span>

        {/* content */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* subtle glow backdrop */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [border-radius:inherit] bg-primary/20 blur-xl opacity-40"
        />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
