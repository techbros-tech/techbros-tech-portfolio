export type MediaAssetType = "image" | "video";

export type MediaAsset = {
  type: MediaAssetType;
  src: string;
  alt: string;
  /**
   * Optional poster image for videos. Falls back to the first image asset when not provided.
   */
  poster?: string;
};

export type MediaSequenceConfig = {
  seed: number;
  duplication?: number;
};

export const IMAGE_ASSETS: MediaAsset[] = [
  { type: "image", src: "/optimized/website-landing-1.jpg", alt: "Website 1" },
  { type: "image", src: "/optimized/website-landing-2.jpg", alt: "Website 2" },
  { type: "image", src: "/optimized/website-landing-3.jpg", alt: "Website 3" },
  { type: "image", src: "/optimized/website-landing-4.jpg", alt: "Website 4" },
  { type: "image", src: "/optimized/website-landing-5.jpg", alt: "Website 5" },
  { type: "image", src: "/optimized/website-landing-6.jpg", alt: "Website 6" },
  { type: "image", src: "/optimized/website-landing-7.jpg", alt: "Website 7" },
  { type: "image", src: "/optimized/website-landing-8.jpg", alt: "Website 8" },
  { type: "image", src: "/optimized/website-landing-9.jpg", alt: "Website 9" },
  {
    type: "image",
    src: "/optimized/website-landing-10.jpg",
    alt: "Website 10",
  },
  {
    type: "image",
    src: "/optimized/website-landing-11.jpg",
    alt: "Website 11",
  },
  {
    type: "image",
    src: "/optimized/website-landing-12.jpg",
    alt: "Website 12",
  },
  {
    type: "image",
    src: "/optimized/website-landing-13.jpg",
    alt: "Website 13",
  },
  {
    type: "image",
    src: "/optimized/website-landing-14.jpg",
    alt: "Website 14",
  },
  {
    type: "image",
    src: "/optimized/website-landing-15.jpg",
    alt: "Website 15",
  },
  {
    type: "image",
    src: "/optimized/website-landing-16.jpg",
    alt: "Website 16",
  },
  {
    type: "image",
    src: "/optimized/website-landing-17.jpg",
    alt: "Website 17",
  },
];

export const VIDEO_ASSETS: MediaAsset[] = [
  {
    type: "video",
    src: "/videos/optimized/video-1-327kb.mp4",
    alt: "Project showcase video 1",
    poster: "/videos/posters/video-1-poster.jpg",
  },
  {
    type: "video",
    src: "/videos/optimized/video-2-1.6mb.mp4",
    alt: "Project showcase video 2",
    poster: "/videos/posters/video-2-poster.jpg",
  },
  {
    type: "video",
    src: "/videos/optimized/video-3-1.6mb.mp4",
    alt: "Project showcase video 3",
    poster: "/videos/posters/video-3-poster.jpg",
  },
  {
    type: "video",
    src: "/videos/optimized/video-4-1.6mb.mp4",
    alt: "Project showcase video 4",
    poster: "/videos/posters/video-4-poster.jpg",
  },
  {
    type: "video",
    src: "/videos/optimized/video-5-1.4mb.mp4",
    alt: "Project showcase video 5",
    poster: "/videos/posters/video-5-poster.jpg",
  },
  {
    type: "video",
    src: "/videos/optimized/video-6-1.3mb.mp4",
    alt: "Project showcase video 6",
    poster: "/videos/posters/video-6-poster.jpg",
  },
  {
    type: "video",
    src: "/videos/optimized/video-7-1.4mb.mp4",
    alt: "Project showcase video 7",
    poster: "/videos/posters/video-7-poster.jpg",
  },
];

export const BASE_MEDIA_ASSETS: MediaAsset[] = [
  ...IMAGE_ASSETS,
  ...VIDEO_ASSETS,
];

export const getPosterForVideo = (index: number) => {
  const fallback = IMAGE_ASSETS[0]?.src;
  const videoPoster = VIDEO_ASSETS[index % VIDEO_ASSETS.length]?.poster;
  if (videoPoster) {
    return videoPoster;
  }
  return IMAGE_ASSETS[index % IMAGE_ASSETS.length]?.src ?? fallback;
};

