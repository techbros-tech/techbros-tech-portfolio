'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
    className?: string;
    fill?: string;
};

export const Spotlight = ({ className, fill = "white" }: SpotlightProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

    const mouseX = useSpring(0, { bounce: 0 });
    const mouseY = useSpring(0, { bounce: 0 });

    useEffect(() => {
        if (containerRef.current) {
            const parent = containerRef.current.parentElement;
            if (parent) {
                parent.style.position = 'relative';
                parent.style.overflow = 'hidden';
                setParentElement(parent);
            }
        }
    }, []);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!parentElement) return;
            const { left, top } = parentElement.getBoundingClientRect();
            mouseX.set(event.clientX - left);
            mouseY.set(event.clientY - top);
        },
        [mouseX, mouseY, parentElement]
    );

    useEffect(() => {
        if (!parentElement) return;

        parentElement.addEventListener('mousemove', handleMouseMove);
        parentElement.addEventListener('mouseenter', () => setIsHovered(true));
        parentElement.addEventListener('mouseleave', () => setIsHovered(false));

        return () => {
            parentElement.removeEventListener('mousemove', handleMouseMove);
            parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
            parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
        };
    }, [parentElement, handleMouseMove]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0',
                className
            )}
        >
            <motion.div
                className="absolute -inset-px bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-0 mix-blend-soft-light blur-3xl w-[400px] h-[400px] rounded-full"
                style={{
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`,
                    left: 0,
                    top: 0,
                }}
            />
        </div>
    );
};
