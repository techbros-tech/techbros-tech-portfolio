"use client";

import { memo, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// --- Metallic Glitch Text ---
export const GlitchText = memo(function GlitchText({ text, delay, className }: { text: string, delay?: number, className?: string }) {
    return (
        <div className={cn("relative inline-block mr-4 group cursor-default", className)}>
            {/* Main Text - Silver Gradient */}
            <h3
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-audiowide leading-[0.9] relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500"
            >
                {text}
            </h3>

            {/* Glitch Shadows */}
            <span className="absolute top-0 left-0 -ml-[1px] text-5xl md:text-7xl lg:text-8xl font-bold font-audiowide leading-[0.9] text-white/50 opacity-0 group-hover:opacity-100 group-hover:animate-pulse -z-10 transition-opacity duration-100 blur-[1px]">
                {text}
            </span>
        </div>
    );
});

// --- Glass List Item ---
export const ListItem = memo(function ListItem({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
    return (
        <div className="group relative overflow-hidden rounded-lg p-3 transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/5">
            <div className="flex items-center gap-4 relative z-10">
                <div className="p-2 rounded-md bg-white/5 text-neutral-400 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-colors duration-300">
                    {icon}
                </div>
                <span className="text-neutral-400 font-rajdhani text-lg uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                    {text}
                </span>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>
    );
});

// --- Modern Glass Button ---
export const MagneticButton = memo(function MagneticButton({ href, isHero, scrollToId }: { href?: string, isHero?: boolean, scrollToId?: string }) {
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
        if (isHero && scrollToId) {
            const element = document.getElementById(scrollToId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else if (href) {
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
            className="group relative flex w-fit items-center gap-3 px-8 py-4 bg-neutral-800 backdrop-blur-md border border-white/20 text-white font-rajdhani font-bold tracking-wider rounded-full hover:border-emerald-500/50 hover:bg-neutral-800/80 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] transition-all duration-300 overflow-hidden z-30"
        >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-emerald-600/30 to-green-600/30 transition-all duration-[250ms] ease-out group-hover:w-full" />

            <span className="relative z-10 flex items-center gap-3 text-lg">
                {isHero ? "EXPLORE" : "VIEW PROJECTS"}
                {isHero ? (
                    <ArrowDown className="w-6 h-6 relative z-10 text-emerald-500 group-hover:text-white" />
                ) : (
                    <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform text-emerald-500 group-hover:text-white" />
                )}
            </span>

            {/* Shiny Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
        </motion.button>
    );
});

// --- Tilt Card Wrapper ---
export const TiltCard = memo(function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className="relative w-full h-full flex items-center justify-center p-4 hover:scale-[1.02] transition-transform duration-500"
        >
            <div style={{ transform: "translateZ(20px)", width: "100%", height: "100%" }}>
                {children}
            </div>
        </motion.div>
    );
});