export const createSeededRandom = (seed: number): (() => number) => {
  let currentSeed = Math.floor(seed) % 2147483647;

  if (currentSeed <= 0) {
    currentSeed += 2147483646;
  }

  return () => {
    currentSeed = (currentSeed * 16807) % 2147483647;
    return (currentSeed - 1) / 2147483646;
  };
};

export const shuffleWithSeed = <T>(source: T[], seed: number): T[] => {
  const random = createSeededRandom(seed);
  const array = [...source];

  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const temp = array[index];
    array[index] = array[swapIndex];
    array[swapIndex] = temp;
  }

  return array;
};

/**
 * Creates a randomized sequence by duplicating and shuffling the source assets.
 * Each duplication uses a different seed to vary the order, creating a longer
 * sequence for tall scrolling columns while still showing all unique assets.
 */
export const createRandomizedSequence = (
  source: MediaAsset[],
  seed: number,
  duplication = 3,
): MediaAsset[] => {
  if (duplication <= 0 || source.length === 0) {
    return shuffleWithSeed(source, seed);
  }

  const rows: MediaAsset[] = [];
  let currentSeed = seed;

  // Create multiple shuffled copies to fill tall columns
  for (let iteration = 0; iteration < duplication; iteration += 1) {
    rows.push(...shuffleWithSeed(source, currentSeed));
    currentSeed += 197; // Increment seed for variation
  }

  return rows;
};

export type AssetPoolOptions = {
  includeVideos?: boolean;
  maxVideos?: number;
};

/**
 * Randomly selects assets from the ENTIRE pool (all 17 images + 7 videos).
 * Each call with a different seed produces a unique random selection.
 * No duplicates within the returned array.
 */
export const getAssetPoolForSection = (
  seed: number,
  size = 12,
  { includeVideos = true, maxVideos = 3 }: AssetPoolOptions = {},
): MediaAsset[] => {
  const safeSize = Math.max(1, Math.min(size, BASE_MEDIA_ASSETS.length));

  // Shuffle ALL assets (images + videos) together
  const allAssets = includeVideos ? BASE_MEDIA_ASSETS : IMAGE_ASSETS;
  const shuffledAll = shuffleWithSeed(allAssets, seed);

  // Take the first 'size' items from the shuffled pool
  let selectedAssets = shuffledAll.slice(0, safeSize);

  // If we need to limit videos, filter and adjust
  if (includeVideos && maxVideos < VIDEO_ASSETS.length) {
    const videos = selectedAssets.filter((asset) => asset.type === "video");
    const images = selectedAssets.filter((asset) => asset.type === "image");

    // If we have too many videos, replace extras with images
    if (videos.length > maxVideos) {
      const excessVideos = videos.length - maxVideos;
      const keptVideos = videos.slice(0, maxVideos);

      // Get additional images from the shuffled pool that weren't selected
      const remainingImages = shuffledAll
        .filter((asset) => asset.type === "image" && !images.includes(asset))
        .slice(0, excessVideos);

      selectedAssets = [...images, ...keptVideos, ...remainingImages].slice(
        0,
        safeSize,
      );

      // Final shuffle to mix videos and images
      selectedAssets = shuffleWithSeed(selectedAssets, seed + 593);
    }
  }

  return selectedAssets;
};

/**
 * Creates a mixed media sequence with duplication for tall columns.
 * Each column gets unique assets from the pool, then duplicates them
 * in different orders to fill the vertical space.
 * Memoization-friendly: returns consistent results for same inputs.
 */
export const createMixedMediaSequence = (
  seed: number,
  duplication = 3,
  assetPool: MediaAsset[] = BASE_MEDIA_ASSETS,
): MediaAsset[] => {
  // Get shuffled sequence with duplication for tall columns
  const baseSequence = createRandomizedSequence(assetPool, seed, duplication);

  // Map videos to include posters - creates new objects only for videos
  return baseSequence.map((asset, index) => {
    if (asset.type === "video") {
      // Only create new object if poster is missing
      if (!asset.poster) {
        return {
          ...asset,
          poster: getPosterForVideo(index),
        };
      }
      return asset;
    }
    return asset;
  });
};
