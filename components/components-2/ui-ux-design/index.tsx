"use client";

import { UiUxBackground } from "./background";
import { UiUxContent } from "./content";
import { UiUxHero } from "./hero";

function UiUxDesign({ href }: { href?: string }) {
    return (
        <section className="min-h-screen relative flex items-center bg-black overflow-hidden py-12 group/section">
            <UiUxBackground />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Text Content - Left Side */}
                <UiUxContent href={href} />

                {/* Visual Content - Right Side */}
                <UiUxHero />
            </div>
        </section>
    );
}

export default UiUxDesign;
