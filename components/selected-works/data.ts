export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string; // We'll use a placeholder or gradient
    techStack: string[];
    link: string;
    color: string; // Main accent color
}

export const SELECTED_WORKS: Project[] = [
    {
        id: 1,
        title: "CARE4U OHIO",
        category: "Healthcare",
        description: "Compassionate home health care services in Ohio, providing skilled nursing, therapy, and personalized patient support for a better quality of life.",
        image: "/projects/project-1.png",
        techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://www.care4u-ohio.com/",
        color: "#0EA5E9", // Sky Blue
    },
    {
        id: 2,
        title: "NIK DALLAS",
        category: "Creative Portfolio",
        description: "A minimalist multidisciplinary design portfolio showcasing immersive digital experiences, brand identity, and visual storytelling.",
        image: "/projects/project-2.png",
        techStack: ["React", "WebGL", "GSAP"],
        link: "https://www.nikdallas.com/",
        color: "#8B5CF6", // Violet
    },
    {
        id: 3,
        title: "SOFASCORE",
        category: "Sports Data Platform",
        description: "The ultimate live score app for sports fans. Providing real-time scores, deep statistics, and player analysis across 25+ sports.",
        image: "/projects/project-3.png",
        techStack: ["Next.js", "WebSockets", "Redux"],
        link: "https://www.sofascore.com/",
        color: "#3B82F6", // Blue
    }
];
