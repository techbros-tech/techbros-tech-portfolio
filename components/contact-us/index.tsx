"use client";

import React from "react";
import SocialHub from "./social-hub";
import ContactForm from "./contact-form";

export default function ContactUs() {
    return (
        <section id="contact" className="relative w-full py-20 lg:py-32 bg-black overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-900/20 blur-[120px] rounded-full" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-audiowide bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-4">
                        Connect With Us
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-exo2">
                        Ready to start your digital journey? Reach out to us directly or recharge your network by connecting on social media.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Side: Social Energy Animation */}
                    <div className="w-full flex justify-center lg:justify-end">
                        <div className="w-full max-w-xl">
                            <SocialHub />
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="w-full flex justify-center lg:justify-start">
                        <div className="w-full max-w-xl">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
