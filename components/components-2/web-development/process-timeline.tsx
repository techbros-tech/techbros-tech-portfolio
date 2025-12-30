"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: "01",
        title: "Discovery",
        description: "Mapping requirements & data structures.",
        icon: <Search className="w-6 h-6" />,
        // Start Red (Raw / Critical)
        color: "text-red-500",
        gradient: "from-red-500 to-rose-600",
        border: "border-red-500/50",
        shadow: "shadow-red-500/20",
        bgHover: "hover:bg-red-950/30"
    },
    {
        id: "02",
        title: "Design",
        description: "Prototyping high-fidelity interface systems.",
        icon: <PenTool className="w-6 h-6" />,
        // Orange (Processing / Creative)
        color: "text-orange-500",
        gradient: "from-orange-500 to-amber-600",
        border: "border-orange-500/50",
        shadow: "shadow-orange-500/20",
        bgHover: "hover:bg-orange-950/30"
    },
    {
        id: "03",
        title: "Development",
        description: "Engineering clean, scalable logic layers.",
        icon: <Code className="w-6 h-6" />,
        // Blue (Technical / Logic)
        color: "text-blue-500",
        gradient: "from-blue-500 to-cyan-600",
        border: "border-blue-500/50",
        shadow: "shadow-blue-500/20",
        bgHover: "hover:bg-blue-950/30"
    },
    {
        id: "04",
        title: "Deployment",
        description: "Production launch & performance logic.",
        icon: <Rocket className="w-6 h-6" />,
        // Green (Success / Go)
        color: "text-emerald-500",
        gradient: "from-emerald-500 to-green-600",
        border: "border-emerald-500/50",
        shadow: "shadow-emerald-500/20",
        bgHover: "hover:bg-emerald-950/30"
    }
];

export default function ProcessTimeline() {
    const [activeStep, setActiveStep] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isHovered) return;
        intervalRef.current = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovered]);

    return (
        <section className="py-24 md:py-40 bg-black relative overflow-hidden min-h-[600px] flex flex-col justify-center">

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-20 md:mb-32">
                    <h2 className="text-5xl md:text-7xl font-bold font-audiowide mb-6 text-white drop-shadow-2xl">
                        The Pipeline
                    </h2>
                    <p className="text-neutral-400 font-rajdhani text-xl">
                        From abstract concept to shipped executable.
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {steps.map((step, index) => {
                        const isActive = index === activeStep;
                        return (
                            <div
                                key={step.id}
                                className="relative flex flex-col group cursor-pointer"
                                onClick={() => setActiveStep(index)}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                {/* Floating Number (Outside Card) */}
                                <div className="mb-6 pl-2 flex items-end gap-2">
                                    <span className={cn(
                                        "text-6xl md:text-7xl font-bold font-audiowide transition-all duration-500",
                                        isActive
                                            ? `text-transparent bg-clip-text bg-gradient-to-b ${step.gradient}`
                                            : "text-neutral-800 group-hover:text-neutral-700"
                                    )}>
                                        {step.id}
                                    </span>
                                    <div className={cn(
                                        "h-px flex-1 mb-4 bg-gradient-to-r transition-all duration-500",
                                        isActive ? step.gradient : "from-neutral-900 to-transparent"
                                    )} />
                                </div>

                                {/* The Card */}
                                <div className={cn(
                                    "relative w-full p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[260px]",
                                    isActive
                                        ? `bg-neutral-900/80 ${step.border} z-20`
                                        : `bg-neutral-950/50 border-neutral-900 ${step.bgHover} group-hover:border-neutral-800`
                                )}>

                                    {/* Top Content */}
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white transition-all duration-500 border border-white/5",
                                            isActive
                                                ? `bg-gradient-to-br ${step.gradient} shadow-lg`
                                                : "bg-neutral-900 text-neutral-600 group-hover:text-white group-hover:bg-neutral-800"
                                        )}>
                                            {step.icon}
                                        </div>

                                        <h3 className={cn(
                                            "text-2xl font-bold font-audiowide mb-4 transition-colors duration-300",
                                            isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                                        )}>
                                            {step.title}
                                        </h3>

                                        <p className="text-neutral-500 font-rajdhani text-base leading-relaxed group-hover:text-neutral-400 transition-colors">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Bottom Status Bar */}
                                    <div className="mt-8">
                                        <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                                            {isActive && (
                                                <motion.div
                                                    className={cn("h-full bg-gradient-to-r", step.gradient)}
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 3, ease: "linear" }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Active Glow/Reflection */}
                                    {isActive && (
                                        <div className={cn(
                                            "absolute -top-20 -right-20 w-40 h-40 blur-3xl opacity-20 pointer-events-none bg-gradient-to-br",
                                            step.gradient
                                        )} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
