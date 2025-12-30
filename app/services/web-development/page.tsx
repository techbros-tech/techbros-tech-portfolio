"use client";

import { useState, useCallback, useEffect } from "react";
import WebDevelopmentHero from "@/components/components-2/web-development";
import WebDevelopmentBody from "./details";
import WebDevIntro from "@/components/services/intros/web-dev-intro";
import ShutterTransition from "@/components/transitions/shutter-transition";

export default function WebDevelopmentPage() {
    const [introComplete, setIntroComplete] = useState(false);
    const [mountKey, setMountKey] = useState(0);

    // Force reset on every mount to ensure animation plays
    useEffect(() => {
        setIntroComplete(false);
        setMountKey(Date.now()); // Unique key to force remount
    }, []);

    // Memoize callback to prevent WebDevIntro from re-rendering
    const handleIntroComplete = useCallback(() => {
        setIntroComplete(true);
    }, []);

    return (
        <main className="bg-black min-h-screen md:mt-5 relative">
            <ShutterTransition
                key={mountKey} // Force new instance on each page visit
                isComplete={introComplete}
                onIntroStart={() => {
                    // Shutter has covered screen, intro animation can begin
                }}
            >
                <WebDevIntro onComplete={handleIntroComplete} />
            </ShutterTransition>

            {/* Page Content - Hidden until intro completes */}
            {introComplete && (
                <div>
                    <WebDevelopmentHero isHero={true} scrollToId="details" />
                    <WebDevelopmentBody />
                </div>
            )}
        </main>
    );
}
