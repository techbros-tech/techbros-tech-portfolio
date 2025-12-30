"use client";

import { useRef, forwardRef, useEffect, useState } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";
import {
    SiFigma, SiAdobexd, SiSketch, SiFramer, SiInvision, SiAdobephotoshop,
    SiAdobeillustrator, SiMiro, SiNotion, SiSlack, SiLinear, SiAsana,
    SiJira, SiTrello, SiMaze, SiHotjar, SiGoogleanalytics, SiAbstract,
    SiStorybook, SiWebflow, SiReact, SiTailwindcss, SiMaterialdesign
} from "react-icons/si";

export default function TechStackShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(300);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setRadius(160); // Spaced out more on mobile
                setIsMobile(true);
            } else if (width < 1024) {
                setRadius(260);
                setIsMobile(false);
            } else {
                setRadius(380); // Spaced out more on desktop
                setIsMobile(false);
            }
        };

        handleResize(); // Initial call
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Design & Organization Tools
    const techStack = [
        { icon: <SiFigma />, label: "Figma", color: "#F24E1E" },
        { icon: <SiAdobexd />, label: "Adobe XD", color: "#FF61F6" },
        { icon: <SiSketch />, label: "Sketch", color: "#F7B500" },
        { icon: <SiFramer />, label: "Framer", color: "#0055FF" },
        { icon: <SiInvision />, label: "InVision", color: "#FF3366" },
        { icon: <SiAdobephotoshop />, label: "Photoshop", color: "#31A8FF" },
        { icon: <SiAdobeillustrator />, label: "Illustrator", color: "#FF9A00" },
        { icon: <SiMiro />, label: "Miro", color: "#050038" },
        { icon: <SiNotion />, label: "Notion", color: "#ffffff" },
        { icon: <SiSlack />, label: "Slack", color: "#4A154B" },
        { icon: <SiLinear />, label: "Linear", color: "#5E6AD2" },
        { icon: <SiAsana />, label: "Asana", color: "#F06A6A" },
        { icon: <SiJira />, label: "Jira", color: "#0052CC" },
        { icon: <SiTrello />, label: "Trello", color: "#0079BF" },
        { icon: <SiMaze />, label: "Maze", color: "#000000" },
        { icon: <SiHotjar />, label: "Hotjar", color: "#FD6756" },
        { icon: <SiGoogleanalytics />, label: "Analytics", color: "#E37400" },
        { icon: <SiAbstract />, label: "Abstract", color: "#191A1B" },
        { icon: <SiStorybook />, label: "Storybook", color: "#FF4785" },
        { icon: <SiWebflow />, label: "Webflow", color: "#4353FF" },
        { icon: <SiReact />, label: "React", color: "#61DAFB" },
        { icon: <SiTailwindcss />, label: "Tailwind", color: "#06B6D4" },
        { icon: <SiMaterialdesign />, label: "Material", color: "#757575" },
    ];

    // On mobile, show fewer items but still a good amount (12)
    const itemsToShow = isMobile ? techStack.slice(0, 12) : techStack;
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <section className="py-24 md:py-40 relative overflow-hidden bg-black w-full min-h-[600px] md:min-h-[1000px] flex items-center justify-center">
            <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">

                <div className="text-center mb-16 md:mb-32 z-20 relative">
                    <h2 className="text-4xl md:text-7xl font-bold font-audiowide mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                        Design Arsenal
                    </h2>
                    <p className="text-neutral-500 max-w-xl mx-auto font-rajdhani text-lg md:text-xl">
                        Powering creativity with world-class tools.
                    </p>
                </div>

                {/* Orbit Container */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-[1000px] aspect-square flex items-center justify-center p-4 md:p-10"
                >
                    {/* Items */}
                    {itemsToShow.map((tech, i) => {
                        const angle = (i / itemsToShow.length) * 360;
                        const radian = (angle * Math.PI) / 180;
                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;

                        return (
                            <div
                                key={i}
                                ref={(el) => { itemRefs.current[i] = el }}
                                className="absolute z-20 flex flex-col items-center justify-center"
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                }}
                            >
                                <TechNode icon={tech.icon} label={tech.label} color={tech.color} isMobile={isMobile} />
                            </div>
                        );
                    })}

                    {/* Center Core with Logo */}
                    <div ref={centerRef} className="relative z-30 flex items-center justify-center w-24 h-24 md:w-40 md:h-40 rounded-full bg-neutral-950 border border-neutral-800 shadow-[0_0_80px_rgba(232,121,249,0.15)] overflow-hidden">
                        <div className="relative w-full h-full">
                            <Image
                                src="/techbros-logo.png"
                                alt="TechBros Logo"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Orbiting Rings Effect */}
                        <div className="absolute inset-0 rounded-full border border-fuchsia-500/10 animate-pulse pointer-events-none" />
                        <div className="absolute -inset-4 rounded-full border border-fuchsia-500/5 animate-spin-slow pointer-events-none" />
                        <div className="absolute -inset-12 rounded-full border border-neutral-800/20 -z-10 pointer-events-none" />
                    </div>

                    {/* Beams */}
                    {itemsToShow.map((_, i) => (
                        <AnimatedBeam
                            key={`beam-${i}`}
                            containerRef={containerRef}
                            fromRef={{ current: itemRefs.current[i] }}
                            toRef={centerRef}
                            duration={Math.random() * 2 + 2}
                            gradientStartColor="#525252"
                            gradientStopColor="#e879f9"
                            pathOpacity={0.15}
                            pathWidth={1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

const TechNode = ({ icon, label, color, isMobile }: { icon: React.ReactNode, label: string, color: string, isMobile: boolean }) => {
    return (
        <div className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125 z-40">
            {/* Icon - Always Colored */}
            <div
                className="text-3xl md:text-5xl transition-transform duration-300 drop-shadow-md pb-2"
                style={{ color: color }}
            >
                {icon}
            </div>

            {/* Label - Hidden until hover */}
            <span className="absolute top-full mt-2 text-[10px] md:text-sm font-bold font-rajdhani text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-neutral-900/90 px-3 py-1 rounded-full border border-neutral-800 pointer-events-none z-50">
                {label}
            </span>
        </div>
    );
};
