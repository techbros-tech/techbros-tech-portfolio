"use client";


import { Smartphone, Zap, Shield, Activity } from "lucide-react";
import { GlitchText, ListItem, MagneticButton } from "./components";

export function AppDevContent({ href, isHero, scrollToId }: { href?: string, isHero?: boolean, scrollToId?: string }) {
    return (
        <div className="space-y-4 relative z-20 lg:order-1 lg:-mt-24">
            <div className="space-y-2">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    <span className="text-neutral-400 font-mono text-xs tracking-widest uppercase">Mobile_Runtime.v2</span>
                </div>

                {/* Metallic Headline - App Dev */}
                <GlitchText text="MOBILE APPS" delay={0} />
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
                Native performance, universal reach. We build mobile applications that feel alive, responsive, and intuitive, bridging the gap between user and technology.
            </p>

            <div className="space-y-2">
                <ListItem icon={<Smartphone />} text="iOS & Android Native" delay={0.2} />
                <ListItem icon={<Zap />} text="Cross-Platform Solutions" delay={0.3} />
                <ListItem icon={<Shield />} text="Secure Architecture" delay={0.4} />
                <ListItem icon={<Activity />} text="Real-time Synchronization" delay={0.5} />
            </div>

            <div className="pt-0">
                <MagneticButton href={href} isHero={isHero} scrollToId={scrollToId} label={isHero ? "EXPLORE" : "CONTACT US"} />
            </div>
        </div>
    );
}
