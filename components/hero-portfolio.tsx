"use client";

import Link from "next/link";
import { useContactStore } from "@/store/use-contact-store";
import { HighlightText } from "@/components/ui/highlight-text";
import { memo } from "react";

function HeroPortfolio() {
    const { onOpen } = useContactStore();

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] selection:bg-emerald-500/30">
            {/* Cinematic Noise Overlay - Removed external dependency */}

            {/* Dynamic Grid Background - Glowing Yellowish */}
            {/* Base Grid Layer - Mask expanded to fully cover viewport */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.1)_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px] z-0 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 md:opacity-100" />

            {/* Glow Layer (Blurred duplicate) - Mask expanded and brightness increased */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.2)_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px] z-0 blur-[3px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_50%,transparent_100%)] opacity-30 md:opacity-100" />

            {/* Circuit Beams & Star Field - Removed for performance */}

            {/* Lighting: Vignette & Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)] z-[2] pointer-events-none opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />

            <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">

                {/* Modern Badge - Glass & Inner Glow */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] mb-10 transition-transform hover:scale-105 cursor-default group">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-neutral-300 text-xs font-rajdhani font-medium tracking-widest uppercase group-hover:text-white transition-colors">Available for new projects</span>
                </div>

                {/* Main Heading - Metallic Chrome Effect */}
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-audiowide font-black tracking-tight mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        TECH
                    </span>
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(to_bottom_right,#34D399,#10B981,#059669)] drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        BROS
                    </span>
                </h1>

                {/* Subheading */}
                <h2 className="text-xl sm:text-3xl md:text-4xl font-orbitron font-medium mb-8 max-w-4xl leading-relaxed tracking-wide">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">Digital </span>
                    <HighlightText className="text-emerald-400/90 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">Architects</HighlightText>
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500"> & Creative </span>
                    <HighlightText className="text-emerald-400/90 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">Visionaries</HighlightText>
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400 max-w-2xl font-exo2 leading-relaxed mb-12 tracking-wide antialiased">
                    We craft immersive digital experiences that blend innovation with reality.
                    Elevate your brand with our cutting-edge solutions designed for the future.
                </p>

                {/* Buttons - Premium Visuals */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Primary: Emerald Inner Glow */}
                    <Link
                        href="/#services"
                        className="group relative px-12 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-rajdhani font-bold text-xl tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden border border-emerald-400/50"
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

                        <span className="relative z-10 flex items-center gap-2">
                            View Our Services
                        </span>
                    </Link>

                    {/* Secondary: Frost Glass */}
                    <button
                        onClick={onOpen}
                        className="group relative px-10 py-4 rounded-full bg-transparent text-neutral-300 font-rajdhani font-semibold text-lg tracking-wide transition-all hover:text-white hover:-translate-y-0.5 active:scale-95"
                    >
                        <div className="absolute inset-0 rounded-full border border-neutral-800 bg-white/[0.01] backdrop-blur-[2px] group-hover:bg-white/[0.05] group-hover:border-neutral-600 transition-all duration-300" />
                        <span className="relative z-10">Contact Us</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Memoize component to prevent unnecessary re-renders
export default memo(HeroPortfolio);
