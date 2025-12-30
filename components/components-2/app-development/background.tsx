"use client";

import { usePathname } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function AppDevBackground() {
    const pathname = usePathname();
    const isServicePage = pathname?.includes("/services/app-development");

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Subtle Gradient Glow - Only on Service Page */}
            {isServicePage && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] blur-[80px] pointer-events-none" />
            )}

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        </div>
    );
}
