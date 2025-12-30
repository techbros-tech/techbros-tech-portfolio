"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";
import {
    SiReact, SiTypescript, SiVuedotjs,
    SiNodedotjs, SiAmazon, SiGraphql,
    SiFirebase, SiSupabase,
    SiKotlin, SiSwift, SiFigma, SiDart, SiExpo, SiRealm, SiSqlite, SiFastlane, SiAppium
} from "react-icons/si";
import { Smartphone } from "lucide-react";

export default function TechStackShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(300);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setRadius(160);
                setIsMobile(true);
            } else if (width < 1024) {
                setRadius(260);
                setIsMobile(false);
            } else {
                setRadius(380);
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const techStack = [
        { icon: <SiReact />, label: "React Native", color: "#61DAFB" },
        { icon: <SiExpo />, label: "Expo", color: "#ffffff" },
        { icon: <SiDart />, label: "Dart", color: "#0175C2" },
        { icon: <SiSwift />, label: "Swift", color: "#F05138" },
        { icon: <SiKotlin />, label: "Kotlin", color: "#7F52FF" },
        { icon: <SiTypescript />, label: "TypeScript", color: "#3178C6" },
        { icon: <SiFirebase />, label: "Firebase", color: "#FFCA28" },
        { icon: <SiSupabase />, label: "Supabase", color: "#3ECF8E" },
        { icon: <SiGraphql />, label: "GraphQL", color: "#E10098" },
        { icon: <SiRealm />, label: "Realm", color: "#39477F" },
        { icon: <SiSqlite />, label: "SQLite", color: "#003B57" },
        { icon: <SiAmazon />, label: "AWS Amplify", color: "#FF9900" },
        { icon: <SiFigma />, label: "Figma", color: "#F24E1E" },
        { icon: <SiFastlane />, label: "Fastlane", color: "#00F260" },
        { icon: <SiAppium />, label: "Appium", color: "#662da5" },
        { icon: <SiNodedotjs />, label: "Node.js", color: "#339933" },
    ];

    const itemsToShow = isMobile ? techStack.slice(0, 10) : techStack;
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <section className="py-24 md:py-40 relative overflow-hidden bg-black w-full min-h-[600px] md:min-h-[1000px] flex items-center justify-center">
            <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">

                <div className="text-center mb-16 md:mb-32 z-20 relative">
                    <h2 className="text-4xl md:text-7xl font-bold font-audiowide mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                        Mobile Stack
                    </h2>
                    <p className="text-neutral-500 max-w-xl mx-auto font-rajdhani text-lg md:text-xl">
                        Powering next-gen applications.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full max-w-[1000px] aspect-square flex items-center justify-center p-4 md:p-10"
                >
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
                                <TechNode icon={tech.icon} label={tech.label} color={tech.color} />
                            </div>
                        );
                    })}

                    {/* Center Core */}
                    <div ref={centerRef} className="relative z-30 flex items-center justify-center w-24 h-24 md:w-40 md:h-40 rounded-full bg-neutral-950 border border-neutral-800 shadow-[0_0_80px_rgba(59,130,246,0.25)] overflow-hidden">
                        <div className="relative w-full h-full p-6 text-blue-500">
                            <Smartphone className="w-full h-full" />
                        </div>

                        {/* Orbiting Rings */}
                        <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-pulse pointer-events-none" />
                        <div className="absolute -inset-4 rounded-full border border-blue-500/10 animate-spin-slow pointer-events-none" />
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
                            gradientStopColor="#3b82f6"
                            pathOpacity={0.15}
                            pathWidth={1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

const TechNode = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => {
    return (
        <div className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125 z-40">
            <div
                className="text-3xl md:text-5xl transition-transform duration-300 drop-shadow-md pb-2"
                style={{ color: color }}
            >
                {icon}
            </div>
            <span className="absolute top-full mt-2 text-[10px] md:text-sm font-bold font-rajdhani text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-neutral-900/90 px-3 py-1 rounded-full border border-neutral-800 pointer-events-none z-50">
                {label}
            </span>
        </div>
    );
};
