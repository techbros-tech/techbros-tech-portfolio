"use client";

import { BrandBackground } from "./background";
import { BrandContent } from "./content";
import { BrandHero } from "./hero";

function BrandStrategy({ href }: { href?: string }) {
    return (
        <section className="min-h-screen relative flex items-center bg-black overflow-hidden py-12 group/section">
            <BrandBackground />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Visual Content - Left Side */}
                <BrandHero />

                {/* Text Content - Right Side */}
                <BrandContent href={href} />
            </div>
        </section>
    );
}

export default BrandStrategy;
