"use client";


import { Crown, Target, TrendingUp, Users, Lightbulb } from "lucide-react";
import { GlitchText, ListItem, MagneticButton } from "./components";

export function BrandContent({ href, isHero }: { href?: string, isHero?: boolean }) {
    return (
        <div className="order-1 lg:order-2 space-y-4 relative z-20 lg:-mt-24">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 backdrop-blur-md">
                        <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase">Strategic_Core // v1.0</span>
                </div>

                {/* Metallic Headline with Orange Glitch */}
                <GlitchText text="BRAND STRATEGY" delay={0} as={isHero ? "h1" : "h3"} className="!mr-0" />
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl border-l-4 border-amber-500/50 pl-6 font-rajdhani">
                We define the DNA of your digital presence. Through data-driven insights and creative foresight, we position your brand to dominate the market landscape.
            </p>

            <div className="space-y-2">
                <ListItem icon={<Target />} text="Market Positioning & Niche" delay={0.1} />
                <ListItem icon={<TrendingUp />} text="Growth Hacking & Acquisition" delay={0.2} />
                <ListItem icon={<Users />} text="Audience Persona Deep Dive" delay={0.3} />
                <ListItem icon={<Lightbulb />} text="Creative Storytelling" delay={0.4} />
            </div>

            <div className="pt-0">
                <MagneticButton href={href} label={href?.includes("contact") ? "CONTACT US" : "IGNITE BRAND"} />
            </div>
        </div>
    );
}
