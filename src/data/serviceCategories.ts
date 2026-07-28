export interface ServiceItem {
    label: string;
    slug: string;
}

export interface ServiceCategory {
    key: string;
    label: string;
    services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        key: "web-app",
        label: "Websites & Apps",
        services: [
            { label: "Custom Website", slug: "web-development" },
            { label: "E-commerce Solution", slug: "ecommerce-solution" },
            { label: "Web/App Solution", slug: "web-app-solution" },
            { label: "Mobile Apps", slug: "mobile-apps" },
        ],
    },
    {
        key: "design-media",
        label: "Design & Media",
        services: [
            { label: "Video Animation", slug: "video-animation" },
            { label: "Branding and Design", slug: "branding-and-design" },
            { label: "Logo Design", slug: "logo-design" },
        ],
    },
    {
        key: "marketing",
        label: "Marketing & Content",
        services: [
            { label: "SEO", slug: "seo" },
            { label: "Content Writing", slug: "content-writing" },
            { label: "Social Media Management & Marketing", slug: "social-media-management" },
            { label: "Digital Marketing Services", slug: "digital-marketing" },
        ],
    },
];