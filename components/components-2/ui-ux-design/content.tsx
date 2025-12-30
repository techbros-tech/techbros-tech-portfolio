"use client";


import { PenTool, Layout, MousePointer2, Wand2, Maximize2 } from "lucide-react";
import { GlitchText, ListItem, MagneticButton } from "./components";

export function UiUxContent({ href }: { href?: string }) {
    return (
        <div className="space-y-4 relative z-20 lg:-mt-24">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20 backdrop-blur-md">
                        <PenTool className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <span className="text-fuchsia-400 font-mono text-sm tracking-[0.3em] uppercase">Creative_Engine // v3.0</span>
                </div>

                {/* Metallic Headline with Purple Glitch */}
                <h2 className="text-6xl md:text-8xl font-bold font-audiowide text-white leading-[0.9]">
                    UI/UX <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                        DESIGN
                    </span>
                </h2>
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl border-l-4 border-fuchsia-500/50 pl-6 font-rajdhani">
                We don't just design interfaces; we craft emotional connections. Merging aesthetics with usability to create digital experiences that captivate and convert.
            </p>

            <div className="space-y-2">
                <ListItem icon={<Layout />} text="Scalable Design Systems" delay={0.1} />
                <ListItem icon={<MousePointer2 />} text="Interactive Prototyping" delay={0.2} />
                <ListItem icon={<Wand2 />} text="Visual Identity Evolution" delay={0.3} />
                <ListItem icon={<Maximize2 />} text="Data-Driven User Research" delay={0.4} />
            </div>

            <div className="pt-0">
                <MagneticButton href={href} label={href?.includes("contact") || !href ? "CONTACT US" : "START DESIGNING"} />
            </div>
        </div>
    );
}
