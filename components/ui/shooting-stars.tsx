"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface Meteor {
    id: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
    size: number;
    distance: number;
    trailLength: number;
}

interface ShootingStarsProps {
    minSpeed?: number;
    maxSpeed?: number;
    minDelay?: number;
    maxDelay?: number;
    starColor?: string;
    trailColor?: string;
    starWidth?: number;
    starHeight?: number;
    className?: string;
}

export const ShootingStars = ({
    minSpeed = 5,
    maxSpeed = 15,
    minDelay = 1000,
    maxDelay = 3000,
    starColor = "#10B981", // Emerald-500
    trailColor = "#059669", // Emerald-600
    starWidth = 10,
    starHeight = 2,
    className,
}: ShootingStarsProps) => {
    const [meteors, setMeteors] = useState<Meteor[]>([]);

    useEffect(() => {
        const createMeteor = () => {
            const { innerWidth, innerHeight } = window;

            // Start from Top or Right, moving Down-Left
            const startFromSide = Math.random() > 0.5;
            let x, y;

            if (startFromSide) {
                x = innerWidth + 50; // Start off-screen right
                y = Math.random() * (innerHeight / 2); // Top half
            } else {
                x = Math.random() * innerWidth + 200; // Shifted right so they travel leftwards
                y = -50; // Start off-screen top
            }

            // Angle between 135 and 180 (moving left-downish) + some variance
            // Adjusted angle: 215 degrees moves bottom-left roughly
            // Math: 0 is right, 90 down, 180 left, 270 up.
            // We want move Left-Down. ~135-160 degrees?
            // Actually, let's just use simple dx/dy logic for linear movement

            const angle = 215; // Moving bottom-left

            const newMeteor: Meteor = {
                id: Date.now(),
                x,
                y,
                angle,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                size: Math.random() * 1 + 1, // Random size
                distance: 0,
                trailLength: Math.random() * 100 + 50,
            };

            setMeteors(prev => [...prev, newMeteor]);

            const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;
            setTimeout(createMeteor, nextDelay);
        };

        createMeteor();
    }, [minSpeed, maxSpeed, minDelay, maxDelay]);

    useEffect(() => {
        const moveMeteors = () => {
            setMeteors(prev => prev.map(meteor => {
                // Calculate movement based on angle 215 (bottom-left)
                // x decreases, y increases
                const moveX = meteor.speed * Math.cos((meteor.angle * Math.PI) / 180);
                const moveY = meteor.speed * Math.sin((meteor.angle * Math.PI) / 180);

                const newX = meteor.x + moveX;
                const newY = meteor.y + moveY;
                const newDistance = meteor.distance + meteor.speed;

                if (newX < -100 || newY > window.innerHeight + 100) {
                    return null; // Remove if off screen
                }

                return {
                    ...meteor,
                    x: newX,
                    y: newY,
                    distance: newDistance,
                };
            }).filter((m): m is Meteor => m !== null));

            requestAnimationFrame(moveMeteors);
        };

        // Use a ref to track the animation frame to cancel it properly?
        // Actually, requestAnimationFrame inside useEffect loop is tricky with state.
        // Better: standard game loop ref approach
    }, []); // Empty dependency array? No, access to state is needed.

    // Improved Animation Loop using Ref for State
    // To avoid dependency infinite loops or stale state, we'll use functional updates only
    // and trigger the next frame recursively.

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            setMeteors(prevMeteors => {
                const { innerWidth, innerHeight } = window;
                return prevMeteors
                    .map(meteor => {
                        // Angle 215 degrees: -0.819 cos, -0.573 sin (Wait, 215 is Quadrant III)
                        // QIII: cos(-), sin(-) -> Left and Up? No.
                        // Screen coords: Y is positive down.
                        // 0 = Right, 90 = Down, 180 = Left, 270 = Up.
                        // Bottom-Left would be 135 degrees (Right -> Down -> Left).
                        // Let's explicitly calculate deltas for simplicity.
                        // We want x to decrease, y to increase.

                        // Hardcoding direction for "Shooting Star" angle 
                        const dx = -1 * meteor.speed;
                        const dy = 0.5 * meteor.speed; // Slight downward

                        const newX = meteor.x + dx;
                        const newY = meteor.y + dy;

                        return {
                            ...meteor,
                            x: newX,
                            y: newY,
                        };
                    })
                    .filter(meteor =>
                        meteor.x > -200 &&
                        meteor.y < innerHeight + 200
                    );
            });
            animationFrameId = requestAnimationFrame(loop);
        }

        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <svg
            className={cn("w-full h-full absolute inset-0 z-0 pointer-events-none", className)}
            viewBox="0 0 100% 100%"
        >
            <defs>
                <linearGradient id="meteor-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
                    <stop offset="100%" stopColor={starColor} stopOpacity="1" />
                </linearGradient>
            </defs>
            {meteors.map((meteor) => (
                <line
                    key={meteor.id}
                    x1={meteor.x}
                    y1={meteor.y}
                    x2={meteor.x + meteor.trailLength} // Trail stretches behind (to the right)
                    y2={meteor.y - (meteor.trailLength * 0.5)} // Trail stretches Up (since moving Down)
                    stroke="url(#meteor-gradient)"
                    strokeWidth={meteor.size}
                    strokeLinecap="round"
                    style={{
                        filter: "drop-shadow(0 0 2px rgba(16, 185, 129, 0.5))"
                    }}
                />
            ))}
        </svg>
    );
};
