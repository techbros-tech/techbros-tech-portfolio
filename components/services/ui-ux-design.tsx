"use client";

import { memo } from "react";
import { ParallaxServiceSection } from "./parallax-service-section";
import { getServiceMediaAssets } from "./service-media-assets";

// Stable configuration objects to prevent re-renders
const SEEDS = {
  large: [511, 533, 557, 587],
  medium: [571, 593],
  small: [617, 641, 659, 683],
};

const DUPLICATION = {
  large: 1,
  medium: 1,
  small: 1,
};

const PRIORITY_COUNTS = {
  large: 4,
  medium: 3,
  small: [3, 0, 0, 0],
};

const UIUXDesign = memo(function UIUXDesign() {
  // Use hardcoded media assets for UI/UX Design
  const uiUxAssets = getServiceMediaAssets('uiUxDesign');

  return (
    <ParallaxServiceSection
      title="UI/UX Design"
      description="Human-centered interfaces that feel natural, beautiful, and irresistibly easy to use."
      backgroundClassName="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800"
      overlayClassName="bg-black/40"
      containerHeightClass="min-h-[300vh]"
      sectionClassName="service-section"
      titleClassName="text-7xl md:text-9xl font-extrabold tracking-tight mb-6 uppercase"
      titleColorClassName="text-pink-300"
      descriptionClassName="text-xl md:text-2xl font-semibold max-w-3xl mx-auto"
      descriptionColorClassName="text-pink-100"
      textWrapperClassName="text-center px-8 relative z-[30]"
      seeds={SEEDS}
      duplication={DUPLICATION}
      priorityCounts={PRIORITY_COUNTS}
      imageSizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      assetPool={uiUxAssets}
    />
  );
});

export default UIUXDesign;
