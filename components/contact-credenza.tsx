"use client";

import React from "react";
import { useContactStore } from "@/store/use-contact-store";
import {
    Credenza,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaDescription,
    CredenzaBody,
    CredenzaClose
} from "@/components/credenza";
import { CONTACT_INFO } from "@/constants/contact-info";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

export function ContactCredenza() {
    const { isOpen, setOpen } = useContactStore();

    const primaryContacts = [
        { ...CONTACT_INFO.whatsapp, theme: "gold" },
        { ...CONTACT_INFO.phone, theme: "silver" },
        { ...CONTACT_INFO.email, theme: "gold" },
    ];

    const socialLinks = CONTACT_INFO.socials;

    return (
        <Credenza open={isOpen} onOpenChange={setOpen}>
            <CredenzaContent className="bg-[#050505] border-white/5 text-white max-w-2xl max-h-[97vh] p-0 overflow-hidden">
                <ScrollArea className="h-full max-h-[97vh]">
                    <div className="relative p-4 md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(234,179,8,0.1),transparent_70%)] pointer-events-none" />

                        <CredenzaHeader className="relative z-10 pt-4 md:pt-8">
                            <CredenzaTitle className="text-2xl md:text-4xl font-audiowide text-center uppercase tracking-tighter">
                                <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,rgba(255,255,255,0.8),rgba(255,255,255,1),rgba(255,255,255,0.8))]">
                                    Direct
                                </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 ml-2 md:ml-3">
                                    Channels
                                </span>
                            </CredenzaTitle>
                            <CredenzaDescription className="text-neutral-500 text-center font-rajdhani text-sm md:text-lg mt-1 md:mt-2">
                                Reach out through our specialized elite communication lines.
                            </CredenzaDescription>
                        </CredenzaHeader>

                        <CredenzaBody className="relative z-10 pb-8 md:pb-12 pt-4 md:pt-6">
                            {/* Primary Dominant Grid - 3 columns even on mobile for compactness */}
                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-10">
                                {primaryContacts.map((contact, index) => {
                                    const Icon = contact.icon;
                                    const isGold = contact.theme === "gold";

                                    return (
                                        <motion.a
                                            key={contact.label}
                                            href={contact.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                            className={cn(
                                                "relative group flex flex-col items-center justify-center p-3 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-500 overflow-hidden",
                                                isGold
                                                    ? "border-amber-500/20 bg-amber-500/5 hover:border-amber-400/50 hover:bg-amber-500/10"
                                                    : "border-slate-500/20 bg-slate-500/5 hover:border-slate-300/50 hover:bg-slate-500/10"
                                            )}
                                        >
                                            {/* Animated Highlight */}
                                            <div className={cn(
                                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                                isGold
                                                    ? "bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.15),transparent_70%)]"
                                                    : "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]"
                                            )} />

                                            <div className={cn(
                                                "w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12",
                                                isGold
                                                    ? "bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-600 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                                                    : "bg-gradient-to-br from-slate-100 via-slate-400 to-slate-600 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                            )}>
                                                <Icon size={20} className="text-black md:size-[32px]" />
                                            </div>

                                            <span className={cn(
                                                "font-audiowide text-[8px] md:text-sm tracking-widest uppercase mb-0.5 md:mb-1 transition-colors text-center",
                                                isGold ? "text-amber-200 group-hover:text-amber-100" : "text-slate-300 group-hover:text-white"
                                            )}>
                                                {contact.label}
                                            </span>
                                            <span className="hidden md:block text-neutral-500 font-rajdhani text-xs text-center truncate w-full px-2">
                                                {contact.value}
                                            </span>
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* Secondary Social Icons Row */}
                            <div className="flex flex-col items-center">
                                <div className="w-full flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-neutral-800" />
                                    <span className="font-orbitron text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-neutral-600 uppercase">Connect Globally</span>
                                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-neutral-800" />
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon;
                                        return (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + (index * 0.05) }}
                                                whileHover={{ y: -5, scale: 1.1 }}
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300"
                                                title={social.label}
                                            >
                                                <Icon
                                                    size={18}
                                                    className="text-neutral-400 md:size-[22px] group-hover:text-yellow-400 transition-colors"
                                                    style={{ color: social.label === 'WhatsApp' ? '#25d366' : undefined }}
                                                />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        </CredenzaBody>
                    </div>
                </ScrollArea>
            </CredenzaContent>
        </Credenza>
    );
}
