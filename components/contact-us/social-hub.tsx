"use client";

import React, { useRef, forwardRef } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/constants/contact-info';

// Circle Utility for consistent icon wrapper
const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-neutral-900 shadow-lg transition-all cursor-pointer hover:border-white/30",
                className
            )}
        >
            {children}
        </div>
    )
})
Circle.displayName = "Circle"

const SocialHub = React.memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);

    // Refs for social icons
    const fbRef = useRef<HTMLDivElement>(null);
    const twRef = useRef<HTMLDivElement>(null);
    const inRef = useRef<HTMLDivElement>(null);
    const liRef = useRef<HTMLDivElement>(null);
    const ttRef = useRef<HTMLDivElement>(null);
    const waRef = useRef<HTMLDivElement>(null);
    const emRef = useRef<HTMLDivElement>(null);

    // Common Beam Props for Green Theme
    const beamProps = {
        pathColor: "rgba(34, 197, 94, 0.5)", // green-500/50
        gradientStartColor: "#4ade80", // green-400
        gradientStopColor: "#a3e635", // lime-400
        pathOpacity: 0.3,
        duration: 3,
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center bg-black/50 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm"
        >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 pointer-events-none" />

            {/* Layout Grid */}
            <div className="flex w-full max-w-lg h-full flex-col items-stretch justify-between p-10 relative z-20">

                {/* Top Row: FB & LinkedIn & WhatsApp */}
                <div className="flex flex-row items-center justify-between">
                    <a href={CONTACT_INFO.socials.find(s => s.label === "Facebook")?.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={fbRef} className="hover:shadow-[#1877F2]/50"><FaFacebook size={24} color="#1877F2" /></Circle>
                    </a>
                    <a href={CONTACT_INFO.whatsapp.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={waRef} className="hover:shadow-[#25D366]/50"><CONTACT_INFO.whatsapp.icon size={26} color="#25D366" /></Circle>
                    </a>
                    <a href={CONTACT_INFO.socials.find(s => s.label === "LinkedIn")?.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={liRef} className="hover:shadow-[#0A66C2]/50"><FaLinkedin size={24} color="#0A66C2" /></Circle>
                    </a>
                </div>

                {/* Middle Row: Twitter, Center, TikTok */}
                <div className="flex flex-row items-center justify-between">
                    <a href={CONTACT_INFO.socials.find(s => s.label === "Twitter (X)")?.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={twRef} className="hover:shadow-[#1DA1F2]/50"><FaTwitter size={24} color="#1DA1F2" /></Circle>
                    </a>

                    {/* CENTER LOGO */}
                    <div ref={centerRef} className="relative z-30 w-24 h-24 md:w-32 md:h-32 bg-black rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                        <motion.div
                            className="w-full h-full rounded-full flex items-center justify-center bg-black overflow-hidden relative"
                            animate={{ boxShadow: ["0 0 20px rgba(34, 197, 94, 0.3)", "0 0 60px rgba(34, 197, 94, 0.6)", "0 0 20px rgba(34, 197, 94, 0.3)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Image
                                src="/techbros-logo.png"
                                alt="Techbros Logo"
                                width={80}
                                height={80}
                                className="object-contain p-2"
                            />
                        </motion.div>
                    </div>

                    <a href={CONTACT_INFO.socials.find(s => s.label === "TikTok")?.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={ttRef} className="hover:shadow-[#00f2ea]/50"><FaTiktok size={24} className="text-white hover:text-[#00f2ea] transition-colors" /></Circle>
                    </a>
                </div>

                {/* Bottom Row: Instagram & Email */}
                <div className="flex flex-row items-center justify-evenly">
                    <a href={CONTACT_INFO.socials.find(s => s.label === "Instagram")?.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={inRef} className="hover:shadow-[#E4405F]/50"><FaInstagram size={24} className="text-[#E4405F]" /></Circle>
                    </a>
                    <a href={CONTACT_INFO.email.href} target="_blank" rel="noopener noreferrer">
                        <Circle ref={emRef} className="hover:shadow-[#ea4335]/50"><CONTACT_INFO.email.icon size={24} color="#ea4335" /></Circle>
                    </a>
                </div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeam containerRef={containerRef} fromRef={fbRef} toRef={centerRef} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={twRef} toRef={centerRef} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={inRef} toRef={centerRef} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={liRef} toRef={centerRef} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={ttRef} toRef={centerRef} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={waRef} toRef={centerRef} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={emRef} toRef={centerRef} {...beamProps} />

        </div>
    );
});

SocialHub.displayName = "SocialHub";

export default SocialHub;
