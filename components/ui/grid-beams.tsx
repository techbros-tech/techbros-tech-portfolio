"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Beam {
    id: number;
    x: number;
    y: number;
    direction: "horizontal" | "vertical";
    length: number;
    speed: number;
    color: string;
}

interface GridBeamsProps {
    className?: string;
    gridSize?: number;
    beamColor?: string;
    maxBeams?: number;
}

export const GridBeams = ({
    className,
    gridSize = 32,
    beamColor = "#10B981", // Emerald-500
    maxBeams = 15,
}: GridBeamsProps) => {
    const [beams, setBeams] = useState<Beam[]>([]);

    useEffect(() => {
        const createBeam = () => {
            setBeams(prev => {
                if (prev.length >= maxBeams) return prev;

                const { innerWidth, innerHeight } = window;
                const isHorizontal = Math.random() > 0.5;

                // Snap to grid
                const cols = Math.floor(innerWidth / gridSize);
                const rows = Math.floor(innerHeight / gridSize);

                const x = Math.floor(Math.random() * cols) * gridSize;
                const y = Math.floor(Math.random() * rows) * gridSize;

                return [...prev, {
                    id: Date.now(),
                    x,
                    y,
                    direction: isHorizontal ? "horizontal" : "vertical",
                    length: Math.random() * 200 + 100, // 100-300px long
                    speed: Math.random() * 2 + 1.5, // 1.5-3.5s duration
                    color: beamColor,
                }];
            });

            // Loop creation
            const delay = Math.random() * 500 + 200;
            setTimeout(createBeam, delay);
        };

        const timeout = setTimeout(createBeam, 500);
        return () => clearTimeout(timeout);
    }, [gridSize, beamColor, maxBeams]);

    const removeBeam = (id: number) => {
        setBeams(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {beams.map((beam) => (
                <BeamItem
                    key={beam.id}
                    beam={beam}
                    onComplete={() => removeBeam(beam.id)}
                />
            ))}
        </div>
    );
};

const BeamItem = ({ beam, onComplete }: { beam: Beam, onComplete: () => void }) => {
    const isHorizontal = beam.direction === "horizontal";

    return (
        <motion.div
            initial={{
                opacity: 0,
                left: beam.x,
                top: beam.y,
                width: isHorizontal ? 0 : 1,
                height: isHorizontal ? 1 : 0,
            }}
            animate={{
                opacity: [0, 1, 1, 0], // Fade in, stay, fade out
                width: isHorizontal ? beam.length : 1,
                height: isHorizontal ? 1 : beam.length,
                x: isHorizontal ? [0, beam.length] : 0, // Move forward
                y: isHorizontal ? 0 : [0, beam.length], // Move down
            }}
            transition={{
                duration: beam.speed,
                ease: "linear",
            }}
            onAnimationComplete={onComplete}
            className="absolute rounded-full"
            style={{
                background: `linear-gradient(to ${isHorizontal ? 'right' : 'bottom'}, transparent, ${beam.color}, transparent)`,
                boxShadow: `0 0 4px ${beam.color}`,
            }}
        />
    );
};
