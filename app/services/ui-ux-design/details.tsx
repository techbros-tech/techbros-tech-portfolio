"use client";

import ProcessTimeline from "@/components/components-2/ui-ux-design/process-timeline";
import SolutionsGrid from "@/components/components-2/ui-ux-design/solutions-grid";
import TechStackShowcase from "@/components/components-2/ui-ux-design/tech-stack-showcase";
import PerformanceMetrics from "@/components/components-2/ui-ux-design/performance-metrics";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import Footer from "@/components/footer";

export default function UiUxDesignBody() {
    return (
        <section id="details" className="bg-black text-white relative overflow-hidden">
            {/* Intro Text */}
            <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl md:text-6xl font-bold font-audiowide mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                        Design That <span className="text-fuchsia-400">Works</span>
                    </h3>
                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-rajdhani max-w-2xl mx-auto">
                        Great design is invisible. It guides the user effortlessly to their goal. Our UI/UX design process is rooted in empathy and data. We create interfaces that are not only visually stunning but also intuitive and accessible.
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
                    topText="WIREFRAMING • PROTOTYPING • USER RESEARCH • INTERACTION • ACCESSIBILITY • "
                    bottomText="FIGMA • ADOBE XD • SKETCH • FRAMER • PRINCIPLE • ZEPLIN • "
                    topVelocity={2}
                    bottomVelocity={-2}
                />
            </div>

            <Footer color="purple" />

            {/* Subtle Texture Instead of Blobs */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </section>
    );
}


