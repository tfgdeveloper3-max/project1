"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowUpRight, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";

/* ============================= DATA ============================= */

const SERVICE_TABS = [
    "Custom Website",
    "E-Commerce Solution",
    "Web App Solution",
    "Mobile Application",
    "UI/UX Design",
    "Branding & Identity",
    "Digital Marketing",
    "SEO Optimization",
    "Social Media Marketing",
    "Content Management",
    "Cloud & DevOps",
];

interface Plan {
    name: string;
    price: string;
    bestSeller: boolean;
    features: string[];
}

const PRICING_DATA: Record<string, Plan[]> = {
    "Custom Website": [
        { name: "Basic Website", price: "$244.00", bestSeller: false, features: ["Up to 5 Pages", "Mobile Responsive", "Basic SEO Setup", "Contact Form", "1 Revision Round", "Delivery: 5-7 Days"] },
        { name: "Startup Website", price: "$394.00", bestSeller: false, features: ["Up to 10 Pages", "Mobile Responsive", "Advanced SEO", "Contact Forms", "2 Revision Rounds", "Delivery: 7-10 Days"] },
        { name: "Professional Website", price: "$844.00", bestSeller: true, features: ["Up to 20 Pages", "Fully Responsive", "Premium SEO", "CMS Integration", "5 Revision Rounds", "Delivery: 10-14 Days"] },
        { name: "Elite Website", price: "$1,444.00", bestSeller: false, features: ["Unlimited Pages", "Custom Animations", "Advanced SEO + Analytics", "CMS + Blog", "Unlimited Revisions", "Delivery: 14-21 Days"] },
        { name: "Corporate Website", price: "$2,444.00", bestSeller: false, features: ["Unlimited Pages", "Multi-language Support", "Enterprise SEO", "Custom CMS", "Dedicated Manager", "Delivery: 21-30 Days"] },
        { name: "Business Website", price: "$3,944.00", bestSeller: false, features: ["Unlimited Everything", "Custom Integrations", "Full SEO Suite", "Advanced CMS + API", "Priority Support", "Delivery: 30-45 Days"] },
    ],
    "E-Commerce Solution": [
        { name: "Basic Store", price: "$494.00", bestSeller: false, features: ["Up to 50 Products", "Payment Gateway", "Basic Shipping", "Mobile Responsive", "1 Revision Round", "Delivery: 7-10 Days"] },
        { name: "Standard Store", price: "$944.00", bestSeller: true, features: ["Up to 500 Products", "Multiple Payments", "Advanced Shipping", "Coupon System", "3 Revision Rounds", "Delivery: 10-14 Days"] },
        { name: "Professional Store", price: "$1,944.00", bestSeller: false, features: ["Unlimited Products", "All Payment Methods", "Multi-vendor Support", "Inventory Management", "5 Revision Rounds", "Delivery: 14-21 Days"] },
        { name: "Enterprise Store", price: "$4,944.00", bestSeller: false, features: ["Unlimited Products", "Custom Integrations", "ERP Integration", "Advanced Analytics", "Dedicated Manager", "Delivery: 30-45 Days"] },
    ],
    "Web App Solution": [
        { name: "Starter App", price: "$1,494.00", bestSeller: false, features: ["Up to 5 Screens", "Basic Functionality", "User Authentication", "Responsive Design", "2 Revision Rounds", "Delivery: 14-21 Days"] },
        { name: "Growth App", price: "$2,944.00", bestSeller: true, features: ["Up to 15 Screens", "Advanced Features", "Role-based Access", "API Integration", "5 Revision Rounds", "Delivery: 21-30 Days"] },
        { name: "Enterprise App", price: "$5,944.00", bestSeller: false, features: ["Unlimited Screens", "Custom Architecture", "Third-party APIs", "Real-time Features", "Unlimited Revisions", "Delivery: 30-45 Days"] },
        { name: "SaaS Platform", price: "$9,944.00", bestSeller: false, features: ["Full SaaS Setup", "Subscription Billing", "Multi-tenancy", "Analytics Dashboard", "Priority Support", "Delivery: 45-60 Days"] },
    ],
    "Mobile Application": [
        { name: "Basic App", price: "$1,944.00", bestSeller: false, features: ["Up to 10 Screens", "Single Platform", "Basic UI/UX", "Push Notifications", "2 Revision Rounds", "Delivery: 21-30 Days"] },
        { name: "Standard App", price: "$3,444.00", bestSeller: true, features: ["Up to 20 Screens", "Cross-platform", "Custom UI/UX", "API Integration", "5 Revision Rounds", "Delivery: 30-45 Days"] },
        { name: "Advanced App", price: "$5,944.00", bestSeller: false, features: ["Unlimited Screens", "Native Performance", "Advanced Animations", "Offline Support", "Unlimited Revisions", "Delivery: 45-60 Days"] },
        { name: "Enterprise App", price: "$9,944.00", bestSeller: false, features: ["Full Custom Build", "Multi-platform", "Complex Features", "Admin Panel", "Dedicated Team", "Delivery: 60-90 Days"] },
    ],
    "UI/UX Design": [
        { name: "Basic Design", price: "$344.00", bestSeller: false, features: ["Up to 5 Screens", "Wireframes", "Basic Prototyping", "1 Revision Round", "Figma Source", "Delivery: 5-7 Days"] },
        { name: "Standard Design", price: "$644.00", bestSeller: true, features: ["Up to 15 Screens", "User Research", "Interactive Prototype", "3 Revision Rounds", "Design System", "Delivery: 10-14 Days"] },
        { name: "Premium Design", price: "$1,244.00", bestSeller: false, features: ["Up to 30 Screens", "Full User Testing", "Animated Prototype", "Unlimited Revisions", "Complete Design System", "Delivery: 14-21 Days"] },
    ],
    "Branding & Identity": [
        { name: "Starter Brand", price: "$294.00", bestSeller: false, features: ["Logo (2 Concepts)", "Color Palette", "Typography", "1 Revision Round", "PNG + SVG Files", "Delivery: 5-7 Days"] },
        { name: "Professional Brand", price: "$644.00", bestSeller: true, features: ["Logo (5 Concepts)", "Full Brand Guide", "Business Card", "Letterhead", "3 Revision Rounds", "Delivery: 10-14 Days"] },
        { name: "Enterprise Brand", price: "$1,444.00", bestSeller: false, features: ["Unlimited Concepts", "Complete Brand Kit", "Social Media Kit", "Brand Guidelines Book", "Unlimited Revisions", "Delivery: 21-30 Days"] },
    ],
    "Digital Marketing": [
        { name: "Starter Plan", price: "$294/mo", bestSeller: false, features: ["Social Media Setup", "3 Posts/Week", "Basic Analytics", "Monthly Report", "1 Platform", "Strategy Consultation"] },
        { name: "Growth Plan", price: "$644/mo", bestSeller: true, features: ["3 Platforms", "5 Posts/Week", "Ad Management", "Advanced Analytics", "Bi-weekly Reports", "Content Calendar"] },
        { name: "Scale Plan", price: "$1,244/mo", bestSeller: false, features: ["5 Platforms", "Daily Posts", "Full Ad Management", "A/B Testing", "Weekly Reports", "Dedicated Manager"] },
        { name: "Enterprise Plan", price: "$2,444/mo", bestSeller: false, features: ["All Platforms", "Unlimited Content", "Multi-channel Ads", "Conversion Opt.", "Real-time Dashboard", "Full Team Support"] },
    ],
    "SEO Optimization": [
        { name: "Basic SEO", price: "$244/mo", bestSeller: false, features: ["Up to 10 Keywords", "On-page SEO", "Technical Audit", "Monthly Report", "Basic Backlinks", "Local SEO Setup"] },
        { name: "Professional SEO", price: "$644/mo", bestSeller: true, features: ["Up to 30 Keywords", "Full On/Off-page", "Technical Fixes", "Bi-weekly Reports", "Quality Backlinks", "Content Strategy"] },
        { name: "Enterprise SEO", price: "$1,444/mo", bestSeller: false, features: ["Unlimited Keywords", "Full SEO Suite", "Speed Optimization", "Weekly Reports", "Authority Backlinks", "Dedicated SEO Lead"] },
    ],
    "Social Media Marketing": [
        { name: "Starter SMM", price: "$194/mo", bestSeller: false, features: ["1 Platform", "3 Posts/Week", "Basic Hashtags", "Monthly Report", "Content Creation", "Engagement Monitor"] },
        { name: "Growth SMM", price: "$494/mo", bestSeller: true, features: ["3 Platforms", "5 Posts/Week", "Story + Reels", "Bi-weekly Reports", "Community Mgmt", "Hashtag Strategy"] },
        { name: "Premium SMM", price: "$994/mo", bestSeller: false, features: ["5 Platforms", "Daily Posts", "Video Content", "Weekly Reports", "Influencer Outreach", "Paid Social Ads"] },
    ],
    "Content Management": [
        { name: "Basic CMS", price: "$444.00", bestSeller: false, features: ["WordPress Setup", "Basic Theme", "5 Core Pages", "Contact Forms", "Basic Training", "Delivery: 7-10 Days"] },
        { name: "Professional CMS", price: "$944.00", bestSeller: true, features: ["Custom Theme", "Advanced Plugins", "Unlimited Pages", "SEO Tools", "Full Training", "Delivery: 14-21 Days"] },
        { name: "Enterprise CMS", price: "$2,444.00", bestSeller: false, features: ["Headless CMS Setup", "Custom Modules", "Multi-user Roles", "API Integration", "Ongoing Support", "Delivery: 30-45 Days"] },
    ],
    "Cloud & DevOps": [
        { name: "Starter Cloud", price: "$344/mo", bestSeller: false, features: ["Cloud Setup", "Basic CI/CD", "Monitoring", "2 Environments", "Monthly Maintenance", "Email Support"] },
        { name: "Professional Cloud", price: "$744/mo", bestSeller: true, features: ["Full Infrastructure", "Advanced CI/CD", "Auto-scaling", "Unlimited Env.", "Weekly Maintenance", "Slack Support"] },
        { name: "Enterprise Cloud", price: "$1,944/mo", bestSeller: false, features: ["Multi-cloud Setup", "Custom Pipelines", "Disaster Recovery", "Security Hardening", "24/7 Monitoring", "Dedicated Engineer"] },
    ],
};

