// "use client";

// import { useEffect } from "react";
// import { IMAGE_ASSETS, VIDEO_ASSETS } from "./services/media-assets";

// const PREFETCH_ATTRIBUTE = "data-prefetched-media";

// const appendPrefetchLink = (href: string, asType: "image" | "video") => {
//   if (typeof document === "undefined") {
//     return;
//   }

//   const existing = document.head.querySelector<HTMLLinkElement>(
//     `link[rel="prefetch"][href="${href}"]`,
//   );

//   if (existing) {
//     return;
//   }

//   const link = document.createElement("link");
//   link.rel = "prefetch";
//   link.as = asType;
//   link.href = href;
//   link.setAttribute(PREFETCH_ATTRIBUTE, "true");
//   link.fetchPriority = "low";
//   document.head.appendChild(link);
// };

// export function ImagePrefetcher() {
//   useEffect(() => {
//     // Prefetch media after hero loads (1s delay)
//     const timer = setTimeout(() => {
//       IMAGE_ASSETS.forEach(({ src }) => {
//         appendPrefetchLink(src, "image");
//       });

//       VIDEO_ASSETS.forEach(({ src }) => {
//         appendPrefetchLink(src, "video");
//       });
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   return null;
// }

