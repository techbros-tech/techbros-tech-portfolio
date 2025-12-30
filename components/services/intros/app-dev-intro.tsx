"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function AppDevIntro({ onComplete }: IntroAnimationProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 100));
            setStep(1);
            await new Promise(r => setTimeout(r, 800));
            setStep(2);
            await new Promise(r => setTimeout(r, 1000));
            onComplete();
        };
        sequence();
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-sans text-blue-500">
            <div className="relative w-[100vw] h-[60vh] md:w-[800px] md:h-[800px] flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="1.5">

                    {/* --- 1. CORE PROCESSOR --- */}
                    <g transform="translate(400, 400)">
                        <motion.rect
                            x="-60" y="-60" width="120" height="120" rx="8"
                            fill="black" strokeWidth="2"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={step >= 1 ? { scale: 1, rotate: 0 } : {}}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        />
                        <motion.rect
                            x="-40" y="-40" width="80" height="80"
                            strokeOpacity="0.5"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        />
                        <motion.circle
                            cx="0" cy="0" r="15"
                            fill="currentColor"
                            initial={{ scale: 0 }}
                            animate={step >= 1 ? { scale: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        />

                        {[0, 90, 180, 270].map((rot, i) => (
                            <motion.line
                                key={i}
                                x1="0" y1="-80" x2="0" y2="-120"
                                transform={`rotate(${rot})`}
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0 }}
                                animate={step >= 1 ? { pathLength: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                            />
                        ))}
                    </g>


                    {/* --- 2. DEVICE ASSEMBLY --- */}
                    <g transform="translate(400, 400)">
                        <motion.path
                            d="M-100,-180 L100,-180"
                            strokeWidth="3"
                            initial={{ pathLength: 0, y: -50, opacity: 0 }}
                            animate={step >= 2 ? { pathLength: 1, y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.path
                            d="M-100,180 L100,180"
                            strokeWidth="3"
                            initial={{ pathLength: 0, y: 50, opacity: 0 }}
                            animate={step >= 2 ? { pathLength: 1, y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.path
                            d="M-100,-180 L-100,180"
                            strokeWidth="3"
                            initial={{ pathLength: 0, x: -50, opacity: 0 }}
                            animate={step >= 2 ? { pathLength: 1, x: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.path
                            d="M100,-180 L100,180"
                            strokeWidth="3"
                            initial={{ pathLength: 0, x: 50, opacity: 0 }}
                            animate={step >= 2 ? { pathLength: 1, x: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />

                        <motion.rect
                            x="-85" y="-160" width="170" height="320"
                            fill="currentColor" fillOpacity="0.1" stroke="none"
                            initial={{ opacity: 0 }}
                            animate={step >= 2 ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        />
                    </g>

                </svg>

                {/* --- LABELS --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[220px] text-xs font-bold tracking-[0.3em] text-blue-500">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={step >= 2 ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        NATIVE_PERFORMANCE
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
