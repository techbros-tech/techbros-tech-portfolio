"use client";

import { useMemo } from "react";
import WebDevelopment from "./web-development";
import AppDevelopment from "./app-development";
import UIUXDesign from "./ui-ux-design";
import BrandingStrategy from "./branding-strategy";

export default function Services() {
  // Memoized animation variants - simplified to 2D transforms only (much cheaper)


  const letters = useMemo(() => "SERVICES".split(""), []);

  return (
    <div className="relative bg-black min-h-[1260vh] sm:min-h-[1300vh]">
      {/* STICKY "SERVICES" Text Section - Full Viewport Height */}
      <section className="sticky top-0 min-h-[60vh] sm:min-h-screen w-full flex flex-col items-center justify-center bg-black">
        {/* Main SERVICES Text */}
        <h1
          className="text-[15dvw] sm:text-[12dvw] md:text-[10dvw] font-black leading-none mb-8"
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-500 dark:to-green-600"
              style={{
                textShadow:
                  "0 0 10px rgba(16, 185, 129, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Subtitle "What we offer" */}
        {/* Subtitle "What we offer" */}
        <p
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-500 dark:to-green-600 tracking-wide"
          style={{
            textShadow:
              "0 0 8px rgba(16, 185, 129, 0.15), 0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          What we offer
        </p>

        {/* Decorative line */}
        <div
          className="h-1 w-[200px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mt-6"
        />
      </section>

      {/* Sticky Service Sections - All Full Viewport Height */}
      <div className="relative " style={{ height: "1200vh" }}>
        <WebDevelopment />
        <AppDevelopment />
        <UIUXDesign />
        <BrandingStrategy />
      </div>
    </div>
  );
}
