/**
 * App Development Service Component
 * 
 * This component showcases the "Mobile Apps" service using a parallax scrolling effect.
 * It utilizes the common `ParallaxServiceSection` to display high-quality visual assets
 * that represent mobile and web application development.
 */
"use client";

import { memo } from "react";
import { ParallaxServiceSection } from "./parallax-service-section";
import { getServiceMediaAssets } from "./service-media-assets";

/**
 * Configuration for the parallax visual layout.
 * `SEEDS` determines the distribution of elements across different screen sizes.
 */
const SEEDS = {
  large: [311, 347, 373, 397],
  medium: [389, 409],
  small: [431, 457, 479, 503],
};

/**
 * Control how many times the asset pool is duplicated.
 * Set to 1 because we have enough assets or want to maintain high quality.
 */
const DUPLICATION = {
  large: 1,
  medium: 1,
  small: 1,
};

/**
 * Defines the number of priority (eagerly loaded) images for each screen size
 * to optimize Largest Contentful Paint (LCP).
 */
const PRIORITY_COUNTS = {
  large: 4,
  medium: 3,
  small: [3, 0, 0, 0],
};

const AppDevelopment = memo(function AppDevelopment() {
  /**
   * Fetch pre-defined media assets (images/videos) associated with 'mobileApps'.
   * These assets are passed to the parallax section to be rendered.
   */
  const mobileAppsAssets = getServiceMediaAssets('mobileApps');

  return (
    <ParallaxServiceSection
      title="Mobile Apps"
      description="High-performing mobile and web apps that turn bold ideas into everyday tools."
      backgroundClassName="bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950"
      overlayClassName="bg-black/40"
      containerHeightClass="min-h-[300vh]"
      sectionClassName="service-section"
      titleClassName="text-7xl md:text-9xl font-extrabold tracking-tight mb-6 uppercase"
      titleColorClassName="text-purple-300"
      descriptionClassName="text-xl md:text-2xl font-semibold max-w-3xl mx-auto"
      descriptionColorClassName="text-purple-100"
      textWrapperClassName="text-center px-8 relative z-[30]"
      seeds={SEEDS}
      duplication={DUPLICATION}
      priorityCounts={PRIORITY_COUNTS}
      imageSizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      assetPool={mobileAppsAssets}
    />
  );
});

export default AppDevelopment;
