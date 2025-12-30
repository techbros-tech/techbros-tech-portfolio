"use client";

import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import {
  BASE_MEDIA_ASSETS,
  createMixedMediaSequence,
  getAssetPoolForSection,
  IMAGE_ASSETS,
  MediaAsset,
} from "./media-assets";

// Memoized LazyVideo component to prevent unnecessary re-renders
const LazyVideo = memo(
  ({
    src,
    poster,
    className,
  }: {
    src: string;
    poster?: string;
    className?: string;
  }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isInView = useInView(videoRef, { amount: 0.5 });

    useEffect(() => {
      const element = videoRef.current;
      if (!element) {
        return;
      }

      if (isInView) {
        const playPromise = element.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            // Autoplay might be blocked; ignore silently
          });
        }
      } else {
        element.pause();
        element.currentTime = 0;
      }
    }, [isInView]);

    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster ?? IMAGE_ASSETS[0]?.src}
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`.trim()}
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
      />
    );
  },
);

LazyVideo.displayName = "LazyVideo";

const createMemoizedImageComponent = (src: string, alt: string) => {
  const MemoizedImage = memo(
    ({
      priority = false,
      className = "object-cover",
      sizes,
      quality,
    }: {
      priority?: boolean;
      className?: string;
      sizes?: string;
      quality?: number;
    }) => (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className={className}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
    ),
  );
  MemoizedImage.displayName = `MemoizedImage-${src}`;
  return MemoizedImage;
};

type PriorityValue = number | number[];

const normalizePriorityCounts = (
  value: PriorityValue | undefined,
  length: number,
  defaultValue: number,
): number[] => {
  if (Array.isArray(value)) {
    if (value.length >= length) {
      return value.slice(0, length);
    }
    return [
      ...value,
      ...Array.from({ length: length - value.length }, () => defaultValue),
    ];
  }

  return Array.from({ length }, () => value ?? defaultValue);
};

type ParallaxServiceSectionProps = {
  title: string;
  description: string;
  titleStyle?: CSSProperties;
  containerHeightClass?: string;
  containerClassName?: string;
  sectionClassName?: string;
  backgroundClassName?: string;
  overlayClassName?: string;
  titleClassName?: string;
  titleColorClassName?: string;
  descriptionClassName?: string;
  descriptionColorClassName?: string;
  textWrapperClassName?: string;
  textParallax?: boolean;
  seeds?: {
    large?: number[];
    medium?: number[];
    small?: number[];
  };
  duplication?: {
    large?: number;
    medium?: number;
    small?: number;
  };
  priorityCounts?: {
    large?: PriorityValue;
    medium?: PriorityValue;
    small?: PriorityValue;
  };
  imageSizes?: string;
  inViewAmount?: number;
  assetPool?: MediaAsset[];
};

const DEFAULT_LARGE_CLASS_NAMES = [
  "flex-1 flex flex-col gap-6 -mt-[140%] will-change-transform",
  "flex-1 flex flex-col gap-6 -mt-[100%] will-change-transform",
  "flex-1 flex flex-col gap-6 -mt-[200%] will-change-transform",
  "flex-1 flex flex-col gap-6 -mt-[160%] will-change-transform",
];

const DEFAULT_MEDIUM_CLASS_NAMES = [
  "flex-1 flex flex-col gap-6 -mt-[140%] will-change-transform",
  "flex-1 flex flex-col gap-6 -mt-[120%] will-change-transform",
];

const DEFAULT_SMALL_CLASS_NAMES = [
  "flex h-[65vh] w-[300%] gap-6 -ml-[80%] will-change-transform",
  "flex h-[65vh] w-[300%] gap-6 -ml-[100%] mt-6 will-change-transform",
  "flex h-[65vh] w-[300%] gap-6 -ml-[85%] mt-6 will-change-transform",
  "flex h-[65vh] w-[300%] gap-6 -ml-[95%] mt-6 will-change-transform",
];

const DEFAULT_SEEDS = {
  large: [131, 163, 197, 223],
  medium: [229, 257],
  small: [11, 23, 47, 89],
};

export const ParallaxServiceSection = memo(function ParallaxServiceSection({
  title,
  description,
  titleStyle,
  containerHeightClass = "min-h-[300vh]",
  containerClassName = "",
  sectionClassName = "",
  backgroundClassName = "bg-black",
  overlayClassName = "bg-black/50",
  titleClassName = "text-6xl md:text-8xl font-black tracking-tight mb-6",
  titleColorClassName,
  descriptionClassName = "text-xl md:text-2xl font-semibold max-w-3xl mx-auto",
  descriptionColorClassName,
  textWrapperClassName = "text-center px-8 relative z-[30]",
  textParallax = true,
  seeds = DEFAULT_SEEDS,
  duplication = {
    large: 3,
    medium: 2,
    small: 2,
  },
  priorityCounts = {
    large: 4,
    medium: 3,
    small: 0,
  },
  imageSizes = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  inViewAmount = 0.3,
  assetPool,
}: ParallaxServiceSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: inViewAmount,
  });
  const isTextInView = useInView(textRef, {
    once: false,
    amount: 0.3,
  });

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isTextInView) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [isTextInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll signal without introducing stutter or "stepping"
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });

  const resolvedAssetPool =
    assetPool && assetPool.length > 0 ? assetPool : BASE_MEDIA_ASSETS;

  // Memoize image components only when asset pool actually changes
  const memoizedImageComponents = useMemo(() => {
    const components: Record<
      string,
      ReturnType<typeof createMemoizedImageComponent>
    > = {};
    resolvedAssetPool.forEach((asset) => {
      if (asset.type === "image" && !components[asset.src]) {
        components[asset.src] = createMemoizedImageComponent(
          asset.src,
          asset.alt,
        );
      }
    });
    return components;
  }, [resolvedAssetPool]);

  // Memoize renderMedia function to prevent recreation on every render
  const renderMedia = useCallback(
    ({
      media,
      priority,
      className = "object-cover",
      sizes,
      quality,
    }: {
      media: MediaAsset;
      priority?: boolean;
      className?: string;
      sizes?: string;
      quality: number;
    }) => {
      if (media.type === "video") {
        return (
          <LazyVideo
            src={media.src}
            poster={media.poster}
            className={className}
          />
        );
      }

      const ImageComponent = memoizedImageComponents[media.src];

      return ImageComponent ? (
        <ImageComponent
          priority={priority}
          className={className}
          sizes={sizes}
          quality={quality}
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          quality={quality}
          className={className}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      );
    },
    [memoizedImageComponents],
  );

  const largeSeeds = seeds.large ?? DEFAULT_SEEDS.large;
  const mediumSeeds = seeds.medium ?? DEFAULT_SEEDS.medium;
  const smallSeeds = seeds.small ?? DEFAULT_SEEDS.small;

  // Memoize priority counts to prevent recalculation
  const largePriorityCounts = useMemo(
    () => normalizePriorityCounts(priorityCounts.large, largeSeeds.length, 3),
    [priorityCounts.large, largeSeeds.length],
  );
  const mediumPriorityCounts = useMemo(
    () => normalizePriorityCounts(priorityCounts.medium, mediumSeeds.length, 3),
    [priorityCounts.medium, mediumSeeds.length],
  );
  const smallPriorityCounts = useMemo(
    () => normalizePriorityCounts(priorityCounts.small, smallSeeds.length, 0),
    [priorityCounts.small, smallSeeds.length],
  );

  const transformMapping = useMemo(
    () => ({
      large: [-85, -65, -110, -90],
      medium: [-70, -50],
      small: [-55, -75, -60, -80],
    }),
    [],
  );

  const largeScreenConfigs = useMemo(
    () =>
      largeSeeds.map((seed, index) => {
        // Generate unique asset pool for each column using its own seed
        const columnPool = assetPool
          ? assetPool
          : getAssetPoolForSection(seed, 12, {
            includeVideos: true,
            maxVideos: 3,
          });

        return {
          keyPrefix: `large-${index}`,
          media: createMixedMediaSequence(
            seed,
            duplication.large ?? 3,
            columnPool,
          ),
          className:
            DEFAULT_LARGE_CLASS_NAMES[index % DEFAULT_LARGE_CLASS_NAMES.length],
          priorityCount: largePriorityCounts[index],
          transformValue: transformMapping.large[index % 4],
        };
      }),
    [
      largeSeeds,
      duplication.large,
      largePriorityCounts,
      transformMapping.large,
      assetPool,
    ],
  );

  const mediumColumnConfigs = useMemo(
    () =>
      mediumSeeds.map((seed, index) => {
        // Generate unique asset pool for each column using its own seed
        const columnPool = assetPool
          ? assetPool
          : getAssetPoolForSection(seed, 12, {
            includeVideos: true,
            maxVideos: 3,
          });

        return {
          keyPrefix: `medium-${index}`,
          media: createMixedMediaSequence(
            seed,
            duplication.medium ?? 2,
            columnPool,
          ),
          className:
            DEFAULT_MEDIUM_CLASS_NAMES[
            index % DEFAULT_MEDIUM_CLASS_NAMES.length
            ],
          priorityCount: mediumPriorityCounts[index],
          transformValue: transformMapping.medium[index % 2],
        };
      }),
    [
      mediumSeeds,
      duplication.medium,
      mediumPriorityCounts,
      transformMapping.medium,
      assetPool,
    ],
  );

  const smallScreenConfigs = useMemo(
    () =>
      smallSeeds.map((seed, index) => {
        // Generate unique asset pool for each column using its own seed
        const columnPool = assetPool
          ? assetPool
          : getAssetPoolForSection(seed, 12, {
            includeVideos: true,
            maxVideos: 3,
          });

        return {
          keyPrefix: `small-${index}`,
          media: createMixedMediaSequence(
            seed,
            duplication.small ?? 2,
            columnPool,
          ),
          className:
            DEFAULT_SMALL_CLASS_NAMES[index % DEFAULT_SMALL_CLASS_NAMES.length],
          priorityCount: smallPriorityCounts[index],
          transformValue: transformMapping.small[index % 4],
        };
      }),
    [
      smallSeeds,
      duplication.small,
      smallPriorityCounts,
      transformMapping.small,
      assetPool,
    ],
  );

  const resolvedImageQuality = 65;

  return (
    <div
      ref={containerRef}
      className={`relative ${containerHeightClass} ${containerClassName}`.trim()}
    >
      <motion.section
        ref={sectionRef}
        style={{
          // Use single CSS variable for all transforms
          ["--scroll-progress" as string]: scrollProgress,
        }}
        className={`sticky top-0 h-screen w-full flex items-center justify-center service-section overflow-hidden z-[20] ${backgroundClassName} ${sectionClassName} ${isInView ? "in-view" : ""
          }`.trim()}
      >
        {/* Parallax content - always rendered for sticky effect to work */}
        <div className="absolute inset-0 overflow-hidden mx-1">
          {/* Large screens - 4 columns */}
          <div className="hidden lg:flex h-full gap-6 xl:gap-12 px-1">
            {largeScreenConfigs.map(
              ({
                keyPrefix,
                media,
                className,
                priorityCount,
                transformValue,
              }) => (
                <motion.div
                  key={keyPrefix}
                  style={{
                    // Use CSS calc() with CSS variable instead of JS transform
                    y: `calc(var(--scroll-progress) * ${transformValue}%)`,
                  }}
                  className={className}
                >
                  {media.map((mediaItem, mediaIndex) => {
                    const isPriority =
                      mediaIndex < (priorityCount ?? 0) &&
                      mediaItem.type === "image";
                    return (
                      <div
                        key={`${keyPrefix}-${mediaIndex}-${mediaItem.src}`}
                        className="h-[78vh] w-full relative flex-shrink-0 overflow-hidden rounded-2xl bg-black/40"
                      >
                        {renderMedia({
                          media: mediaItem,
                          priority: isPriority,
                          sizes: imageSizes,
                          quality: resolvedImageQuality,
                          className:
                            mediaItem.type === "video"
                              ? "object-cover"
                              : "object-cover",
                        })}
                      </div>
                    );
                  })}
                </motion.div>
              ),
            )}
          </div>

          {/* Medium screens - 2 columns */}
          <div className="hidden md:flex lg:hidden h-full gap-12 px-1">
            {mediumColumnConfigs.map(
              ({
                keyPrefix,
                media,
                className,
                priorityCount,
                transformValue,
              }) => (
                <motion.div
                  key={keyPrefix}
                  style={{
                    y: `calc(var(--scroll-progress) * ${transformValue}%)`,
                  }}
                  className={className}
                >
                  {media.map((mediaItem, mediaIndex) => {
                    const isPriority =
                      mediaIndex < (priorityCount ?? 0) &&
                      mediaItem.type === "image";

                    return (
                      <div
                        key={`${keyPrefix}-${mediaIndex}-${mediaItem.src}`}
                        className="h-[84vh] w-full relative flex-shrink-0 overflow-hidden rounded-2xl bg-black/40"
                      >
                        {renderMedia({
                          media: mediaItem,
                          priority: isPriority,
                          sizes: imageSizes,
                          quality: resolvedImageQuality,
                        })}
                      </div>
                    );
                  })}
                </motion.div>
              ),
            )}
          </div>

          {/* Small screens - Horizontal scroll */}
          <div className="flex md:hidden flex-col h-full w-full">
            {smallScreenConfigs.map(
              ({
                media,
                keyPrefix,
                className,
                priorityCount,
                transformValue,
              }) => (
                <motion.div
                  key={keyPrefix}
                  style={{
                    x: `calc(var(--scroll-progress) * ${transformValue}%)`,
                  }}
                  className={className}
                >
                  {media.map((mediaItem, index) => {
                    const isPriority =
                      index < (priorityCount ?? 0) &&
                      mediaItem.type === "image";

                    return (
                      <div
                        key={`${keyPrefix}-${index}-${mediaItem.src}`}
                        className="h-full w-[25%] relative flex-shrink-0 px-3 overflow-hidden"
                      >
                        {renderMedia({
                          media: mediaItem,
                          priority: isPriority,
                          sizes: imageSizes,
                          quality: resolvedImageQuality,
                          className: "object-cover rounded-lg",
                        })}
                      </div>
                    );
                  })}
                </motion.div>
              ),
            )}
          </div>
        </div>

        {overlayClassName ? (
          <div className={`absolute inset-0 ${overlayClassName}`} />
        ) : null}

        <div
          ref={textRef}
          className={textWrapperClassName}
        >
          {showText && (
            <h2
              key="title"
              className={[titleClassName, titleColorClassName]
                .filter(Boolean)
                .join(" ")}
              style={titleStyle}
            >
              {title}
            </h2>
          )}
          {showText && (
            <p
              key="description"
              className={[descriptionClassName, descriptionColorClassName]
                .filter(Boolean)
                .join(" ")}
            >
              {description}
            </p>
          )}
        </div>
      </motion.section>
    </div>
  );
});
