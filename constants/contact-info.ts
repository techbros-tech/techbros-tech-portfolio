import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

export const CONTACT_INFO = {
    whatsapp: {
        label: "WhatsApp",
        value: "+2347040196739",
        href: "https://wa.me/2347040196739",
        icon: FaWhatsapp,
        color: "#25D366"
    },
    phone: {
        label: "Phone Call",
        value: "+2347040196739",
        href: "tel:+2347040196739",
        icon: FaPhone,
        color: "#3b82f6"
    },
    email: {
        label: "Email",
        value: "techbrosstores@gmail.com",
        href: "mailto:techbrosstores@gmail.com",
        icon: FaEnvelope,
        color: "#ea4335"
    },
    socials: [
        {
            label: "Twitter (X)",
            href: "https://x.com/techbros_7?s=21",
            icon: FaTwitter,
            color: "#1DA1F2"
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/samuel-atuonye-93a934201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            icon: FaLinkedin,
            color: "#0A66C2"
        },
        {
            label: "Instagram",
            href: "https://www.instagram.com/techbros_7?igsh=eDl6YWp5YmxuOXNk&utm_source=qr",
            icon: FaInstagram,
            color: "#E4405F"
        },
        {
            label: "Facebook",
            href: "https://www.facebook.com/share/14PWJsEqtVr/?mibextid=wwXIfr",
            icon: FaFacebook,
            color: "#1877F2"
        },
        {
            label: "TikTok",
            href: "https://www.tiktok.com/@techbros_7?_r=1&_t=ZS-92eMo3Jjs5I",
            icon: FaTiktok,
            color: "#ffffff"
        }
    ]
};
