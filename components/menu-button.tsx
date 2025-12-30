'use client';
import { motion } from 'framer-motion';

interface MenuButtonProps {
    isActive: boolean;
    toggleMenu: () => void;
}

export default function MenuButton({ isActive, toggleMenu }: MenuButtonProps) {
    return (
        <div className="relative w-[100px] h-[40px] rounded-[25px] overflow-hidden cursor-pointer bg-primary" onClick={toggleMenu}>
            <motion.div
                className="relative w-full h-full"
                animate={{ top: isActive ? "-100%" : "0%" }}
                transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center">
                    <PerspectiveText label="Menu" />
                </div>
                <div className="w-full h-full bg-card text-foreground border border-border flex items-center justify-center">
                    {/* Added border and using card bg for contrast with menu background */}
                    <PerspectiveText label="Close" />
                </div>
            </motion.div>
        </div>
    );
}

function PerspectiveText({ label }: { label: string }) {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:[transform:rotateX(90deg)] group">
            <p className="m-0 transition-opacity duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-0 uppercase pointer-events-none absolute">
                {label}
            </p>
            <p className="m-0 transition-opacity duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] absolute origin-bottom [transform:rotateX(-90deg)_translateY(9px)] opacity-0 group-hover:opacity-100 uppercase pointer-events-none">
                {label}
            </p>
        </div>
    );
}
