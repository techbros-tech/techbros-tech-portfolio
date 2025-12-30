"use client";

import { useState, useCallback } from "react";
import HeroPortfolio from "@/components/hero-portfolio";
import ScrollRevealSection from "@/components/scroll-reveal-section";
import IntroAnimation from "@/components/intro-animation";
import WhatWeOffer from "@/components/components-2/what-we-offer";

import OurTeam from "@/components/our-team";
import ContactUs from "@/components/contact-us";
import Footer from "@/components/footer";
import SelectedWorks from "@/components/selected-works";

export default function LandingPage2() {
    const [introComplete, setIntroComplete] = useState(false);

    // Memoize callback to prevent IntroAnimation from re-rendering
    const handleIntroComplete = useCallback(() => {
        setIntroComplete(true);
    }, []);

    return (
        <div className="bg-black min-h-screen">
            {!introComplete && (
                <IntroAnimation onComplete={handleIntroComplete} />
            )}

            {introComplete && (
                <>
                    <HeroPortfolio />
                    <section id="about">
                        <ScrollRevealSection />
                    </section>

                    <section id="services">
                        <WhatWeOffer />
                    </section>
                    <section id="projects">
                        <SelectedWorks />
                    </section>
                    <section id="team">
                        <OurTeam />
                    </section>
                    <section id="contact">
                        <ContactUs />
                    </section>
                    <Footer />
                </>
            )}
        </div>
    );
}

