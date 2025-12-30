'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './nav';
import MenuButton from '../menu-button';
import { menu } from './anim';

export default function SideMenu() {
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed right-4 top-4 md:right-[50px] md:top-[50px] z-[999] pointer-events-auto">
            <motion.div
                className="relative bg-card rounded-[25px] overflow-hidden"
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
                custom={isMobile}
            >
                <AnimatePresence mode="wait">
                    {isActive && <Nav closeMenu={() => setIsActive(false)} />}
                </AnimatePresence>
            </motion.div>

            <div className="absolute top-0 right-0">
                <MenuButton
                    isActive={isActive}
                    toggleMenu={() => setIsActive(!isActive)}
                />
            </div>
        </div>
    )
}
