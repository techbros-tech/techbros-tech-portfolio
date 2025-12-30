"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import WebDevelopment from "./web-development/index";
import AppDevelopment from "./app-development/index";
import UiUxDesign from "./ui-ux-design/index";
import BrandStrategy from "./brand-strategy/index";

function WhatWeOffer() {
    return (
        <div id="expertise" className="bg-black text-white relative">
            {/* 50vh Header Section */}
            <section className="h-[50vh] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/5 z-20 bg-black">
                {/* Dynamic Perspective Grid */}
                <div className="absolute inset-0 perspective-[500px]">
                    <motion.div
                        animate={{
                            backgroundPosition: ["0px 0px", "0px 100px"],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(60deg)_scale(2)] origin-top"
                    />
                </div>

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 text-center">
                    <div
                        className="flex flex-col items-center justify-center mb-4"
                    >
                        <span className="text-neutral-400 font-rajdhani font-bold tracking-[0.5em] text-lg md:text-2xl mb-2 opacity-80">
                            OUR
                        </span>

                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold font-audiowide tracking-tight relative z-20">
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                                EXPERTISE
                            </span>
                        </h2>
                    </div>

                    <div
                        className="relative"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-700" />
                            <p className="text-neutral-400 font-rajdhani text-lg md:text-xl tracking-[0.3em] uppercase">
                                Forging Digital Excellence
                            </p>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Container */}
            <div className="relative">
                {/* Web Development - Sticky */}
                <div className="relative lg:sticky lg:top-0 lg:h-screen z-0">
                    <WebDevelopment href="/services/web-development" />
                </div>

                {/* App Development - Sticky */}
                <div className="relative lg:sticky lg:top-0 lg:h-screen z-10">
                    <AppDevelopment href="/services/app-development" />
                </div>

                {/* UI/UX Design - Sticky */}
                <div className="relative lg:sticky lg:top-0 lg:h-screen z-20">
                    <UiUxDesign href="/services/ui-ux-design" />
                </div>

                {/* Brand Strategy - Scrolls Over */}
                <div className="relative z-30 bg-black">
                    <BrandStrategy href="/services/brand-strategy" />
                </div>
            </div>
        </div>
    );
}

// Memoize component to prevent unnecessary re-renders
export default memo(WhatWeOffer);
