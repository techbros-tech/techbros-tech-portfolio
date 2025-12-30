"use client";


import { Code2, Globe, Cpu, Box } from "lucide-react";
import { GlitchText, ListItem, MagneticButton } from "./components";

export function WebDevContent({ href, isHero, scrollToId }: { href?: string, isHero?: boolean, scrollToId?: string }) {
    return (
        <div className="space-y-4 relative z-20 lg:-mt-24">
            <div className="space-y-2">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-neutral-400 font-mono text-xs tracking-widest uppercase">System.Web.Init()</span>
                </div>

                {/* Metallic Headline */}
                <GlitchText text="WEBSITES" delay={0} />
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
                Forging immersive digital realities with pixel-perfect precision. We build high-performance, scalable web architectures that define the future of interaction.
            </p>

            <div className="space-y-2">
                <ListItem icon={<Code2 />} text="Full-Stack Architecture" delay={0.2} />
                <ListItem icon={<Globe />} text="Immersive 3D Experiences" delay={0.3} />
                <ListItem icon={<Cpu />} text="High-Performance Systems" delay={0.4} />
                <ListItem icon={<Box />} text="Scalable Cloud Solutions" delay={0.5} />
            </div>

            <div className="pt-0">
                <MagneticButton href={href} isHero={isHero} scrollToId={scrollToId} />
            </div>
        </div>
    );
}
