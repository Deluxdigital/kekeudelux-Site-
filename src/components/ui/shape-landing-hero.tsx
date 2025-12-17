"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 420,
  height = 140,
  rotate = 0,
  gradient = "from-white/10 via-white/5 to-transparent",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateMotion = useMotionValue(rotate);

  useEffect(() => {
    const controlsX = animate(x, [0, 40, -30, 0], {
      delay,
      duration: 18,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });

    const controlsY = animate(y, [0, -30, 25, 0], {
      delay: delay + 2,
      duration: 22,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });

    const controlsR = animate(rotateMotion, [rotate, rotate + 12, rotate - 8, rotate], {
      delay,
      duration: 26,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });

    return () => {
      controlsX.stop();
      controlsY.stop();
      controlsR.stop();
    };
  }, [delay, rotate, rotateMotion, x, y]);

  const translateX = useTransform(x, (v) => `${v}px`);
  const translateY = useTransform(y, (v) => `${v}px`);

  return (
    <motion.div
      style={{
        translateX,
        translateY,
        rotate: rotateMotion,
      }}
      className={cn(
        "pointer-events-none absolute rounded-[2.5rem] border border-white/10",
        "bg-gradient-to-br",
        gradient,
        "shadow-[0_0_60px_rgba(255,255,255,0.15)] backdrop-blur-xl",
        className
      )}
    >
      <div
        className="h-full w-full opacity-[0.18]"
        style={{
          width,
          height,
        }}
      >
        <div className="flex h-full w-full items-center justify-between px-7 py-6 text-xs text-white/70">
          <div className="inline-flex items-center gap-2">
            <Circle className="h-3 w-3 text-primary" />
            <span className="uppercase tracking-[0.25em] text-[0.65rem]">
              creative
            </span>
          </div>
          <span className="text-[0.65rem] font-medium">since 2019</span>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroGeometricBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,hsl(270_80%_15%)_0%,hsl(270_80%_5%)_45%),radial-gradient(circle_at_bottom_right,hsl(200_90%_18%)_0%,hsl(240_90%_4%)_50%)]">
      {/* main moving shapes */}
      <ElegantShape
        width={520}
        height={160}
        rotate={-8}
        className="top-[12%] left-[8%]"
        gradient="from-white/15 via-white/8 to-transparent"
      />
      <ElegantShape
        width={460}
        height={150}
        rotate={10}
        delay={2.4}
        className="top-[40%] right-[6%]"
        gradient="from-neon-blue/40 via-neon-purple/25 to-transparent"
      />
      <ElegantShape
        width={380}
        height={130}
        rotate={18}
        delay={4.2}
        className="bottom-[8%] left-1/2 -translate-x-1/2"
        gradient="from-neon-cyan/35 via-neon-blue/25 to-transparent"
      />
    </div>
  );
}

export { ElegantShape };
