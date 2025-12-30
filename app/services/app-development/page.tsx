"use client";

import { useState, useCallback, useEffect } from "react";
import AppDevelopmentHero from "@/components/components-2/app-development";
import AppDevelopmentBody from "./details";
import AppDevIntro from "@/components/services/intros/app-dev-intro";
import ShutterTransition from "@/components/transitions/shutter-transition";

export default function AppDevelopmentPage() {
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
                <AppDevIntro onComplete={handleIntroComplete} />
            </ShutterTransition>

            {introComplete && (
                <div>
                    <AppDevelopmentHero />
                    <AppDevelopmentBody />
                </div>
            )}
        </main>
    );
}
