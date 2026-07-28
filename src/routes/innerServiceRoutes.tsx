import { lazy, type JSX } from "react";

export interface InnerServiceRoute {
    slug: string;
    label: string;
    component: React.LazyExoticComponent<() => JSX.Element>;
}

export const innerServiceRoutes: InnerServiceRoute[] = [
    {
        slug: "web-development",
        label: "Custom Website",
        component: lazy(() => import("../pages/InnerServices/WebDevelopment")),
    },
    // {
    //     slug: "ecommerce-solution",
    //     label: "E-commerce Solution",
    //     component: lazy(() => import("../pages/InnerServices/EcommerceSolution")),
    // },
    // {
    //     slug: "web-app-solution",
    //     label: "Web/App Solution",
    //     component: lazy(() => import("../pages/InnerServices/WebAppSolution")),
    // },
    // {
    //     slug: "mobile-apps",
    //     label: "Mobile Apps",
    //     component: lazy(() => import("../pages/InnerServices/MobileApps")),
    // },
    // {
    //     slug: "video-animation",
    //     label: "Video Animation",
    //     component: lazy(() => import("../pages/InnerServices/VideoAnimation")),
    // },
    // {
    //     slug: "branding-and-design",
    //     label: "Branding and Design",
    //     component: lazy(() => import("../pages/InnerServices/BrandingAndDesign")),
    // },
    // {
    //     slug: "logo-design",
    //     label: "Logo Design",
    //     component: lazy(() => import("../pages/InnerServices/LogoDesign")),
    // },
    // {
    //     slug: "seo",
    //     label: "SEO",
    //     component: lazy(() => import("../pages/InnerServices/Seo")),
    // },
    // {
    //     slug: "content-writing",
    //     label: "Content Writing",
    //     component: lazy(() => import("../pages/InnerServices/ContentWriting")),
    // },
    // {
    //     slug: "social-media-management",
    //     label: "Social Media Management & Marketing",
    //     component: lazy(() => import("../pages/InnerServices/SocialMediaManagement")),
    // },
    // {
    //     slug: "digital-marketing",
    //     label: "Digital Marketing Services",
    //     component: lazy(() => import("../pages/InnerServices/DigitalMarketing")),
    // },
];