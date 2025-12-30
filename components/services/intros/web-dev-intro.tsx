"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function WebDevIntro({ onComplete }: IntroAnimationProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 100));
            setStep(1); // Network
            await new Promise(r => setTimeout(r, 1000));
            setStep(2); // Connection
            await new Promise(r => setTimeout(r, 1000)); // Total ~2-3s
            onComplete();
        };
        sequence();
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-mono text-emerald-500">
            <div className="relative w-[100vw] h-[60vh] md:w-[900px] md:h-[700px] flex items-center justify-center">

                <svg className="w-full h-full" viewBox="0 0 900 700" fill="none" stroke="currentColor" strokeWidth="1.2">

                    {/* --- 1. CLEAN GLOBAL NETWORK --- */}
                    <g transform="translate(450, 350)">
                        {/* Central Globe/Core */}
                        <motion.circle
                            cx="0" cy="0" r="80"
                            strokeOpacity="0.8"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={step >= 1 ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        {/* Latitudes */}
                        <motion.ellipse
                            cx="0" cy="0" rx="80" ry="30"
                            strokeOpacity="0.5"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        />
                        <motion.ellipse
                            cx="0" cy="0" rx="30" ry="80"
                            strokeOpacity="0.5"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        />

                        {/* Orbiting Satellites/Nodes */}
                        <motion.circle r="6" fill="currentColor">
                            <animateMotion dur="4s" repeatCount="indefinite" path="M-80,0 A80,30 0 1,1 80,0 A80,30 0 1,1 -80,0" />
                        </motion.circle>
                        <motion.circle r="6" fill="currentColor">
                            <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M0,-80 A30,80 0 1,1 0,80 A30,80 0 1,1 0,-80" />
                        </motion.circle>
                    </g>

                    {/* --- 2. BROWSER INTERFACE (The Destination) --- */}
                    {/* Appears in front/connected */}
                    <g transform="translate(450, 350)">
                        <motion.path
                            d="M-120,-90 L120,-90 L120,90 L-120,90 Z"
                            fill="black"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={step >= 2 ? { scale: 1, opacity: 1 } : {}}
                            transition={{ type: "spring", stiffness: 100 }}
                        />
                        {/* Window Controls */}
                        <motion.circle cx="-100" cy="-70" r="3" fill="currentColor" initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} />
                        <motion.circle cx="-85" cy="-70" r="3" fill="currentColor" initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} />
                        <motion.circle cx="-70" cy="-70" r="3" fill="currentColor" initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} />

                        {/* Content Lines */}
                        <motion.line x1="-100" y1="-40" x2="100" y2="-40" initial={{ pathLength: 0 }} animate={step >= 2 ? { pathLength: 1 } : {}} transition={{ delay: 0.5 }} />
                        <motion.rect x="-100" y="-20" width="80" height="40" strokeWidth="1" initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} />
                        <motion.rect x="-10" y="-20" width="110" height="40" strokeWidth="1" initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ delay: 0.7 }} />
                        <motion.line x1="-100" y1="40" x2="100" y2="40" initial={{ pathLength: 0 }} animate={step >= 2 ? { pathLength: 1 } : {}} transition={{ delay: 0.8 }} />
                    </g>

                </svg>

                {/* --- MINIMAL LABELS --- */}
                <div className="absolute bottom-10 text-xs md:text-sm font-bold font-mono tracking-[0.5em] text-emerald-500">
                    <motion.span initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}}>GLOBAL_CONNECTIVITY</motion.span>
                </div>

            </div>
        </div>
    );
}
