"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Search, Megaphone, BarChart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
    {
        id: "positioning",
        title: "Brand Positioning",
        label: "Pos",
        description: "Defining your unique space in the market to own the conversation.",
        icon: <Target className="w-8 h-8" />,
        image: "bg-gradient-to-br from-amber-950 to-black",
        border: "border-amber-500/30",
        glow: "shadow-[0_0_50px_rgba(245,158,11,0.2)]"
    },
    {
        id: "research",
        title: "Market Research",
        label: "Data",
        description: "Uncovering deep consumer insights to drive decision-making.",
        icon: <Search className="w-8 h-8" />,
        image: "bg-gradient-to-br from-yellow-950 to-black",
        border: "border-yellow-500/30",
        glow: "shadow-[0_0_50px_rgba(234,179,8,0.2)]"
    },
    {
        id: "messaging",
        title: "Strategic Messaging",
        label: "Voice",
        description: "Crafting a compelling voice that resonates with your ideal audience.",
        icon: <Megaphone className="w-8 h-8" />,
        image: "bg-gradient-to-br from-orange-950 to-black",
        border: "border-orange-500/30",
        glow: "shadow-[0_0_50px_rgba(249,115,22,0.2)]"
    },
    {
        id: "analytics",
        title: "Growth Analytics",
        label: "ROI",
        description: "Measuring impact and optimizing strategy for maximum ROI.",
        icon: <BarChart className="w-8 h-8" />,
        image: "bg-gradient-to-br from-red-950 to-black",
        border: "border-red-500/30",
        glow: "shadow-[0_0_50px_rgba(239,68,68,0.2)]"
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
                            Strategy Solutions
                        </h2>
                        <p className="text-neutral-500 font-rajdhani text-xl max-w-lg">
                            Building brands that endure and influence.
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
                                                / Strategy_0{solutions.indexOf(solution) + 1}
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
                                        <span className="font-audiowide uppercase tracking-wider text-sm">Start Branding</span>
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
