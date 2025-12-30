"use client";

import { memo } from "react";
import { TiltCard } from "./components";
import { FileCode2, Search, Settings, Terminal, LayoutTemplate } from "lucide-react";

// Static macOS-style Browser Window with Code UI
const BrowserContent = memo(function BrowserContent() {
    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0D0D0D] group/browser font-sans">
            {/* Browser Toolbar / Editor Header */}
            <div className="h-10 bg-[#161616] border-b border-white/5 flex items-center px-4 justify-between">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex bg-black/50 border border-white/5 rounded px-3 py-1 text-[10px] text-neutral-400 font-mono">
                    techbros-platform / main.tsx
                </div>
                <div className="w-16" /> {/* Spacer */}
            </div>

            <div className="flex h-[calc(100%-2.5rem)]">
                {/* Sidebar */}
                <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 space-y-6 bg-[#111]">
                    <FileCode2 className="w-5 h-5 text-emerald-500" />
                    <Search className="w-5 h-5 text-neutral-600" />
                    <LayoutTemplate className="w-5 h-5 text-neutral-600" />
                    <div className="flex-1" />
                    <Settings className="w-5 h-5 text-neutral-600" />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex">
                    {/* Code Area */}
                    <div className="flex-1 p-6 font-mono text-[11px] md:text-sm leading-relaxed text-neutral-300 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                            <Terminal className="w-24 h-24" />
                        </div>

                        <div className="space-y-1">
                            <div><span className="text-purple-400">import</span> <span className="text-yellow-300">{`{ motion }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'framer-motion'</span>;</div>
                            <br />
                            <div><span className="text-purple-400">export default function</span> <span className="text-blue-400">HeroSection</span>() {`{`}</div>
                            <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                            <div className="pl-8"><span className="text-teal-400">&lt;div</span> <span className="text-orange-300">className</span>=<span className="text-green-400">"relative w-full h-screen"</span>&gt;</div>
                            <div className="pl-12 text-neutral-500">{`/* TechBros Core Engine */`}</div>
                            <div className="pl-12"><span className="text-teal-400">&lt;h1&gt;</span>Building the Future<span className="text-teal-400">&lt;/h1&gt;</span></div>
                            <div className="pl-8"><span className="text-teal-400">&lt;/div&gt;</span></div>
                            <div className="pl-4">);</div>
                            <div>{`}`}</div>
                        </div>
                    </div>

                    {/* Live Preview Panel (Desktop Only) */}
                    <div className="hidden md:flex w-1/3 border-l border-white/5 bg-neutral-900/50 flex-col p-4">
                        <div className="text-[10px] text-neutral-500 font-mono mb-2 uppercase tracking-wider">Preview</div>
                        <div className="flex-1 rounded-lg border border-white/10 bg-gradient-to-br from-emerald-900/20 to-black relative overflow-hidden flex items-center justify-center p-4">
                            <div className="w-full space-y-3">
                                <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                                <div className="h-8 w-3/4 bg-emerald-500/20 rounded border border-emerald-500/30" />
                                <div className="h-24 w-full bg-white/5 rounded border border-white/5 mt-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export function WebDevHero() {
    return (
        <div className="relative w-full perspective-[2000px] mt-12 lg:mt-0">
            {/* Desktop Tilt */}
            <div className="hidden lg:block h-[500px] w-full">
                <TiltCard>
                    <BrowserContent />
                </TiltCard>
            </div>
            {/* Mobile Static */}
            <div className="lg:hidden h-[350px] w-full">
                <BrowserContent />
            </div>
        </div>
    );
}
