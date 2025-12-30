"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function PerformanceMetrics() {
    return (
        <section className="py-24 bg-black border-t border-neutral-900 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
                    <MetricItem value={100} label="Brand Awareness" suffix="%" />
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                    <MetricItem value={35} label="Market Share" suffix="%" />
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                    <MetricItem value={300} label="Avg ROI" suffix="%" />
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />
                    <MetricItem value={98} label="Loyalty" suffix="%" />
                </div>
            </div>
        </section>
    );
}

function MetricItem({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) {
    return (
        <div className="flex flex-col items-center group cursor-default">
            <div className="relative flex items-baseline gap-1 mb-2">
                <span className="text-6xl md:text-8xl font-audiowide font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 tracking-tighter group-hover:from-amber-400 group-hover:to-amber-700 transition-all duration-500">
                    <Counter value={value} />
                </span>
                {suffix && (
                    <span className="text-2xl md:text-3xl font-rajdhani text-neutral-600 group-hover:text-amber-500/50 transition-colors">
                        {suffix}
                    </span>
                )}
                {(value >= 98) && (
                    <div className="absolute -top-4 -right-6 animate-pulse">
                        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                )}
            </div>
            <p className="text-sm md:text-lg font-rajdhani font-medium text-neutral-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                {label}
            </p>
        </div>
    );
}

function Counter({ value }: { value: number }) {
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
                ref.current.textContent = Math.round(latest).toString();
            }
        });
    }, [springValue]);

    return <span ref={ref} />;
}
