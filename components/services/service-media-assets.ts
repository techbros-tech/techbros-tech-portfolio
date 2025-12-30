"use client";

export interface ServiceMediaAsset {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
}

// Hardcoded media assets for each service section (12 assets each: 9 images + 3 videos)
export const SERVICE_MEDIA_ASSETS = {
  // Websites Section - Professional web design and development (9 images + 3 videos)
  websites: [
    // Primary unique images
    {
      src: "/optimized/website-landing-5.jpg",
      alt: "Modern responsive website design with clean layout",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-10.jpg",
      alt: "Professional business website with engaging visuals",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-16.jpg",
      alt: "Creative web design with innovative user interface",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-3.jpg",
      alt: "Dynamic website featuring modern web technologies",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-8.jpg",
      alt: "Custom web development with seamless user experience",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-14.jpg",
      alt: "Professional landing page with conversion optimization",
      type: "image" as const,
    },
    // Intelligently repeated images for better coverage
    {
      src: "/optimized/website-landing-5.jpg",
      alt: "Modern responsive website design with clean layout",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-16.jpg",
      alt: "Creative web design with innovative user interface",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-10.jpg",
      alt: "Professional business website with engaging visuals",
      type: "image" as const,
    },
    // Videos for dynamic content
    {
      src: "/videos/optimized/video-1-327kb.mp4",
      alt: "Web development showcase with interactive demonstrations",
      type: "video" as const,
      poster: "/optimized/website-landing-5.jpg",
    },
    {
      src: "/videos/optimized/video-2-1.6mb.mp4",
      alt: "Professional website creation process and design workflow",
      type: "video" as const,
      poster: "/optimized/website-landing-10.jpg",
    },
    {
      src: "/videos/optimized/video-3-1.6mb.mp4",
      alt: "Responsive web design principles and implementation",
      type: "video" as const,
      poster: "/optimized/website-landing-16.jpg",
    },
  ],

  // Mobile Apps Section - Mobile application development (9 images + 3 videos)
  mobileApps: [
    // Primary unique images
    {
      src: "/optimized/website-landing-11.jpg",
      alt: "Mobile app development with intuitive user interface",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-9.jpg",
      alt: "Cross-platform mobile application for iOS and Android",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-12.jpg",
      alt: "Native mobile app with advanced features and functionality",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-6.jpg",
      alt: "Progressive web app with offline capabilities",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-15.jpg",
      alt: "Mobile app UI/UX design with modern aesthetics",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-4.jpg",
      alt: "Enterprise mobile application solution",
      type: "image" as const,
    },
    // Intelligently repeated images
    {
      src: "/optimized/website-landing-11.jpg",
      alt: "Mobile app development with intuitive user interface",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-9.jpg",
      alt: "Cross-platform mobile application for iOS and Android",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-15.jpg",
      alt: "Mobile app UI/UX design with modern aesthetics",
      type: "image" as const,
    },
    // Videos for mobile development content
    {
      src: "/videos/optimized/video-4-1.6mb.mp4",
      alt: "Mobile app development lifecycle and best practices",
      type: "video" as const,
      poster: "/optimized/website-landing-11.jpg",
    },
    {
      src: "/videos/optimized/video-5-1.4mb.mp4",
      alt: "Cross-platform mobile app development tutorial",
      type: "video" as const,
      poster: "/optimized/website-landing-9.jpg",
    },
    {
      src: "/videos/optimized/video-6-1.3mb.mp4",
      alt: "Mobile UI/UX design principles and user testing",
      type: "video" as const,
      poster: "/optimized/website-landing-12.jpg",
    },
  ],

  // UI/UX Design Section - User interface and user experience design (9 images + 3 videos)
  uiUxDesign: [
    // Primary unique images
    {
      src: "/optimized/website-landing-2.jpg",
      alt: "User interface design with modern design principles",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-13.jpg",
      alt: "UX design process with user research and wireframes",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-17.jpg",
      alt: "Interactive design prototypes and user testing",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-7.jpg",
      alt: "Design system with consistent visual language",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-10.jpg",
      alt: "Human-centered design approach with accessibility focus",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-5.jpg",
      alt: "Mobile-first responsive design implementation",
      type: "image" as const,
    },
    // Intelligently repeated images
    {
      src: "/optimized/website-landing-2.jpg",
      alt: "User interface design with modern design principles",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-13.jpg",
      alt: "UX design process with user research and wireframes",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-17.jpg",
      alt: "Interactive design prototypes and user testing",
      type: "image" as const,
    },
    // Videos for design process content
    {
      src: "/videos/optimized/video-1-327kb.mp4",
      alt: "UI/UX design workflow and design thinking process",
      type: "video" as const,
      poster: "/optimized/website-landing-2.jpg",
    },
    {
      src: "/videos/optimized/video-2-1.6mb.mp4",
      alt: "User research methodology and user testing techniques",
      type: "video" as const,
      poster: "/optimized/website-landing-13.jpg",
    },
    {
      src: "/videos/optimized/video-7-1.4mb.mp4",
      alt: "Design system creation and component library development",
      type: "video" as const,
      poster: "/optimized/website-landing-7.jpg",
    },
  ],

  // Branding & Strategy Section - Brand identity and strategy (9 images + 3 videos)
  brandingStrategy: [
    // Primary unique images
    {
      src: "/optimized/website-landing-1.jpg",
      alt: "Brand identity development with logo design",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-8.jpg",
      alt: "Brand strategy with market positioning and messaging",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-14.jpg",
      alt: "Visual brand guidelines and style guide creation",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-11.jpg",
      alt: "Brand marketing campaign with consistent visual identity",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-16.jpg",
      alt: "Corporate branding with professional visual elements",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-3.jpg",
      alt: "Digital brand presence across multiple platforms",
      type: "image" as const,
    },
    // Intelligently repeated images
    {
      src: "/optimized/website-landing-1.jpg",
      alt: "Brand identity development with logo design",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-14.jpg",
      alt: "Visual brand guidelines and style guide creation",
      type: "image" as const,
    },
    {
      src: "/optimized/website-landing-16.jpg",
      alt: "Corporate branding with professional visual elements",
      type: "image" as const,
    },
    // Videos for branding content
    {
      src: "/videos/optimized/video-3-1.6mb.mp4",
      alt: "Brand identity creation process and logo design principles",
      type: "video" as const,
      poster: "/optimized/website-landing-1.jpg",
    },
    {
      src: "/videos/optimized/video-4-1.6mb.mp4",
      alt: "Brand strategy development and market positioning",
      type: "video" as const,
      poster: "/optimized/website-landing-8.jpg",
    },
    {
      src: "/videos/optimized/video-5-1.4mb.mp4",
      alt: "Brand guidelines implementation and visual consistency",
      type: "video" as const,
      poster: "/optimized/website-landing-14.jpg",
    },
  ],
} as const;

// Helper function to get media assets for a specific service
export const getServiceMediaAssets = (
  serviceType: keyof typeof SERVICE_MEDIA_ASSETS,
): ServiceMediaAsset[] => {
  const assets = SERVICE_MEDIA_ASSETS[serviceType];
  return assets ? [...assets] : [];
};

// Get all available service types
export const getServiceTypes = (): (keyof typeof SERVICE_MEDIA_ASSETS)[] => {
  return Object.keys(SERVICE_MEDIA_ASSETS) as (keyof typeof SERVICE_MEDIA_ASSETS)[];
};