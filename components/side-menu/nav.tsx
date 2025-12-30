import { motion } from 'framer-motion';
import { links } from './data';
import { perspective } from "./anim";
import Link from 'next/link';
import { useContactStore } from "@/store/use-contact-store";

export default function Nav({ closeMenu }: { closeMenu: () => void }) {
    return (
        <div className="flex flex-col justify-between h-full px-8 md:px-10 pt-20 md:pt-24 pb-8 md:pb-12 box-border">
            <div className="flex flex-col gap-2 md:gap-2">
                {
                    links.map((link, i) => {
                        const { title, href } = link;
                        return (
                            <div key={`b_${i}`} className="[perspective:120px] [perspective-origin:bottom]">
                                <motion.div
                                    custom={i}
                                    variants={perspective}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                >
                                    <Link
                                        href={href}
                                        className="text-3xl md:text-4xl text-black dark:text-white no-underline font-orbitron font-bold"
                                        onClick={(e) => {
                                            if (title === "Contact") {
                                                e.preventDefault();
                                                closeMenu();
                                                useContactStore.getState().onOpen();
                                            } else {
                                                closeMenu();
                                            }
                                        }}
                                    >
                                        {title}
                                    </Link>
                                </motion.div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
