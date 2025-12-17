"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import type { HTMLMotionProps } from "framer-motion";

interface SaveButtonText {
  idle?: string;
  saving?: string;
  saved?: string;
}

type MotionButtonProps = HTMLMotionProps<"button">;

interface SaveButtonProps extends MotionButtonProps {
  text?: SaveButtonText;
  onSave?: () => Promise<void> | void;
}

export function SaveButton({
  text = {
    idle: "Salvar",
    saving: "Salvando...",
    saved: "Salvo!",
  },
  className,
  onClick,
  onSave,
  ...props
}: SaveButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [bounce, setBounce] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (status !== "idle") return;

    setStatus("saving");

    try {
      if (onClick) {
        onClick(event);
      }

      if (onSave) {
        await onSave();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setStatus("saved");
      setBounce(true);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });

      setTimeout(() => {
        setStatus("idle");
        setBounce(false);
      }, 1500);
    } catch (error) {
      console.error("Save failed:", error);
      setStatus("idle");
      setBounce(false);
    }
  };

  const buttonLabel =
    status === "idle" ? text.idle : status === "saving" ? text.saving : text.saved;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-colors",
        "bg-background text-foreground border-border hover:bg-accent",
        isDark && "bg-foreground text-background border-border/70 hover:bg-foreground/90",
        className
      )}
      whileTap={{ scale: 0.97 }}
      animate={bounce ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <AnimatePresence initial={false} mode="wait">
        {status === "idle" && (
          <motion.span
            key="idle"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Sparkles className="h-4 w-4" />
            <span>{buttonLabel}</span>
          </motion.span>
        )}
        {status === "saving" && (
          <motion.span
            key="saving"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{buttonLabel}</span>
          </motion.span>
        )}
        {status === "saved" && (
          <motion.span
            key="saved"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Check className="h-4 w-4" />
            <span>{buttonLabel}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
