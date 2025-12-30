"use client";

import { memo, useMemo, type CSSProperties } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { HighlightText } from "@/components/ui/highlight-text";

const MAIN_TEXT = "TECHBROS";

const SUB_TEXT_PARTS = [
  { text: "Where ", highlight: false },
  { text: "Innovation", highlight: true },
  { text: " Meets ", highlight: false },
  { text: "Reality", highlight: true },
];

const DESCRIPTION_PARTS = [
  { text: "Building tomorrow's ", highlight: false },
  { text: "digital solutions", highlight: true },
  { text: " today with cutting-edge ", highlight: false },
  { text: "technology", highlight: true },
  { text: " and creative ", highlight: false },
  { text: "excellence", highlight: true },
];

const TITLE_TEXT_STYLE = {};

const LETTER_STYLE: CSSProperties = {};

const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.05 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const Subtitle = memo(function Subtitle() {
  return (
    <m.h2
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 },
        },
      }}
      className="text-xl sm:text-2xl md:text-3xl font-orbitron font-semibold mb-4 tracking-wide text-neutral-300"
    >
      {SUB_TEXT_PARTS.map((part, index) =>
        part.highlight ? (
          <HighlightText key={index}>{part.text}</HighlightText>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </m.h2>
  );
});

const Description = memo(function Description() {
  return (
    <m.p
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-sm sm:text-base md:text-lg font-exo2 mb-8 max-w-2xl mx-auto leading-relaxed font-light text-neutral-400"
    >
      {DESCRIPTION_PARTS.map((part, index) =>
        part.highlight ? (
          <HighlightText key={index}>{part.text}</HighlightText>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </m.p>
  );
});

const CallToAction = memo(function CallToAction() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="inline-block"
    >
      <button className="relative w-[200px] h-[55px] rounded-[45px] bg-gradient-to-b from-emerald-500 to-green-600 text-white font-rajdhani font-semibold text-lg tracking-wide shadow-lg shadow-emerald-700/30 transition-transform duration-200 hover:scale-105 active:scale-95">
        <span className="relative z-10">Discover Excellence</span>
      </button>
    </m.div>
  );
});

export const BackgroundPaths = memo(function BackgroundPaths() {
  const titleLetters = useMemo(
    () =>
      MAIN_TEXT.split("").map((letter, index) => (
        <m.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500"
          style={LETTER_STYLE}
        >
          {letter === " " ? "\u00A0" : letter}
        </m.span>
      )),
    [],
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,64,175,0.15),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black opacity-80" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
        <LazyMotion features={domAnimation}>
          <m.div initial="hidden" animate="visible" variants={titleVariants} className="max-w-4xl mx-auto space-y-6">
            <m.h1
              variants={titleVariants}
              className="text-4xl sm:text-6xl md:text-7xl font-audiowide font-black tracking-wider"
              style={TITLE_TEXT_STYLE}
            >
              {titleLetters}
            </m.h1>
            <Subtitle />
            <Description />
            <CallToAction />
          </m.div>
        </LazyMotion>
      </div>
    </div>
  );
});