/* ============================= CARD ============================= */

function PricingCard({
    plan,
    isActive,
    onHover,
    onLeave,
}: {
    plan: Plan;
    isActive: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            animate={{
                backgroundColor: isActive ? "#3B8C4E" : "#FFFFFF",
                scale: isActive ? 1.05 : 1,
                y: isActive ? -10 : 0,
            }}
            className="relative flex w-[280px] shrink-0 flex-col rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:w-[300px]"
            style={{ transition: "background-color 400ms ease, transform 400ms ease" }}
        >
            {/* Best Seller Badge */}
            {plan.bestSeller && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <span className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#F2530F] via-[#DB1B3F] to-[#B23FC9] px-4 py-1 text-[10px] font-bold tracking-wider text-white shadow-lg">
                        BEST SELLER
                    </span>
                </div>
            )}

            {/* Icon */}
            <motion.div
                animate={{ backgroundColor: isActive ? "#FFFFFF" : "#3B8C4E" }}
                transition={{ duration: 0.4 }}
                className="flex h-10 w-10 items-center justify-center rounded-full"
            >
                <PackageOpen
                    className="h-5 w-5 transition-colors duration-300"
                    style={{ color: isActive ? "#3B8C4E" : "#FFFFFF" }}
                    strokeWidth={1.75}
                />
            </motion.div>

            {/* Plan Name */}
            <h3
                className="mt-4 text-lg font-bold transition-colors duration-300"
                style={{ color: isActive ? "#FFFFFF" : "#111111" }}
            >
                {plan.name}
            </h3>

            {/* Price */}
            <div className="mt-2 flex items-baseline gap-1">
                <span
                    className="text-2xl font-extrabold transition-colors duration-300"
                    style={{ color: isActive ? "#FFFFFF" : "#111111" }}
                >
                    {plan.price}
                </span>
            </div>

            {/* Features Box */}
            <div
                className="mt-5 flex flex-1 flex-col gap-2.5 rounded-2xl p-4 transition-colors duration-300"
                style={{ backgroundColor: isActive ? "#FFFFFF" : "#DCEBE1" }}
            >
                {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                        <span
                            className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: "#3B8C4E" }}
                        >
                            <Check className="h-2 w-2 text-white" strokeWidth={3} />
                        </span>
                        <span
                            className="text-[13px] leading-snug transition-colors duration-300"
                            style={{ color: isActive ? "#374151" : "#6B7280" }}
                        >
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <button
                className="mt-5 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
                style={{
                    background: isActive
                        ? "#3B8C4E"
                        : "linear-gradient(90deg, #F2530F 0%, #DB1B3F 55%, #B23FC9 100%)",
                }}
            >
                Get Started
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
        </motion.div>
    );
}

