"use client";

import { usePathname } from "next/navigation";

export function UiUxBackground() {
    const pathname = usePathname();
    const isServicePage = pathname?.includes("/services/ui-ux-design");

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Subtle Gradient Glow - Only on Service Page */}
            {isServicePage && (
                <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)] blur-[80px] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />
                </>
            )}
        </div>
    );
}
