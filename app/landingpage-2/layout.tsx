import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next-Gen Digital Solutions",
    description: "Experience the future of software development with TechBros. We build elite digital products that empower businesses to scale and innovate.",
    openGraph: {
        title: "Next-Gen Digital Solutions | TechBros",
        description: "Building the digital future with premium software and design.",
        url: "https://techbros.tech/landingpage-2",
        images: [
            {
                url: "/techbros-logo.png",
                width: 1200,
                height: 630,
                alt: "TechBros Digital Solutions",
            },
        ],
    },
};

export default function LandingTwoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
