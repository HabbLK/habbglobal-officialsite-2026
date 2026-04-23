import { NextResponse } from "next/server";

const headerData = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/#work' },
    { label: 'Blog', href: '/blog' },
    { label: 'Career', href: '/career' },
    { label: 'Contact', href: '/contact' },
];

const footerData = {
    brand: {
        name: "HABB",
        tagline: "Your Success, Engineered by HABB — Dream Beyond Borders. Build Beyond Limits.",
        socialLinks: [
            {
                icon: "/images/home/footerSocialIcon/facebook.svg",
                dark_icon: "/images/home/footerSocialIcon/facebook_dark.svg",
                link: "https://www.facebook.com/habbinc"
            },
            {
                icon: "/images/home/footerSocialIcon/instagram.svg",
                dark_icon: "/images/home/footerSocialIcon/instagram_dark.svg",
                link: "https://www.instagram.com/habb_inc/#"
            },
            {
                icon: "/images/home/footerSocialIcon/tiktok.svg",
                dark_icon: "/images/home/footerSocialIcon/tiktok_dark.svg",
                link: "https://www.tiktok.com/@habb_inc"
            },
            {
                icon: "/images/home/footerSocialIcon/github.svg",
                dark_icon: "/images/home/footerSocialIcon/github_dark.svg",
                link: "https://github.com/habbinc"
            },
            {
                icon: "/images/home/footerSocialIcon/linkedin.svg",
                dark_icon: "/images/home/footerSocialIcon/linkedin_dark.svg",
                link: "https://www.linkedin.com/company/habbinc/"
            },
            {
                icon: "/images/home/footerSocialIcon/youtube.svg",
                dark_icon: "/images/home/footerSocialIcon/youtube_dark.svg",
                link: "https://www.youtube.com/@habb_inc?utm_source=facebook&utm_medium=confirmed_link_feature"
            },
            {
                icon: "/images/home/footerSocialIcon/x.svg",
                dark_icon: "/images/home/footerSocialIcon/x_dark.svg",
                link: "https://x.com/habb_inc"
            }
        ]
    },
    sitemap: {
        name: "Quick Links",
        links: [
            { name: "Home", url: "/" },
            { name: "About us", url: "/about" },
            { name: "Services", url: "/services" },
            { name: "Our Work", url: "/#work" },
            { name: "Blog", url: "/blog" },
            { name: "Career", url: "/career" },
            { name: "Contact us", url: "/contact" }
        ]
    },
    otherPages: {
        name: "Legal",
        links: [
            { name: "Terms & Conditions", url: "/terms-and-conditions" },
            { name: "Privacy Policy", url: "/privacy-policy" }
        ]
    },
    websites: {
        name: "Websites",
        links: [
            { name: "habb.lk", url: "https://habb.lk" },
            { name: "habblanka.com", url: "https://habblanka.com" },
            { name: "habbgate.com", url: "https://habbgate.com" }
        ]
    },
    contactDetails: {
        name: "Get In Touch",
        address1: "218, Brown Road, Jaffna, Sri Lanka",
        email: "info@habblanka.com",
        phone: "+94 70 1111 055",
        phones: [
            "+94 70 1111 055",
            "+94 77 4704 219",
            "+94 71 0111 484"
        ]
    },
    copyright: "©2026 HABB. All Rights Reserved"
};

export const GET = async () => {
    return NextResponse.json({
        headerData,
        footerData
    });
};