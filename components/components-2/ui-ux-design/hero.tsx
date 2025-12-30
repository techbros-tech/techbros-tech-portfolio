"use client";

import { memo } from "react";
import { Layers, MousePointer2, Type, Image as ImageIcon, BoxSelect } from "lucide-react";

// Static Design Tool Window Mock (Figma-esque)
const CanvasContent = memo(function CanvasContent() {
    return (
        <div className="relative w-[90%] aspect-video bg-[#1E1E1E] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex font-sans">
            {/* Left Toolbar */}
            <div className="w-10 h-full bg-[#0F0F0F] border-r border-white/5 flex flex-col items-center py-4 space-y-5 z-20">
                <MousePointer2 className="w-4 h-4 text-white" />
                <BoxSelect className="w-4 h-4 text-neutral-500" />
                <Type className="w-4 h-4 text-neutral-500" />
                <ImageIcon className="w-4 h-4 text-neutral-500" />
            </div>

            {/* Left Sidebar (Layers) - Desktop Only */}
            <div className="hidden md:flex w-40 h-full bg-[#111] border-r border-white/5 flex-col z-10">
                <div className="h-10 border-b border-white/5 flex items-center px-4 text-xs font-semibold text-white">Layers</div>
                <div className="flex-1 p-2 space-y-1">
                    <div className="flex items-center px-2 py-1.5 bg-fuchsia-500/20 text-fuchsia-400 text-[10px] rounded">Hero Section</div>
                    <div className="flex items-center px-2 py-1.5 text-neutral-500 text-[10px]">Button Primary</div>
                    <div className="flex items-center px-2 py-1.5 text-neutral-500 text-[10px]">Navigation</div>
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 relative bg-[#0D0D0D] overflow-hidden">
                {/* Top Bar Mock */}
                <div className="h-10 w-full border-b border-white/5 flex items-center justify-between px-4 bg-[#111]">
                    <div className="flex items-center gap-2">
                        <div className="text-[10px] text-neutral-500 font-mono">My_Design_System.fig</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <div className="text-[10px] text-neutral-600">Edited just now</div>
                    </div>
                    <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-fuchsia-500 border border-[#111]" />
                        <div className="w-5 h-5 rounded-full bg-emerald-500 border border-[#111]" />
                    </div>
                </div>

                {/* Canvas Content - Vector shapes */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full max-w-sm aspect-[4/3] bg-[#1a1a1a] rounded shadow-lg border border-white/5 flex items-center justify-center overflow-hidden">
                        {/* Decorative Vector Shapes */}
                        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-tr from-fuchsia-600 to-purple-600 opacity-80 blur-xl" />
                        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-bl from-blue-600 to-cyan-600 opacity-60 blur-2xl" />

                        {/* UI Mock on Canvas */}
                        <div className="relative z-10 w-48 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col gap-3">
                            <div className="h-2 w-1/2 bg-white/20 rounded" />
                            <div className="h-16 w-full bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded border border-fuchsia-500/30" />
                            <div className="flex gap-2">
                                <div className="flex-1 h-8 bg-white/10 rounded" />
                                <div className="w-8 h-8 rounded-full bg-fuchsia-500 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Selection Handles Mock */}
                            <div className="absolute -inset-[2px] border border-blue-500 z-20">
                                <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-blue-500" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-blue-500" />
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-blue-500" />
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Properties) - Desktop Only */}
            <div className="hidden lg:flex w-48 h-full bg-[#111] border-l border-white/5 flex-col z-10 p-3 space-y-4">
                <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-neutral-600">Layout</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-6 bg-white/5 rounded border border-white/5" />
                        <div className="h-6 bg-white/5 rounded border border-white/5" />
                        <div className="h-6 bg-white/5 rounded border border-white/5" />
                        <div className="h-6 bg-white/5 rounded border border-white/5" />
                    </div>
                </div>
                <div className="w-full h-[1px] bg-white/5" />
                <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-neutral-600">Fill</div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-fuchsia-500 rounded border border-white/10" />
                        <div className="text-[10px] text-neutral-400">#E879F9</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export function UiUxHero() {
    return (
        <div className="relative h-[400px] w-full mt-12 lg:mt-0 flex items-center justify-center">
            <CanvasContent />
        </div>
    ); // Static, no tilt for max performance
}
