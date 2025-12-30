"use client";

import { useEffect, useState, useRef, memo } from "react";

interface IntroAnimationProps {
    onComplete: () => void;
}

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";
const DURATION = 2000; // 2 seconds for counting
const COMPLETE_DELAY = 2200; // Trigger completion slightly after counting finishes
const COUNT_STEP = 5; // Update counter every 5% instead of 1% (reduces state updates from 100 to 20)

function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const [count, setCount] = useState(0);
    const [statusText, setStatusText] = useState("INITIALIZING...");
    const [isExiting, setIsExiting] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrambleTriggeredRef = useRef(false);

    // Digital Rain Effect - Reduced to 20fps for better performance
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#10B981";
            ctx.font = "15px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = CHARS[Math.floor(Math.random() * CHARS.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Reduced from 33ms (30fps) to 50ms (20fps)
        const interval = setInterval(draw, 50);

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Scramble text effect - Only triggers once when count > 80
    useEffect(() => {
        if (count <= 80 || scrambleTriggeredRef.current) return;

        scrambleTriggeredRef.current = true;
        const targetText = "SYSTEM READY";
        let iteration = 0;

        const interval = setInterval(() => {
            setStatusText(
                targetText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= targetText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [count]);

    // Counter logic - Updates in steps of 5 instead of 1
    useEffect(() => {
        const intervalTime = (DURATION / 100) * COUNT_STEP; // Adjusted for step size

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(prev + COUNT_STEP, 100);
            });
        }, intervalTime);

        // Trigger exit animation before completion
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, COMPLETE_DELAY - 100);

        // Trigger completion slightly after counting finishes
        const completeTimer = setTimeout(() => {
            onComplete();
        }, COMPLETE_DELAY);

        return () => {
            clearInterval(timer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? '-translate-y-full' : 'translate-y-0'
                }`}
        >
            {/* Digital Rain Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 opacity-20"
            />

            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[60] bg-[length:100%_2px,3px_100%] pointer-events-none" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 z-1" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
                {/* Counter with Glitch Effect */}
                <div className="flex items-end gap-2 mb-6 relative">
                    <div className="relative">
                        <span className="text-8xl sm:text-9xl font-audiowide font-bold tabular-nums tracking-tighter leading-none relative z-10">
                            {count}
                        </span>
                        {/* Glitch Layers - Simplified */}
                        <span
                            className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-50 z-0"
                            aria-hidden="true"
                        >
                            {count}
                        </span>
                        <span
                            className="absolute top-0 left-0 ml-[2px] text-blue-500 opacity-50 z-0"
                            aria-hidden="true"
                        >
                            {count}
                        </span>
                    </div>
                    <span className="text-4xl font-audiowide text-emerald-500 mb-4">%</span>
                </div>

                {/* Loading Bar - CSS-based instead of motion.div */}
                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-emerald-500 relative transition-[width] duration-100 ease-linear"
                        style={{ width: `${count}%` }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50" />
                    </div>
                </div>

                {/* Text Reveal / Scramble */}
                <div className="mt-8 h-8 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-emerald-500 font-rajdhani tracking-[0.2em] text-sm sm:text-base uppercase font-semibold min-w-[140px]">
                        {statusText}
                    </p>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-xl" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-xl" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-emerald-500/30 rounded-bl-xl" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-emerald-500/30 rounded-br-xl" />

        </div>
    );
}

// Memoize component to prevent unnecessary re-renders
export default memo(IntroAnimation);
