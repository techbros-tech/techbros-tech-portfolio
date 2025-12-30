"use client";

import { WebDevBackground } from "./background";
import { WebDevContent } from "./content";
import { WebDevHero } from "./hero";

function WebDevelopment({ href, isHero, scrollToId }: { href?: string, isHero?: boolean, scrollToId?: string }) {

    return (
        <section
            className="min-h-screen relative flex items-center bg-black overflow-hidden group/section py-20 lg:py-0"
        >
            <WebDevBackground />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-12 items-center relative z-10">
                <WebDevContent href={href} isHero={isHero} scrollToId={scrollToId} />
                <WebDevHero />
            </div>
        </section>
    );
}

export default WebDevelopment;
