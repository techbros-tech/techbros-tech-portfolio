"use client";

import { memo } from "react";

import { TEAM_MEMBERS } from "./team-data";
import { GlitchText } from "../components-2/web-development/components";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react"; // Website icon
import Image from "next/image";

// Circular Team Card
const TeamCircle = memo(function TeamCircle({ member, index, className }: { member: typeof TEAM_MEMBERS[0]; index: number; className?: string }) {
    return (
        <div
            className={cn(
                "relative z-20 flex flex-col items-center justify-center p-2 sm:p-6",
                className
            )}
        >
            {/* Glowing Circle Container */}
            <div className="relative group cursor-pointer">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500 group-hover:duration-200" />

                {/* Avatar Circle */}
                <div className="relative w-64 h-64 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-neutral-900 border-2 border-white/10 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500 group-hover:border-amber-500/50 shadow-2xl">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className={cn("object-cover", member.imageClassName)}
                    />
                </div>

                {/* Floating Label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur border border-amber-500/30 px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg group-hover:border-amber-400/60 transition-colors">
                    <span className="text-xs sm:text-sm font-mono text-amber-400 font-semibold tracking-wide">{member.role}</span>
                </div>
            </div>

            {/* Text Content */}
            <div className="mt-4 sm:mt-8 text-center px-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-rajdhani text-white group-hover:text-amber-300 transition-colors flex items-center justify-center gap-2">
                    {member.name}
                    {member.website && (
                        <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-500 hover:text-amber-400 transition-colors"
                            title="Visit Website"
                        >
                            <Globe size={20} />
                        </a>
                    )}
                </h3>
                <p className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-exo2 font-medium text-base sm:text-lg max-w-[280px] mx-auto mt-3 leading-relaxed fill-mode-forwards">
                    {member.bio}
                </p>
            </div>
        </div>
    );
});


export default function OurTeam() {
    return (
        <section className="relative min-h-[80vh] py-12 sm:py-32 bg-black overflow-hidden flex flex-col items-center justify-center">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-amber-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-7xl">

                {/* Header */}
                <div className="text-center mb-16 sm:mb-24 space-y-4">
                    <GlitchText text="THE SQUAD" delay={0} />
                    <p className="text-neutral-400 max-w-xl mx-auto text-lg sm:text-xl">
                        The minds behind the machine. A network of innovation.
                    </p>
                </div>

                {/* Responsive Flex Layout */}
                <div className="flex flex-wrap items-start justify-center gap-0 sm:gap-4 md:gap-8 lg:gap-12">
                    {TEAM_MEMBERS.map((member, i) => (
                        <TeamCircle
                            key={member.id}
                            member={member}
                            index={i}
                            className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-3rem)]"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
