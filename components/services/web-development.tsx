"use client";

import { memo, useMemo } from "react";
import { ParallaxServiceSection } from "./parallax-service-section";
import { getServiceMediaAssets } from "./service-media-assets";

// Stable configuration objects to prevent re-renders
const SEEDS = {
  large: [131, 163, 197, 223],
  medium: [229, 257],
  small: [11, 23, 47, 89],
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

const WebDevelopment = memo(function WebDevelopment() {
  // Use hardcoded media assets for Websites
  const websitesAssets = getServiceMediaAssets('websites');

  return (
    <ParallaxServiceSection
      title="Websites"
      description="Stunning, responsive sites that deliver standout user experiences"
      backgroundClassName="bg-gradient-to-br from-emerald-950 via-emerald-900 to-black"
      overlayClassName="bg-black/40 z-[5]"
      containerHeightClass="min-h-[300vh]"
      seeds={SEEDS}
      duplication={DUPLICATION}
      priorityCounts={PRIORITY_COUNTS}
      titleClassName="text-7xl md:text-9xl font-extrabold tracking-tight mb-6 uppercase"
      titleColorClassName="text-cyan-300"
      descriptionClassName="text-xl md:text-2xl font-semibold max-w-3xl mx-auto"
      descriptionColorClassName="text-cyan-100"
      textWrapperClassName="text-center px-8 relative z-[30]"
      imageSizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      assetPool={websitesAssets}
    />
  );
});

export default WebDevelopment;
