"use client";

import ProcessTimeline from "@/components/components-2/app-development/process-timeline";
import SolutionsGrid from "@/components/components-2/app-development/solutions-grid";
import TechStackShowcase from "@/components/components-2/app-development/tech-stack-showcase";
import PerformanceMetrics from "@/components/components-2/app-development/performance-metrics";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import Footer from "@/components/footer";

export default function AppDevelopmentBody() {
    return (
        <section id="details" className="bg-black text-white relative overflow-hidden">
            {/* Intro Text */}
            <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl md:text-6xl font-bold font-audiowide mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                        Architecting <span className="text-blue-500">Mobile Innovation</span>
                    </h3>
                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-rajdhani max-w-2xl mx-auto">
                        We don't just build apps; we forge pocket-sized powerhouses. From native iOS/Android mastery to seamless cross-platform ecosystems, we engineer mobile experiences that dominate the charts.
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
                    topText="NATIVE • 60FPS • OFFLINE-FIRST • CROSS-PLATFORM • INTUITIVE • HAPTIC • "
                    bottomText="SWIFT • KOTLIN • REACT NATIVE • FLUTTER • FIREBASE • EXPO • "
                    topVelocity={2}
                    bottomVelocity={-2}
                />
            </div>

            <Footer color="blue" />

            {/* Subtle Texture Instead of Blobs */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </section>
    );
}
