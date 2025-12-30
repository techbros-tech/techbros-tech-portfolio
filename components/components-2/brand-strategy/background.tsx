"use client";

import { usePathname } from "next/navigation";

export function BrandBackground() {
    const pathname = usePathname();
    const isServicePage = pathname?.includes("/services/brand-strategy");

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Subtle Gradient Glow - Only on Service Page */}
            {isServicePage && (
                <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_70%)] blur-[80px] pointer-events-none" />
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-900/10 rounded-full blur-[80px] opacity-20" />
                    <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-amber-900/10 rounded-full blur-[80px] opacity-20" />
                </>
            )}
        </div>
    );
}
