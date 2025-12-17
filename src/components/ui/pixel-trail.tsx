"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Pixel {
  id: number;
  x: number;
  y: number;
  opacity: number;
  age: number;
}

const COLORS = ["#ffffff", "#e0e0e0", "#c0c0c0", "#909090", "#707070"] as const;
const PIXEL_SIZE = 12;
const TRAIL_LENGTH = 40;
const FADE_SPEED = 0.04;

interface PixelCursorTrailProps {
  className?: string;
  children?: React.ReactNode;
}

export function PixelCursorTrail({ className, children }: PixelCursorTrailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const createPixel = useCallback((x: number, y: number): Pixel => {
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 1,
      age: 0,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y);
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
        lastPositionRef.current = { x, y };
      }
    },
    [createPixel]
  );

  useEffect(() => {
    const animate = () => 
      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0)
      );

    animationRef.current = window.requestAnimationFrame(function loop() {
      animate();
      animationRef.current = window.requestAnimationFrame(loop);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden", className)}
    >
      {/* layer de pixels, não bloqueia cliques */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {pixels.map((pixel, index) => {
          const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 100);
          const currentSize = PIXEL_SIZE * sizeMultiplier;
          const color = COLORS[index % COLORS.length];

          return (
            <div
              key={pixel.id}
              className="absolute rounded-[4px] shadow-[0_0_18px_rgba(255,255,255,0.7)]"
              style={{
                left: pixel.x - currentSize / 2,
                top: pixel.y - currentSize / 2,
                width: currentSize,
                height: currentSize,
                opacity: pixel.opacity,
                background: color,
              }}
            />
          );
        })}
      </div>

      {/* conteúdo da seção */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
