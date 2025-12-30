"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
        clamp: false
    });

    /**
     * The magic of wrapping:
     * We need enough copies of the text to cover the screen width.
     * The wrap function keeps x value between -20% and -45% (adjustable based on content length)
     * to create the infinite scroll effect.
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * Change direction based on scroll velocity
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * Styles for the Marquee Text:
     * - Audiowide Font for futuristic look
     * - Huge text size
     * - Default: Low opacity fill (visible)
     * - Hover: Full opacity
     */
    return (
        <div className="parallax overflow-hidden m-0 flex flex-nowrap whitespace-nowrap">
            <motion.div
                className="scroller font-audiowide text-[6rem] md:text-[9rem] font-bold uppercase flex whitespace-nowrap flex-nowrap leading-[1.1] text-neutral-800 hover:text-white transition-colors duration-500"
                style={{ x }}
            >
                {/* Repeat enough times to fill width and allow wrapping */}
                <span className="block mr-12 md:mr-24">{children} </span>
                <span className="block mr-12 md:mr-24">{children} </span>
                <span className="block mr-12 md:mr-24">{children} </span>
                <span className="block mr-12 md:mr-24">{children} </span>
            </motion.div>
        </div>
    );
}

export default function VelocityMarquee({
    topText,
    bottomText,
    topVelocity = 3,
    bottomVelocity = -3
}: {
    topText: string,
    bottomText: string,
    topVelocity?: number,
    bottomVelocity?: number
}) {
    return (
        <section className="py-24 bg-black overflow-hidden relative z-10 border-t border-neutral-900/50">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Top Line (Right) */}
            <div className="relative mb-2 md:-mb-10">
                <ParallaxText baseVelocity={topVelocity}>{topText}</ParallaxText>
            </div>

            {/* Bottom Line (Left) */}
            <div className="relative">
                <ParallaxText baseVelocity={bottomVelocity}>{bottomText}</ParallaxText>
            </div>

        </section>
    );
}
