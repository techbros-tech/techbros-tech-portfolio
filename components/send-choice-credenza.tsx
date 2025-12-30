"use client";

import React from "react";
import { useSendStore } from "@/store/use-send-store";
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
import { X, MessageSquare, Mail, Phone } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

export function SendChoiceCredenza() {
    const { isOpen, data, setOpen, onClose } = useSendStore();

    if (!data) return null;

    const messageContent = `*New Lead from Website*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Message:* ${data.message}`;
    const emailSubject = `Project Inquiry from ${data.name}`;
    const emailBody = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;

    const sendWhatsApp = () => {
        const url = `https://wa.me/${CONTACT_INFO.whatsapp.value.replace('+', '')}?text=${messageContent}`;
        window.open(url, "_blank");
        onClose();
    };

    const sendEmail = () => {
        const url = `mailto:${CONTACT_INFO.email.value}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = url;
        onClose();
    };

    const callPhone = () => {
        const url = `tel:${CONTACT_INFO.phone.value}`;
        window.location.href = url;
        onClose();
    };

    const options = [
        {
            label: "WhatsApp",
            value: CONTACT_INFO.whatsapp.value,
            icon: MessageSquare,
            action: sendWhatsApp,
            theme: "gold"
        },
        {
            label: "Direct Call",
            value: CONTACT_INFO.phone.value,
            icon: Phone,
            action: callPhone,
            theme: "silver"
        },
        {
            label: "Email",
            value: CONTACT_INFO.email.value,
            icon: Mail,
            action: sendEmail,
            theme: "gold"
        }
    ];

    return (
        <Credenza open={isOpen} onOpenChange={setOpen}>
            <CredenzaContent className="bg-[#050505] border-white/5 text-white max-w-2xl max-h-[97vh] p-0 overflow-hidden">
                <ScrollArea className="h-full max-h-[97vh]">
                    <div className="relative p-4 md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(234,179,8,0.1),transparent_70%)] pointer-events-none" />

                        <CredenzaHeader className="relative z-10 pt-4 md:pt-8">
                            <CredenzaTitle className="text-2xl md:text-4xl font-audiowide text-center uppercase tracking-tighter">
                                <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,rgba(255,255,255,0.8),rgba(255,255,255,1),rgba(255,255,255,0.8))]">
                                    Dispatch
                                </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 ml-2 md:ml-3">
                                    Message
                                </span>
                            </CredenzaTitle>
                            <CredenzaDescription className="text-neutral-500 text-center font-rajdhani text-sm md:text-lg mt-1 md:mt-2 px-4 md:px-6">
                                Choose your preferred high-priority channel to deliver your brief.
                            </CredenzaDescription>
                        </CredenzaHeader>

                        <CredenzaBody className="relative z-10 pb-8 md:pb-12 pt-4 md:pt-6">
                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-10">
                                {options.map((option, index) => {
                                    const Icon = option.icon;
                                    const isGold = option.theme === "gold";

                                    return (
                                        <motion.button
                                            key={option.label}
                                            onClick={option.action}
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
                                                {option.label}
                                            </span>
                                            <span className="hidden md:block text-neutral-500 font-rajdhani text-xs text-center truncate w-full px-2">
                                                {option.value}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="mt-4 md:mt-10 p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className="text-[8px] md:text-[10px] font-orbitron text-neutral-600 uppercase tracking-widest text-center">
                                    Secure Transmission Ready • TechBros Global Network
                                </p>
                            </div>
                        </CredenzaBody>
                    </div>
                </ScrollArea>
            </CredenzaContent>
        </Credenza>
    );
}
