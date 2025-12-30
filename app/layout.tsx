import type { Metadata } from "next";
import { Orbitron, Exo_2, Rajdhani, Audiowide } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import Navbar from "@/components/navbar";
import { ContactCredenza } from "@/components/contact-credenza";
import { SendChoiceCredenza } from "@/components/send-choice-credenza";
import { FloatingContactMenu } from "@/components/floating-contact-menu";
import { Toaster } from "@/components/ui/sonner"
import SpaPrefetcher from "@/components/spa-prefetcher";
// Robotic and artistic fonts for TechBros UI
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techbros.tech"),
  title: {
    default: "TechBros | Premium Software Development & Digital Solutions",
    template: "%s | TechBros",
  },
  description: "TechBros is a elite software development agency specializing in cutting-edge web applications, mobile apps, and strategic digital transformation for global brands.",
  keywords: [
    "TechBros",
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Strategy",
    "Custom Software Solutions",
    "Tech Agency",
    "Product Design",
  ],
  authors: [{ name: "TechBros", url: "https://techbros.tech" }],
  creator: "TechBros",
  publisher: "TechBros",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techbros.tech",
    siteName: "TechBros",
    title: "TechBros | Premium Software Development & Digital Solutions",
    description: "Building the future of digital experiences with elite software development and design.",
    images: [
      {
        url: "/techbros-logo.png",
        width: 1200,
        height: 630,
        alt: "TechBros - Premium Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBros | Premium Software Development & Digital Solutions",
    description: "Building the future of digital experiences with elite software development and design.",
    images: ["/techbros-logo.png"],
    creator: "@techbros",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/techbros-logo.png",
    shortcut: "/techbros-logo.png",
    apple: "/techbros-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body
        className={`${orbitron.variable} ${exo2.variable} ${rajdhani.variable} ${audiowide.variable} antialiased bg-white dark:bg-black overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <SpaPrefetcher />
            <Toaster theme="dark" closeButton={true} richColors={true} />
            <Navbar />
            <ContactCredenza />
            <SendChoiceCredenza />
            <FloatingContactMenu />
            <div className="mt-10 md:mt-0">
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
