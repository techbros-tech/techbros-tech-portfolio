import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Custom Web Development",
    description: "Scale your business with high-end, responsive web applications. We specialize in Next.js, React, and robust backend architectures to deliver lightning-fast digital experiences.",
    openGraph: {
        title: "Custom Web Development | TechBros",
        description: "Next-generation web development solutions for modern businesses.",
        url: "https://techbros.tech/services/web-development",
        images: [
            {
                url: "/techbros-logo.png",
                width: 1200,
                height: 630,
                alt: "TechBros Web Development",
            },
        ],
    },
    keywords: ["Web Development", "Next.js Development", "React Development", "SaaS Development", "Full Stack Development", "TechBros Web"],
};

export default function WebDevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
