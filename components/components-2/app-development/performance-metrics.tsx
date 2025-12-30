"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function PerformanceMetrics() {
    return (
        <section className="py-24 bg-black border-t border-neutral-900 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
                    <MetricItem value={99.9} label="Crash-Free Users" suffix="%" decimals={1} />
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                    <MetricItem value={60} label="FPS Smoothness" suffix="+" />
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                    <MetricItem value={2} label="Load Time" suffix="s" prefix="<" />
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                    <MetricItem value={4.9} label="Avg Store Rating" decimals={1} />
                </div>
            </div>
        </section>
    );
}

function MetricItem({ value, label, suffix = "", prefix = "", decimals = 0 }: { value: number, label: string, suffix?: string, prefix?: string, decimals?: number }) {
    return (
        <div className="flex flex-col items-center group cursor-default">
            <div className="relative flex items-baseline gap-1 mb-2">
                {prefix && (
                    <span className="text-2xl md:text-3xl font-audiowide text-neutral-600 mr-1">{prefix}</span>
                )}
                <span className="text-6xl md:text-8xl font-audiowide font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 tracking-tighter group-hover:from-blue-400 group-hover:to-blue-700 transition-all duration-500">
                    <Counter value={value} decimals={decimals} />
                </span>
                {suffix && (
                    <span className="text-2xl md:text-3xl font-rajdhani text-neutral-600 group-hover:text-blue-500/50 transition-colors">
                        {suffix}
                    </span>
                )}
                {/* Star for Rating */}
                {value > 4.5 && value <= 5 && decimals > 0 && (
                    <div className="absolute -top-4 -right-6 animate-pulse">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    </div>
                )}
            </div>
            <p className="text-sm md:text-lg font-rajdhani font-medium text-neutral-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                {label}
            </p>
        </div>
    );
}

function Counter({ value, decimals = 0 }: { value: number, decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 40,
        stiffness: 70,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimals);
            }
        });
    }, [springValue, decimals]);

    return <span ref={ref} />;
}