/* ============================= SECTION ============================= */

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState(SERVICE_TABS[0]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const sliderRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    const currentPlans = PRICING_DATA[activeTab] || [];
    const defaultActive = currentPlans.findIndex((p) => p.bestSeller);
    const activeIndex = hoveredIndex ?? (defaultActive >= 0 ? defaultActive : 0);

    // Reset on tab change
    useEffect(() => {
        setHoveredIndex(null);
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, [activeTab]);

    const scrollSlider = (dir: "left" | "right") => {
        if (!sliderRef.current) return;
        const card = sliderRef.current.children[0] as HTMLElement | undefined;
        const width = card ? card.offsetWidth + 20 : 320;
        sliderRef.current.scrollBy({
            left: dir === "left" ? -width : width,
            behavior: "smooth",
        });
    };

    const scrollTabs = (dir: "left" | "right") => {
        if (!tabsRef.current) return;
        tabsRef.current.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-[#F6F6F6] py-16 font-atyp md:py-20">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                {/* Header */}
                <div className="text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block rounded-full bg-[#B8C1BD] px-5 py-1.5 text-sm font-medium text-neutral-700"
                    >
                        Pricing
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-4 text-3xl font-bold text-neutral-900 md:text-4xl"
                    >
                        Flexible <span className="text-[#147237]">PRICING</span> For Every Need
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mx-auto mt-3 max-w-xl text-sm text-neutral-500"
                    >
                        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                        Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966.
                    </motion.p>
                </div>

                {/* ===== Tabs ===== */}
                <div className="relative mt-10">
                    <button
                        onClick={() => scrollTabs("left")}
                        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1.5 shadow-md transition-all hover:scale-110 hover:shadow-lg md:flex"
                    >
                        <ChevronLeft className="h-4 w-4 text-neutral-600" />
                    </button>

                    <div
                        ref={tabsRef}
                        className="scrollbar-hide flex gap-2 overflow-x-auto px-1 py-1 md:px-8"
                    >
                        {SERVICE_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === tab
                                        ? "bg-[#3B8C4E] text-white shadow-md shadow-green-900/20"
                                        : "bg-white text-neutral-600 hover:bg-gray-50 hover:text-neutral-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollTabs("right")}
                        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1.5 shadow-md transition-all hover:scale-110 hover:shadow-lg md:flex"
                    >
                        <ChevronRight className="h-4 w-4 text-neutral-600" />
                    </button>
                </div>

                {/* ===== Slider ===== */}
                <div className="relative mt-10">
                    {/* Edge Fades */}
                    <div className="pointer-events-none absolute left-0 top-0 z-[5] h-full w-10 bg-gradient-to-r from-[#F6F6F6] to-transparent md:w-16" />
                    <div className="pointer-events-none absolute right-0 top-0 z-[5] h-full w-10 bg-gradient-to-l from-[#F6F6F6] to-transparent md:w-16" />

                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollSlider("left")}
                        className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:shadow-xl"
                    >
                        <ChevronLeft className="h-5 w-5 text-neutral-700" />
                    </button>

                    {/* Cards Track */}
                    <div className="overflow-hidden">
                        <div
                            ref={sliderRef}
                            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-10 py-6 md:px-14"
                        >
                            <AnimatePresence mode="wait">
                                {currentPlans.map((plan, i) => (
                                    <motion.div
                                        key={`${activeTab}-${plan.name}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: i * 0.06,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        <PricingCard
                                            plan={plan}
                                            isActive={activeIndex === i}
                                            onHover={() => setHoveredIndex(i)}
                                            onLeave={() => setHoveredIndex(null)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollSlider("right")}
                        className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:shadow-xl"
                    >
                        <ChevronRight className="h-5 w-5 text-neutral-700" />
                    </button>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}