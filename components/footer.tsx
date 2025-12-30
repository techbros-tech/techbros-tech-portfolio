"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { CONTACT_INFO } from "@/constants/contact-info";
import { useContactStore } from "@/store/use-contact-store";

type FooterColor = "emerald" | "blue" | "purple" | "amber" | "neutral";

export default function Footer({ color = "emerald" }: { color?: FooterColor }) {

    // Map colors to tailwind classes
    const colorMap = {
        emerald: {
            textGradient: "from-emerald-400 to-emerald-600",
            hoverText: "hover:text-emerald-400",
            bgGlow: "bg-emerald-600/10",
        },
        blue: {
            textGradient: "from-blue-400 to-cyan-500",
            hoverText: "hover:text-blue-400",
            bgGlow: "bg-blue-600/10",
        },
        purple: {
            textGradient: "from-purple-500 to-pink-500",
            hoverText: "hover:text-purple-400",
            bgGlow: "bg-purple-600/10",
        },
        amber: {
            textGradient: "from-amber-400 to-yellow-500",
            hoverText: "hover:text-amber-400",
            bgGlow: "bg-amber-600/10",
        },
        neutral: {
            textGradient: "from-white to-neutral-400",
            hoverText: "hover:text-white",
            bgGlow: "bg-white/5",
        }
    };

    const theme = colorMap[color];

    return (
        <footer className="bg-black text-white relative border-t border-neutral-900 overflow-hidden">
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-20">

                    {/* Left: CTA */}
                    <div>
                        <h2 className="text-5xl md:text-8xl font-bold font-audiowide mb-8 leading-[0.9]">
                            Let's Build <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient}`}>
                                The Future.
                            </span>
                        </h2>
                        <p className="text-neutral-400 font-rajdhani text-xl md:text-2xl max-w-lg mb-12">
                            Ready to turn your ambitious ideas into deployed reality? Let's engineer something extraordinary together.
                        </p>

                        <button
                            onClick={useContactStore.getState().onOpen}
                            className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold font-rajdhani text-xl hover:bg-neutral-200 transition-colors group"
                        >
                            Start a Project
                            <MoveRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right: Links */}
                    <div className="grid grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-6">
                            <h4 className="text-lg font-audiowide text-neutral-500 uppercase tracking-widest">Services</h4>
                            <ul className="space-y-4 font-rajdhani text-xl font-medium">
                                <li><Link href="/services/web-development" className={`transition-colors ${theme.hoverText}`}>Web Development</Link></li>
                                <li><Link href="/services/app-development" className={`transition-colors ${theme.hoverText}`}>App Development</Link></li>
                                <li><Link href="/services/ui-ux-design" className={`transition-colors ${theme.hoverText}`}>UI/UX Design</Link></li>
                                <li><Link href="/services/brand-strategy" className={`transition-colors ${theme.hoverText}`}>Brand Strategy</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-lg font-audiowide text-neutral-500 uppercase tracking-widest">Company</h4>
                            <ul className="space-y-4 font-rajdhani text-xl font-medium">
                                <li><Link href="/#about" className={`transition-colors ${theme.hoverText}`}>About Us</Link></li>
                                <li><Link href="#" className={`transition-colors ${theme.hoverText}`}>Careers</Link></li>
                                <li><Link href="#" className={`transition-colors ${theme.hoverText}`}>Privacy Policy</Link></li>
                                <li><button onClick={useContactStore.getState().onOpen} className={`transition-colors ${theme.hoverText}`}>Contact</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-500 font-rajdhani">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p>© {new Date().getFullYear()} TechBros. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href={CONTACT_INFO.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                                <CONTACT_INFO.whatsapp.icon size={18} />
                                <span>{CONTACT_INFO.whatsapp.value}</span>
                            </a>
                            <a href={CONTACT_INFO.phone.href} className="flex items-center gap-2 hover:text-white transition-colors">
                                <CONTACT_INFO.phone.icon size={18} />
                                <span>{CONTACT_INFO.phone.value}</span>
                            </a>
                            <a href={CONTACT_INFO.email.href} className="flex items-center gap-2 hover:text-white transition-colors">
                                <CONTACT_INFO.email.icon size={18} />
                                <span>{CONTACT_INFO.email.value}</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 flex-wrap justify-center">
                        {CONTACT_INFO.socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className={`absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full blur-[120px] pointer-events-none ${theme.bgGlow}`} />
        </footer>
    );
}
