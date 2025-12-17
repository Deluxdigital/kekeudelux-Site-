"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverTrailCircle {
  id: number;
  x: number;
  y: number;
  color: string;
  fadeState: "in" | "out" | null;
}

interface HoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [isListening, setIsListening] = React.useState(false);
    const [circles, setCircles] = React.useState<HoverTrailCircle[]>([]);
    const lastAddedRef = React.useRef(0);

    const createCircle = React.useCallback((x: number, y: number) => {
      const buttonWidth = buttonRef.current?.offsetWidth || 1;
      const xPos = x / buttonWidth;
      const color = `linear-gradient(to right, var(--circle-start) ${
        xPos * 100
      }%, var(--circle-end) ${xPos * 100}%)`;

      setCircles((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), x, y, color, fadeState: null },
      ]);
    }, []);

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!isListening) return;

        const currentTime = Date.now();
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          createCircle(x, y);
        }
      },
      [isListening, createCircle]
    );

    const handlePointerEnter = React.useCallback(() => {
      setIsListening(true);
    }, []);

    const handlePointerLeave = React.useCallback(() => {
      setIsListening(false);
    }, []);

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c
              )
            );
          }, 0);

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c
              )
            );
          }, 1000);

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id));
          }, 2200);
        }
      });
    }, [circles]);

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300",
          "bg-card text-foreground border border-border",
          className
        )}
        style={
          {
            // grayscale-friendly circle gradient
            // light circle on dark background by default
            ["--circle-start" as string]: "hsl(0 0% 100% / 0.16)",
            ["--circle-end" as string]: "hsl(0 0% 60% / 0.24)",
          } as React.CSSProperties
        }
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {circles.map(({ id, x, y, color, fadeState }) => (
          <span
            key={id}
            className={cn(
              "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl",
              fadeState === "in" && "animate-[fade-in_0.3s_ease-out_forwards]",
              fadeState === "out" && "animate-[fade-out_1.2s_ease-out_forwards]"
            )}
            style={{
              left: x,
              top: y,
              width: 120,
              height: 120,
              backgroundImage: color,
              opacity: 0.7,
            }}
          />
        ))}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

HoverButton.displayName = "HoverButton";

export { HoverButton };
