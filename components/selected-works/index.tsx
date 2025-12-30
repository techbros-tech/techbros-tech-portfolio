"use client";

import { motion } from "framer-motion";
import { SELECTED_WORKS } from "./data";
import ProjectCard from "./project-card";
import { GlitchText } from "../components-2/web-development/components";

export default function SelectedWorks() {
    return (
        <section className="relative py-32 bg-black min-h-screen flex flex-col items-center overflow-hidden">

            {/* Background Texture - Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Glow Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="text-center mb-24 md:mb-32">
                    <div
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-xs tracking-widest uppercase">
                            Portfolio
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <GlitchText text="SELECTED WORKS" className="text-5xl md:text-7xl lg:text-8xl font-black font-audiowide text-white mb-6" />
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-exo2 leading-relaxed">
                            A showcase of our digital craftsmanship. We build platforms that define brands and disrupt industries.
                        </p>
                    </div>
                </div>

                {/* Projects List */}
                <div className="flex flex-col w-full">
                    {SELECTED_WORKS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Status Indicator & Footer Disclaimer */}
                <div className="mt-32 flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 px-6 py-2.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm"
                    >
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                        </div>
                        <span className="font-audiowide text-[10px] md:text-xs tracking-[0.2em] uppercase">
                            <span className="text-neutral-500">Currently:</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 ml-2">
                                Actively working on 3 big projects
                            </span>
                        </span>
                    </motion.div>

                    <p className="text-neutral-600 font-rajdhani tracking-[0.4em] uppercase text-[10px] md:text-sm select-none opacity-60">
                        + many projects we cannot share publicly
                    </p>
                </div>

            </div>
        </section>
    );
}
