"use client";

import { AppDevBackground } from "./background";
import { AppDevContent } from "./content";
import { AppDevHero } from "./hero";

function AppDevelopment({ href, isHero, scrollToId }: { href?: string, isHero?: boolean, scrollToId?: string }) {

    return (
        <section
            className="min-h-screen relative flex items-center bg-black overflow-hidden group/section py-20 lg:py-0"
        >
            <AppDevBackground />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20 lg:gap-12 items-center relative z-10">
                {/* Visual Left (Order 1) */}
                <div className="order-2 lg:order-1">
                    <AppDevHero />
                </div>

                {/* Text Right (Order 2) */}
                <div className="order-1 lg:order-2">
                    <AppDevContent href={href} isHero={isHero} scrollToId={scrollToId} />
                </div>
            </div>
        </section>
    );
}

export default AppDevelopment;
