"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo, memo } from "react";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { title: "Home", href: "/", bg: "#000000", orb: "#ffffff" },
    { title: "About Us", href: "/#about", bg: "#0f172a", orb: "#60a5fa" }, // Scroll to About Section
    { title: "Selected Works", href: "/#projects", bg: "#172554", orb: "#3b82f6" }, // Scroll to Projects
    { title: "Our Team", href: "/#team", bg: "#164e63", orb: "#22d3ee" }, // Scroll to Team
    { title: "Brand Strategy", href: "/services/brand-strategy", bg: "#422006", orb: "#fbbf24" },
    { title: "Web Development", href: "/services/web-development", bg: "#020617", orb: "#38bdf8" },
    { title: "App Development", href: "/services/app-development", bg: "#1e1b4b", orb: "#a855f7" },
    { title: "UI/UX Design", href: "/services/ui-ux-design", bg: "#450a0a", orb: "#f43f5e" },
    { title: "Contact", href: "/#contact", bg: "#064e3b", orb: "#34d399" },
];

// Memoized variants outside component to prevent recreation
const overlayVariants: Variants = {
    closed: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.4,
            ease: [0.32, 0.72, 0, 1],
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
    open: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    closed: {
        y: 30,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
        },
    },
    open: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.32, 0.72, 0, 1],
        },
    },
};

// Memoized menu item component to prevent re-renders
interface MenuItemProps {
    item: typeof menuItems[0];
    index: number;
    isHovered: boolean;
    onHover: (index: number | null) => void;
    onClose: () => void;
}

import { useContactStore } from "@/store/use-contact-store";
import { CONTACT_INFO } from "@/constants/contact-info";

const MenuItem = memo(function MenuItem({ item, index, isHovered, onHover, onClose }: MenuItemProps) {
    const handleMouseEnter = useCallback(() => onHover(index), [onHover, index]);
    const handleMouseLeave = useCallback(() => onHover(null), [onHover]);
    const onOpenContact = useContactStore((state) => state.onOpen);

    const handleClick = (e: React.MouseEvent) => {
        if (item.title === "Contact") {
            e.preventDefault();
            onClose();
            onOpenContact();
        } else {
            onClose();
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            <Link
                href={item.href}
                onClick={handleClick}
                className="group flex items-center gap-6 w-fit"
            >
                <span className="text-xs md:text-sm font-mono text-white/40 group-hover:text-white transition-colors duration-300">
                    0{index + 1}
                </span>
                <span
                    className="text-5xl md:text-8xl font-bold font-orbitron tracking-tighter transition-all duration-500 relative"
                    style={{
                        WebkitTextStroke: isHovered ? "0px" : "1px rgba(255,255,255,0.5)",
                        color: isHovered ? "#ffffff" : "transparent",
                    }}
                >
                    {item.title}
                </span>
                <ArrowRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
            </Link>
        </motion.div>
    );
});

function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Memoized hover handler
    const handleHover = useCallback((index: number | null) => {
        setHoveredIndex(index);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Memoize current background and orb colors
    const currentBg = useMemo(() =>
        hoveredIndex !== null && menuItems[hoveredIndex] ? menuItems[hoveredIndex].bg : "#000000",
        [hoveredIndex]
    );

    const currentOrb = useMemo(() =>
        hoveredIndex !== null ? menuItems[hoveredIndex].orb : "#ffffff",
        [hoveredIndex]
    );

    // Memoize orb animation target to prevent object recreation
    const orbAnimation = useMemo(() => ({
        backgroundColor: currentOrb,
        scale: hoveredIndex !== null ? 1.5 : 1,
        x: hoveredIndex !== null ? (hoveredIndex % 2 === 0 ? 200 : -200) : 0,
        y: hoveredIndex !== null ? (hoveredIndex % 2 === 0 ? -100 : 100) : 0,
    }), [hoveredIndex, currentOrb]);

    // Memoize transition to prevent recreation
    const orbTransition = useMemo(() => ({
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1] as const
    }), []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={overlayVariants}
                    className="fixed inset-0 z-[60] text-white flex flex-col overflow-hidden"
                >
                    {/* Dynamic Background - simplified, uses CSS transition instead of Framer */}
                    <div
                        className="absolute inset-0 -z-10 transition-colors duration-500"
                        style={{ backgroundColor: currentBg }}
                    />

                    {/* Optimized Orb - reduced blur from 120px to 80px, added will-change */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none mix-blend-screen"
                        style={{
                            filter: 'blur(80px)',
                            willChange: 'transform, background-color',
                        }}
                        animate={orbAnimation}
                        transition={orbTransition}
                    />

                    {/* Header with Close Button */}
                    <div className="flex justify-between items-center p-6 md:p-12 relative z-20">
                        <div className="text-sm font-mono opacity-50 tracking-widest">NAVIGATION</div>
                        <button
                            onClick={onClose}
                            className="group relative flex items-center justify-center w-14 h-14 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                        >
                            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Menu Items - Using memoized components */}
                    <div className="flex-1 flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto w-full relative z-20">
                        <nav className="flex flex-col gap-2 md:gap-4">
                            {menuItems.map((item, index) => (
                                <MenuItem
                                    key={item.title}
                                    item={item}
                                    index={index}
                                    isHovered={hoveredIndex === index}
                                    onHover={handleHover}
                                    onClose={onClose}
                                />
                            ))}
                        </nav>
                    </div>

                    {/* Footer - simplified */}
                    <motion.div
                        variants={itemVariants}
                        className="p-6 md:p-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end text-white/40 text-sm md:text-base font-mono relative z-20 overflow-y-auto"
                    >
                        <div className="mb-4 md:mb-0">
                            <p>TECHBROS OFFICIAL</p>
                            <p>© 2024</p>
                        </div>
                        <div className="flex gap-4 sm:gap-8 flex-wrap max-w-2xl justify-end">
                            <a href={CONTACT_INFO.whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors relative group font-bold">
                                WhatsApp
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300" />
                            </a>
                            <a href={CONTACT_INFO.email.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors relative group">
                                Email
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                            </a>
                            {CONTACT_INFO.socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors relative group"
                                >
                                    {social.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Marquee - using CSS animation, reduced to render only when open */}
                    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-5 select-none">
                        <div
                            className="whitespace-nowrap text-[20vw] font-bold font-orbitron leading-none text-white"
                            style={{
                                animation: 'marquee 20s linear infinite',
                            }}
                        >
                            CREATIVE INNOVATIVE TECHBROS CREATIVE INNOVATIVE TECHBROS
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Memoize entire component
export default memo(MenuOverlay);
