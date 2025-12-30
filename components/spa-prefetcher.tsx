"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ROUTES_TO_PREFETCH = [
    "/services/web-development",
    "/services/app-development",
    "/services/ui-ux-design",
    "/services/brand-strategy"
];

export default function SpaPrefetcher() {
    const router = useRouter();

    useEffect(() => {
        console.log("🚀 [SPA Prefetcher] mounting...");

        const prefetchRoutes = () => {
            ROUTES_TO_PREFETCH.forEach((route) => {
                console.log(`⚡ [SPA Prefetcher] Prefetching: ${route}`);
                router.prefetch(route);
            });
            console.log("✅ [SPA Prefetcher] All routes queued for prefetch.");
        };

        // Use requestIdleCallback if available, otherwise setTimeout
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            const idleCallbackId = requestIdleCallback(prefetchRoutes, { timeout: 3000 });
            return () => cancelIdleCallback(idleCallbackId);
        } else {
            const timer = setTimeout(prefetchRoutes, 3000);
            return () => clearTimeout(timer);
        }
    }, [router]);

    return null; // Render nothing
}
