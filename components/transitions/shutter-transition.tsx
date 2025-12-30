"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ShutterTransitionProps {
    onIntroStart?: () => void;
    children: React.ReactNode;
    isComplete?: boolean; // Signal to open the shutter
}

export default function ShutterTransition({ onIntroStart, children, isComplete = false }: ShutterTransitionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Portal target
    if (!mounted) return null;

    const anim = {
        initial: { y: "100%" },
        animate: { y: "0%" },
        exit: { y: "-100%" }
    };

    return createPortal(
        <AnimatePresence mode="wait">
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={anim}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} // Aggressive ease
                    onAnimationComplete={(definition) => {
                        if (definition === "animate") {
                            onIntroStart?.();
                        }
                    }}
                >
                    {/* Intro Content Rendered Inside Shutter When Closed */}
                    <div className="relative w-full h-full">
                        {children}
                    </div>

                    {/* Top Accent Line */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
