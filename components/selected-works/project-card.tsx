"use client";


import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "./data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <div
            className="group/card relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 last:mb-0"
        >
            {/* Image Side (Alternating Order) */}
            <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-white/20 transition-all duration-500",
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                )}
            >
                {/* Background Base */}
                <div className="absolute inset-0 bg-black" />

                {/* Project Image */}
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Gradient for Text Contrast */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Grid Overlay (Subtle Texture) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-rajdhani tracking-widest uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Project <ArrowUpRight size={16} />
                    </div>
                </div>
            </Link>

            {/* Content Side */}
            <div className={cn(
                "flex flex-col space-y-6",
                index % 2 === 1 ? "lg:order-1 lg:text-right items-end" : "lg:order-2 lg:text-left items-start"
            )}>
                {/* Category Header */}
                <div className="flex items-center gap-3">
                    <span className="h-px w-12 bg-neutral-700" />
                    <span className="text-neutral-400 font-rajdhani tracking-[0.2em] text-sm uppercase">
                        {project.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-audiowide font-bold text-white leading-tight">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-lg md:text-xl font-exo2 max-w-xl leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-mono tracking-wide hover:bg-white/10 transition-colors cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Button (Mobile only or redundant) */}
                <button className="md:hidden mt-6 text-emerald-400 font-rajdhani font-bold flex items-center gap-2 hover:text-emerald-300 transition-colors uppercase tracking-widest text-sm group/btn">
                    View Case Study <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={16} />
                </button>
            </div>
        </div>
    );
}
