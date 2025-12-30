"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function UiUxIntro({ onComplete }: IntroAnimationProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 100));
            setStep(1); // Devices
            await new Promise(r => setTimeout(r, 800));
            setStep(2); // Connection
            await new Promise(r => setTimeout(r, 1000)); // Total ~2-3s
            onComplete();
        };
        sequence();
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-sans text-purple-500">
            <div className="relative w-[100vw] h-[60vh] md:w-[900px] md:h-[600px] flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 900 600" fill="none" stroke="currentColor" strokeWidth="1.2">

                    {/* --- 1. CORE DEVICES (Simplified Triangle) --- */}

                    {/* Phone (Left) */}
                    <g transform="translate(250, 400)">
                        <motion.rect
                            x="-25" y="-45" width="50" height="90" rx="6"
                            fill="black"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 200, delay: 0 }}
                        />
                        <motion.rect x="-20" y="-40" width="40" height="80" rx="2" strokeOpacity="0.5" initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} />
                        {/* UI Elements */}
                        <motion.line x1="-15" y1="-25" x2="15" y2="-25" initial={{ pathLength: 0 }} animate={step >= 1 ? { pathLength: 1 } : {}} transition={{ delay: 0.3 }} />
                        <motion.line x1="-15" y1="-10" x2="15" y2="-10" initial={{ pathLength: 0 }} animate={step >= 1 ? { pathLength: 1 } : {}} transition={{ delay: 0.4 }} />
                    </g>

                    {/* Tablet (Top Center) */}
                    <g transform="translate(450, 200)">
                        <motion.rect
                            x="-50" y="-70" width="100" height="140" rx="8"
                            fill="black"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        />
                        <motion.rect x="-44" y="-64" width="88" height="128" rx="4" strokeOpacity="0.5" initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} />
                    </g>

                    {/* Desktop (Right) */}
                    <g transform="translate(650, 400)">
                        <motion.rect
                            x="-70" y="-50" width="140" height="90" rx="4"
                            fill="black"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        />
                        <motion.path d="M-20,40 L20,40 L10,60 L-10,60 Z" fill="black" initial={{ scale: 0 }} animate={step >= 1 ? { scale: 1 } : {}} transition={{ delay: 0.4 }} />
                        <motion.line x1="-60" y1="-30" x2="-20" y2="-30" initial={{ pathLength: 0 }} animate={step >= 1 ? { pathLength: 1 } : {}} transition={{ delay: 0.5 }} />
                        <motion.rect x="-60" y="-10" width="30" height="40" strokeWidth="0.8" initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} />
                        <motion.rect x="-20" y="-30" width="80" height="60" strokeWidth="0.8" initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}} transition={{ delay: 0.7 }} />
                    </g>


                    {/* --- 2. FLUID CONNECTIONS (Responsive Flow) --- */}
                    {/* Bezier curves connecting center to sides */}
                    <motion.path
                        d="M450,270 Q450,400 300,400" // Tablet to Phone
                        fill="none" strokeDasharray="4 4" strokeOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={step >= 2 ? { pathLength: 1 } : {}}
                        transition={{ duration: 1 }}
                    />
                    <motion.path
                        d="M450,270 Q450,400 580,400" // Tablet to Desktop
                        fill="none" strokeDasharray="4 4" strokeOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={step >= 2 ? { pathLength: 1 } : {}}
                        transition={{ duration: 1 }}
                    />
                    <motion.path
                        d="M300,400 L580,400" // Phone to Desktop
                        fill="none" strokeDasharray="4 4" strokeOpacity="0.2"
                        initial={{ pathLength: 0 }}
                        animate={step >= 2 ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                    />

                    {/* Data Particles */}
                    {step >= 2 && (
                        <>
                            <motion.circle r="3" fill="currentColor">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M450,270 Q450,400 300,400" />
                            </motion.circle>
                            <motion.circle r="3" fill="currentColor">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M450,270 Q450,400 580,400" />
                            </motion.circle>
                        </>
                    )}

                </svg>

                {/* --- LABELS --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[120px] text-xs font-bold tracking-[0.3em] text-purple-400">
                    <motion.div initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}}>CROSS_PLATFORM_SYNC</motion.div>
                </div>

            </div>
        </div>
    );
}
