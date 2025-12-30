"use client";

import { memo } from "react";
import { PieChart as PieIcon, TrendingUp, BarChart3, ArrowUp } from "lucide-react";

// Static Strategy Dashboard Mock With Code-Based UI
const StrategyMapContent = memo(function StrategyMapContent() {
    return (
        <div className="relative w-[340px] h-[400px] bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden font-sans">
            {/* Header Mock */}
            <div className="h-14 border-b border-white/5 bg-[#111] flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-mono text-neutral-400 tracking-wider">ANALYTICS</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative p-6 space-y-6">
                {/* Top Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="text-[10px] text-neutral-500 mb-1">Total Reach</div>
                        <div className="text-lg font-bold text-white">4.2M</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="text-[10px] text-neutral-500 mb-1">Engagement</div>
                        <div className="text-lg font-bold text-amber-400">88%</div>
                    </div>
                </div>

                {/* CSS Bar Chart Mock */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-xs text-neutral-400 font-medium">Growth Trend</div>
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                    </div>
                    <div className="h-24 w-full flex items-end justify-between gap-2">
                        {/* Bars */}
                        <div className="w-full bg-white/10 rounded-t-sm h-[40%]" />
                        <div className="w-full bg-white/10 rounded-t-sm h-[60%]" />
                        <div className="w-full bg-white/10 rounded-t-sm h-[35%]" />
                        <div className="w-full bg-amber-500/20 rounded-t-sm h-[80%] border-t border-amber-500/50" />
                        <div className="w-full bg-white/10 rounded-t-sm h-[55%]" />
                        <div className="w-full bg-white/10 rounded-t-sm h-[70%]" />
                    </div>
                </div>

                {/* Floating Highlight Card */}
                <div className="absolute bottom-6 right-[-10px] bg-neutral-800 border-l border-t border-b border-white/10 p-4 rounded-l-xl shadow-2xl w-2/3 z-10 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] text-neutral-500 mb-0.5">ROI Projection</div>
                        <div className="text-amber-400 font-bold text-xl">+124%</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <ArrowUp className="w-4 h-4 text-amber-500" />
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-600/10 blur-[80px] pointer-events-none" />
        </div>
    );
});


export function BrandHero() {
    return (
        <div className="relative h-[600px] flex items-center justify-center order-2 lg:order-1 mt-12 lg:mt-0">
            <StrategyMapContent />
        </div>
    );
}
