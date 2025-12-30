"use client";

import { memo, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Metallic Glitch Text (Silver Main, Orange Glitch) ---
export const GlitchText = memo(function GlitchText({ text, delay }: { text: string, delay: number }) {
    return (
        <div className="relative inline-block mr-4 group cursor-default">
            {/* Main Text - Silver Metal */}
            <h3
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-audiowide leading-[0.9] relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500"
            >
                {text}
            </h3>

            {/* Glitch Shadows - Orange/Amber Tint */}
            <span className="absolute top-0 left-0 -ml-[1px] text-5xl md:text-7xl lg:text-8xl font-bold font-audiowide leading-[0.9] text-amber-500/50 opacity-0 group-hover:opacity-100 group-hover:animate-pulse -z-10 transition-opacity duration-100 blur-[1px]">
                {text}
            </span>
        </div>
    );
});

// --- Glass List Item (Orange Hover) ---
export const ListItem = memo(function ListItem({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
    return (
        <div className="group relative overflow-hidden rounded-lg p-3 transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/5">
            <div className="flex items-center gap-4 relative z-10">
                <div className="p-2 rounded-md bg-white/5 text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors duration-300">
                    {icon}
                </div>
                <span className="text-neutral-400 font-rajdhani text-lg uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                    {text}
                </span>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>
    );
});

// --- Modern Glass Button (Orange Accent) ---
// --- Modern Glass Button (Orange Accent) ---
export const MagneticButton = memo(function MagneticButton({ href, label = "IGNITE BRAND" }: { href?: string, label?: string }) {
    const router = useRouter();
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    const handleClick = () => {
        if (href) {
            router.push(href);
        }
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => href && router.prefetch(href)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="group relative flex w-fit items-center gap-3 px-8 py-4 bg-neutral-800 backdrop-blur-md border border-white/20 text-white font-rajdhani font-bold tracking-wider rounded-full hover:border-amber-500/50 hover:bg-neutral-800/80 shadow-[0_0_20px_-5px_rgba(245,158,11,0.15)] transition-all duration-300 overflow-hidden z-30"
        >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30 transition-all duration-[250ms] ease-out group-hover:w-full" />

            <span className="relative z-10 flex items-center gap-3 text-lg">
                {label}
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-amber-500 group-hover:text-white" />
            </span>

            {/* Shiny Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
        </motion.button>
    );
});
