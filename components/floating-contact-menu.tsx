"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CONTACT_INFO } from "@/constants/contact-info";
import { MessageCircle, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingContactMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBouncing, setIsBouncing] = useState(true);

    useEffect(() => {
        const bounceInterval = setInterval(() => {
            setIsBouncing(true);
            setTimeout(() => {
                setIsBouncing(false);
            }, 10000); // Bounce for 10 seconds
        }, 70000); // Every 70 seconds (10s bounce + 60s rest)

        // Initial bounce for 10s
        const initialTimer = setTimeout(() => setIsBouncing(false), 10000);

        return () => {
            clearInterval(bounceInterval);
            clearTimeout(initialTimer);
        };
    }, []);

    const menuItems = [
        CONTACT_INFO.whatsapp,
        CONTACT_INFO.phone,
        CONTACT_INFO.email,
        ...CONTACT_INFO.socials.slice(0, 3)
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.03,
                staggerDirection: 1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0, y: 20 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            y: 10,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="flex flex-col items-end gap-3 mb-2"
                    >
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    className="flex items-center gap-2 md:gap-3 group"
                                >
                                    <span className="hidden md:block bg-black/80 backdrop-blur-md text-white text-[10px] md:text-xs font-audiowide px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.label}
                                    </span>
                                    <div
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black border border-white/10 shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                                        style={{ color: item.color }}
                                    >
                                        <Icon size={18} className="md:size-[20px]" />
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={isBouncing && !isOpen ? {
                    y: [0, -10, 0],
                } : { y: 0 }}
                transition={isBouncing ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : {}}
                className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500",
                    isOpen
                        ? "bg-neutral-900 border border-white/20"
                        : "bg-gradient-to-br from-emerald-500 to-green-600 border border-white/30 hover:scale-110 active:scale-95"
                )}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? "close" : "open"}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        ) : (
                            <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        )}
                    </motion.div>
                </AnimatePresence>

                {!isOpen && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500/40 pointer-events-none" />
                )}
            </motion.button>
        </div>
    );
}
