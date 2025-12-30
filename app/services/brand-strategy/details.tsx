"use client";

import ProcessTimeline from "@/components/components-2/brand-strategy/process-timeline";
import SolutionsGrid from "@/components/components-2/brand-strategy/solutions-grid";
import TechStackShowcase from "@/components/components-2/brand-strategy/tech-stack-showcase";
import PerformanceMetrics from "@/components/components-2/brand-strategy/performance-metrics";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import Footer from "@/components/footer";

export default function BrandStrategyBody() {
    return (
        <section id="details" className="bg-black text-white relative overflow-hidden">
            {/* Intro Text */}
            <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl md:text-6xl font-bold font-audiowide mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                        Strategic <span className="text-amber-400">Growth</span>
                    </h3>
                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-rajdhani max-w-2xl mx-auto">
                        A brand is more than a logo; it&apos;s a promise. We help you define that promise and deliver it consistently. Our brand strategy services are designed to clarify your vision and connect you with your ideal audience.
                    </p>
                </div>
            </div>

            {/* Specialized Sections */}
            <ProcessTimeline />
            <SolutionsGrid />
            <TechStackShowcase />
            <PerformanceMetrics />

            <div className="py-12">
                <VelocityMarquee
                    topText="POSITIONING • MESSAGING • IDENTITY • VOICE • STORYTELLING • GROWTH • "
                    bottomText="MARKET RESEARCH • AUDIT • STRATEGY • ANALYTICS • INSIGHTS • "
                    topVelocity={2}
                    bottomVelocity={-2}
                />
            </div>

            <Footer color="amber" />

            {/* Subtle Texture Instead of Blobs */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </section>
    );
}


