"use client";

import { useState, useCallback, useEffect } from "react";
import UiUxDesignHero from "@/components/components-2/ui-ux-design";
import UiUxDesignBody from "./details";
import UiUxIntro from "@/components/services/intros/ui-ux-intro";
import ShutterTransition from "@/components/transitions/shutter-transition";

export default function UiUxDesignPage() {
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
                <UiUxIntro onComplete={handleIntroComplete} />
            </ShutterTransition>

            {introComplete && (
                <div>
                    <UiUxDesignHero />
                    <UiUxDesignBody />
                </div>
            )}
        </main>
    );
}
