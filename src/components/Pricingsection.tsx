"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowUpRight, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";

const SERVICE_TABS = [
    "Custom Website",
    "E-Commerce Solution",
    "Web/App Solution",
    "Mobile Apps",
    "Video Animation",
    "Branding & Identity",
    "Logo Design",
    "Digital Marketing Services",
    "SEO Optimization",
    "Social Media Marketing",
    "Content Writing",
];

interface Plan {
    name: string;
    price: string;
    bestSeller: boolean;
    features: string[];
}

const PRICING_DATA: Record<string, Plan[]> = {

    "Custom Website": [
        { name: "Basic Package", price: "$199", bestSeller: false, features: ["3 Page Website", "2 Stock Images", "1 jQuery Slider Banner", "Contact/Query Form", "24-48 Hours TAT", "Complete Deployment"] },
        { name: "Startup Package", price: "$399", bestSeller: false, features: ["5 Page Website", "5 Stock Photos", "3 Banner Designs", "Free Google Sitemap", "W3C Certified HTML", "24-48 Hours TAT"] },
        { name: "Professional Package", price: "$699", bestSeller: false, features: ["10 Unique Pages", "CMS/Admin Panel Support", "8 Stock Images", "5 Banner Designs", "Mobile Responsive", "24-48 Hours TAT"] },
        { name: "Elite Package", price: "$1,299", bestSeller: false, features: ["Up To 15 Unique Pages", "Online Payment Integration", "Custom Forms", "Newsletter Subscription", "Social Media Integration", "5 Stock Photos"] },
        { name: "Corporate Package", price: "$1,999", bestSeller: false, features: ["15-20 Pages Website", "Custom WP/PHP Development", "Up To 10 Banner Designs", "Content Management System", "Multi-Lingual (Optional)", "Dedicated Account Manager"] },
        { name: "Business Package", price: "$3,299", bestSeller: false, features: ["15-20 Pages Website", "15s 2D Explainer Video", "Professional Script Writing", "Custom CMS", "Unlimited Revisions", "Dedicated Account Manager"] },
    ],

    "E-Commerce Solution": [
        { name: "E-Commerce Basic", price: "$799", bestSeller: false, features: ["Up To 50 Products", "Up To 7 Categories", "Payment Gateway Integration", "Mini Shopping Cart", "5 Stock Photos", "30 Days Free Maintenance"] },
        { name: "E-Commerce Plus", price: "$1,299", bestSeller: true, features: ["Up To 400 Products", "Up To 10 Categories", "Product Ratings & Reviews", "Full Shopping Cart", "SEO Friendly Coding", "90 Days Free Maintenance"] },
        { name: "E-Commerce Prime", price: "$1,999", bestSeller: false, features: ["Up To 1,000 Products", "Multi-Currency Support (Optional)", "1 Year Free Hosting", "1 Year Free Domain", "Email Marketing Campaigns", "180 Days Free Maintenance"] },
        { name: "E-Commerce Advance", price: "$2,999", bestSeller: false, features: ["Up To 1,500 Products", "Guest Checkout", "3rd Party API Integration", "1 Year Free Hosting + Domain", "5 Business Email Addresses", "180 Days Free Maintenance"] },
        { name: "Business E-Commerce", price: "$4,499", bestSeller: false, features: ["Unlimited Products & Categories", "Marketplace Development (Optional)", "Multi-Currency Support", "5 Years Free Hosting + Domain", "Unlimited Business Emails", "1 Year Free Maintenance"] },
        { name: "Automated/Interactive Store", price: "$7,999.99", bestSeller: false, features: ["Unlimited Page Website", "Automated Inventory/Shipping Module", "Barcode Scanning", "Multi-Warehouse Support", "5 Years Free Hosting", "Custom CMS"] },
    ],

    "Web/App Solution": [
        { name: "Conferencing Portal Package", price: "$6,999", bestSeller: false, features: ["Video Conferencing", "Learning Management System", "CRM Features", "Gamification", "Automated Course Creation", "Custom Process Automation"] },
        { name: "Real Estate Platform Package", price: "$8,999", bestSeller: false, features: ["Multiple Listing Service Access", "Live Search & Detailed Listings", "Buyer/Seller Profile Automation", "CRM & Social Tracking Integration", "Calculator Tools", "Diverse API Integrations"] },
        { name: "Custom CRM/ERP Portal", price: "$14,499", bestSeller: false, features: ["Full CRM (Sales, Leads, Contracts)", "ERP Modules (HR, Finance, Inventory)", "Sales Forecasting & Automation", "Advanced Data Security", "Business Intelligence Dashboards", "Custom Reporting & Analytics"] },
        { name: "Social Media Platform Package", price: "$14,999", bestSeller: false, features: ["Unlimited Pages Platform", "User Profile & Admin Management", "Push Notifications", "In-Web Chat Module", "Social Authorization Login", "Free Logo + 12 Months Support"] },
    ],

    "Video Animation": [
        { name: "Startup Video Package", price: "$399", bestSeller: true, features: ["30s Duration, HD 1080", "Professional Script", "Storyboard Design", "Animations & VFX", "Music And Foley", "Voice Over Artists"] },
        { name: "Classic Video Package", price: "$799", bestSeller: false, features: ["60 Second Video", "Professional Script", "Storyboard Design", "Animations & VFX", "Unlimited Revisions", "Voice Over Artists"] },
        { name: "Premium Video Package", price: "$1,495", bestSeller: false, features: ["90 Second Video", "Professional Script", "Storyboard Design", "Animations & VFX", "Music And Foley", "Voice Over Artists"] },
        { name: "Deluxe Video Package", price: "$1,995", bestSeller: false, features: ["120 Second Video", "Professional Script", "Storyboard Design", "Animations & VFX", "Music And Foley", "Voice Over Artists"] },
        { name: "Basic 3D Animation", price: "$2,995", bestSeller: false, features: ["30s Duration, HD 1080", "3D Modeling & Texturing", "Rigging & Animation", "Custom Setting, 2 Characters", "Voice Over (All Accents)", "Unlimited Revisions & Concepts"] },
        { name: "Standard 3D Animation", price: "$4,995", bestSeller: true, features: ["60s Duration, HD 1080", "3D Modeling & Texturing", "Lighting & Camera Setting", "Custom Setting, 2 Characters", "Compositing & Special VFX", "Unlimited Revisions & Concepts"] },
        { name: "Premium 3D Animation", price: "$6,995", bestSeller: false, features: ["120s Duration, HD 1080", "3D Modeling & Texturing", "Custom Setting, 4 Characters", "Rendering & Compositing", "Voice Over (All Accents)", "Unlimited Revisions & Concepts"] },
    ],

    "Branding & Identity": [
        { name: "Startup Collateral Package", price: "$99", bestSeller: false, features: ["2 Stationery Design Set", "Free Fax Template", "Print Ready Formats", "Unlimited Revisions", "100% Satisfaction Guarantee"] },
        { name: "Collateral Classic Package", price: "$199", bestSeller: true, features: ["2 Stationery Design Set", "Flyer Design", "Brochure Design (Bi-Fold/Tri-Fold)", "Unlimited Revisions", "100% Satisfaction Guarantee"] },
        { name: "Premium Collateral Package", price: "$399", bestSeller: false, features: ["2 Stationery Design Set", "Packaging Design", "T-Shirt Design", "Unlimited Revisions", "100% Satisfaction Guarantee"] },
        { name: "Unlimited Collateral Package", price: "$499", bestSeller: false, features: ["2 Stationery Design Set", "Menu Card Design", "T-Shirt Design", "1 Banner Design", "100% Satisfaction Guarantee"] },
    ],

    "Logo Design": [
        { name: "Revamp Logo Package", price: "$34", bestSeller: false, features: ["2 Custom Logo Concepts", "By 2 Designers", "2 Revisions", "48-72 Hours TAT", "100% Money Back Guarantee"] },
        { name: "Startup Logo Package", price: "$64", bestSeller: false, features: ["4 Custom Logo Concepts", "By 2 Designers", "Unlimited Revisions", "48-72 Hours TAT", "100% Satisfaction Guarantee"] },
        { name: "Professional Logo Package", price: "$114", bestSeller: true, features: ["Unlimited Logo Concepts", "By 4 Industry Designers", "Free Custom Stationery Design", "Free File Formats (EPS, AI, PSD)", "Unlimited Revisions"] },
        { name: "Identity Logo Package", price: "$164", bestSeller: false, features: ["Unlimited Concepts By 8 Designers", "Free Icon Design", "1 Stationery Design Set", "2-3 Business Days TAT", "Free Unlimited Revisions"] },
        { name: "Corporate Logo Package", price: "$214", bestSeller: false, features: ["Unlimited Concepts By 6 Designers", "Free Custom Stationery Design", "Double Side Flyer / Brochure", "Email Signature Design", "24-48 Hours TAT"] },
        { name: "Elite Logo Package", price: "$414", bestSeller: false, features: ["Unlimited Concepts By 8 Designers", "2 Stationery Design Sets", "3 Page Custom Website Included", "Mobile Responsive", "All Final File Formats"] },
    ],

    "SEO Optimization": [
        { name: "Startup Plan", price: "$350/mo", bestSeller: false, features: ["Website Audit", "10 Pages Optimized", "15 Selected Keywords", "On-Page SEO Roadmap", "Blog Creation", "Initial Off-Page SEO"] },
        { name: "Scaling Plan", price: "$700/mo", bestSeller: true, features: ["Business & Competitor Analysis", "35 Selected Keywords", "15 Pages Keyword Targeted", "Google Analytics & Webmaster Setup", "Monthly Reporting", "Off-Page Optimization"] },
        { name: "Venture Plan", price: "$1,200/mo", bestSeller: false, features: ["Full Prior Analysis", "60+ Selected Keywords", "30 Pages Keyword Targeted", "Google Places Inclusion", "Monthly Reporting + Phone Support", "Off-Page Optimization"] },
    ],

    "Social Media Marketing": [
        { name: "SMM Startup", price: "$299", bestSeller: false, features: ["Facebook & Instagram", "12 Design Posts + Copywriting", "Competitive Analysis", "Content Calendar", "Industry & Keyword Research"] },
        { name: "Pro Video Marketing", price: "$499", bestSeller: false, features: ["Facebook & Instagram", "15 Design Posts + Copywriting", "Brand Reputation Analysis", "Monthly Reporting & Analytics", "1 Free Ads Campaign Setup"] },
        { name: "SMM Elite", price: "$1,399", bestSeller: false, features: ["3 Channel Setup (FB, IG, Twitter)", "18 Post Designs + Copywriting", "Community Management", "3 Ads Campaign Setup + A/B Testing", "Monthly Ad Spend Management Included"] },
    ],

    /* ============ OLD PLACEHOLDER DATA (no match found — update these later) ============ */

    "Mobile Apps": [
        { name: "Basic App", price: "$1,944.00", bestSeller: false, features: ["Up to 10 Screens", "Single Platform", "Basic UI/UX", "Push Notifications", "2 Revision Rounds", "Delivery: 21-30 Days"] },
        { name: "Standard App", price: "$3,444.00", bestSeller: true, features: ["Up to 20 Screens", "Cross-platform", "Custom UI/UX", "API Integration", "5 Revision Rounds", "Delivery: 30-45 Days"] },
        { name: "Advanced App", price: "$5,944.00", bestSeller: false, features: ["Unlimited Screens", "Native Performance", "Advanced Animations", "Offline Support", "Unlimited Revisions", "Delivery: 45-60 Days"] },
        { name: "Enterprise App", price: "$9,944.00", bestSeller: false, features: ["Full Custom Build", "Multi-platform", "Complex Features", "Admin Panel", "Dedicated Team", "Delivery: 60-90 Days"] },
    ],

    "Digital Marketing Services": [
        { name: "Starter Plan", price: "$294/mo", bestSeller: false, features: ["Social Media Setup", "3 Posts/Week", "Basic Analytics", "Monthly Report", "1 Platform", "Strategy Consultation"] },
        { name: "Growth Plan", price: "$644/mo", bestSeller: true, features: ["3 Platforms", "5 Posts/Week", "Ad Management", "Advanced Analytics", "Bi-weekly Reports", "Content Calendar"] },
        { name: "Scale Plan", price: "$1,244/mo", bestSeller: false, features: ["5 Platforms", "Daily Posts", "Full Ad Management", "A/B Testing", "Weekly Reports", "Dedicated Manager"] },
        { name: "Enterprise Plan", price: "$2,444/mo", bestSeller: false, features: ["All Platforms", "Unlimited Content", "Multi-channel Ads", "Conversion Opt.", "Real-time Dashboard", "Full Team Support"] },
    ],

    "Content Writing": [
        { name: "Basic CMS", price: "$444.00", bestSeller: false, features: ["WordPress Setup", "Basic Theme", "5 Core Pages", "Contact Forms", "Basic Training", "Delivery: 7-10 Days"] },
        { name: "Professional CMS", price: "$944.00", bestSeller: true, features: ["Custom Theme", "Advanced Plugins", "Unlimited Pages", "SEO Tools", "Full Training", "Delivery: 14-21 Days"] },
        { name: "Enterprise CMS", price: "$2,444.00", bestSeller: false, features: ["Headless CMS Setup", "Custom Modules", "Multi-user Roles", "API Integration", "Ongoing Support", "Delivery: 30-45 Days"] },
    ],
};


function PricingCard({
    plan,
    isActive,
    onHover,
    onLeave,
    onGetStarted,
}: {
    plan: Plan;
    isActive: boolean;
    onHover: () => void;
    onLeave: () => void;
    onGetStarted: () => void;
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
                onClick={onGetStarted}
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
    const { openModal } = useContactModal();

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

    const handleGetStarted = (plan: Plan) => {
        openModal(
            `Interested in the "${plan.name}" package (${activeTab}) — ${plan.price}.`
        );
    };

    return (
        <section id="pricing" className="w-full bg-[#F6F6F6] py-16 font-atyp md:py-20">
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
                        className="mt-4 text-3xl font-light text-neutral-900 md:text-4xl"
                    >
                        CHOOSE THE <span className="font-bold text-brand">INVESTMENT</span> THAT FIT YOUR AMBITION
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mx-auto mt-3 max-w-xl text-[1rem] text-neutral-500"
                    >
                        Choose a package designed around your priorities, with the flexibility to scale as your brand grows.
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
                                            onGetStarted={() => handleGetStarted(plan)}
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