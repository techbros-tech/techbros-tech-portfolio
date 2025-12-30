import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile App Development",
    description: "High-performance iOS and Android mobile applications built with cutting-edge technology. Experience seamless performance and world-class design with TechBros.",
    openGraph: {
        title: "Mobile App Development | TechBros",
        description: "Expert mobile app development for iOS and Android platforms.",
        url: "https://techbros.tech/services/app-development",
        images: [
            {
                url: "/techbros-logo.png",
                width: 1200,
                height: 630,
                alt: "TechBros App Development",
            },
        ],
    },
    keywords: ["Mobile App Development", "iOS Development", "Android Development", "React Native", "Flutter", "TechBros Apps"],
};

export default function AppDevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
