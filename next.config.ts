import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
  },
  images: {
    qualities: [75, 85,65],
  },
  /* config options here */
};

export default nextConfig;
