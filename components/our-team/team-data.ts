export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string; // Placeholder or path
    bio: string;
    website?: string;
    imageClassName?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [

    {
        id: 1,
        name: "ATUONYE SAMUEL ADIMCHINOBI",
        role: "CEO & Founder",
        image: "/team/ceo.jpg",
        bio: "A graduate of Industrial Chemistry from the University of Port Harcourt and a Certified Full Stack & AI Engineer. He founded TechBros in 2022 with a vision to drive innovation and technology-driven solutions.",
        website: "https://www.linkedin.com/in/samuel-atuonye-93a934201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        id: 2,
        name: "ATUONYE CHIMEREMEZE GOSPEL",
        role: "COO",
        image: "/team/coo.jpg",
        bio: "He studied Public Administration/Political Science and became part of the TechBros team in 2024, contributing to the company’s growth and operations."
    },
    {
        id: 3,
        name: "Ezeja Emmanuel",
        role: "CTO & Lead Architect",
        image: "/team/cto.jpg",
        bio: "A passionate Full Stack, Blockchain, and AI Engineer crafting seamless digital experiences. He architects scalable solutions and drives the technical vision behind TechBros' innovation.",
        website: "https://www.jatique.dev/",
        imageClassName: "object-top"
    },
    {
        id: 4,
        name: "Ezeokeke Collins",
        role: "CTO 2",
        image: "/team/cto-2.jpg",
        bio: "A versatile Full Stack Developer and Web3 & AI Expert. He specializes in building comprehensive digital solutions, from conceptualization to deployment, driving technical excellence.",
        website: "https://www.fattrick-collins.com/"
    }
];
