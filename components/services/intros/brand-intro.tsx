"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Crown } from "lucide-react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function BrandIntro({ onComplete }: IntroAnimationProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 100));
            setStep(1); // Geometry
            await new Promise(r => setTimeout(r, 1000));
            setStep(2); // Reveal
            await new Promise(r => setTimeout(r, 1000)); // Total ~2-3s
            onComplete();
        };
        sequence();
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-serif text-amber-500">
            <div className="relative w-[100vw] h-[60vh] md:w-[800px] md:h-[800px] flex items-center justify-center">

                <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="1">

                    {/* --- 1. GOLDEN RATIO GEOMETRY (Clean) --- */}
                    <g transform="translate(400, 400)">
                        {/* Golden Rectangles / Spirals - Simplified */}
                        <motion.rect
                            x="-200" y="-123.6" width="400" height="247.2"
                            strokeOpacity="0.3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={step >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.5 }}
                        />
                        <motion.path
                            d="M-200,123.6 A400,400 0 0,0 200,-123.6" // Major Arc
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={step >= 1 ? { pathLength: 1 } : {}}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M200,-123.6 A247.2,247.2 0 0,1 -47.2,123.6" // Minor Arc
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={step >= 1 ? { pathLength: 1 } : {}}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        />

                        {/* Geometric Guides */}
                        <motion.line
                            x1="-200" y1="-123.6" x2="200" y2="123.6"
                            strokeOpacity="0.2" strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={step >= 1 ? { pathLength: 1 } : {}}
                            transition={{ delay: 0.2 }}
                        />
                        <motion.line
                            x1="-200" y1="123.6" x2="200" y2="-123.6"
                            strokeOpacity="0.2" strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={step >= 1 ? { pathLength: 1 } : {}}
                            transition={{ delay: 0.4 }}
                        />
                    </g>


                    {/* --- 2. LOGO REVEAL (The Crown) --- */}
                    <motion.g
                        transform="translate(360, 360)"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={step >= 2 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <Crown size={80} strokeWidth={1.5} />
                    </motion.g>

                </svg>

                {/* --- ELEGANT TEXT --- */}
                <motion.div
                    className="absolute bottom-20 left-[50%] -translate-x-1/2 text-sm font-bold tracking-[0.4em] text-amber-500 uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                >
                    Timeless_Identity
                </motion.div>

            </div>
        </div>
    );
}
