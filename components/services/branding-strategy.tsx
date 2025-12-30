"use client";

import { memo } from "react";
import { ParallaxServiceSection } from "./parallax-service-section";
import { getServiceMediaAssets } from "./service-media-assets";

// Stable configuration objects to prevent re-renders
const SEEDS = {
  large: [713, 739, 761, 787],
  medium: [787, 809],
  small: [827, 853, 877, 901],
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

const BrandingStrategy = memo(function BrandingStrategy() {
  // Use hardcoded media assets for Branding & Strategy
  const brandingAssets = getServiceMediaAssets('brandingStrategy');

  return (
    <ParallaxServiceSection
      title="Branding & Strategy"
      description="Magnetic brand systems and campaigns that stay consistent, memorable, and measurable."
      backgroundClassName="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600"
      overlayClassName="bg-black/40"
      containerHeightClass="min-h-[300vh]"
      sectionClassName="service-section"
      titleClassName="text-7xl md:text-9xl font-extrabold tracking-tight mb-6 uppercase"
      titleColorClassName="text-amber-300"
      descriptionClassName="text-xl md:text-2xl font-semibold max-w-3xl mx-auto"
      descriptionColorClassName="text-amber-100"
      textWrapperClassName="text-center px-8 relative z-[30]"
      seeds={SEEDS}
      duplication={DUPLICATION}
      priorityCounts={PRIORITY_COUNTS}
      imageSizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      assetPool={brandingAssets}
    />
  );
});

export default BrandingStrategy;
