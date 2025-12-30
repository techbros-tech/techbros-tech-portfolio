"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HighlightTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

export function HighlightText({
  children,
  className = "",
  animate = false,
  delay = 0,
  style = {},
}: HighlightTextProps) {
  // Optimized: Reduced text-shadow complexity and removed expensive filter
  const defaultStyle = {
    textShadow: "0 0 10px rgba(16, 185, 129, 0.25), 0 2px 4px rgba(0, 0, 0, 0.3)",
  };

  const content = (
    <span
      className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-500 dark:to-green-600 ${className}`}
      style={{ ...defaultStyle, ...style }}
    >
      {children}
    </span>
  );

  if (animate) {
    return (
      <motion.span
        initial={{
          opacity: 0,
          scale: 0.8,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          delay,
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="inline-block"
      >
        {content}
      </motion.span>
    );
  }

  return content;
}
