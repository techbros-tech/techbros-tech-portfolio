"use client";

import { useRef, memo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const textSegments = [
  "We are TechBros, innovators and problem solvers.",
  "Building digital solutions.",
  "Where creativity meets technology.",
  "Your vision, our expertise, building the future."
];

// Pre-calculate words outside component to ensure Referentially stable
const ALL_WORDS = textSegments.join(" ").split(" ");

const ScrollRevealSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 flex items-center justify-center bg-black contain-content"
    >
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-orbitron font-bold leading-tight tracking-tight flex flex-wrap gap-4">
          {ALL_WORDS.map((word, i) => {
            const start = i / ALL_WORDS.length;
            const end = start + (1 / ALL_WORDS.length);

            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                rangeStart={start}
                rangeEnd={end}
              />
            );
          })}
        </h2>
      </div>
    </section>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}

const Word = memo(({ word, progress, rangeStart, rangeEnd }: WordProps) => {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0, 1]);

  return (
    <span className="relative inline-block mr-2">
      {/* Base Layer: Dim Silver */}
      <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-neutral-600 to-neutral-800 opacity-100">
        {word}
      </span>

      {/* Active Layer: Bright Chrome/Silver - Reveal based on scroll */}
      <motion.span
        style={{ opacity, willChange: "opacity" }}
        className="relative text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      >
        {word}
      </motion.span>
    </span>
  );
});

Word.displayName = "Word";

// Memoize the main component to prevent re-renders from parent updates
export default memo(ScrollRevealSection);
