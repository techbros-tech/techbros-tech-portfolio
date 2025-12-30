"use client";

import { memo } from "react";
import { TiltCard } from "./components";
import { Bell, CreditCard, ArrowUpRight, ArrowDownLeft, Wallet, Command, LayoutGrid } from "lucide-react";

// Static Modern Smartphone Mock with App UI
const PhoneContent = memo(function PhoneContent() {
    return (
        <div className="relative w-[300px] md:w-[320px] aspect-[9/19] rounded-[3rem] border-[8px] border-neutral-800 bg-black shadow-2xl overflow-hidden group/phone ring-1 ring-white/10">
            {/* Screen Content */}
            <div className="relative w-full h-full bg-[#050505] overflow-hidden rounded-[2.5rem] flex flex-col">

                {/* Dynamic Island Area */}
                <div className="h-8 w-full z-30 mb-2" />

                {/* App UI Header */}
                <div className="px-6 pb-6 pt-2 flex justify-between items-center z-20">
                    <div>
                        <div className="text-xs text-neutral-400">Welcome back</div>
                        <div className="text-sm font-semibold text-white">Alex Morgan</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full border border-white/5">
                        <Bell className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Main Scrollable Area */}
                <div className="flex-1 px-6 space-y-6 overflow-hidden relative">
                    {/* Balance Card */}
                    <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-900 rounded-2xl p-6 shadow-lg border border-white/10 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="text-blue-100/70 text-xs mb-1">Total Balance</div>
                            <div className="text-3xl font-bold text-white mb-6">$24,500.80</div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg text-xs text-white backdrop-blur-sm">
                                    <ArrowUpRight className="w-3 h-3" /> Send
                                </div>
                                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg text-xs text-white backdrop-blur-sm">
                                    <ArrowDownLeft className="w-3 h-3" /> Receive
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity List */}
                    <div className="space-y-4">
                        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Transactions</div>

                        {[
                            { icon: CreditCard, color: "bg-orange-500", name: "Netflix Sub", date: "Today", amount: "-$15.99", text: "text-white" },
                            { icon: Wallet, color: "bg-emerald-500", name: "Salary Deposit", date: "Yesterday", amount: "+$4,250", text: "text-emerald-400" },
                            { icon: Command, color: "bg-purple-500", name: "Apple Store", date: "2 days ago", amount: "-$299.00", text: "text-white" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${item.color}/20 flex items-center justify-center`}>
                                        <item.icon className={`w-5 h-5 ${item.text}`} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white font-medium">{item.name}</div>
                                        <div className="text-[10px] text-neutral-500">{item.date}</div>
                                    </div>
                                </div>
                                <div className={`text-sm font-medium ${item.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                                    {item.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Nav Mock */}
                <div className="h-16 border-t border-white/5 flex items-center justify-around bg-black/50 backdrop-blur-lg z-20 pb-2">
                    <LayoutGrid className="w-5 h-5 text-blue-500" />
                    <Wallet className="w-5 h-5 text-neutral-600" />
                    <CreditCard className="w-5 h-5 text-neutral-600" />
                    <Settings className="w-5 h-5 text-neutral-600" />
                </div>

                {/* Dynamic Island Overlay */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-2xl z-40 flex items-center justify-center space-x-2">
                    <div className="w-16 h-4 bg-neutral-900/50 rounded-full" />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-40" />
            </div>
        </div>
    );
});

// Import Settings locally for Nav
function Settings(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


export function AppDevHero() {
    return (
        <div className="relative h-[60vh] lg:h-auto flex items-center justify-center lg:order-2 perspective-[1000px] mt-12 lg:mt-0">
            {/* Desktop: Interactive Tilt */}
            <div className="hidden lg:block relative z-10">
                <TiltCard>
                    <PhoneContent />
                </TiltCard>
            </div>
            {/* Mobile: Static */}
            <div className="lg:hidden relative z-10">
                <PhoneContent />
            </div>
        </div>
    );
}
