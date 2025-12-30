import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Brand Strategy & Identity",
    description: "Define your digital presence with strategic brand identity. We help businesses build lasting connections through purposeful design and strategic positioning.",
    openGraph: {
        title: "Brand Strategy & Identity | TechBros",
        description: "Building powerful digital brands with strategic design and positioning.",
        url: "https://techbros.tech/services/brand-strategy",
        images: [
            {
                url: "/techbros-logo.png",
                width: 1200,
                height: 630,
                alt: "TechBros Brand Strategy",
            },
        ],
    },
    keywords: ["Brand Strategy", "Brand Identity", "Digital Branding", "Logo Design", "Strategic Positioning", "TechBros Branding"],
};

export default function BrandStrategyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
