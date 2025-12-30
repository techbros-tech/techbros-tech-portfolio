import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Premium UI/UX Design",
    description: "Transform your product with world-class UI/UX design. We create beautiful, intuitive, and user-centric interfaces that drive engagement and conversion.",
    openGraph: {
        title: "Premium UI/UX Design | TechBros",
        description: "High-end product design and user experience consulting.",
        url: "https://techbros.tech/services/ui-ux-design",
        images: [
            {
                url: "/techbros-logo.png",
                width: 1200,
                height: 630,
                alt: "TechBros UI/UX Design",
            },
        ],
    },
    keywords: ["UI/UX Design", "User Experience", "User Interface", "Product Design", "Interactive Design", "TechBros Design"],
};

export default function UIUXLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
