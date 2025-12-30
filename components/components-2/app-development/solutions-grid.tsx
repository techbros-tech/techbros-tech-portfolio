"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Zap, Monitor, Watch, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
    {
        id: "ios",
        title: "Native iOS",
        label: "iOS",
        description: "Premium experiences crafted with Swift and SwiftUI for the Apple ecosystem.",
        icon: <Smartphone className="w-8 h-8" />,
        image: "bg-gradient-to-br from-blue-950 to-black",
        border: "border-blue-500/30",
        glow: "shadow-[0_0_50px_rgba(59,130,246,0.2)]"
    },
    {
        id: "android",
        title: "Native Android",
        label: "Android",
        description: "High-performance applications built with Kotlin and Jetpack Compose.",
        icon: <Zap className="w-8 h-8" />,
        image: "bg-gradient-to-br from-emerald-950 to-black",
        border: "border-emerald-500/30",
        glow: "shadow-[0_0_50px_rgba(16,185,129,0.2)]"
    },
    {
        id: "cross",
        title: "Cross-Platform",
        label: "Hybrid",
        description: "Unified codebases using Flutter or React Native for maximum reach and efficiency.",
        icon: <Monitor className="w-8 h-8" />,
        image: "bg-gradient-to-br from-purple-950 to-black",
        border: "border-purple-500/30",
        glow: "shadow-[0_0_50px_rgba(168,85,247,0.2)]"
    },
    {
        id: "wearable",
        title: "Wearables & IoT",
        label: "IoT",
        description: "Connected experiences for smartwatches and embedded devices.",
        icon: <Watch className="w-8 h-8" />,
        image: "bg-gradient-to-br from-cyan-950 to-black",
        border: "border-cyan-500/30",
        glow: "shadow-[0_0_50px_rgba(6,182,212,0.2)]"
    }
];

export default function SolutionsGrid() {
    const [activeId, setActiveId] = useState<string | null>(solutions[0].id);

    return (
        <section className="py-24 md:py-32 bg-black relative">
            <div className="container mx-auto px-4 relative z-10 w-full">

                {/* Header */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-audiowide mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                            Core Solutions
                        </h2>
                        <p className="text-neutral-500 font-rajdhani text-xl max-w-lg">
                            Building the future of mobile interaction.
                        </p>
                    </div>
                </div>

                {/* THE MONOLITHS */}
                {/* Desktop: Horizontal Flex | Mobile: Vertical Stack */}
                <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[600px]">
                    {solutions.map((solution) => {
                        const isActive = activeId === solution.id;

                        return (
                            <div
                                key={solution.id}
                                className={cn(
                                    "relative rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group border border-white/5",
                                    // Desktop Flex Logic
                                    "md:flex-col",
                                    isActive ? "md:flex-[3]" : "md:flex-[1]",
                                    // Mobile Height Logic
                                    isActive ? "flex-[3] min-h-[300px]" : "flex-1 min-h-[80px]",
                                    // Styling
                                    solution.image,
                                    isActive && solution.border
                                )}
                                onClick={() => setActiveId(solution.id)}
                                onMouseEnter={() => setActiveId(solution.id)}
                            >
                                {/* Active Glow Background */}
                                <div className={cn(
                                    "absolute inset-0 opacity-0 transition-opacity duration-700",
                                    isActive && "opacity-100",
                                    solution.image
                                )} />

                                {/* --- EXPANDED CONTENT --- */}
                                <div className={cn(
                                    "absolute inset-0 p-8 flex flex-col justify-between transition-opacity duration-500 delay-100",
                                    isActive ? "opacity-100 z-20" : "opacity-0 z-0"
                                )}>
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10">
                                                {solution.icon}
                                            </div>
                                            <span className="text-sm font-mono text-white/50 tracking-widest uppercase">
                                                / System_0{solutions.indexOf(solution) + 1}
                                            </span>
                                        </div>
                                        <motion.h3
                                            layoutId={`title-${solution.id}`}
                                            className="text-3xl md:text-5xl font-bold font-audiowide text-white mb-6"
                                        >
                                            {solution.title}
                                        </motion.h3>
                                        <p className="text-neutral-300 font-rajdhani text-lg leading-relaxed max-w-md">
                                            {solution.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-white/70 group-hover:text-white transition-colors">
                                        <span className="font-audiowide uppercase tracking-wider text-sm">Initialize Project</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>


                                {/* --- COLLAPSED CONTENT (DESKTOP) --- */}
                                {/* Vertical text shown when NOT active on Desktop */}
                                <div className={cn(
                                    "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                                    isActive ? "opacity-0" : "opacity-100"
                                )}>
                                    <div className="hidden md:flex rotate-180" style={{ writingMode: 'vertical-rl' }}>
                                        <span className="text-4xl font-audiowide text-neutral-700 font-bold whitespace-nowrap tracking-widest uppercase group-hover:text-white transition-colors duration-500">
                                            {solution.label}
                                        </span>
                                    </div>

                                    {/* --- COLLAPSED CONTENT (MOBILE) --- */}
                                    {/* Horizontal text shown when NOT active on Mobile */}
                                    <div className="md:hidden w-full h-full flex items-center px-8 justify-between">
                                        <span className="text-2xl font-audiowide text-neutral-500 uppercase">
                                            {solution.title}
                                        </span>
                                        <div className="text-neutral-600">
                                            {solution.icon}
                                        </div>
                                    </div>
                                </div>

                                {/* Background Texture/Noise */}
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
