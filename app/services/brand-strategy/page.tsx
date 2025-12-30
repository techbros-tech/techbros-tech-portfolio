"use client";

import { useState, useCallback, useEffect } from "react";
import BrandStrategyHero from "@/components/components-2/brand-strategy";
import BrandStrategyBody from "./details";
import BrandIntro from "@/components/services/intros/brand-intro";
import ShutterTransition from "@/components/transitions/shutter-transition";

export default function BrandStrategyPage() {
    const [introComplete, setIntroComplete] = useState(false);
    const [mountKey, setMountKey] = useState(0);

    useEffect(() => {
        setIntroComplete(false);
        setMountKey(Date.now());
    }, []);

    const handleIntroComplete = useCallback(() => {
        setIntroComplete(true);
    }, []);

    return (
        <main className="bg-black min-h-screen md:mt-5 relative">
            <ShutterTransition
                key={mountKey}
                isComplete={introComplete}
                onIntroStart={() => { }}
            >
                <BrandIntro onComplete={handleIntroComplete} />
            </ShutterTransition>

            {introComplete && (
                <div>
                    <BrandStrategyHero />
                    <BrandStrategyBody />
                </div>
            )}
        </main>
    );
}
